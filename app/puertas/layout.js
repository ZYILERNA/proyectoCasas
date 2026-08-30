import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Puertas de seguridad",
  description:
    "Catálogo WONLY de puertas inteligentes, acorazadas, cortafuego y soluciones especiales.",
  path: "/puertas",
  image: "/images/PUERTAS/AI/door-x60-pro.png",
});

export default function Layout({ children }) {
  return children;
}
