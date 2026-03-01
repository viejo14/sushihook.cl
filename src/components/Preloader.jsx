import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Escondemos preloader después de unos segundos
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Dar tiempo a la animación de salida
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Círculo Zen (Enso) dibujándose */}
            <motion.svg 
              viewBox="0 0 100 100" 
              className="absolute inset-0 w-full h-full -rotate-90"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.9 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="opacity-80"
              />
            </motion.svg>
            
            {/* Texto Central */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white font-light text-2xl tracking-[0.3em] ml-2"
            >
              HOOK
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-20 text-zinc-600 text-xs tracking-widest uppercase"
          >
            Preparando experiencia...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
