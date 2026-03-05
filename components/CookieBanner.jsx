'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, X, Settings } from 'lucide-react';
import Link from 'next/link';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  // Opciones de configuración manual
  const [preferences, setPreferences] = useState({
    necessary: true, // Siempre true, no se puede desactivar
    analytics: false,
    marketing: false,
  });

  // Comprobar si el usuario ya ha tomado una decisión al cargar la página
  useEffect(() => {
    const consent = localStorage.getItem('wonly_cookie_consent');
    if (!consent) {
      // Si no hay registro, mostramos el banner después de 1 segundo para no ser agresivos
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('wonly_cookie_consent', 'all');
    setIsVisible(false);
    // Aquí podrías inicializar Google Analytics, Píxeles, etc.
  };

  const handleRejectAll = () => {
    localStorage.setItem('wonly_cookie_consent', 'necessary_only');
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('wonly_cookie_consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none flex justify-center"
      >
        <div className="bg-[#111]/95 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl shadow-black/50 max-w-4xl w-full pointer-events-auto relative overflow-hidden">
          
          {/* Brillo decorativo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2FF] opacity-[0.05] blur-[50px] rounded-full pointer-events-none" />

          {!showConfig ? (
            // VISTA 1: AVISO RÁPIDO
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="p-3 bg-[#1a1a1a] border border-white/5 rounded-xl hidden md:block shrink-0">
                <Cookie size={28} className="text-[#00C2FF]" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-white font-bold text-lg mb-2 flex items-center justify-center md:justify-start gap-2">
                  <ShieldCheck size={18} className="text-[#00C2FF] md:hidden" />
                  Privacidad y Cookies
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Utilizamos cookies propias y de terceros para garantizar el correcto funcionamiento del portal, analizar la navegación y mostrarte publicidad personalizada en base a un perfil elaborado a partir de tus hábitos de navegación.
                  Lee nuestra <Link href="/cookies" className="text-[#00C2FF] hover:underline">Política de Cookies</Link>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button 
                  onClick={() => setShowConfig(true)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  Configurar
                </button>
                <button 
                  onClick={handleRejectAll}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Rechazar
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-black bg-[#00C2FF] hover:bg-white transition-colors shadow-lg shadow-[#00C2FF]/20"
                >
                  Aceptar Todo
                </button>
              </div>
            </div>
          ) : (
            // VISTA 2: CONFIGURACIÓN DETALLADA
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col gap-6"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings size={20} className="text-[#00C2FF]" />
                  Configuración de Cookies
                </h3>
                <button onClick={() => setShowConfig(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Técnicas */}
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <h4 className="text-white font-medium mb-1">Estrictamente Necesarias</h4>
                    <p className="text-gray-500 text-xs">Requeridas para el funcionamiento básico del sitio.</p>
                  </div>
                  <div className="text-gray-400 text-xs font-bold px-2 py-1 bg-white/5 rounded">Siempre Activas</div>
                </div>

                {/* Analíticas */}
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="pr-4">
                    <h4 className="text-white font-medium mb-1">Rendimiento y Analítica</h4>
                    <p className="text-gray-500 text-xs">Ayudan a medir el tráfico y mejorar la experiencia.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00C2FF]"></div>
                  </label>
                </div>

                {/* Marketing */}
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="pr-4">
                    <h4 className="text-white font-medium mb-1">Marketing y Publicidad</h4>
                    <p className="text-gray-500 text-xs">Usadas para ofrecer anuncios relevantes.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00C2FF]"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button 
                  onClick={handleSavePreferences}
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-black bg-white hover:bg-[#00C2FF] transition-colors"
                >
                  Guardar Preferencias
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;