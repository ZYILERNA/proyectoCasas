'use client';

import { useState, useEffect, useCallback } from 'react';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (pw) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/visits?pw=${encodeURIComponent(pw)}`);
      if (res.status === 401) {
        setError('Contraseña incorrecta');
        setAuthed(false);
        return;
      }
      const json = await res.json();
      setData(json);
      setAuthed(true);
      sessionStorage.setItem('admin_pw', pw);
    } catch {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pw');
    if (saved) {
      setPassword(saved);
      fetchData(saved);
    }
  }, [fetchData]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetchData(password);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4"
        >
          <h1 className="text-white text-xl font-semibold text-center">Panel WONLY</h1>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-800 text-white rounded-lg px-4 py-2 outline-none border border-zinc-600 focus:border-zinc-400"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black rounded-lg py-2 font-semibold hover:bg-zinc-200 transition"
          >
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }

  const pageEntries = Object.entries(data.byPage || {}).sort((a, b) => b[1] - a[1]);
  const dayEntries = Object.entries(data.byDay || {}).sort((a, b) => a[0].localeCompare(b[0])).slice(-14);
  const maxDay = Math.max(...dayEntries.map(([, v]) => v), 1);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Panel de Visitas — WONLY</h1>
        <button
          onClick={() => { setAuthed(false); sessionStorage.removeItem('admin_pw'); }}
          className="text-zinc-400 hover:text-white text-sm"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total visitas" value={data.total} />
        <StatCard label="Páginas únicas" value={pageEntries.length} />
        <StatCard label="Móvil" value={data.byDevice?.['móvil'] || 0} />
        <StatCard label="Escritorio" value={data.byDevice?.['escritorio'] || 0} />
        <StatCard label="Hoy" value={data.byDay?.[new Date().toISOString().slice(0, 10)] || 0} />
        <StatCard
          label="Ayer"
          value={data.byDay?.[new Date(Date.now() - 86400000).toISOString().slice(0, 10)] || 0}
        />
      </div>

      {/* Gráfico de barras últimos 14 días */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">
          Últimos 14 días
        </h2>
        <div className="flex items-end gap-1 h-32">
          {dayEntries.map(([day, count]) => (
            <div key={day} className="flex flex-col items-center flex-1 gap-1">
              <span className="text-[10px] text-zinc-500">{count}</span>
              <div
                className="w-full rounded-sm bg-white"
                style={{ height: `${(count / maxDay) * 100}%`, minHeight: 2 }}
              />
              <span className="text-[9px] text-zinc-600 rotate-45 origin-left whitespace-nowrap">
                {day.slice(5)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Páginas más visitadas */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">
          Páginas más visitadas
        </h2>
        <div className="flex flex-col gap-2">
          {pageEntries.map(([page, count]) => {
            const pct = Math.round((count / data.total) * 100);
            return (
              <div key={page} className="flex items-center gap-3">
                <span className="text-sm text-zinc-300 w-40 truncate">{page}</span>
                <div className="flex-1 bg-zinc-800 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-sm text-zinc-400 w-10 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Últimas visitas */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">
          Últimas 50 visitas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-zinc-500 text-left border-b border-zinc-800">
                <th className="pb-2 pr-4">Página</th>
                <th className="pb-2 pr-4">Dispositivo</th>
                <th className="pb-2 pr-4">Referrer</th>
                <th className="pb-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {(data.recent || []).map((v) => (
                <tr key={v.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                  <td className="py-2 pr-4 text-white">{v.page}</td>
                  <td className="py-2 pr-4 text-zinc-400">{v.device}</td>
                  <td className="py-2 pr-4 text-zinc-500 max-w-[160px] truncate">
                    {v.referrer || '—'}
                  </td>
                  <td className="py-2 text-zinc-500 whitespace-nowrap">
                    {new Date(v.visited_at).toLocaleString('es-ES')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-1">
      <span className="text-zinc-500 text-xs uppercase tracking-wider">{label}</span>
      <span className="text-3xl font-bold text-white">{value}</span>
    </div>
  );
}
