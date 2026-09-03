"use client";

import {
  Activity,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

const priceFormatter = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function StockTicker() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadQuote = async () => {
      try {
        const response = await fetch("/api/stock", {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) return;

        const data = await response.json();
        if (!cancelled && data.available) {
          setQuote(data);
        }
      } catch {
        // El identificador bursátil permanece visible si la cotización no carga.
      }
    };

    loadQuote();
    return () => {
      cancelled = true;
    };
  }, []);

  const isUp = quote?.trend === "up";
  const isDown = quote?.trend === "down";
  const TrendIcon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
  const signedChange =
    quote &&
    `${quote.changePercent > 0 ? "+" : ""}${priceFormatter.format(
      quote.changePercent,
    )}%`;

  return (
    <div
      className="flex min-w-[292px] items-center justify-between gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
      aria-label={
        quote
          ? `Wangli Security, SSE 605268: ${priceFormatter.format(
              quote.price,
            )} yuanes, variación ${signedChange}`
          : "Wangli Security, código 605268 en la Bolsa de Shanghái"
      }
      title="Cotización orientativa. Fuente: Bolsa de Shanghái."
    >
      <span className="flex items-center gap-2">
        <Activity
          size={12}
          className="text-[#D4A868] motion-safe:animate-pulse"
          aria-hidden="true"
        />
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">
          SSE: 605268
        </span>
      </span>

      <span className="h-3 w-px bg-white/10" aria-hidden="true" />

      <span
        className="flex min-w-[108px] items-center justify-end gap-2"
        aria-live="polite"
      >
        {quote ? (
          <>
            <span className="font-mono text-xs font-bold text-white">
              ¥{priceFormatter.format(quote.price)}
            </span>
            <span
              className={`flex items-center gap-0.5 text-[10px] font-bold ${
                isUp
                  ? "text-emerald-400"
                  : isDown
                    ? "text-rose-400"
                    : "text-zinc-400"
              }`}
            >
              <TrendIcon size={12} aria-hidden="true" />
              {signedChange}
            </span>
          </>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">
            Mercado SSE
          </span>
        )}
      </span>
    </div>
  );
}
