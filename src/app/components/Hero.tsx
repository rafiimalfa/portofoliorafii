"use client";
import React from "react";
import EyesEllipticalFollowMouse from "./EyesEllipticalFollowMouse";
import ProfileCapsule from "./ProfileCapsule";
import Typewriter from "./Typewriter";

const NEON = "#D6FF3F";
const black = "000000";

export default function Hero(): React.JSX.Element {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center">
      {/* container ini relative => tombol absolute nempel ke sini */}
      <div className="container mx-auto px-6 relative pb-28 md:pb-0">
        <div className="max-w-5xl">
          {/* Headline */}
          <h1 className="text-[14vw] leading-[0.9] font-regular tracking-tight md:text-[150px] text-black">
            HI! I AM
          </h1>

          {/* Foto + Nama RAFII */}
          <div className="mt-4 flex items-center gap-4">
            {/* sembunyikan capsule di mobile */}
            <div className="hidden sm:block">
              <ProfileCapsule src="/profile.jpg" alt="Rafii Profile" />
            </div>
            <Typewriter
              text="RAFII"
              speed={200}
              pauseMs={5000}
              className="font-regular leading-none"
              style={{ fontSize: "min(23vw, 170px)", color: black }}
              showCursor={true}
            />
          </div>

          {/* Copywriting */}
          <p className="mt-6 text-lg md:text-2xl text-black/80">
            As a <span className="font-semibold">Quality Assurance</span> professional,
            <span className="block mt-1">
              I&apos;ll ensure your product is
              <span className="inline-flex items-center align-middle ml-1">
                <span className="flex items-center gap-[6px] overflow-visible">
                  <EyesEllipticalFollowMouse
                    className="relative top-[2px]"
                    width={68}
                    height={48}
                    rx={13}
                    ry={18}
                    pupilR={7}
                  />
                </span>
                <span className="font-extrabold text-black leading-normal">Perfect.</span>
              </span>
            </span>
          </p>
        </div>

        {/* Tombol scroll down — HANYA absolute di dalam Hero */}
        <button
          aria-label="Scroll down"
          onClick={scrollToAbout}
          type="button"
          className="
            group absolute z-30
            bottom-6 left-1/2 -translate-x-1/2
            md:bottom-2 md:right-0 md:left-auto md:translate-x-0
            h-14 w-14 md:h-20 md:w-20
            rounded-full border shadow-sm bg-white/90 hover:bg-white
            transition flex items-center justify-center
          "
        >
          <span className="block text-2xl md:text-4xl leading-none -translate-y-[1px] group-hover:translate-y-[1px] transition">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}