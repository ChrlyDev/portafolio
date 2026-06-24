export const personal = {
  name: "Carlos",
  lastName: "Franco",
  role: "Developer & Systems Engineer",
  location: "Bogotá · Colombia",
  description:
    "Ingeniero de Sistemas que resuelve problemas reales con stack completo y ganas de seguir creciendo.",
  email: "carlos@email.com",
  github: "https://github.com/ChrlyDev",
  linkedin: "https://linkedin.com/in/carlos",
};

export const stats = [
  { number: "2+", label: "Años de experiencia" },
  { number: "8", label: "Proyectos completados" },
  { number: "1", label: "Cliente real activo" },
];

export const projects = [
  {
    id: "sur",
    tag: "Cliente real · Finanzas · Construcción",
    title: "SUR — Sistema de gestión financiera para obras",
    description:
      "Dashboard financiero completo para empresa constructora. KPIs en tiempo real, control de costos por obra, gestión de proveedores y reportes exportables a Excel.",
    stack: ["React", "Node.js", "MySQL", "Railway", "Tailwind"],
    featured: true,
    link: null,
    github: null,
  },
  {
    id: "career",
    tag: "IA · Educación",
    title: "Career Decision App",
    description:
      "App interactiva con IA que recomienda carreras universitarias colombianas según el perfil e intereses del usuario. Quiz adaptativo con streaming de resultados.",
    stack: ["Next.js", "TypeScript", "Claude API", "Vercel"],
    featured: false,
    link: null,
    github: null,
  },
  {
    id: "dashboard",
    tag: "Data · Análisis",
    title: "Dashboard de datos",
    description:
      "Visualización de datasets públicos con insights automáticos y filtros interactivos.",
    stack: ["Python", "React", "D3.js"],
    featured: false,
    link: null,
    github: null,
  },
];

export const skills = [
  { name: "React / Next.js", level: "Avanzado", percent: 88, icon: "⚛" },
  { name: "JavaScript / TS", level: "Avanzado", percent: 85, icon: "JS" },
  { name: "Node / Express", level: "Avanzado", percent: 82, icon: "⬡" },
  { name: "Python", level: "Intermedio", percent: 70, icon: "🐍" },
  { name: "MySQL / PostgreSQL", level: "Intermedio", percent: 72, icon: "⬡" },
  { name: "React Native", level: "Intermedio", percent: 58, icon: "📱" },
  { name: "AI / LLM APIs", level: "Intermedio", percent: 65, icon: "◈" },
  { name: "Data Analysis", level: "Intermedio", percent: 60, icon: "◎" },
];

export const techStrip = [
  "React", "TypeScript", "Python", "Node.js",
  "Express", "MySQL", "React Native", "Next.js", "Prisma",
];
