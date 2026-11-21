# Website Sugiyarto

Website pribadi di [www.sugiyarto.id](https://www.sugiyarto.id), dibangun dengan Next.js, TypeScript, dan Tailwind CSS, serta di-deploy otomatis oleh Vercel setiap ada perubahan di branch `main`.

## Menambah atau mengganti artikel

Unggah file Word (`.docx`) ke folder [`content/articles/`](content/articles/). Artikel terbit 1–2 menit kemudian. Panduan lengkapnya ada di [content/articles/README.md](content/articles/README.md).

Satu artikel lama (EWS) masih ditulis langsung di kode, di `src/lib/articles.ts`. Jika diunggah sebagai file Word dengan nama yang sama dengan alamatnya (`ews-ekonomi-dan-kualitas-pertumbuhan.docx`), versi Word yang dipakai.

## Halaman

| Halaman | Alamat | Isi diatur di |
|---|---|---|
| Beranda (termasuk form tanggapan) | `/` | `src/app/page.tsx` |
| Tentang | `/about` | `src/app/about/page.tsx` |
| Artikel | `/articles` | `content/articles/`, `src/lib/articles.ts` |
| Publikasi | `/publications` | `src/app/publications/page.tsx` |
| Proyek | `/projects` | `src/app/projects/page.tsx` |
| Kontak | `/contact` | `src/app/contact/page.tsx` |
| RSS | `/feed.xml` | otomatis dari daftar artikel |
| Sitemap | `/sitemap.xml` | otomatis dari daftar artikel |

Data umum situs (nama, tagline, email, alamat situs, ID Formspree untuk form tanggapan) ada di `src/lib/site.ts`.

## Menjalankan di komputer sendiri

Perlu Node.js. Di Windows PowerShell, gunakan `npm.cmd` jika `npm` diblokir.

```bash
npm ci
npm run dev
```

Buka `http://localhost:3000`. Untuk mengecek versi produksi:

```bash
npm run build
npm start
```

`npm run dev` dan `npm run build` otomatis mengonversi file Word di `content/articles/` terlebih dahulu (`scripts/build-articles.mjs`).

## Catatan

- `public/google4a821ebca31b9edc.html` adalah file verifikasi Google Search Console. Jangan dihapus.
- Gambar pratinjau media sosial ada di `public/og-image.jpg` dan `public/og/articles/`.
