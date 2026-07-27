import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Proyectos",
  description:
    "Proyectos de seguridad, arquitectura e instalaciones realizadas por WONLY.",
  path: "/proyectos",
});

export default function Layout({ children }) {
  return children;
}
