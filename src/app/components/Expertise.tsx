"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

type XItem = {
  id: string;
  no: string;
  title: string;
  desc: string;
  img: string;
};

const ITEMS: XItem[] = [
  {
    id: "auto",
    no: "01",
    title: "Automation\nTesting",
    img: "/expertise/automation.jpg",
    desc:
      "I design and develop automated test scripts using Java and Selenium, focusing on efficient regression testing to ensure continuous software quality and speed up the release cycle.",
  },
  {
    id: "manual",
    no: "02",
    title: "Manual\nTesting",
    img: "/expertise/manual.jpg",
    desc:
      "I perform thorough and comprehensive manual testing on web and mobile applications, focusing on functionality, and usability to guarantee an exceptional user experience.",
  },
  {
    id: "perf",
    no: "03",
    title: "Performance\nTesting",
    img: "/expertise/performance.jpg",
    desc:
      "I create and execute performance test scenarios using JMeter, simulating thousands of concurrent users to evaluate system stability and responsiveness under high load conditions.",
  },
  {
    id: "uiux",
    no: "04",
    title: "UI/UX\nDesign",
    img: "/expertise/uiux.jpg",
    desc:
      "User Research, Wireframing, Prototyping, Interaction Design, Design Systems, Usability Testing.",
  },
];

export default function Expertise(): React.JSX.Element {
  const railRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // drag horizontal dengan mouse (LIST)
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      isDown.current = true;
      startX.current = e.clientX;
      scrollStart.current = el.scrollLeft;
      el.classList.add("cursor-grabbing", "select-none");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown.current || e.pointerType !== "mouse") return;
      const dx = e.clientX - startX.current;
      el.scrollLeft = scrollStart.current - dx;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      isDown.current = false;
      railRef.current?.classList.remove("cursor-grabbing", "select-none");
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <section id="expertise" className="relative bg-black text-white">
      <div className="container mx-auto px-6 py-24 md:py-32">
        {/* TITLE */}
        <h2 className="font-montserrat font-light uppercase tracking-[0.18em] text-[18vw] md:text-[168px] leading-none text-right">
          EXPERTISE
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 md:mt-8 max-w-3xl text-left font-montserrat text-[13px] md:text-[15px] leading-6 md:leading-7 text-white/75 md:ml-0">
          As a QA professional, I have in-depth expertise in ensuring comprehensive product quality.
          I specialize in Automation Testing for testing efficiency, performing meticulous
          Manual Testing, and mastering Performance Testing to guarantee system stability.
          Additionally, I contribute to UI/UX Design to help create an intuitive interface
          and a seamless user experience.
        </p>

        {/* LIST */}
        <div className="mt-12 md:mt-16 -mx-6 px-6">
          <div
            ref={railRef}
            className="overflow-x-auto flex gap-10 md:gap-12 scrollbar-none cursor-grab snap-x snap-mandatory md:snap-none [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            {ITEMS.map((x, idx) => (
              <article
                key={x.id}
                className="shrink-0 w-[85%] sm:w-[70%] md:w-[33.33%] snap-start"
              >
                {/* Hover image → bubble “Swipe!” + sembunyikan inner dot (sesuai My Projects) */}
                <div
                  className="relative w-full aspect-[4/3] overflow-hidden group cursor-pointer"
                  data-cursor="bubble"
                  data-cursor-label="Swipe!"
                  data-cursor-hide-dot="true"
                >
                  <Image
                    src={x.img}
                    alt={x.title.replace("\n", " ")}
                    fill
                    priority={idx < 3}
                    draggable={false}
                    className={`object-cover ${x.id === "uiux" ? "scale-115" : ""}`}
                  />
                </div>

                <h3 className="mt-6 font-montserrat font-medium text-[22px] md:text-[24px] leading-tight">
                  {x.title.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line}{" "}
                      {i === 1 && (
                        <sup className="align-super text-[10px] text-white/60 ml-1">
                          {x.no}
                        </sup>
                      )}
                    </span>
                  ))}
                </h3>
                <p className="mt-4 font-montserrat text-[13px] md:text-[14px] leading-6 text-white/70">
                  {x.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}