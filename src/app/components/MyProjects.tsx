// ...file lain tetap...
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  image: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Portal Sekolah Website",
    image: "/projects/portal-1.jpg",
    tags: ["Manual Testing", "Automation Testing", "Performance Testing"],
  },
  {
    id: "p2",
    title: "Portal Kampus Website",
    image: "/projects/portal-2.jpg",
    tags: ["Manual Testing"],
  },
   {
    id: "p3",
    title: "Portal Sekolah Android Student App",
    image: "/projects/portal-5.png",
    tags: ["Manual Testing"],
  },
     {
    id: "p4",
    title: "Portal Sekolah Assessment App iOS",
    image: "/projects/portal-6.png",
    tags: ["Manual Testing"],
  },
];

export default function MyProjects(): React.JSX.Element {
  return (
    <section id="projects" className="relative bg-white text-black">
      <div className="container mx-auto px-6 py-24 md:py-32">
        {/* Title (biarkan sesuai punyamu) */}
       <div className="leading-[0.95] mb-14 md:mb-20 text-left">
      <div className="font-montserrat font-light tracking-[0.18em] text-[22vw] md:text-[168px] uppercase">
        MY TESTING
      </div>
      <div className="font-montserrat font-light tracking-[0.18em] text-[22vw] md:text-[168px] uppercase">
        PROJECTS
      </div>
      </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {PROJECTS.map((p) => (
            <article key={p.id} className="select-none relative">
              {/* Klik gambar → halaman detail */}
              <Link
                href={`/projects/${p.id}`}
                className="
                  group relative block w-full aspect-[16/9] overflow-hidden
                  cursor-auto [perspective:1200px]
                "
                data-cursor="bubble"
                data-cursor-label="View"
              >
                <div
                className="
                  relative h-full w-full will-change-transform
                  transition-transform duration-500
                  ease-[cubic-bezier(0.22,0.61,0.36,1)]
                  group-hover:-translate-y-3 group-hover:scale-[1.01]
                  group-hover:shadow-[ -8px_12px_30px_-4px_rgba(0,0,0,0.25) ]
                  rounded-none
                "
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  priority
                  draggable={false}
                  className="object-cover select-none"
                />
              </div>
              </Link>

              {/* Title */}
              <h3 className="font-montserrat font-normal text-lg md:text-xl mt-4">
                {p.title}
              </h3>

              {/* Tags + Arrow button */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t, i) => (
                    <span
                      key={i}
                      className="font-montserrat text-xs px-3 py-[6px] rounded-full border border-black/25 text-black/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Button panah → halaman detail */}
                <Link
                  href={`/projects/${p.id}`}
                  aria-label={`Open ${p.title}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/25 bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M5 12h14M13 18l6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}