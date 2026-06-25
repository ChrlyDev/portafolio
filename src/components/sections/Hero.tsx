"use client";
import { useEffect, useRef, useState } from "react";
import { personal, stats } from "@/lib/data";
import { TechStrip, Stats } from "./Strips";

const CV_PATH = "/cv.pdf";
const PHOTO_PATH: string | null = "/photo.webp";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [photoLoadFailed, setPhotoLoadFailed] = useState(false);

  const showPhoto = Boolean(PHOTO_PATH) && !photoLoadFailed;

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

  useEffect(() => {
    if (!isCvOpen) {
      document.body.style.overflow = "";
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCvOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isCvOpen]);

  const handlePrintCv = () => {
    const printWindow = window.open(CV_PATH, "_blank", "noopener,noreferrer");

    if (!printWindow) {
      return;
    }

    printWindow.addEventListener("load", () => {
      printWindow.print();
    }, { once: true });
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
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
            <button
              type="button"
              onClick={() => setIsCvOpen(true)}
              className="text-[13px] text-gray-200 border border-gray-500 px-6 py-[11px] rounded-full hover:border-gray-400 hover:text-white transition-all"
            >
              Ver CV
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right flex flex-col gap-3 flex-1 pt-1 min-w-[240px] max-w-[300px]">
          {/* Photo */}
          <div
            className={`w-full h-[180px] rounded-xl border border-gray-600 overflow-hidden ${showPhoto
              ? "bg-black p-2"
              : "bg-gray-900 flex flex-col items-center justify-center gap-2"
              }`}
          >
            {showPhoto ? (
              <div className="h-full w-full overflow-hidden rounded-lg flex justify-center">
                <img
                  src={PHOTO_PATH ?? undefined}
                  alt={`${personal.name} ${personal.lastName}`}
                  className="w-fit h-[250px] object-cover object-top"
                  onError={() => setPhotoLoadFailed(true)}
                />
              </div>
            ) : (
              <>
                <div className="w-[60px] h-[60px] rounded-full bg-gray-700 border border-gray-500 flex items-center justify-center text-[20px] font-light text-gray-300">
                  {personal.name[0]}
                </div>
                <span className="text-4 text-gray-200">Tu foto aquí</span>
              </>
            )}
          </div>

          {/* Code snippet */}
          <CodeSnippet name={personal.name} />
        </div>
      </div>

      <TechStrip />
      <Stats />

      {isCvOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
          onClick={() => setIsCvOpen(false)}
        >
          <div
            className="flex h-[min(88vh,920px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-gray-700 bg-neutral-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-gray-800 px-5 py-4">
              <div>
                <p id="cv-modal-title" className="text-sm font-medium text-white">
                  Curriculum Vitae
                </p>
                <p className="text-xs text-gray-400">
                  Vista previa dentro de la pagina con comandos de descarga e impresion.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={CV_PATH}
                  download
                  className="rounded-full border border-gray-700 px-4 py-2 text-xs text-gray-200 transition-colors hover:border-gray-500 hover:text-white"
                >
                  Descargar
                </a>
                <button
                  type="button"
                  onClick={handlePrintCv}
                  className="rounded-full border border-gray-700 px-4 py-2 text-xs text-gray-200 transition-colors hover:border-gray-500 hover:text-white"
                >
                  Imprimir
                </button>
                <a
                  href={CV_PATH}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-gray-700 px-4 py-2 text-xs text-gray-200 transition-colors hover:border-gray-500 hover:text-white"
                >
                  Abrir en otra pestaña
                </a>
                <button
                  type="button"
                  onClick={() => setIsCvOpen(false)}
                  className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-gray-100"
                >
                  Cerrar
                </button>
              </div>
            </div>

            <div className="flex-1 bg-black p-3 sm:p-4">
              <iframe
                src={`${CV_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
                title="Vista previa del CV"
                className="h-full w-full rounded-xl border border-gray-800 bg-white"
              />
            </div>
          </div>
        </div>
      ) : null}

    </section>
  );
}

function CodeSnippet({ name }: { name: string }) {
  return (
    <div className="w-full rounded-xl bg-gray-950 border border-gray-600 p-5 font-mono text-[12px] leading-[1.8]">
      <div className="flex gap-[6px] mb-4">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-[10px] h-[10px] rounded-full bg-gray-600" />
        ))}
      </div>
      <span className="text-gray-500">{"// carlos.js"}</span><br /><br />
      <span className="text-gray-400">{"const "}</span>
      <span className="text-gray-200">{"carlos"}</span>
      <span className="text-gray-500">{" = {"}</span><br />
      <span className="text-gray-300">{"  role"}</span>
      <span className="text-gray-500">{": "}</span>
      <span className="text-gray-400">{"\"developer\""}</span>
      <span className="text-gray-500">{","}</span><br />
      <span className="text-gray-300">{"  stack"}</span>
      <span className="text-gray-500">{": ["}</span>
      <span className="text-gray-400">{"\"React\", \"Node\", \"Python\""}</span>
      <span className="text-gray-500">{"],"}</span><br />
      <span className="text-gray-300">{"  fuel"}</span>
      <span className="text-gray-500">{": "}</span>
      <span className="text-gray-400">{"\"coffee\""}</span>
      <span className="text-gray-500">{",  "}</span>
      <span className="text-gray-600">{"// siempre"}</span><br />
      <span className="text-gray-300">{"  debugging_buddy"}</span>
      <span className="text-gray-500">{": "}</span>
      <span className="text-gray-400">{"\"cat\""}</span>
      <span className="text-gray-500">{","}</span><br />
      <span className="text-gray-300">{"  offline"}</span>
      <span className="text-gray-500">{": "}</span>
      <span className="text-gray-400">{"\"gym\""}</span>
      <span className="text-gray-500">{","}</span><br />
      <span className="text-gray-300">{"  location"}</span>
      <span className="text-gray-500">{": "}</span>
      <span className="text-gray-400">{"\"Bogotá, CO\""}</span>
      <span className="text-gray-500">{","}</span><br />
      <span className="text-gray-300">{"  open_to_work"}</span>
      <span className="text-gray-500">{": "}</span>
      <span className="text-gray-200">{"true"}</span><br />
      <span className="text-gray-500">{"}"}</span><br /><br />
      <span className="text-gray-400">{"export default "}</span>
      <span className="text-gray-200">{"carlos"}</span>
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
