'use client';

import { useActionState } from 'react';
import { login } from './actions';

export default function LoginForm({ error }) {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <form
        action={login}
        className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-white text-xl font-semibold text-center">Panel WONLY</h1>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="bg-zinc-800 text-white rounded-lg px-4 py-2 outline-none border border-zinc-600 focus:border-zinc-400"
          required
        />
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="bg-white text-black rounded-lg py-2 font-semibold hover:bg-zinc-200 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
