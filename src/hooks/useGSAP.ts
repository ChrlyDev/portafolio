"use client";
import { useEffect, useRef } from "react";

export function useGSAP(callback: (gsap: any, ScrollTrigger: any) => void, deps: any[] = []) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    let cancelled = false;

    const init = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      if (cancelled) return;

      requestAnimationFrame(() => {
        if (cancelled) return;
        ctx = gsap.context(() => callback(gsap, ScrollTrigger), ref);
        // Recalculate scroll positions after async init so triggers
        // fire immediately if the element is already in the viewport.
        ScrollTrigger.refresh();
      });
    };

    init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
