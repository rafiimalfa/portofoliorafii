"use client";
import React, { useEffect, useRef, useState, useId } from "react";

interface EyesProps {
  className?: string;
  neon?: string;      // warna bola mata (stabilo)
  width?: number;
  height?: number;
  rx?: number;        // radius horizontal ellipse
  ry?: number;        // radius vertical ellipse (lebih besar biar lonjong ke atas)
  pupilR?: number;    // radius pupil
  strokeWidth?: number;
}

export default function EyesEllipticalFollowMouse({
  className = "",
  neon = "#D6FF3F",
  width = 64,
  height = 36,
  rx = 11,
  ry = 14,            // lebih tinggi -> lonjong vertikal
  pupilR = 5,
  strokeWidth = 2,
}: EyesProps): React.JSX.Element {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const uid = useId(); // supaya id pattern/clipPath unik ketika dirender lebih dari 1x

  // Koordinat pusat kedua mata dalam viewBox
  const left = { cx: 18, cy: height / 2 };
  const right = { cx: 46, cy: height / 2 };

  // batas gerak pupil: sedikit di dalam ellipse
  const maxX = rx - pupilR - 2;
  const maxY = ry - pupilR - 2;

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = svgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;

      // scale supaya tetap di dalam elips: (x/a)^2 + (y/b)^2 <= 1
      let dx = mx, dy = my;
      const denom = Math.sqrt((dx * dx) / (maxX * maxX) + (dy * dy) / (maxY * maxY)) || 1;
      if (denom > 1) {
        dx /= denom;
        dy /= denom;
      }
      setPos({ x: Math.max(-maxX, Math.min(maxX, dx)), y: Math.max(-maxY, Math.min(maxY, dy)) });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [maxX, maxY]);

  const patId = `grid-${uid}`;
  const clipL = `clipL-${uid}`;
  const clipR = `clipR-${uid}`;

  return (
    <svg
      ref={svgRef}
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="eyes"
      role="img"
    >
      <defs>
        {/* grid hitam */}
        <pattern id={patId} width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M4 0H0V4" stroke="black" strokeWidth="0.8" />
        </pattern>
        <clipPath id={clipL}>
          <ellipse cx={left.cx} cy={left.cy} rx={rx} ry={ry} />
        </clipPath>
        <clipPath id={clipR}>
          <ellipse cx={right.cx} cy={right.cy} rx={rx} ry={ry} />
        </clipPath>
      </defs>

      {/* Mata kiri */}
      <g>
        <ellipse
          cx={left.cx}
          cy={left.cy}
          rx={rx}
          ry={ry}
          fill={neon}
          stroke="black"
          strokeWidth={strokeWidth}
        />
        <g clipPath={`url(#${clipL})`}>
          <rect
            x={left.cx - rx}
            y={left.cy - ry}
            width={rx * 2}
            height={ry * 2}
            fill={`url(#${patId})`}
          />
        </g>
        {/* pupil bergerak */}
        <circle cx={left.cx + pos.x} cy={left.cy + pos.y} r={pupilR} fill="black" />
      </g>

      {/* Mata kanan */}
      <g>
        <ellipse
          cx={right.cx}
          cy={right.cy}
          rx={rx}
          ry={ry}
          fill={neon}
          stroke="black"
          strokeWidth={strokeWidth}
        />
        <g clipPath={`url(#${clipR})`}>
          <rect
            x={right.cx - rx}
            y={right.cy - ry}
            width={rx * 2}
            height={ry * 2}
            fill={`url(#${patId})`}
          />
        </g>
        {/* pupil bergerak */}
        <circle cx={right.cx + pos.x} cy={right.cy + pos.y} r={pupilR} fill="black" />
      </g>
    </svg>
  );
}