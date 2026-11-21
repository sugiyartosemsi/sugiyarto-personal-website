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
    ];
  },
};

export default nextConfig;
