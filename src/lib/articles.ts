import docxArticles from "@/generated/docx-articles.json";
import { withHeadingIds, type TocItem } from "@/lib/toc";

export type Article = ArticleInput & {
  readTime: string;
  /** Isi artikel dalam HTML, untuk artikel yang berasal dari file Word. */
  html?: string;
  /** Daftar isi dari subjudul artikel (hanya artikel dari file Word). */
  toc?: TocItem[];
  author?: string;
  authorRole?: string;
};

// Kecepatan baca rata-rata ±200 kata per menit; minimal 1 menit.
const WORDS_PER_MINUTE = 200;

function readTimeFromWords(words: number): string {
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} menit`;
}

function countWords(content: string[]): number {
  return content.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

const MONTHS = [
  "januari", "februari", "maret", "april", "mei", "juni",
  "juli", "agustus", "september", "oktober", "november", "desember",
];

/** "26 Agustus 2026" → nilai waktu, untuk mengurutkan artikel dari yang terbaru. */
export function dateValue(date: string): number {
  const [day, month, year] = date.trim().split(/\s+/);
  const m = MONTHS.indexOf((month || "").toLowerCase());
  if (m < 0) return 0;
  return new Date(Number(year), m, Number(day)).getTime();
}

type ArticleInput = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  ogImage: string;
  content: string[];
};

const articleInputs: ArticleInput[] = [
  {
    slug: "masa-depan-administrasi-perpajakan",
    title: "Electronic Invoice dan Masa Depan Administrasi Perpajakan",
    excerpt:
      "Electronic invoice dapat menjadi fondasi transformasi administrasi perpajakan dari sistem berbasis laporan menuju administrasi berbasis data transaksi.",
    category: "Administrasi Perpajakan",
    date: "26 Agustus 2026",
    ogImage: "/og/articles/masa-depan-administrasi-perpajakan-digital.jpg",
    content: [
      "Transformasi administrasi perpajakan tidak lagi cukup dilakukan dengan mendigitalisasi formulir dan pelaporan. Perubahan yang lebih fundamental adalah memindahkan titik awal administrasi pajak dari laporan yang disampaikan setelah transaksi terjadi menuju data transaksi yang terbentuk langsung di dalam proses bisnis wajib pajak.",
      "Dalam paradigma tersebut, electronic invoice menjadi salah satu fondasi utama. Invoice tidak hanya berfungsi sebagai dokumen transaksi, tetapi menjadi sumber data terstruktur yang dapat diintegrasikan dengan sistem administrasi pajak, digunakan untuk perhitungan kewajiban, membentuk prefilled return, serta memperkuat analisis risiko kepatuhan.",
      "Perubahan ini juga menggeser peran otoritas pajak. Fokus administrasi tidak lagi semata-mata pada pemeriksaan laporan setelah kejadian, tetapi pada pengelolaan risiko kepatuhan secara lebih dini melalui data yang lebih lengkap, terstruktur, dan tersedia mendekati waktu transaksi.",
      "Dengan arsitektur seperti ini, electronic invoice dapat menjadi penghubung antara proses bisnis wajib pajak, perhitungan pajak, pelaporan, pengawasan, dan analisis risiko. Nilai strategisnya bukan hanya pada digitalisasi dokumen, tetapi pada kemampuannya membentuk administrasi pajak yang lebih real-time, interoperabel, dan semakin mendekati konsep compliance by design.",
    ],
  },
  {
    slug: "tax-ratio-dan-kualitas-basis-pajak",
    title: "Tax Ratio Bukan Sekadar Tarif: Pentingnya Kualitas Basis Pajak",
    excerpt:
      "Menaikkan penerimaan tidak selalu berarti menaikkan tarif. Visibilitas ekonomi, administrasi, dan desain basis pajak sama pentingnya.",
    category: "Ekonomi & Fiskal",
    date: "20 Agustus 2026",
    // Gambar lama bertuliskan judul lama; versi Word kini berjudul "Tax Visibility Framework".
    ogImage: "/og-image.jpg",
    content: [
      "Tax ratio sering dibahas seolah-olah hanya ditentukan oleh tarif. Padahal kualitas basis pajak, tingkat formalitas ekonomi, kapasitas administrasi, dan struktur penerimaan memiliki pengaruh yang sangat besar.",
      "Kebijakan yang baik perlu meningkatkan visibilitas transaksi dan memperbaiki kepatuhan tanpa menciptakan biaya administrasi yang berlebihan.",
      "Dengan pendekatan tersebut, peningkatan penerimaan dapat berjalan bersamaan dengan perbaikan iklim usaha dan kualitas layanan publik."
    ]
  },
  {
    slug: "ews-ekonomi-dan-kualitas-pertumbuhan",
    title: "Early Warning System Ekonomi dan Kualitas Pertumbuhan",
    excerpt:
      "Pertumbuhan ekonomi perlu dibaca bersama daya beli, kualitas kredit, tekanan eksternal, dan transmisi ke rumah tangga.",
    category: "Ekonomi",
    date: "15 Agustus 2026",
    ogImage: "/og/articles/ews-ekonomi-dan-kualitas-pertumbuhan.jpg",
    content: [
      "Angka pertumbuhan agregat dapat terlihat kuat sementara sebagian rumah tangga atau sektor usaha mengalami tekanan. Karena itu, diagnosis ekonomi membutuhkan indikator yang menangkap kualitas transmisi pertumbuhan.",
      "Early Warning System dapat menggabungkan siklus ekonomi, tekanan rumah tangga, kondisi keuangan, faktor eksternal, dan indikator fiskal.",
      "Tujuannya bukan memprediksi krisis secara sempurna, tetapi mendeteksi perubahan rezim risiko sedini mungkin agar respons kebijakan lebih proporsional."
    ]
  }
];

type DocxArticle = {
  slug: string;
  title: string;
  author?: string;
  authorRole?: string;
  category?: string;
  date?: string;
  excerpt?: string;
  fallbackDate?: string;
  fallbackExcerpt?: string;
  ogImage?: string;
  words: number;
  html: string;
};

const DEFAULT_CATEGORY = "Artikel";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

function fromDocx(docx: DocxArticle, base?: ArticleInput): Article {
  const { html, toc } = withHeadingIds(docx.html);
  // Data yang ditulis di dokumen Word didahulukan; sisanya memakai data artikel lama (bila ada).
  return {
    slug: docx.slug,
    title: docx.title,
    category: docx.category ?? base?.category ?? DEFAULT_CATEGORY,
    date: docx.date ?? base?.date ?? docx.fallbackDate ?? "",
    excerpt: docx.excerpt ?? base?.excerpt ?? docx.fallbackExcerpt ?? "",
    ogImage: docx.ogImage ?? base?.ogImage ?? DEFAULT_OG_IMAGE,
    content: [],
    html,
    toc,
    author: docx.author,
    authorRole: docx.authorRole,
    readTime: readTimeFromWords(docx.words),
  };
}

const fromWord = new Map((docxArticles as DocxArticle[]).map((a) => [a.slug, a]));

export const articles: Article[] = [
  ...articleInputs.map((article) => {
    const docx = fromWord.get(article.slug);
    return docx
      ? fromDocx(docx, article)
      : { ...article, readTime: readTimeFromWords(countWords(article.content)) };
  }),
  ...(docxArticles as DocxArticle[])
    .filter((docx) => !articleInputs.some((a) => a.slug === docx.slug))
    .map((docx) => fromDocx(docx)),
].sort((a, b) => dateValue(b.date) - dateValue(a.date));
