import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: "Sugiyarto | Ekonomi, Perpajakan & Kebijakan Publik",
    template: "%s | Sugiyarto",
  },

  description:
    "Ruang untuk mengembangkan gagasan melalui analisis, dialog antarperspektif, dan pendekatan berbasis data mengenai ekonomi, perpajakan, kebijakan fiskal, dan kebijakan publik.",

  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Artikel Sugiyarto" }] },
  },

  openGraph: {
    title: "Sugiyarto | Ekonomi, Perpajakan & Kebijakan Publik",
    description:
      "Gagasan dan analisis mengenai ekonomi, perpajakan, kebijakan fiskal, dan kebijakan publik.",
    url: site.url,
    siteName: "Sugiyarto",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        alt: "Sugiyarto - Ekonomi, Perpajakan dan Kebijakan Publik",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sugiyarto | Ekonomi, Perpajakan & Kebijakan Publik",
    description:
      "Gagasan dan analisis mengenai ekonomi, perpajakan, kebijakan fiskal, dan kebijakan publik.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
