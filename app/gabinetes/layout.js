import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Sistemas de gabinetes",
  description:
    "Armarios, vestidores y soluciones de almacenaje WONLY configurables para proyectos de interior.",
  path: "/gabinetes",
  image: "/images/gabinetes-header.webp",
});

export default function Layout({ children }) {
  return children;
}
