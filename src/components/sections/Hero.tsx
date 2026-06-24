"use client";
import { useEffect, useRef } from "react";
import { personal, stats } from "@/lib/data";
import { TechStrip, Stats } from "./Strips";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-location",
        { y: 16 }, { y: 0, duration: 0.6 })
        .fromTo(".hero-name",
          { y: 24 }, { y: 0, duration: 0.7 }, "-=0.3")
        .fromTo(".hero-role",
          { y: 24 }, { y: 0, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-desc",
          { y: 16 }, { y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-actions",
          { y: 12 }, { y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-right",
          { x: 24 }, { x: 0, duration: 0.8 }, "-=0.7");
    };

    init();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre-mi"
      className="border-b border-gray-600"
    >
      <div className="flex justify-between items-start px-12 pt-40 pb-20 gap-12">
        {/* LEFT */}
        <div className="max-w-[460px] lg:max-w-[570px]">
          <p className="hero-location text-[12px] text-gray-200 tracking-[0.3px] mb-6">
            {personal.location}
          </p>

          <h1 className="hero-name text-[44px] font-light tracking-tightest leading-[1.1] text-white mb-2">
            {personal.name}{" "}
            <span className="text-gray-300">{personal.lastName}</span>
          </h1>

          <h2 className="hero-role text-[44px] font-light tracking-tightest leading-[1.1] text-white mb-6">
            {personal.role}
          </h2>

          <p className="hero-desc text-[18px] text-gray-300 leading-[1.7] mb-9 pl-4 border-l border-gray-600 max-w-[460px] lg:max-w-[570px]">
            {personal.description}
          </p>

          <div className="hero-actions flex gap-3">
            <a
              href="#proyectos"
              className="text-[13px] font-medium bg-white text-black px-6 py-[11px] rounded-full hover:bg-gray-100 transition-colors"
            >
              Ver proyectos
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              className="text-[13px] text-gray-200 border border-gray-500 px-6 py-[11px] rounded-full hover:border-gray-400 hover:text-white transition-all"
            >
              Descargar CV
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right flex flex-col gap-3 flex-1 pt-1 min-w-[240px] max-w-[300px]">
          {/* Photo */}
          <div className="w-full h-[180px] rounded-xl bg-gray-900 border border-gray-600 flex flex-col items-center justify-center gap-2">
            <div className="w-[60px] h-[60px] rounded-full bg-gray-700 border border-gray-500 flex items-center justify-center text-[20px] font-light text-gray-300">
              {personal.name[0]}
            </div>
            <span className="text-[11px] text-gray-200">Tu foto aquí</span>
          </div>

          {/* Code snippet */}
          <CodeSnippet name={personal.name} />
        </div>
      </div>

      <TechStrip />
      <Stats />

    </section>
  );
}

function CodeSnippet({ name }: { name: string }) {
  return (
    <div className="w-full rounded-xl bg-gray-950 border border-gray-600 p-5 font-mono text-[12px] leading-[1.8]" aria-hidden="true">
      {/* Dots */}
      <div className="flex gap-[6px] mb-4">
        {["bg-gray-600", "bg-gray-600", "bg-gray-600"].map((c, i) => (
          <div key={i} className={`w-[10px] h-[10px] rounded-full ${c}`} />
        ))}
      </div>

      <span className="text-gray-500">{"// carlos.config.js"}</span>
      <br />
      <br />
      <span className="text-gray-400">{"const "}</span>
      <span className="text-gray-200">{"developer"}</span>
      <span className="text-gray-500">{" = {"}</span>
      <br />
      <span className="text-gray-500">{"  "}</span>
      <span className="text-gray-300">{"name"}</span>
      <span className="text-gray-500">{": "}</span>
      <span className="text-gray-400">{`"${name}"`}</span>
      <span className="text-gray-500">{","}</span>
      <br />
      <span className="text-gray-300">{"  stack"}</span>
      <span className="text-gray-500">{": ["}</span>
      <span className="text-gray-400">{"\"React\", \"Node\", \"Python\""}</span>
      <span className="text-gray-500">{"],"}</span>
      <br />
      <span className="text-gray-300">{"  focus"}</span>
      <span className="text-gray-500">{": ["}</span>
      <span className="text-gray-400">{"\"AI\", \"Data\", \"APIs\""}</span>
      <span className="text-gray-500">{"],"}</span>
      <br />
      <span className="text-gray-300">{"  location"}</span>
      <span className="text-gray-500">{": "}</span>
      <span className="text-gray-400">{"\"Bogotá, CO\""}</span>
      <span className="text-gray-500">{","}</span>
      <br />
      <span className="text-gray-300">{"  open"}</span>
      <span className="text-gray-500">{": "}</span>
      <span className="text-gray-200">{"true"}</span>
      <br />
      <span className="text-gray-500">{"}"}</span>
      <br />
      <br />
      <span className="text-gray-400">{"export default "}</span>
      <span className="text-gray-200">{"developer"}</span>
      <span className="text-gray-500">{";"}</span>
      <CursorBlink />
    </div>
  );
}

function CursorBlink() {
  return (
    <span
      className="inline-block w-[2px] h-[13px] bg-gray-500 align-middle ml-[2px]"
      style={{ animation: "blink 1.1s step-end infinite" }}
    >
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
