import { Landmark } from "lucide-react";

export default function StockTicker() {
  return (
    <div
      className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2"
      aria-label="Grupo Wangli Security, código 605268 en la Bolsa de Shanghái"
    >
      <Landmark size={13} className="text-cyan-300" aria-hidden="true" />
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">
        Grupo Wangli · SSE
      </span>
      <span className="font-mono text-xs font-semibold text-white">605268</span>
    </div>
  );
}
