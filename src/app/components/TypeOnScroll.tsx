"use client";
import React from "react";

type Props = {
  text: string;
  speed?: number;      // ms per karakter
  delay?: number;      // jeda sebelum mulai
  className?: string;  // kelas untuk teks
  cursor?: boolean;    // tampilkan kursor
};

export default function TypeOnScroll({
  text,
  speed = 18,
  delay = 0,
  className = "",
  cursor = true,
}: Props) {
  const mountRef = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(false);
  const [out, setOut] = React.useState("");

  // Mulai ketika masuk viewport
  React.useEffect(() => {
    const node = mountRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !shown) setShown(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [shown]);

  // Ketik progresif
  React.useEffect(() => {
    if (!shown) return;
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, speed);
    }, delay);
    return () => clearTimeout(t);
  }, [shown, text, speed, delay]);

  return (
    <div ref={mountRef} className="relative">
      {/* Placeholder TAK TERLIHAT untuk mengunci ukuran & mencegah layout shift */}
      <p
        aria-hidden="true"
        className={`${className} pointer-events-none select-none`}
        style={{ visibility: "hidden", whiteSpace: "pre-wrap" }}
      >
        {text}
      </p>

      {/* Teks yang diketik di-overlay absolute di atas placeholder */}
      <p
        className={`${className} absolute inset-0`}
        style={{ whiteSpace: "pre-wrap" }}
      >
        {out}
        {cursor && (
          <span
            className="ml-[2px] inline-block h-[1em] align-[0.1em]"
            style={{
              width: 1,
              background: "currentColor", // ikuti warna teks
              animation: "blink 1s steps(1) infinite",
            }}
          />
        )}
      </p>

      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}