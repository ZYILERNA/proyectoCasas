import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Dormitorios",
  description:
    "Colección WONLY de camas, bases y mobiliario de dormitorio con diseño contemporáneo.",
  path: "/dormitorios",
  image: "/images/dormitorios-header.webp",
});

export default function Layout({ children }) {
  return children;
}
