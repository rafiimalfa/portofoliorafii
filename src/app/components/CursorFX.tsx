"use client";
import React, { useEffect, useRef } from "react";

/** Global cursor: spotlight + contextual bubble */
export default function CursorFX(): React.JSX.Element {
  const spotRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  // helpers
  const moveSpot = (x: number, y: number) => {
    const el = spotRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`; // 24px dot
  };

  const moveBubble = (x: number, y: number, scale = 1) => {
    const el = bubbleRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // decide if we are on a bubble host
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      const host = el?.closest<HTMLElement>('[data-cursor="bubble"]');

      if (host) {
        // label per target
        const label = host.getAttribute("data-cursor-label") || "It's Me!";
        if (bubbleRef.current) {
          bubbleRef.current.textContent = label;
          bubbleRef.current.style.opacity = "1";
        }
        if (spotRef.current) spotRef.current.style.opacity = "0";

        moveBubble(x, y, 1);   // grow
      } else {
        // no host under cursor → show spot, hide bubble
        if (bubbleRef.current) {
          bubbleRef.current.style.opacity = "0";
          moveBubble(x, y, 0.82); // shrink a bit
        }
        if (spotRef.current) spotRef.current.style.opacity = "1";

        moveSpot(x, y);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* Spotlight (mix-blend makes it invert against bg) */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="
          pointer-events-none fixed z-[9999]
          h-6 w-6 rounded-full bg-white mix-blend-difference
          transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)]
          will-change-[transform,opacity]
          max-md:hidden
        "
        style={{ left: 0, top: 0, opacity: 1, transform: "translate3d(-100px,-100px,0)" }}
      />

      {/* Bubble (used when hovering bubble-hosts) */}
      <div
        ref={bubbleRef}
        aria-hidden="true"
        className="
          pointer-events-none fixed z-[10000]
          -translate-x-1/2 -translate-y-1/2
          flex items-center justify-center
          h-[60px] w-[60px] rounded-full
          bg-white/85 text-black font-semibold shadow-md
          transition-[transform,opacity] duration-220 ease-[cubic-bezier(0.22,0.61,0.36,1)]
          will-change-[transform,opacity]
          max-md:hidden
        "
        style={{
          left: 0,
          top: 0,
          opacity: 0,
          transform: "translate3d(-100px,-100px,0) scale(0.82)",
          fontFamily: 'Montserrat, var(--font-montserrat, sans-serif)',
          fontSize: 12,
        }}
      >
        {"It's Me!"}
      </div>
    </>
  );
}