"use client";
import { useGSAP } from "@/hooks/useGSAP";
import { experience } from "@/lib/data";

const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

function formatExperienceDate(dateValue: string | null) {
    if (!dateValue) return "Actual";

    const [year, month] = dateValue.split("-");
    const monthIndex = Number(month) - 1;

    return `${monthNames[monthIndex] ?? ""} ${year}`.trim();
}

export default function Experience() {
    const sortedExperience = [...experience].sort((a, b) => {
        const aEnd = a.endDate;
        const bEnd = b.endDate;

        if (!aEnd && bEnd) return -1;
        if (aEnd && !bEnd) return 1;
        if (!aEnd || !bEnd) return 0;

        return bEnd.localeCompare(aEnd);
    });

    const sectionRef = useGSAP((gsap) => {
        gsap.fromTo(
            ".exp-item",
            {
                opacity: 0,
                y: 24,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".exp-list",
                    start: "top 80%",
                },
            }
        );
    });

    return (
        <section ref={sectionRef} id="experiencia" className="px-12 py-16 border-y border-gray-600">
            <div className="mb-10">
                <span className="text-4 text-gray-200 uppercase tracking-[1px]">
                    Experiencia laboral
                </span>
            </div>

            <div className="exp-list relative pl-10">
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 z-20 h-12 bg-gradient-to-b from-black via-black/70 to-transparent blur-[2px]"
                />
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-gradient-to-t from-black via-black/70 to-transparent blur-[2px]"
                />
                <span
                    aria-hidden="true"
                    className="absolute left-[11px] top-0 bottom-0 w-px bg-gray-600"
                />

                {sortedExperience.map((exp) => {
                    const isCurrent = !exp.endDate;

                    return (
                        <div
                            key={exp.id}
                            className="exp-item group relative grid grid-cols-[220px_1fr] gap-10 py-10 first:pt-2 transition-transform duration-500 ease-out hover:-translate-y-1"
                        >
                            <span
                                aria-hidden="true"
                                className={`absolute left-[-33px] top-[54px] z-10 rounded-full shadow-[0_0_0_3px_rgba(0,0,0,0.9)] transition-all duration-500 ${isCurrent
                                    ? "h-[10px] w-[10px] bg-gray-100 animate-pulse shadow-[0_0_0_3px_rgba(0,0,0,0.9),0_0_20px_rgba(250,204,21,0.7)] scale-150"
                                    : "bg-gray-400 group-hover:bg-gray-100 h-[10px] w-[10px]"
                                    }`}
                            />

                            {/* LEFT — rol */}
                            <div className="min-w-0">
                                <h3 className={`text-[36px] font-semibold tracking-tight leading-[1.05] transition-colors duration-300 ${isCurrent ? "text-gray-100 group-hover:text-white" : "text-gray-400 group-hover:text-gray-200"
                                    }`}>
                                    {exp.role}
                                </h3>
                            </div>

                            {/* RIGHT — empresa, periodo y stack */}
                            <div className="min-w-0 pt-1">
                                <div className={`text-[38px] font-semibold tracking-tight leading-[1.05] mb-2 transition-transform duration-500 ease-out group-hover:translate-x-1 ${isCurrent ? "text-gray-100 group-hover:text-white" : "text-gray-400 group-hover:text-gray-200"}`}>
                                    {exp.company}
                                </div>
                                <div className={`text-[28px] font-medium mb-5 leading-[1.2] transition-colors duration-300 ${isCurrent ? "text-gray-100 group-hover:text-white" : "text-gray-400 group-hover:text-gray-200"}`}>
                                    {formatExperienceDate(exp.startDate)} — {formatExperienceDate(exp.endDate)}
                                </div>

                                <p className={`text-[16px] leading-[1.6] mb-5 max-w-[760px] ${isCurrent ? "text-gray-200 group-hover:text-gray-100" : "text-gray-400 group-hover:text-gray-300"}`}>
                                    {exp.description}
                                </p>

                                <div className="flex gap-2 flex-wrap">
                                    {exp.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className={`text-[11px] border border-gray-600 rounded-full px-[11px] py-[4px] ${isCurrent ? "text-gray-300 group-hover:text-gray-200" : "text-gray-400 group-hover:text-gray-300"}`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}