import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Mesas de diseño",
  description:
    "Colección de mesas WONLY para comedor, salón y espacios profesionales.",
  path: "/mesas",
  image: "/images/mesas-header.webp",
});

export default function Layout({ children }) {
  return children;
}
