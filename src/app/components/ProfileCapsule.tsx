"use client";
import React from "react";
import Image from "next/image";

interface ProfileCapsuleProps {
  src: string;
  alt?: string;
}

/**
 * Kapsul foto profil:
 * - Foto tetap (objectPosition "center 10%")
 * - Overlay stabilo + "HOVER ME!" geser kiri→kanan saat hover
 * - Bubble "It's Me!" kini dikelola oleh CursorFX via data attributes
 * - Cursor browser tetap (cursor-auto)
 */
export default function ProfileCapsule({ src, alt = "Profile" }: ProfileCapsuleProps) {
  return (
    <div
      data-cursor="bubble"
      data-cursor-label="It's Me!"
      className="
        group relative overflow-hidden rounded-[9999px] bg-white
        border border-gray-200 shadow-md
        w-[200px] h-[120px]
        md:w-[240px] md:h-[140px]
        cursor-auto outline-none
      "
      tabIndex={0}
    >
      {/* FOTO */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 240px, 200px"
        className="object-cover"
        style={{ objectPosition: "center 10%" }}
        priority
      />

      {/* OVERLAY stabilo */}
      <div
        className="
          absolute inset-0 z-10 flex items-center justify-center
          font-semibold text-black select-none
          transition-transform duration-700 ease-out
          group-hover:translate-x-full group-focus:translate-x-full
          pointer-events-none
        "
        style={{ background: "#D6FF3F" }}
        aria-hidden="true"
      >
        <span className="text-sm md:text-base leading-tight text-center">
          HOVER<br/>ME!
        </span>
      </div>

      {/* Bayangan kanan */}
      <div
        className="
          pointer-events-none absolute top-0 right-0 h-full w-6 z-10
          bg-gradient-to-l from-black/10 to-transparent
          opacity-0 group-hover:opacity-100 group-focus:opacity-100
          transition-opacity duration-500
        "
        aria-hidden="true"
      />
    </div>
  );
}