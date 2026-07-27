import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Empresa",
  description:
    "Conoce la trayectoria, capacidad industrial, innovación y presencia internacional de WONLY.",
  path: "/empresa",
  image: "/images/COMPANY/factory-render.webp",
});

export default function Layout({ children }) {
  return children;
}
