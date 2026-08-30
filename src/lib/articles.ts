export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
};

export const articles: Article[] = [
  {
    slug: "masa-depan-administrasi-perpajakan",
    title:"Electronic Invoice dan Masa Depan Administrasi Perpajakan",
    excerpt:
      "Electronic invoice dapat menjadi fondasi transformasi administrasi perpajakan dari sistem berbasis",
    category: "Administasi Perpajakan",
    date: "26 Agustus 2026",
    readTime: "8 menit",
    content: [
      "Transformasi administrasi perpajakan tidak lagi cukup dilakukan dengan mendigitalisasi formulir dan pelaporan. Perubahan yang lebih fundamental adalah memindahkan titik awal administrasi pajak dari laporan yang disampaikan setelah transaksi terjadi menuju data transaksi yang yang terbentuk langsung di dalam proses bisnis wajib pajak",
      "Dalam paradigma tersebut, electronic invoice menjadi salah satu fondasi utama. Invoice tidak hanya berfungsi sebagai dokumen transaksi, tetapi menjadi sumber data terstruktur yang dapat diintegrasikan dengan sistem administrasi pajak, digunakan untuk perhitungan kewajiban, membentuk prefilled return, serta memperkuat analisis risiko kepatuhan.",
      "Perubahan ini juga menggeser peran otoritas pajak. Fokus administrasi tidak lagi semata-mata pada pemeriksaan laporan setelah kejadian, tetapi pada pengelolaan risiko kepatuhan secara lebih dini melalui data yang lebih lengkap, terstruktur, dan tersedia mendekati waktu transaksi.",
      "Dengan arsitektur seperti ini, electronic invoice dapat menjadi penghubung antara proses bisnis wajib pajak, perhitungan pajak, pelaporan, pengawasan, analisis risiko. Nilai strategisnya bukan hanya pada digitalisasi dokumen, tetapi pada kemampuannya membentuk administrasi pajak yang lebih real-time, interoperabel, dan semakin mendekati konsep compliance by design",
    ]
  },
  {
    slug: "tax-ratio-dan-kualitas-basis-pajak",
    title: "Tax Ratio Bukan Sekadar Tarif: Pentingnya Kualitas Basis Pajak",
    excerpt:
      "Menaikkan penerimaan tidak selalu berarti menaikkan tarif. Visibilitas ekonomi, administrasi, dan desain basis pajak sama pentingnya.",
    category: "Ekonomi & Fiskal",
    date: "20 Agustus 2026",
    readTime: "7 menit",
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
    readTime: "6 menit",
    content: [
      "Angka pertumbuhan agregat dapat terlihat kuat sementara sebagian rumah tangga atau sektor usaha mengalami tekanan. Karena itu, diagnosis ekonomi membutuhkan indikator yang menangkap kualitas transmisi pertumbuhan.",
      "Early Warning System dapat menggabungkan siklus ekonomi, tekanan rumah tangga, kondisi keuangan, faktor eksternal, dan indikator fiskal.",
      "Tujuannya bukan memprediksi krisis secara sempurna, tetapi mendeteksi perubahan rezim risiko sedini mungkin agar respons kebijakan lebih proporsional."
    ]
  }
];
