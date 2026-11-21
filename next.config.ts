import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Alamat lama artikel (sebelum berganti judul) → alamat baru. Permanen (308) agar Google ikut memindahkan.
      {
        source: "/articles/tax-ratio-dan-kualitas-basis-pajak",
        destination: "/articles/tax-visibility-framework",
        permanent: true,
      },
      {
        source: "/articles/masa-depan-administrasi-perpajakan",
        destination: "/articles/electronic-invoice-administrasi-perpajakan",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
