export function createPageMetadata({ title, description, path, image }) {
  const metadata = {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | WONLY España`,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      title: `${title} | WONLY España`,
      description,
    },
  };

  if (image) {
    metadata.openGraph.images = [{ url: image }];
    metadata.twitter.images = [image];
  }

  return metadata;
}
