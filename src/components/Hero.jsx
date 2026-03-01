import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ShoppingBag, Store, X } from 'lucide-react';

const OrderModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-8 shadow-2xl overflow-hidden"
        >
          {/* Accent line top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-amber-400" />
          
          <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300">
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <h3 className="text-2xl font-light text-zinc-100 tracking-wide mb-2">
              {type === 'reserva' && 'Reserva tu Experiencia'}
              {type === 'delivery' && 'Pide a Domicilio'}
              {type === 'pickup' && 'Retiro en Local'}
            </h3>
            
            {/* Indicador de Estado y Urgencia */}
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex items-center gap-2">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-emerald-500">Abierto ahora</span>
                <span className="text-xs text-zinc-500">• Hasta las 23:00 hrs</span>
              </div>
              
              {type === 'reserva' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-400 text-xs font-medium w-fit">
                  🔥 Solo 3 mesas disponibles para hoy
                </div>
              )}
            </div>
          </div>

          {type === 'delivery' ? (
            // Layout de Partners de Delivery
            <div className="space-y-4 pt-2">
              <p className="text-sm text-zinc-400 mb-4">Selecciona tu plataforma de delivery favorita. Te llevamos la experiencia HOOK directamente a tu puerta.</p>
              
              <a href="https://ubereats.com" target="_blank" rel="noreferrer" className="group flex items-center justify-between w-full bg-[#06C167]/10 hover:bg-[#06C167]/20 border border-[#06C167]/30 hover:border-[#06C167] p-4 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-inner">
                    <img src="/images/logo-ubereat.webp" alt="Uber Eats Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[#06C167] font-bold text-lg leading-none mb-1">Uber Eats</h4>
                    <span className="text-zinc-400 text-xs">Abre la app de Uber Eats</span>
                  </div>
                </div>
                <div className="text-[#06C167] group-hover:translate-x-1 transition-transform">→</div>
              </a>

              <a href="https://rappi.com" target="_blank" rel="noreferrer" className="group flex items-center justify-between w-full bg-[#FF441F]/10 hover:bg-[#FF441F]/20 border border-[#FF441F]/30 hover:border-[#FF441F] p-4 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-inner">
                    <img src="/images/logo-rappi.jpg" alt="Rappi Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[#FF441F] font-bold text-lg leading-none mb-1">Rappi</h4>
                    <span className="text-zinc-400 text-xs">Pídelo con Rappi Prime</span>
                  </div>
                </div>
                <div className="text-[#FF441F] group-hover:translate-x-1 transition-transform">→</div>
              </a>

              <a href="https://pedidosya.com" target="_blank" rel="noreferrer" className="group flex items-center justify-between w-full bg-[#EA044E]/10 hover:bg-[#EA044E]/20 border border-[#EA044E]/30 hover:border-[#EA044E] p-4 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-inner border border-zinc-200">
                    <img src="/images/logo-pedidosya.jpg" alt="PedidosYa Logo" className="w-full h-full object-cover scale-110" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[#EA044E] font-bold text-lg leading-none mb-1">PedidosYa</h4>
                    <span className="text-zinc-400 text-xs">Con tu cuenta de PedidosYa</span>
                  </div>
                </div>
                <div className="text-[#EA044E] group-hover:translate-x-1 transition-transform">→</div>
              </a>
            </div>
          ) : (
            // Formulario tradicional para Reserva y Pickup
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {type === 'reserva' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:border-red-600 transition-colors" />
                    <input type="time" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:border-red-600 transition-colors" />
                  </div>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:border-red-600 transition-colors appearance-none">
                    <option>2 Personas</option>
                    <option>4 Personas</option>
                    <option>6+ Personas</option>
                  </select>
                </>
              )}

              {type === 'pickup' && (
                <>
                  <p className="text-sm text-zinc-400 mb-2">Ingresa tus datos para registrar tu retiro en el local.</p>
                  <input type="text" placeholder="Nombre completo" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:border-red-600 transition-colors" />
                  <input type="tel" placeholder="Teléfono de contacto" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:border-red-600 transition-colors" />
                </>
              )}

              <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-medium tracking-widest uppercase transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                Confirmar
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const Hero = () => {
  const [modalType, setModalType] = useState(null);

  // Animación del elemento 3D flotante
  const floatingAnimation = {
    y: [-15, 15, -15],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1554502078-ef0df4caa181?q=80&w=2070&auto=format&fit=crop"
          alt="Dark Japanese Aesthetic"
          className="w-full h-full object-cover opacity-30 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-500 mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase">Nueva Colección Omakase</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-zinc-100 tracking-tighter leading-[1.1] mb-6">
              El Arte de lo <br/>
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-amber-500">Sublime</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-light tracking-wide mb-12 max-w-2xl lg:max-w-md">
              Ingredientes de clase mundial, técnica milenaria y un toque de innovación HOOK. Redefinimos la gastronomía japonesa.
            </p>
          </motion.div>

          {/* Sistema de Pedidos Triple & Delivery Logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-8 w-full"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={() => setModalType('reserva')}
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium tracking-widest uppercase text-sm transition-all duration-300 shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.5)]"
              >
                <Calendar className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                Reservar Mesa
              </button>

              <button
                onClick={() => setModalType('delivery')}
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400 text-zinc-100 rounded-xl font-medium tracking-widest uppercase text-sm backdrop-blur-sm transition-all duration-300"
              >
                <Store className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                Delivery / Retiro
              </button>
            </div>

            {/* Delivery Partners Display (3D Effects) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col items-center lg:items-start space-y-4 mt-4"
            >
              <p className="text-zinc-500 text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-red-600"></span>
                También en App de Delivery
                <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-red-600"></span>
              </p>
              
              <div className="flex gap-5 perspective-1000">
                {/* Uber Eats (Transformación 3D) */}
                <a href="https://ubereats.com" target="_blank" rel="noreferrer" title="Uber Eats" 
                   className="group relative block w-14 h-14 transform-gpu transition-all duration-500 hover:-translate-y-2 hover:rotate-3">
                  <div className="absolute inset-0 bg-[#06C167] rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 -bottom-2 bg-gradient-to-b from-transparent to-black/50 rounded-full blur-sm"></div>
                  <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-zinc-800/80 group-hover:border-[#06C167] bg-white shadow-[inset_0_-5px_10px_rgba(0,0,0,0.2)] transform-gpu transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                    <img src="/images/logo-ubereat.webp" alt="Uber Eats" className="w-[85%] h-[85%] object-contain drop-shadow-md" />
                  </div>
                </a>

                {/* Rappi (Transformación 3D) */}
                <a href="https://rappi.com" target="_blank" rel="noreferrer" title="Rappi" 
                   className="group relative block w-14 h-14 transform-gpu transition-all duration-500 hover:-translate-y-2 hover:-rotate-3" style={{ transitionDelay: '50ms' }}>
                  <div className="absolute inset-0 bg-[#FF441F] rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 -bottom-2 bg-gradient-to-b from-transparent to-black/50 rounded-full blur-sm"></div>
                  <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-zinc-800/80 group-hover:border-[#FF441F] bg-white shadow-[inset_0_-5px_10px_rgba(0,0,0,0.2)] transform-gpu transition-transform duration-500 group-hover:scale-110 flex items-center justify-center ">
                    <img src="/images/logo-rappi.jpg" alt="Rappi" className="w-[85%] h-[85%] object-contain drop-shadow-md" />
                  </div>
                </a>

                {/* PedidosYa (Transformación 3D) */}
                <a href="https://pedidosya.com" target="_blank" rel="noreferrer" title="PedidosYa" 
                   className="group relative block w-14 h-14 transform-gpu transition-all duration-500 hover:-translate-y-2 hover:rotate-3" style={{ transitionDelay: '100ms' }}>
                  <div className="absolute inset-0 bg-[#EA0029] rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 -bottom-2 bg-gradient-to-b from-transparent to-black/50 rounded-full blur-sm"></div>
                  <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-zinc-800/80 group-hover:border-[#EA0029] bg-white shadow-[inset_0_-5px_10px_rgba(0,0,0,0.2)] transform-gpu transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                    <img src="/images/logo-pedidosya.jpg" alt="PedidosYa" className="w-[85%] h-[85%] object-contain drop-shadow-md" />
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* 3D Visual Element / Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex-1 relative w-full aspect-square max-w-[600px]"
        >
          {/* Círculo decorativo rotativo */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[1px] border-dashed border-zinc-700 rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border-[1px] border-red-600/20 rounded-full"
          ></motion.div>

          {/* Imagen principal 'estilo 3D' con sombras y flotación */}
          <motion.div
            animate={floatingAnimation}
            className="absolute inset-0 flex items-center justify-center -rotate-12"
          >
            {/* 
              Usamos una imagen con fondo recortado transparente (.png) para dar efecto 3D a la tabla de sushi 
            */}
            <div className="relative w-[90%] h-[90%] drop-shadow-[0_45px_45px_rgba(0,0,0,0.8)] filter">
              <img
                src="https://pngimg.com/d/sushi_PNG98822.png"
                alt="Sushi Premium"
                className="w-full h-full object-contain scale-[1.2]"
              />
              
              {/* Reflejos debajo del plato */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/60 blur-xl rounded-[100%]"></div>
            </div>
          </motion.div>

          {/* Badges Flotantes */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute top-1/4 -right-12 lg:-right-24 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl shadow-xl flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
              <span className="text-amber-500 font-bold text-xl">5.0</span>
            </div>
            <div>
              <p className="text-white text-sm font-bold">Estrellas Michelin</p>
              <p className="text-zinc-400 text-xs">Calidad certificada</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-1/4 -left-8 lg:-left-16 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl shadow-xl flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
              <span className="text-red-500 font-bold text-xl">新鮮</span>
            </div>
            <div>
               <p className="text-white text-sm font-bold">Pesca del Día</p>
              <p className="text-zinc-400 text-xs">Directo de Japón</p>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <OrderModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType} />
    </section>
  );
};