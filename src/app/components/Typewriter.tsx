"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  speed?: number;     // ms per karakter
  pauseMs?: number;   // jeda setelah selesai sebelum mengulang
  className?: string;
  style?: React.CSSProperties;
  showCursor?: boolean;   // tampilkan caret garis lurus
  cursorWhilePause?: boolean; // caret tetap berkedip saat jeda (default: true)
};

export default function Typewriter({
  text,
  speed = 160,
  pauseMs = 5000,
  className = "",
  style,
  showCursor = true,
  cursorWhilePause = true,
}: Props): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const tick = (i: number) => {
      if (cancelled) return;
      setIndex(i);
      const typing = i < text.length;
      setIsTyping(typing);

      const delay = typing ? speed : pauseMs;
      timerRef.current = window.setTimeout(() => {
        if (cancelled) return;
        const next = typing ? i + 1 : 0;
        tick(next);
      }, delay);
    };

    tick(0);
    return () => {
      cancelled = true;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [text, speed, pauseMs]);

  const output = text.slice(0, Math.min(index, text.length));
  const showCaret = showCursor && (isTyping || cursorWhilePause);

  return (
    /* grid overlay: ghost menahan ukuran, layer di atas mengetik */
    <span
      className={`inline-grid align-baseline ${className}`}
      style={style}
      aria-label={text}
      aria-live="polite"
    >
      {/* Ghost text menahan lebar/tinggi agar tidak ada layout shift */}
      <span className="opacity-0 select-none pointer-events-none col-start-1 row-start-1" aria-hidden="true">
        {text}
      </span>

      {/* Layer yang terlihat */}
      <span className="col-start-1 row-start-1 pointer-events-none">
        {output}
        {showCaret && <span className="tw-caret" />}
      </span>
    </span>
  );
}