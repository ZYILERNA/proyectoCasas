'use client';

export default function Error({ error }) {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="bg-zinc-900 border border-red-800 rounded-2xl p-6 max-w-lg w-full">
        <h1 className="text-red-400 font-bold text-lg mb-2">Error al cargar el panel</h1>
        <pre className="text-zinc-400 text-sm whitespace-pre-wrap break-all">{error?.message}</pre>
      </div>
    </div>
  );
}
