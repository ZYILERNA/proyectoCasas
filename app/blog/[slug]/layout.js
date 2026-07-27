import { blogPosts } from "../blogData";
import { createPageMetadata } from "../../../lib/site-metadata";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = blogPosts.find((entry) => entry.slug === resolvedParams.slug);
  if (!post) {
    return {
      title: "Proyecto no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const image =
    post.cover || post.media?.find((item) => item.type === "image")?.src;
  const metadata = createPageMetadata({
    title: post.title,
    description: post.description || post.excerpt,
    path: `/blog/${post.slug}`,
    image,
  });
  metadata.openGraph.type = "article";
  return metadata;
}

export default function Layout({ children }) {
  return children;
}
