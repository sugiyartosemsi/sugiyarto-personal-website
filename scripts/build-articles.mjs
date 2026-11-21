// Mengubah setiap file Word (.docx) di content/articles/ menjadi data artikel.
//
// Dijalankan otomatis sebelum `npm run dev` dan `npm run build` (lihat package.json).
// Hasil:
//   - src/generated/docx-articles.json   → isi artikel (HTML) dan metadatanya
//   - public/generated/articles/<slug>/  → gambar dari dokumen Word
// Keduanya dibuat ulang setiap build dan tidak disimpan di Git.
//
// Aturan membaca dokumen (lihat juga content/articles/README.md):
//   - Paragraf tebal pertama            → judul artikel
//   - "Oleh <nama>" + baris "(...)"      → penulis dan jabatannya (tidak ikut di isi)
//   - "Kategori:", "Tanggal:", "Ringkasan:" di awal dokumen → metadata (opsional)
//   - Paragraf yang seluruhnya tebal dan pendek → subjudul
//   - Penomoran otomatis Word (A., A.1, 1., ...) dipertahankan apa adanya
//   - Style Heading 1–3 Word juga dikenali sebagai subjudul

import fs from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";
import mammoth from "mammoth";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "content", "articles");
const OUT_JSON = path.join(ROOT, "src", "generated", "docx-articles.json");
const OUT_IMAGES = path.join(ROOT, "public", "generated", "articles");
const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

const MAX_HEADING_LENGTH = 160;
const REFERENCE_HEADINGS = /^(daftar pustaka|daftar referensi|referensi|bibliografi|sumber)$/i;
const META_LINE = /^(kategori|tanggal|ringkasan)\s*:\s*(.+)$/i;

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

// ---------- Bantuan XML ----------

const children = (node, localName) =>
  Array.from(node.childNodes || []).filter(
    (child) => child.nodeType === 1 && child.namespaceURI === W && child.localName === localName,
  );
const firstChild = (node, localName) => children(node, localName)[0];
const descendants = (node, localName) => Array.from(node.getElementsByTagNameNS(W, localName));
const attr = (node, name) => (node ? node.getAttributeNS(W, name) || node.getAttribute(`w:${name}`) : null);

function paragraphText(p) {
  return descendants(p, "t").map((t) => t.textContent).join("");
}

function isBoldRun(run, paragraphStyleBold) {
  const rPr = firstChild(run, "rPr");
  const b = rPr && firstChild(rPr, "b");
  if (b) {
    const val = attr(b, "val");
    return val === null || val === "" || val === "1" || val === "true";
  }
  return paragraphStyleBold;
}

function isAllBold(p) {
  const runs = descendants(p, "r").filter((r) => descendants(r, "t").some((t) => t.textContent.trim()));
  if (runs.length === 0) return false;
  return runs.every((r) => isBoldRun(r, false));
}

// ---------- Penomoran otomatis Word ----------

function toLetters(n, upper) {
  let s = "";
  while (n > 0) {
    n -= 1;
    s = String.fromCharCode(97 + (n % 26)) + s;
    n = Math.floor(n / 26);
  }
  return upper ? s.toUpperCase() : s;
}

function toRoman(n, upper) {
  const table = [[1000, "m"], [900, "cm"], [500, "d"], [400, "cd"], [100, "c"], [90, "xc"],
    [50, "l"], [40, "xl"], [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"]];
  let s = "";
  for (const [value, letters] of table) while (n >= value) { s += letters; n -= value; }
  return upper ? s.toUpperCase() : s;
}

function formatNumber(n, fmt) {
  switch (fmt) {
    case "upperLetter": return toLetters(n, true);
    case "lowerLetter": return toLetters(n, false);
    case "upperRoman": return toRoman(n, true);
    case "lowerRoman": return toRoman(n, false);
    case "bullet": return "•";
    case "none": return "";
    default: return String(n);
  }
}

function readNumbering(numberingXml) {
  const result = { nums: new Map(), abstracts: new Map() };
  if (!numberingXml) return result;
  const doc = new DOMParser().parseFromString(numberingXml, "text/xml");
  for (const abs of descendants(doc, "abstractNum")) {
    const levels = new Map();
    for (const lvl of children(abs, "lvl")) {
      levels.set(Number(attr(lvl, "ilvl")), {
        start: Number(attr(firstChild(lvl, "start"), "val") ?? 1) || 1,
        fmt: attr(firstChild(lvl, "numFmt"), "val") || "decimal",
        text: attr(firstChild(lvl, "lvlText"), "val") ?? "",
      });
    }
    result.abstracts.set(attr(abs, "abstractNumId"), levels);
  }
  for (const num of descendants(doc, "num")) {
    const overrides = new Map();
    for (const o of children(num, "lvlOverride")) {
      const start = firstChild(o, "startOverride");
      if (start) overrides.set(Number(attr(o, "ilvl")), Number(attr(start, "val")));
    }
    result.nums.set(attr(num, "numId"), {
      abstractId: attr(firstChild(num, "abstractNumId"), "val"),
      overrides,
    });
  }
  return result;
}

function makeLabeler(numbering) {
  const counters = new Map(); // numId -> array of counters per level
  return function label(numId, ilvl) {
    const num = numbering.nums.get(numId);
    const levels = num && numbering.abstracts.get(num.abstractId);
    if (!levels || !levels.has(ilvl)) return "";
    if (!counters.has(numId)) counters.set(numId, []);
    const c = counters.get(numId);
    for (let i = 0; i <= ilvl; i += 1) {
      if (c[i] === undefined) {
        const lvl = levels.get(i);
        c[i] = (num.overrides.get(i) ?? lvl?.start ?? 1) - (i === ilvl ? 1 : 0);
      }
    }
    c[ilvl] += 1;
    c.length = ilvl + 1; // tingkat di bawahnya mulai ulang
    const lvl = levels.get(ilvl);
    if (lvl.fmt === "bullet") return "•";
    return lvl.text.replace(/%(\d)/g, (_, d) => {
      const i = Number(d) - 1;
      return formatNumber(c[i] ?? levels.get(i)?.start ?? 1, levels.get(i)?.fmt ?? "decimal");
    });
  };
}

// ---------- Mengubah XML dokumen sebelum dikonversi ----------

const WEB_STYLES = {
  WebH2: "Web H2",
  WebH3: "Web H3",
  WebH4: "Web H4",
  WebListItem: "Web List Item",
};

function headingLevel(text, label, styleName) {
  // Penomoran menentukan tingkat lebih dulu, karena penulis kadang memakai satu style untuk semua tingkat.
  const full = `${label} ${text}`.trim();
  if (/^[A-Z]\.\s*\d+\.\d+[.\s]/.test(full)) return 4; // A.4.1, B.5.2
  if (/^[A-Z]\.?\s*\d+[.\s]/.test(full)) return 3; // A.1, B.2, A. 2
  if (/^[A-Z]\.\s/.test(full) || REFERENCE_HEADINGS.test(text.trim())) return 2; // A., B., Daftar Pustaka
  if (/^\d+\.\s/.test(full)) return 4; // 1., 2.
  const s = (styleName || "").toLowerCase();
  if (s === "heading 1" || s === "heading 2") return 2;
  if (s === "heading 3") return 3;
  if (s.startsWith("heading")) return 4;
  return 3;
}

// "A." + "2 Rumusan Masalah" ditampilkan Word sebagai "A. 2 Rumusan Masalah"; dirapikan menjadi "A.2 ...".
function joinLabel(label, text) {
  const m = /^([A-Z])\.$/.exec(label);
  const t = /^(\d+)\s+(.*)$/.exec(text);
  if (m && t) return `${m[1]}.${t[1]} ${t[2]}`;
  return label ? `${label} ${text}` : text;
}

function setText(doc, p, text) {
  // Hapus semua run teks, lalu isi satu run baru (dipakai untuk subjudul, yang tidak perlu format campuran).
  for (const r of descendants(p, "r")) if (r.parentNode) r.parentNode.removeChild(r);
  for (const h of descendants(p, "hyperlink")) if (h.parentNode) h.parentNode.removeChild(h);
  const r = doc.createElementNS(W, "w:r");
  const t = doc.createElementNS(W, "w:t");
  t.setAttribute("xml:space", "preserve");
  t.appendChild(doc.createTextNode(text));
  r.appendChild(t);
  p.appendChild(r);
}

function prependText(doc, p, text) {
  const r = doc.createElementNS(W, "w:r");
  const t = doc.createElementNS(W, "w:t");
  t.setAttribute("xml:space", "preserve");
  t.appendChild(doc.createTextNode(`${text} `));
  r.appendChild(t);
  const pPr = firstChild(p, "pPr");
  p.insertBefore(r, pPr ? pPr.nextSibling : p.firstChild);
}

function setStyle(doc, p, styleId) {
  let pPr = firstChild(p, "pPr");
  if (!pPr) {
    pPr = doc.createElementNS(W, "w:pPr");
    p.insertBefore(pPr, p.firstChild);
  }
  for (const old of children(pPr, "pStyle")) pPr.removeChild(old);
  for (const old of children(pPr, "numPr")) pPr.removeChild(old);
  const ps = doc.createElementNS(W, "w:pStyle");
  ps.setAttribute("w:val", styleId);
  pPr.insertBefore(ps, pPr.firstChild);
}

function readStyleNames(stylesXml) {
  const names = new Map();
  if (!stylesXml) return names;
  const doc = new DOMParser().parseFromString(stylesXml, "text/xml");
  for (const s of descendants(doc, "style")) {
    names.set(attr(s, "styleId"), attr(firstChild(s, "name"), "val"));
  }
  return names;
}

function addWebStyles(stylesXml) {
  const defs = Object.entries(WEB_STYLES)
    .map(([id, name]) => `<w:style w:type="paragraph" w:customStyle="1" w:styleId="${id}"><w:name w:val="${name}"/></w:style>`)
    .join("");
  return stylesXml.replace("</w:styles>", `${defs}</w:styles>`);
}

function preprocess(documentXml, numberingXml, stylesXml) {
  const doc = new DOMParser().parseFromString(documentXml, "text/xml");
  const label = makeLabeler(readNumbering(numberingXml));
  const styleNames = readStyleNames(stylesXml);
  const body = descendants(doc, "body")[0];
  const meta = {};
  let started = false; // sudah melewati judul/penulis/metadata di awal dokumen
  let seenTitle = false;
  let expectRole = false;

  for (const p of children(body, "p")) {
    const text = paragraphText(p).replace(/\s+/g, " ").trim();
    const hasImage = descendants(p, "drawing").length > 0 || p.getElementsByTagName("v:imagedata").length > 0;
    const pPr = firstChild(p, "pPr");
    const numPr = pPr && firstChild(pPr, "numPr");
    const styleId = pPr && attr(firstChild(pPr, "pStyle"), "val");
    const styleName = styleId ? styleNames.get(styleId) : null;

    if (!text && !hasImage) {
      body.removeChild(p);
      continue;
    }

    if (!started) {
      const metaMatch = META_LINE.exec(text);
      const titleLike = !numPr && (isAllBold(p) || /^(title|subtitle)$/i.test(styleName || ""));
      if (!seenTitle && (titleLike || /^heading 1$/i.test(styleName || ""))) {
        meta.title = text;
        seenTitle = true;
        body.removeChild(p);
        continue;
      }
      // Judul yang ditulis dalam beberapa baris (mis. "Judul:" lalu subjudul) digabung menjadi satu.
      if (seenTitle && !meta.author && titleLike && !/^\(?\s*oleh\b/i.test(text) && !META_LINE.test(text)) {
        meta.title = /[:–—-]$/.test(meta.title) ? `${meta.title} ${text}` : `${meta.title}: ${text}`;
        body.removeChild(p);
        continue;
      }
      if (seenTitle && /^\(?\s*oleh\s*:?\s+/i.test(text)) {
        // "Oleh Nama", "Oleh: Nama", atau "(Oleh Nama)"
        meta.author = text.replace(/^\(?\s*oleh\s*:?\s+/i, "").replace(/\)\s*$/, "").trim();
        expectRole = true;
        body.removeChild(p);
        continue;
      }
      if (expectRole && /^\(.*\)$/.test(text)) {
        meta.authorRole = text.slice(1, -1).trim();
        expectRole = false;
        body.removeChild(p);
        continue;
      }
      if (metaMatch) {
        meta[metaMatch[1].toLowerCase()] = metaMatch[2].trim();
        body.removeChild(p);
        continue;
      }
      started = true;
    }

    const lbl = numPr
      ? label(attr(firstChild(numPr, "numId"), "val"), Number(attr(firstChild(numPr, "ilvl"), "val") ?? 0))
      : "";
    const isHeadingStyle = /^heading [1-6]$/i.test(styleName || "");
    const shortLine = !hasImage && text.length <= MAX_HEADING_LENGTH && !/[.:;]$/.test(text);
    const looksLikeHeading =
      isHeadingStyle ||
      (shortLine && isAllBold(p)) ||
      // Bernomor seperti subbab (A.4, A.4.1, C.2) walau lupa ditebalkan
      (shortLine && !numPr && /^[A-Z]\.\d+(\.\d+)*\.?\s+\S/.test(text)) ||
      (!hasImage && REFERENCE_HEADINGS.test(text));

    if (looksLikeHeading) {
      const level = headingLevel(text, lbl, styleName);
      setStyle(doc, p, `WebH${level}`);
      setText(doc, p, lbl && lbl !== "•" ? joinLabel(lbl, text) : text);
    } else if (numPr) {
      setStyle(doc, p, "WebListItem");
      if (lbl) prependText(doc, p, lbl);
    }
  }

  return { xml: new XMLSerializer().serializeToString(doc), meta };
}

// ---------- Konversi ----------

function slugify(name) {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function htmlToText(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
}

function firstParagraphText(html) {
  const m = /<p>([\s\S]*?)<\/p>/.exec(html);
  return m ? htmlToText(m[1]) : "";
}

function shorten(text, max = 220) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function formatDate(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    return null;
  }
}

async function convert(file, sharp) {
  const slug = slugify(path.basename(file, ".docx"));
  const zip = await JSZip.loadAsync(await fs.readFile(file));
  const read = (name) => zip.file(name)?.async("string");
  const [documentXml, numberingXml, stylesXml, coreXml] = await Promise.all([
    read("word/document.xml"),
    read("word/numbering.xml"),
    read("word/styles.xml"),
    read("docProps/core.xml"),
  ]);
  if (!documentXml) throw new Error("word/document.xml tidak ditemukan");

  const { xml, meta } = preprocess(documentXml, numberingXml, stylesXml);

  // Keterangan pendamping (opsional): content/articles/<nama-file>.json
  // berisi {"kategori": "...", "tanggal": "...", "ringkasan": "..."}. Baris di dokumen Word tetap didahulukan.
  const sidecar = file.replace(/\.docx$/i, ".json");
  try {
    const extra = JSON.parse(await fs.readFile(sidecar, "utf8"));
    for (const key of ["kategori", "tanggal", "ringkasan"]) {
      if (!meta[key] && typeof extra[key] === "string" && extra[key].trim()) meta[key] = extra[key].trim();
    }
  } catch (error) {
    if (error.code !== "ENOENT") console.warn(`[artikel]   peringatan: ${path.relative(ROOT, sidecar)} tidak terbaca (${error.message})`);
  }
  zip.file("word/document.xml", xml);
  if (stylesXml) zip.file("word/styles.xml", addWebStyles(stylesXml));
  const buffer = await zip.generateAsync({ type: "nodebuffer" });

  const imageDir = path.join(OUT_IMAGES, slug);
  await fs.mkdir(imageDir, { recursive: true });
  let imageCount = 0;

  const result = await mammoth.convertToHtml(
    { buffer },
    {
      styleMap: [
        "p[style-name='Web H2'] => h2:fresh",
        "p[style-name='Web H3'] => h3:fresh",
        "p[style-name='Web H4'] => h4:fresh",
        "p[style-name='Web List Item'] => p.doc-list-item:fresh",
        "p[style-name='Title'] => h2:fresh",
        "p[style-name='Heading 1'] => h2:fresh",
        "p[style-name='Heading 2'] => h3:fresh",
        "p[style-name='Heading 3'] => h4:fresh",
      ],
      convertImage: mammoth.images.imgElement(async (image) => {
        imageCount += 1;
        const data = await image.readAsBuffer();
        let name = `gambar-${imageCount}`;
        const size = {};
        if (sharp) {
          name += ".webp";
          const info = await sharp(data)
            .resize({ width: 1600, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toFile(path.join(imageDir, name));
          // Ukuran gambar ditulis di HTML agar tata letak tidak bergeser saat gambar dimuat.
          Object.assign(size, { width: String(info.width), height: String(info.height) });
        } else {
          name += `.${(image.contentType || "image/png").split("/")[1] || "png"}`;
          await fs.writeFile(path.join(imageDir, name), data);
        }
        return { src: `/generated/articles/${slug}/${name}`, alt: image.altText || `Gambar ${imageCount}`, ...size };
      }),
    },
  );

  const html = result.value
    // Tautan dari alat bantu menulis/sitasi (mis. jenni.ai) dilepas; teks sitasinya tetap.
    .replace(/<a [^>]*href="https?:\/\/(?:[\w-]+\.)*(?:jenni\.ai)[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, "$1")
    .replace(/<img /g, '<img loading="lazy" decoding="async" ')
    .replace(/<p>(<img [^>]+>)<\/p>/g, "<figure>$1</figure>");
  // Waktu baca dihitung tanpa daftar pustaka.
  const referencesAt = html.search(/<h2>(Daftar Pustaka|Daftar Referensi|Referensi|Bibliografi)<\/h2>/i);
  const bodyHtml = referencesAt >= 0 ? html.slice(0, referencesAt) : html;
  const words = htmlToText(bodyHtml).split(" ").filter(Boolean).length;

  let ogImage;
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const exists = await fs.access(path.join(ROOT, "public", "og", "articles", `${slug}.${ext}`)).then(() => true, () => false);
    if (exists) { ogImage = `/og/articles/${slug}.${ext}`; break; }
  }

  const modified = /<dcterms:modified[^>]*>([^<]+)</.exec(coreXml || "")?.[1];
  return {
    slug,
    source: path.relative(ROOT, file),
    title: meta.title || path.basename(file, ".docx"),
    author: meta.author,
    authorRole: meta.authorRole,
    // category/date/excerpt hanya terisi bila ditulis di dokumen (Kategori:/Tanggal:/Ringkasan:).
    category: meta.kategori,
    date: meta.tanggal,
    excerpt: meta.ringkasan,
    fallbackDate: modified ? formatDate(new Date(modified)) : undefined,
    fallbackExcerpt: shorten(firstParagraphText(html)),
    ogImage,
    words,
    html,
    warnings: result.messages.filter((m) => m.type !== "warning" || !/Unrecognised paragraph style/.test(m.message)).map((m) => m.message),
  };
}

async function main() {
  await fs.rm(OUT_IMAGES, { recursive: true, force: true });
  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });

  let files = [];
  try {
    files = (await fs.readdir(SOURCE_DIR))
      .filter((f) => f.toLowerCase().endsWith(".docx") && !f.startsWith("~$"))
      .map((f) => path.join(SOURCE_DIR, f));
  } catch {
    // Folder belum ada: tidak ada artikel Word.
  }

  const sharp = await loadSharp();
  const articles = [];
  for (const file of files.sort()) {
    try {
      const article = await convert(file, sharp);
      articles.push(article);
      console.log(`[artikel] ${article.source} → /articles/${article.slug} (${article.words} kata)`);
      for (const w of article.warnings) console.warn(`[artikel]   peringatan: ${w}`);
    } catch (error) {
      // Gagal pada satu file tidak boleh menghentikan seluruh website.
      console.error(`[artikel] GAGAL mengonversi ${path.relative(ROOT, file)}: ${error.message}`);
    }
  }

  await fs.writeFile(OUT_JSON, `${JSON.stringify(articles.map(({ warnings, ...a }) => a), null, 2)}\n`);
  console.log(`[artikel] ${articles.length} artikel Word diproses.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
