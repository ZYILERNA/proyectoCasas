import { MetadataRoute } from 'next';
import { blogPosts } from './blog/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.wonlyspain.com';

  const routes = [
    '',
    '/aviso-legal',
    '/blog',
    '/cerraduras',
    '/contacto',
    '/cookies',
    '/dormitorios',
    '/empresa',
    '/gabinetes',
    '/manillas',
    '/mesas',
    '/privacidad',
    '/proyectos',
    '/puertas',
    '/puertas/interior/de-madera/wl-j001',
    '/puertas-interior',
    '/sillas',
    '/sofas',
    '/ventanas',
    // Páginas individuales de cada caso del blog
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ];

  // Generamos el sitemap automáticamente recorriendo la lista
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
