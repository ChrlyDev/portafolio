"use client";
import { useEffect, useState } from "react";
import { personal } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main");
    const nav = document.querySelector("nav");

    let focusTimer: number | undefined;
    let focusActive = false;
    let focusLocked = false;
    let spotlightUpdater: (() => void) | null = null;

    const mainChildren = () => Array.from(main?.children ?? []);

    const clearFocus = () => {
      if (!focusActive) return;

      focusActive = false;
      focusLocked = false;

      if (spotlightUpdater) {
        window.removeEventListener("scroll", spotlightUpdater);
        spotlightUpdater = null;
      }

      main?.removeAttribute("data-nav-focus");
      mainChildren().forEach((element) => {
        if (element === nav) return;

        element.classList.remove("nav-focus-blur", "nav-focus-target");
        element.removeAttribute("inert");
      });
    };

    const applyFocus = (targetId: string) => {
      const target = document.getElementById(targetId);

      if (!main || !target) return;

      if (spotlightUpdater) {
        window.removeEventListener("scroll", spotlightUpdater);
      }

      focusActive = true;
      focusLocked = true;
      main.setAttribute("data-nav-focus", targetId);

      const updateSpotlight = () => {
        const rect = target.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const centerYPercent = (centerY / window.innerHeight) * 100;
        main?.style.setProperty("--spotlight-y", `${centerYPercent}%`);
      };

      spotlightUpdater = updateSpotlight;
      updateSpotlight();
      window.addEventListener("scroll", updateSpotlight);

      mainChildren().forEach((element) => {
        if (element === nav) return;

        const shouldBlur = element !== target;

        element.classList.toggle("nav-focus-blur", shouldBlur);
        element.classList.toggle("nav-focus-target", !shouldBlur);

        // Blurred sections must be inert so keyboard/AT users can't reach
        // focusable children that are visually obscured.
        if (shouldBlur) {
          element.setAttribute("inert", "");
        } else {
          element.removeAttribute("inert");
        }
      });

      window.clearTimeout(focusTimer);
      focusTimer = window.setTimeout(() => {
        focusLocked = false;
        if (spotlightUpdater === updateSpotlight) {
          window.removeEventListener("scroll", updateSpotlight);
          spotlightUpdater = null;
        }
      }, 1100);
    };

    const onScroll = () => setScrolled(window.scrollY > 40);

    const syncFocusFromHash = () => {
      const hash = window.location.hash.slice(1);

      if (!hash) {
        clearFocus();
        return;
      }

      const targetId = decodeURIComponent(hash);

      if (!document.getElementById(targetId)) {
        clearFocus();
        return;
      }

      window.requestAnimationFrame(() => {
        applyFocus(targetId);
      });
    };

    const onFocusClearIntent = () => {
      if (focusActive && !focusLocked) {
        clearFocus();
      }
    };

    const onNavClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a[href^='#']");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href) return;

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
      applyFocus(targetId);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("scroll", onFocusClearIntent);
    window.addEventListener("wheel", onFocusClearIntent, { passive: true });
    window.addEventListener("touchstart", onFocusClearIntent, { passive: true });
    window.addEventListener("keydown", onFocusClearIntent);
    window.addEventListener("hashchange", syncFocusFromHash);
    nav?.addEventListener("click", onNavClick);
    main?.addEventListener("click", onNavClick);
    onScroll();
    syncFocusFromHash();

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onFocusClearIntent);
      window.removeEventListener("wheel", onFocusClearIntent);
      window.removeEventListener("touchstart", onFocusClearIntent);
      window.removeEventListener("keydown", onFocusClearIntent);
      window.removeEventListener("hashchange", syncFocusFromHash);
      nav?.removeEventListener("click", onNavClick);
      main?.removeEventListener("click", onNavClick);
      clearFocus();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-12 py-5 transition-all duration-300 bg-black/90 backdrop-blur-md ${scrolled ? "border-b border-gray-600" : ""
        }`}
    >
      <span className="text-[15px] font-medium tracking-tight text-white justify-self-start">
        {personal.name}.
      </span>

      <div className="flex gap-8 justify-self-center">
        {["Sobre mí", "Proyectos", "Habilidades"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-").replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u")}`}
            className="text-[13px] text-gray-200 hover:text-white transition-colors text-center w-20"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="justify-self-end">
        <a
          href="#contacto"
          className="text-[13px] font-medium bg-white text-black px-[18px] py-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          Contactar
        </a>
      </div>
    </nav>
  );
}

