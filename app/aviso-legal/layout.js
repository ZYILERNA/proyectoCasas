import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Aviso legal",
  description: "Información legal y datos identificativos de WONLY España.",
  path: "/aviso-legal",
});

export default function Layout({ children }) {
  return children;
}
