import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  metadataBase: new URL("https://www.sugiyarto.id"),

  title: {
    default: "Sugiyarto | Ekonomi, Perpajakan & Kebijakan Publik",
    template: "%s | Sugiyarto",
  },

  description:
    "Ruang untuk mengembangkan gagasan melalui analisis, dialog antarperspektif, dan pendekatan berbasis data mengenai ekonomi, perpajakan, kebijakan fiskal, dan kebijakan publik.",

  alternates: {
    canonical: "/",
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
