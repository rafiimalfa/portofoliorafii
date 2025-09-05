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
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center">
      {/* Jadikan container ini 'relative' agar tombol absolut merujuk ke tepi container */}
      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl">
          {/* Headline */}
          <h1 className="text-[14vw] leading-[0.9] font-regular tracking-tight md:text-[150px] text-black">
            HI! I AM
          </h1>

          {/* Foto + Nama RAFII */}
          <div className="mt-4 flex items-center gap-4">
            <ProfileCapsule src="/profile.jpg" alt="Rafii Profile" />
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
                {/* 👀 Mata diberi gap */}
                <span className="flex items-center gap-[6px]">
                  <EyesEllipticalFollowMouse
                    className="relative top-[2px]"
                    width={68}
                    height={48}
                    rx={13}
                    ry={18}
                    pupilR={7}
                  />
                </span>
                {/* 🔥 Hilangkan margin agar lebih rapat */}
                <span className="font-extrabold text-black">Perfect.</span>
              </span>
            </span>
          </p>
        </div>

        {/* Tombol scroll down — klik scroll ke section About */}
        <button
          aria-label="Scroll down"
          onClick={scrollToAbout}
          className="group absolute bottom-2 right-0 z-50 h-20 w-20 rounded-full border shadow-sm 
                     bg-white/90 hover:bg-white transition flex items-center justify-center"
          type="button"
        >
          <span className="block text-4xl leading-none -translate-y-[1px] group-hover:translate-y-[1px] transition">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}