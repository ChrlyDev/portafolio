import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carlos — Developer & Systems Engineer",
  description: "Portfolio de Carlos. Full-Stack Developer en Bogotá, Colombia.",
  openGraph: {
    title: "Carlos — Developer & Systems Engineer",
    description: "Full-Stack Developer en Bogotá, Colombia.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
