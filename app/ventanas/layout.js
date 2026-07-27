import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Ventanas panorámicas",
  description:
    "Ventanas de aluminio WONLY con perfiles minimalistas, aislamiento y grandes superficies acristaladas.",
  path: "/ventanas",
  image: "/images/windows-view.webp",
});

export default function Layout({ children }) {
  return children;
}
