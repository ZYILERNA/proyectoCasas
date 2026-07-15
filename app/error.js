'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
        <p className="text-gray-400 mb-6">{error.message || 'Ha ocurrido un error inesperado'}</p>
        <button
          onClick={() => reset()}
          className="bg-[#00C2FF] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
