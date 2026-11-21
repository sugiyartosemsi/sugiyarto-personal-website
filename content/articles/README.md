# Artikel dari file Word

Setiap file **Word (.docx)** di folder ini otomatis menjadi halaman artikel
setiap kali website di-build ulang oleh Vercel (1–2 menit setelah upload).

## Cara menambah atau mengganti artikel

1. Buka folder ini di GitHub: `content/articles/`.
2. Klik **Add file → Upload files**, lalu seret file `.docx`.
3. Pilih salah satu:
   - **Commit directly to the main branch**: artikel langsung terbit.
   - **Create a new branch … and start a pull request**: Vercel membuat
     pratinjau dulu; artikel terbit setelah pull request di-merge.
4. Untuk memperbarui artikel, upload ulang file dengan **nama yang sama**.
5. Untuk menghapus artikel, hapus file-nya.

## Nama file = alamat halaman

| Nama file | Alamat artikel |
|---|---|
| `tax-ratio.docx` | `/articles/tax-ratio` |
| `masa-depan-administrasi-perpajakan.docx` | `/articles/masa-depan-administrasi-perpajakan` |

Gunakan huruf kecil dan tanda hubung, tanpa spasi. Jangan mengganti nama file
artikel yang sudah terbit, karena alamat lamanya akan hilang.

## Cara menulis di Word

| Bagian | Cara menulis | Hasil di website |
|---|---|---|
| Judul | Paragraf pertama, ditebalkan (atau style *Title*) | Judul artikel |
| Penulis | `Oleh Nama`, opsional diikuti baris `(Jabatan)` | Baris penulis di bawah judul |
| Info artikel (opsional) | Baris di awal: `Kategori: ...`, `Tanggal: 21 November 2026`, `Ringkasan: ...` | Label kategori, tanggal, dan ringkasan |
| Subjudul | Paragraf pendek yang seluruhnya **tebal**, atau style *Heading 1–3* | Subjudul |
| Penomoran | Penomoran otomatis Word (A., A.1, 1., …) | Tampil sama seperti di Word |
| Gambar | Disisipkan seperti biasa | Ikut tampil, otomatis dikompres |
| Tebal, miring, tautan, tabel | Seperti biasa | Ikut tampil |

Jika info artikel tidak ditulis:
- **Kategori** menjadi "Artikel".
- **Tanggal** memakai tanggal terakhir file disimpan.
- **Ringkasan** diambil dari paragraf pertama.

Untuk artikel lama yang diganti dengan file Word (nama file sama dengan
alamat artikel lama), kategori, tanggal, ringkasan, dan gambar pratinjau
lama tetap dipakai, kecuali ditulis ulang di dokumen.

## Yang tidak ikut terbawa

Jenis dan warna huruf (diseragamkan dengan desain website), text box,
kolom ganda, header/footer, dan persamaan matematika.

## Gambar pratinjau media sosial (opsional)

Simpan gambar 1200×630 px di `public/og/articles/<nama-file>.jpg` (atau .png).
Tanpa gambar ini, dipakai gambar umum situs.
