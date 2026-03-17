'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function StockTicker() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchStock() {
      try {
        const res = await fetch('/api/stock');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    }
    fetchStock();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchStock, 300000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  return (
    // CAMBIO CLAVE: Quitamos "hidden md:flex", ahora es "flex w-full justify-between"
    <div className="flex w-full justify-between items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Activity size={12} className="text-[#00C2FF] animate-pulse" />
        <span className="text-[10px] font-bold text-gray-400 tracking-tighter uppercase">SHA: 605268</span>
      </div>
      
      <div className="h-3 w-px bg-white/10"></div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={data.price}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="flex items-center gap-2"
        >
          <span className="text-xs font-mono font-bold text-white">¥{data.price}</span>
          <span className={`flex items-center gap-0.5 text-[10px] font-bold ${data.isUp ? 'text-green-400' : 'text-red-400'}`}>
            {data.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {data.change}%
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}