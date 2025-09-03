"use client";
import React, { useEffect, useRef, useState } from "react";

const NEON = "#D6FF3F";

type SectionId = "home" | "about" | "projects" | "expertise";

export default function Navbar(): React.JSX.Element {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const navRef = useRef<HTMLDivElement | null>(null);
  const homeWrapRef = useRef<HTMLSpanElement | null>(null);
  const aboutWrapRef = useRef<HTMLSpanElement | null>(null);
  const projectsWrapRef = useRef<HTMLSpanElement | null>(null);
  const expertiseWrapRef = useRef<HTMLSpanElement | null>(null);

  const [pill, setPill] = useState<{ left: number; width: number; height: number }>({
    left: 0,
    width: 0,
    height: 0,
  });

  const computePill = (section: SectionId) => {
    const nav = navRef.current;
    if (!nav) return;

    const map: Record<SectionId, HTMLSpanElement | null> = {
      home: homeWrapRef.current,
      about: aboutWrapRef.current,
      projects: projectsWrapRef.current,
      expertise: expertiseWrapRef.current,
    };

    const target = map[section];
    if (!target) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = target.getBoundingClientRect();

    setPill({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      height: itemRect.height,
    });
  };

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id as SectionId);
        });
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      sections.forEach((s) => io.unobserve(s));
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    computePill(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const onResize = () => computePill(activeSection);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeSection]);

  return (
    <>
      {/* Logo di atas (tidak ikut scroll) */}
      <header className="absolute top-0 left-0 right-0 z-40">
        <div className="mx-auto flex items-center justify-center py-5">
          <a href="#home" className="select-none" aria-label="Home">
            <span className="text-2xl font-extrabold tracking-tight">Rafii</span>
            <span className="text-2xl font-medium tracking-tight">Malfa</span>
            <span
              className="ml-1 inline-block align-middle"
              style={{ width: 6, height: 6, background: NEON, borderRadius: 999 }}
            />
          </a>
        </div>
      </header>

      {/* Pill navbar bawah */}
      <div className="pointer-events-auto fixed left-1/2 -translate-x-1/2 bottom-10 z-[60]">
        <nav
          ref={navRef}
          className="relative flex items-center gap-4 rounded-full border border-gray-200 bg-white/90 backdrop-blur px-2 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
          {/* PILL AKTIF */}
          <span
            aria-hidden="true"
            className="absolute rounded-full bg-black transition-all duration-300 ease-out"
            style={{
              left: pill.left,
              width: pill.width,
              height: pill.height,
            }}
          />

          {/* Arrow (HOME) */}
          <span ref={homeWrapRef} className="relative z-10 px-1 py-1 rounded-full">
            <a
              href="#home"
              aria-label="Scroll to top"
              className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 6l-6 6m6-6l6 6m-6-6v12"
                  stroke={activeSection === "home" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </span>

          {/* About */}
          <span ref={aboutWrapRef} className="relative z-10 px-3 py-1 rounded-full">
            <a
              href="#about"
              className={`text-sm transition ${activeSection === "about" ? "text-white" : "text-gray-600 hover:text-black"}`}
            >
              About Me
            </a>
          </span>

          {/* Projects */}
          <span ref={projectsWrapRef} className="relative z-10 px-3 py-1 rounded-full">
            <a
              href="#projects"
              className={`text-sm transition ${activeSection === "projects" ? "text-white" : "text-gray-600 hover:text-black"}`}
            >
              My Projects
            </a>
          </span>

          {/* Expertise (ganti Contact) */}
          <span ref={expertiseWrapRef} className="relative z-10 px-3 py-1 rounded-full">
            <a
              href="#expertise"
              className={`text-sm transition ${activeSection === "expertise" ? "text-white" : "text-gray-600 hover:text-black"}`}
            >
              Expertise
            </a>
          </span>
        </nav>
      </div>
    </>
  );
}