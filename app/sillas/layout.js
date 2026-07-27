import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Sillas y sillones",
  description:
    "Sillas y sillones WONLY para comedor, trabajo y espacios de interior.",
  path: "/sillas",
  image: "/images/sillas-header.webp",
});

export default function Layout({ children }) {
  return children;
}
