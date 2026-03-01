import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FloatingIngredients = () => {
  const { scrollYProgress } = useScroll();
  
  // Mapeamos el progreso del scroll a un movimiento en PX (Parallax)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  // Solo se renderiza en fondos, de manera sutil para no molestar la lectura
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-30">
      
      {/* Grano de Arroz 1 */}
      <motion.div style={{ y: y1 }} className="absolute top-[30%] left-[10%] blur-[2px] rotate-45">
        <div className="w-8 h-3 bg-zinc-200 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
      </motion.div>

      {/* Grano de Arroz 2 */}
      <motion.div style={{ y: y3 }} className="absolute top-[70%] right-[15%] blur-[1px] -rotate-12">
        <div className="w-6 h-2 bg-zinc-300 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]"></div>
      </motion.div>

      {/* Trocito de Salmón (Cuadrado curvo abstracto) */}
      <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[5%] blur-[4px] rotate-12">
        <div className="w-16 h-12 bg-red-500/30 rounded-2xl border border-red-400/20"></div>
      </motion.div>

      {/* Hoja de Bamú abstracta */}
      <motion.div style={{ y: y4 }} className="absolute top-[60%] left-[5%] blur-[3px] -rotate-45">
        <div className="w-10 h-24 bg-green-500/10 rounded-full rounded-tr-none border border-green-400/20"></div>
      </motion.div>

    </div>
  );
};
