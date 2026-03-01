import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import { Footer } from './Footer';
import { FloatingIngredients } from './FloatingIngredients';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-red-600/30 flex flex-col">
      <Navbar />
      
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Parallax de Fondo compartiendo la estÃ©tica de la web */}
        <FloatingIngredients />
        
        {/* Gran glow central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Texto de 404 Glitch Effect */}
            <h1 className="text-[12rem] md:text-[18rem] leading-none font-bold text-transparent font-sans tracking-tighter"
                style={{ WebkitTextStroke: '2px rgba(220, 38, 38, 0.1)' }}>
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-[12rem] md:text-[18rem] leading-none font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-800 opacity-90 blur-[2px]">
                404
              </h1>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-[12rem] md:text-[18rem] leading-none font-bold text-zinc-100 tracking-tighter mix-blend-overlay">
                404
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 mt-[-2rem] md:mt-[-4rem]"
          >
            <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-wide uppercase">
              Pieza <span className="font-bold text-red-600">Perdida</span>
            </h2>
            
            <p className="text-zinc-400 text-lg md:text-xl font-light max-w-lg mx-auto">
              La pÃ¡gina que buscas parece haber sido devorada por el ocÃ©ano o simplemente no existe en nuestro menÃº.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <button 
                onClick={() => window.history.back()}
                className="group flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-500 text-zinc-300 rounded-xl font-medium tracking-widest uppercase text-sm backdrop-blur-sm transition-all duration-300 min-w-[200px]"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Regresar
              </button>
              
              <a 
                href="/"
                className="group flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium tracking-widest uppercase text-sm transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] min-w-[200px]"
              >
                <Home className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                Volver al Inicio
              </a>
            </div>
          </motion.div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
};