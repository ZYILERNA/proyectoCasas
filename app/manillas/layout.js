import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Manillas de diseño",
  description:
    "Manillas y herrajes WONLY para completar puertas de interior y proyectos arquitectónicos.",
  path: "/manillas",
});

export default function Layout({ children }) {
  return children;
}
