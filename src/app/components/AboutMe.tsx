"use client";
import React, { useEffect, useRef, useState } from "react";
import TypeOnScroll from "../components/TypeOnScroll";

export default function AboutMe(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0); // 0..1

  // Scroll-linked progress (0 = jauh dari tengah viewport, 1 = pas di tengah)
  useEffect(() => {
    let ticking = false;

    const compute = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const centerY = rect.top + rect.height / 2;
      const delta = Math.abs(centerY - vh / 2);
      const p = 1 - Math.min(delta / (vh * 0.5), 1); // 1 saat center, 0 saat jauh
      setProgress(p);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Map progress -> transform (final posisi TIDAK berubah)
  const aboutTx = `${(-20 * (1 - progress)).toFixed(2)}vw`; // dari kiri -> 0
  const meTx = `${(20 * (1 - progress)).toFixed(2)}vw`;     // dari kanan -> 0
  const fade = progress; // opacity mengikuti progress

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[100svh] bg-black text-white flex items-center"
    >
      <div className="container mx-auto px-6 relative flex flex-col items-start justify-center">
        {/* ABOUT + ME */}
        <div className="relative w-full flex justify-center">
          <h2
            className="
              font-montserrat font-light uppercase tracking-[0.18em]
              leading-none text-[12vw] md:text-[180px] relative will-change-transform
            "
            style={{
              left: "12%",
              transform: `translate3d(${aboutTx},0,0)`,
              opacity: fade,
            }}
          >
            ABOUT
          </h2>

          <span
            className="
              font-montserrat font-light uppercase tracking-[0.18em]
              leading-none text-[14vw] md:text-[220px] absolute will-change-transform
            "
            style={{
              top: "90%",
              left: "70%",
              transform: `translate3d(${meTx},0,0)`,
              opacity: fade,
            }}
          >
            ME
          </span>
        </div>

        {/* Copywriting */}
        <div className="mt-12 max-w-2xl mx-auto md:mx-0 text-left">
          <TypeOnScroll
            className="
              font-montserrat text-base md:text-lg leading-7 md:leading-8 text-white/85
              ml-[8%] md:ml-[12%]
            "
            text={
              `I am a dedicated Quality Assurance (QA) professional committed to ensuring product excellence. ` +
              `With a background in graphic design, I bring a unique eye for detail and a comprehensive ` +
              `understanding of user-centric design to every project. My mission is to meticulously test, ` +
              `analyze, and report to guarantee a flawless user experience, ensuring our products are not ` +
              `only functional but also intuitive and visually perfect.`
            }
            speed={20}
            delay={80}
            cursor={true}
          />
        </div>
      </div>
    </section>
  );
}