import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Proyectos e instalaciones",
  description:
    "Casos reales de instalación de puertas de seguridad y cerraduras inteligentes WONLY.",
  path: "/blog",
});

export default function Layout({ children }) {
  return children;
}
