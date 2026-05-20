import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { getSiteUrl } from "@/lib/menuUrl";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  title: "QR Menu Business Kit",
  description:
    "Restoranlar için QR menü, çok dilli menü açıklamaları ve Google yorum cevap paketi.",
  metadataBase: new URL(getSiteUrl())
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
