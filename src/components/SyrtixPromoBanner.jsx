import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, X, MessageCircle, ArrowRight, Zap } from 'lucide-react';

export const SyrtixPromoBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Opcional: auto-abrir después de que lleguen abajo o de unos segundos.
  // Por ahora lo dejaremos como un trigger manual en la esquina inferior.

  const handleWhatsAppLead = () => {
    const message = "Hola equipo de Syrtix! Me encantó el diseño de SushiHook y me gustaría una asesoría gratuita para mi propio proyecto/idea web.";
    const vendorPhone = "56988126316"; 
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Usar la página intermedia oficial de WhatsApp para evitar obligar a iniciar sesión web
    const url = `https://api.whatsapp.com/send?phone=${vendorPhone}&text=${encodeURIComponent(message)}`;
      
    window.open(url, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Gatillador Pequeño Lateral Frontal */}
      <div className="fixed bottom-24 left-6 z-[45] hidden md:block">
        <motion.button
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-[#0A0A0A]/90 backdrop-blur-md border border-zinc-800 hover:border-zinc-500 py-2.5 px-4 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
            <Code2 className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold leading-tight">By Syrtix</span>
            <span className="text-xs text-zinc-300 font-medium leading-tight group-hover:text-white transition-colors">¿Quieres una web así?</span>
          </div>
          <div className="absolute inset-0 -translate-x-[150%] animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
        </motion.button>
      </div>

      {/* Modal Principal Expandido */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0A0A0A] border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10"
            >
              {/* Decoración superior */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800"></div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-10 text-center">
                
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 mx-auto flex items-center justify-center mb-6 shadow-inner">
                  <Zap className="w-8 h-8 text-zinc-100" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                  Eleva tu negocio al <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">siguiente nivel.</span>
                </h3>
                
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-[90%] mx-auto">
                  Esta experiencia digital de alto rendimiento ha sido desarrollada e impulsada por <strong className="text-zinc-200 font-medium">Syrtix.com</strong> y OpenWebs. 
                  <br/><br/>
                  Si tienes una idea, un restaurante o quieres transformar tus ventas con una web premium y estrategias como esta, hablemos. 
                  <span className="block mt-2 text-zinc-300 font-medium italic">La asesoría inicial y el análisis de tu proyecto no tienen costo alguno.</span>
                </p>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleWhatsAppLead}
                    className="w-full py-4 flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold transition-all group"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Agendar Asesoría Gratuita
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900/50 text-sm font-medium transition-colors"
                  >
                    Seguir viendo el menú
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-center gap-4">
                  <img src="/images/logo-openwebs.png" alt="OpenWebs" className="h-4 object-contain opacity-50" />
                  <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
                  <img src="/images/logo_syrtix.png" alt="Syrtix" className="h-4 object-contain opacity-50" />
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};