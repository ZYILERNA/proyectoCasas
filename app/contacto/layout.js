import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Contacto y asesoramiento",
  description:
    "Contacta con WONLY España para recibir asesoramiento sobre puertas, cerraduras, ventanas y proyectos de interior.",
  path: "/contacto",
});

export default function Layout({ children }) {
  return children;
}
