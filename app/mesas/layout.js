import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Mesas de diseño",
  description:
    "Colección de mesas WONLY para comedor, sala y espacios contract.",
  path: "/mesas",
  image: "/images/mesas-header.webp",
});

export default function Layout({ children }) {
  return children;
}
