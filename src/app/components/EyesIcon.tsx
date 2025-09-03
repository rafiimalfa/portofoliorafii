import React from "react";

interface EyesIconProps {
  className?: string;
  neon?: string;    // warna stabilo (default #D6FF3F)
  width?: number;   // override lebar (default 56)
  height?: number;  // override tinggi (default 28)
}

export default function EyesIcon({
  className = "",
  neon = "#D6FF3F",
  width = 56,
  height = 28,
}: EyesIconProps): React.JSX.Element {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 56 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="eyes"
      role="img"
    >
      <defs>
        {/* pola grid hitam */}
        <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M 4 0 L 0 0 0 4" stroke="black" strokeWidth="0.8" />
        </pattern>

        <clipPath id="leftEyeClip">
          <circle cx="14" cy="14" r="12" />
        </clipPath>

        <clipPath id="rightEyeClip">
          <circle cx="42" cy="14" r="12" />
        </clipPath>
      </defs>

      {/* mata kiri */}
      <g>
        <circle cx="14" cy="14" r="12" fill={neon} stroke="black" strokeWidth="2" />
        <g clipPath="url(#leftEyeClip)">
          <rect x="2" y="2" width="24" height="24" fill="url(#grid)" />
        </g>
        <circle cx="14" cy="14" r="5.2" fill="black" />
      </g>

      {/* mata kanan */}
      <g>
        <circle cx="42" cy="14" r="12" fill={neon} stroke="black" strokeWidth="2" />
        <g clipPath="url(#rightEyeClip)">
          <rect x="30" y="2" width="24" height="24" fill="url(#grid)" />
        </g>
        <circle cx="42" cy="14" r="5.2" fill="black" />
      </g>
    </svg>
  );
}