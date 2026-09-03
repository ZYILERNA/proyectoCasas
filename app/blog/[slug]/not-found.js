import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Página no encontrada</h2>
        <p className="text-gray-400 mb-8">La página que buscas no existe.</p>
        <Link
          href="/"
          className="inline-block bg-[#D4A868] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
