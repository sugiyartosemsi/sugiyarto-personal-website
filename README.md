# Personal Website V1 — Sugiyarto

Website pribadi profesional berbasis Next.js + TypeScript + Tailwind CSS.

## Halaman

- Home
- About
- Articles
- Publications
- Projects
- Contact

## Cara menjalankan

Pastikan Node.js sudah terpasang.

```bash
npm install
npm run dev
```

Buka:

```text
http://localhost:3000
```

## Build production

```bash
npm run build
npm start
```

## Bagian yang perlu Anda ubah terlebih dahulu

Edit:

```text
src/lib/site.ts
```

Di file tersebut Anda dapat mengganti:
- nama
- tagline
- deskripsi
- email
- lokasi
- link LinkedIn/GitHub

Artikel contoh berada di:

```text
src/lib/articles.ts
```

## Deploy ke Vercel

1. Buat repository baru di GitHub.
2. Push folder ini ke GitHub.
3. Login ke Vercel.
4. Pilih **Add New → Project**.
5. Import repository GitHub.
6. Klik **Deploy**.
7. Setelah online, tambahkan domain pribadi melalui **Settings → Domains**.

## Pengembangan selanjutnya

Versi 2 yang disarankan:
- MDX untuk artikel
- search
- kategori artikel
- dark mode
- analytics
- sitemap
- RSS
- newsletter
