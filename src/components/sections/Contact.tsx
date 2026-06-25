import { personal } from "@/lib/data";

export function Contact() {
  return (
    <section
      id="contacto"
      className="px-12 py-16 flex justify-between items-center border-b border-gray-600"
    >
      <div>
        <h2 className="text-[32px] font-light tracking-tightest text-white mb-2">
          ¿Trabajamos juntos?
        </h2>
        <p className="text-[14px] text-gray-200">
          Abierto a proyectos freelance y oportunidades laborales.
        </p>
      </div>

      <a
        href={`mailto:${personal.email}`}
        className="text-[14px] font-medium bg-white text-black px-8 py-4 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
      >
        Escríbeme →
      </a>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-12 py-5 flex justify-between items-center border-t border-gray-800">
      <span className="text-[11px] text-gray-200">
        © {new Date().getFullYear()} {personal.name}. {personal.location}.
      </span>
      <div className="flex gap-5">
        {[
          { label: "GitHub", href: personal.github },
          { label: "LinkedIn", href: personal.linkedin },
          { label: "Email", href: `mailto:${personal.email}` },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-gray-200 hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
