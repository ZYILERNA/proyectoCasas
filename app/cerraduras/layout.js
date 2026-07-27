import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Cerraduras inteligentes",
  description:
    "Cerraduras WONLY con acceso biométrico, teclado y soluciones conectadas para vivienda y proyectos.",
  path: "/cerraduras",
});

export default function Layout({ children }) {
  return children;
}
