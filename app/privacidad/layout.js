import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Política de privacidad",
  description:
    "Información sobre el tratamiento de datos personales en WONLY España.",
  path: "/privacidad",
});

export default function Layout({ children }) {
  return children;
}
