import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2 } from 'lucide-react';

const BUILDER_OPTIONS = {
  bases: [
    { id: 'b1', name: 'Arroz Blanco', price: 2000, color: 'bg-zinc-100', texture: 'radial-gradient(circle at center, #ffffff 0%, #e4e4e7 100%)' },
    { id: 'b2', name: 'Arroz Integral', price: 2500, color: 'bg-[#8B5A2B]', texture: 'radial-gradient(circle at center, #A06B35 0%, #6B4219 100%)' },
    { id: 'b3', name: 'Quinoa', price: 3000, color: 'bg-[#F4E4BA]', texture: 'radial-gradient(circle at center, #Fdf5d3 0%, #D4C49A 100%)' },
  ],
  proteins: [
    { id: 'p1', name: 'Salmón Fresh', price: 4000, color: 'bg-[#FF7E67]', texture: 'linear-gradient(45deg, #FF7E67 25%, #FFA082 25%, #FFA082 50%, #FF7E67 50%, #FF7E67 75%, #FFA082 75%, #FFA082 100%)', backgroundSize: '10px 10px' },
    { id: 'p2', name: 'Atún Spicy', price: 4500, color: 'bg-[#D93838]', texture: 'radial-gradient(circle at 30% 30%, #E64A4A 0%, #B32424 100%)' },
    { id: 'p3', name: 'Camarón Tempura', price: 3500, color: 'bg-[#E5B566]', texture: 'linear-gradient(135deg, #E5B566 0%, #D29A46 50%, #E5B566 100%)' },
    { id: 'p4', name: 'Tofu Glaseado', price: 2500, color: 'bg-[#F5DEB3]', texture: 'linear-gradient(to bottom right, #F5DEB3, #D4BA8C)' },
  ],
  toppings: [
    { id: 't1', name: 'Palta', price: 1000, color: 'bg-[#7C9D32]', shape: 'rounded-full scale-y-[1.5]' },
    { id: 't2', name: 'Queso Crema', price: 800, color: 'bg-[#F8F9FA]', shape: 'rounded-xl' },
    { id: 't3', name: 'Salsa Teriyaki', price: 500, color: 'bg-[#2A1610]', shape: 'rounded-none blur-[1px]' },
    { id: 't4', name: 'Masago', price: 1200, color: 'bg-[#FF6B35]', shape: 'rounded-full scale-x-[1.2]' },
  ]
};

// Componente Visual del Sushi con Framer Motion
const VisualRoll = ({ selections }) => {
  return (
    <div className="relative w-64 h-64 mx-auto mb-10 flex items-center justify-center isolate">
      {/* Glow de fondo animado */}
      <motion.div 
        className="absolute inset-0 bg-red-600/10 rounded-full blur-[40px] -z-10"
        animate={{ 
          scale: selections.base ? [1, 1.2, 1] : 1,
          opacity: selections.base ? [0.3, 0.6, 0.3] : 0 
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Alga Nori exterior (siempre presente como base del plato/maki) */}
      <div className="absolute w-56 h-56 rounded-full border-[14px] border-[#0a0a0a] z-10 shadow-[inset_0_8px_16px_rgba(0,0,0,0.8),_0_20px_30px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none"></div>
      </div>
      
      {/* Círculo vacío del centro (placeholder con animación ring) */}
      {!selections.base && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute w-[calc(100%-80px)] h-[calc(100%-80px)] rounded-full bg-zinc-950/80 z-0 border-2 border-red-600/30 border-dashed flex items-center justify-center"
        >
          <span className="text-zinc-600 text-xs font-medium tracking-widest uppercase">Inicia Aquí</span>
        </motion.div>
      )}

      <AnimatePresence>
        {/* Base (Arroz/Quinoa) */}
        {selections.base && (
          <motion.div
            key={`base-${selections.base.id}`}
            initial={{ y: -150, opacity: 0, scale: 0.3, rotate: 180 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ y: 150, opacity: 0, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ 
              background: selections.base.texture,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)' 
            }}
            className={`absolute w-44 h-44 rounded-full z-20 flex flex-wrap items-center justify-center p-3`}
          >
            {/* Pequeños detalles para simular textura rugosa */}
            {[...Array(16)].map((_, i) => (
              <div 
                key={i} 
                className="w-5 h-2.5 bg-black/5 rounded-full m-1 rotate-[random()]"
                style={{ transform: `rotate(${Math.random() * 360}deg)` }}
              ></div>
            ))}
          </motion.div>
        )}

        {/* Proteína (Centro) */}
        {selections.protein && (
          <motion.div
            key={`protein-${selections.protein.id}`}
            initial={{ scale: 0, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 10 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
            style={{ 
              background: selections.protein.texture,
              backgroundSize: selections.protein.backgroundSize || 'auto',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4)'
            }}
            className={`absolute w-20 h-20 rounded-2xl z-30`}
          ></motion.div>
        )}

        {/* Toppings (Alrededor de la proteína) */}
        {selections.toppings.map((topping, index) => {
          // Posiciones trigonométricas distribuidas alrededor del centro
          const radius = 28;
          const angle = (index * (360 / Math.max(selections.toppings.length, 1))) * (Math.PI / 180);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <motion.div
              key={`topping-${topping.id}`}
              initial={{ y: -100, opacity: 0, scale: 0 }}
              animate={{ 
                x, y, 
                opacity: 1, 
                scale: 1, 
                rotate: (angle * 180 / Math.PI) + 45
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 + (index * 0.05) }}
              className={`absolute w-8 h-14 ${topping.color} ${topping.shape} z-40 shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
              style={{
                boxShadow: topping.name === 'Salsa Teriyaki' ? 'none' : 'inset 0 2px 4px rgba(255,255,255,0.3)'
              }}
            ></motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export const RollBuilder = () => {
  const [selections, setSelections] = useState({
    base: null,
    protein: null,
    toppings: []
  });

  const toggleTopping = (topping) => {
    setSelections(prev => {
      const exists = prev.toppings.find(t => t.id === topping.id);
      if (exists) {
        return { ...prev, toppings: prev.toppings.filter(t => t.id !== topping.id) };
      }
      if (prev.toppings.length >= 3) return prev; // Max 3 toppings
      return { ...prev, toppings: [...prev.toppings, topping] };
    });
  };

  const totalPrice = useMemo(() => {
    let total = 0;
    if (selections.base) total += selections.base.price;
    if (selections.protein) total += selections.protein.price;
    selections.toppings.forEach(t => total += t.price);
    return total;
  }, [selections]);

  const isComplete = selections.base && selections.protein;

  return (
    <section id="builder" className="py-24 bg-zinc-950 border-y border-zinc-900 border-dashed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Settings2 className="w-12 h-12 text-amber-400 mx-auto mb-4 opacity-80" />
          <h2 className="text-4xl font-light text-zinc-100 tracking-tight mb-4">
            Interactive <span className="font-bold text-amber-400">Roll Builder</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto font-light">
            Diseña tu roll perfecto. Selecciona tu base, proteína y hasta 3 toppings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Opciones */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bases */}
            <div>
              <h3 className="text-xl text-zinc-200 mb-6 font-light border-b border-zinc-800 pb-2">1. Elige una Base</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {BUILDER_OPTIONS.bases.map(base => (
                  <button
                    key={base.id}
                    onClick={() => setSelections(s => ({ ...s, base }))}
                    className={`p-4 rounded-xl border text-sm transition-all text-left ${selections.base?.id === base.id ? 'bg-amber-400/10 border-amber-400 text-amber-400' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-500'}`}
                  >
                    <div className="font-medium">{base.name}</div>
                    <div className="text-xs opacity-70 mt-1">+${base.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Proteina */}
            <div>
              <h3 className="text-xl text-zinc-200 mb-6 font-light border-b border-zinc-800 pb-2">2. Proteína Principal</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {BUILDER_OPTIONS.proteins.map(protein => (
                  <button
                    key={protein.id}
                    onClick={() => setSelections(s => ({ ...s, protein }))}
                    className={`p-4 rounded-xl border text-sm transition-all text-left ${selections.protein?.id === protein.id ? 'bg-red-600/10 border-red-600 text-red-500' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-500'}`}
                  >
                    <div className="font-medium">{protein.name}</div>
                    <div className="text-xs opacity-70 mt-1">+${protein.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings */}
            <div>
              <h3 className="text-xl text-zinc-200 mb-6 font-light border-b border-zinc-800 pb-2 flex justify-between">
                <span>3. Toppings Adicionales</span>
                <span className="text-sm text-zinc-500">{selections.toppings.length}/3</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {BUILDER_OPTIONS.toppings.map(topping => {
                  const isSelected = selections.toppings.find(t => t.id === topping.id);
                  const disabled = !isSelected && selections.toppings.length >= 3;
                  return (
                    <button
                      key={topping.id}
                      disabled={disabled}
                      onClick={() => toggleTopping(topping)}
                      className={`p-4 rounded-xl border text-sm transition-all text-left ${isSelected ? 'bg-zinc-100 border-zinc-100 text-zinc-900' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-500'} ${disabled ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                    >
                      <div className="font-medium">{topping.name}</div>
                      <div className="text-xs opacity-70 mt-1">+${topping.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Resumen & Visualizador */}
          <div className="bg-[#050505] p-8 rounded-3xl border border-zinc-900 shadow-2xl h-fit sticky top-32">
            
            {/* Visualizador 3D del Sushi usando Framer Motion animado */}
            <VisualRoll selections={selections} />
            
            <h3 className="text-2xl font-light text-zinc-100 mb-6 tracking-wide text-center">Tu Creación</h3>
            
            <div className="space-y-4 mb-8 text-sm max-w-xs mx-auto">
              <div className="flex justify-between text-zinc-300">
                <span>Base: {selections.base?.name || '---'}</span>
                <span>${selections.base?.price || 0}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Proteína: {selections.protein?.name || '---'}</span>
                <span>${selections.protein?.price || 0}</span>
              </div>
              {selections.toppings.map(t => (
                <div key={t.id} className="flex justify-between text-zinc-400">
                  <span>+ {t.name}</span>
                  <span>${t.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-6 mb-8 flex justify-between items-end max-w-xs mx-auto">
              <span className="text-zinc-500">Total estimado</span>
              <span className="text-3xl font-bold text-amber-400">${totalPrice.toLocaleString('es-CL')}</span>
            </div>

            <button 
              disabled={!isComplete}
              className={`w-full py-4 rounded-xl font-medium tracking-widest uppercase transition-all ${isComplete ? 'bg-amber-400 hover:bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'}`}
            >
              Añadir a la orden
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};