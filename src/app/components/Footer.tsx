// components/Footer.tsx
"use client";

import Link from "next/link";

type FooterProps = {
  linkedinUrl?: string;
  watermark?: string; // teks besar samar di belakang
};

export default function Footer({
  linkedinUrl = "https://www.linkedin.com/in/rafiimalfa",
  watermark = "RAFII MALFA",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white text-black">
      {/* Watermark besar horizontal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-montserrat font-semibold tracking-tight opacity-[0.05] text-[18vw] whitespace-nowrap">
          {watermark}
        </span>
      </div>

      {/* Konten utama */}
      <div className="relative container mx-auto px-6 py-24 md:py-28 text-center">
        <p className="uppercase tracking-[0.18em] text-xs md:text-sm text-black/80">
          Interested in working together?
        </p>
        <h3
          className="mt-3 text-2xl md:text-3xl font-semibold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          LET&apos;S CONNECT!
        </h3>

        {/* Tombol LinkedIn */}
        <div className="mt-10">
          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 group"
          >
            <span className="uppercase tracking-[0.18em] text-sm md:text-base">
              LinkedIn
            </span>
            <span className="inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full border border-black/30 transition-transform group-hover:translate-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M5 12h14M13 18l6-6-6-6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Bar bawah, garis lebih dekat tepi */}
      <div className="relative border-t mt-16 px-6 py-6 text-[11px] md:text-xs text-black/70">
        <div className="container mx-auto flex items-center justify-between">
          <span>© {year} — Copyright</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}