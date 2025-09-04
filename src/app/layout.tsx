import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import React from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "RafiiMalfa.",
  description: "Portfolio of Rafii Malfa Razaqa",
  // Tidak ada lagi konfigurasi "icons" di sini
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased bg-white text-black`}
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}