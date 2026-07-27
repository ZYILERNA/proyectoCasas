import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Sofás",
  description:
    "Sofás modulares y contemporáneos WONLY pensados para confort, flexibilidad y diseño.",
  path: "/sofas",
  image: "/images/sofa-header.webp",
});

export default function Layout({ children }) {
  return children;
}
