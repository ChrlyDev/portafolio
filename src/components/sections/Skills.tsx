"use client";
import { useGSAP } from "@/hooks/useGSAP";
import { skills } from "@/lib/data";

export default function Skills() {
  const sectionRef = useGSAP((gsap) => {
    gsap.fromTo(
      ".skill-block",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
        },
      }
    );

    // Animate each progress bar from 0% to its real width.
    // Use fromTo so the end state is always explicitly set.
    (gsap.utils.toArray(".skill-bar-fill") as HTMLElement[]).forEach((bar) => {
      const pct = (bar.dataset.percent ?? "0") + "%";
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: pct,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
          },
        }
      );
    });
  });

  return (
    <section ref={sectionRef} id="habilidades" className="px-12 py-16 border-b border-gray-600">
      <div className="flex justify-between items-baseline mb-10">
        <span className="text-[11px] text-gray-400 uppercase tracking-[1px]">
          Habilidades
        </span>
      </div>

      <div className="skills-grid grid grid-cols-4 gap-[1px] bg-gray-700 rounded-xl overflow-hidden border border-gray-600">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-block bg-black p-6">
            <div className="text-[18px] text-gray-400 mb-3 font-mono">{skill.icon}</div>
            <div className="text-[13px] text-white mb-1">{skill.name}</div>
            <div className="text-[11px] text-gray-500 mb-3">{skill.level}</div>
            <div className="h-[2px] bg-gray-700 rounded-full">
              <div
                className="skill-bar-fill h-[2px] bg-white rounded-full"
                style={{ width: `${skill.percent}%` }}
                data-percent={skill.percent}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
