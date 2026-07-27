import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Política de cookies",
  description:
    "Información sobre el uso y la configuración de cookies en WONLY España.",
  path: "/cookies",
});

export default function Layout({ children }) {
  return children;
}
