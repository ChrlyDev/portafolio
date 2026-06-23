"use client";
import { useGSAP } from "@/hooks/useGSAP";
import { projects } from "@/lib/data";

export default function Projects() {
  const sectionRef = useGSAP((gsap) => {
    // fromTo explicitly defines both start and end states.
    // gsap.from({ opacity: 0 }) stamps opacity:0 immediately and relies on
    // ScrollTrigger to recover it — if ST fires late or misses, elements
    // stay invisible. fromTo is always safe regardless of scroll position.
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 85%",
        },
      }
    );
  });

  return (
    <section ref={sectionRef} id="proyectos" className="px-12 py-16 border-y border-gray-600">
      <div className="flex justify-between items-baseline mb-10">
        <span className="text-[11px] text-gray-200 uppercase tracking-[1px]">
          Proyectos seleccionados
        </span>
        <span className="text-[12px] text-gray-200 cursor-pointer hover:text-white transition-colors">
          Ver todos →
        </span>
      </div>

      <div className="projects-grid grid grid-cols-2 gap-[1px] bg-gray-600 rounded-xl overflow-hidden border border-gray-600">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-card bg-black p-8 flex flex-col gap-4 hover:bg-gray-900 transition-colors cursor-pointer group ${project.featured ? "col-span-2 bg-gray-950" : ""
              }`}
          >
            <span className="text-[10px] text-gray-200 uppercase tracking-[0.5px]">
              {project.tag}
            </span>

            <h3
              className={`font-light tracking-tight text-white leading-[1.3] ${project.featured ? "text-[22px]" : "text-[18px]"
                }`}
            >
              {project.title}
            </h3>

            <p className="text-[13px] text-gray-200 leading-[1.6] flex-1">
              {project.description}
            </p>

            <div className="flex gap-2 flex-wrap mt-auto">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] text-gray-200 border border-gray-600 rounded-full px-[10px] py-[3px]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="text-[16px] text-gray-600 group-hover:text-gray-300 transition-colors self-end">
              ↗
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
