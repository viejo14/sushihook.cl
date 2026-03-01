import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Wine, WheatOff, Flame, Star, Crown, Leaf, Plus, Minus, ShoppingCart, Sparkles, X } from 'lucide-react';
import { MENU_ITEMS, GLOSSARY } from '../data';
import { useCart } from '../context/CartContext';
import { ImagePlaceholder } from './ImagePlaceholder';

// Componente para renderizar iconos de tags/alérgenos
const TagIcon = ({ tag }) => {
  switch (tag) {
    case 'gluten-free':
      return (
        <div title="Sin Gluten" className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <WheatOff className="w-3.5 h-3.5" />
        </div>
      );
    case 'picante':
      return (
        <div title="Picante" className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
          <Flame className="w-3.5 h-3.5" />
        </div>
      );
    case 'premium':
      return (
        <div title="Premium" className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <Crown className="w-3.5 h-3.5" />
        </div>
      );
    case 'popular':
      return (
        <div title="Popular" className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
          <Star className="w-3.5 h-3.5" />
        </div>
      );
    case 'keto':
      return (
        <div title="Keto Friendly" className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
          <Leaf className="w-3.5 h-3.5" />
        </div>
      );
    default:
      return null;
  }
};

export const SmartMenu = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hideAllergens, setHideAllergens] = useState(false);
  
  // Estado para manejar qué tarjeta tiene abierto el control de cantidad y las cantidades
  const [activeItemConfig, setActiveItemConfig] = useState(null); // id del item seleccionado
  const [quantities, setQuantities] = useState({}); // { id: cantidad }

  // Estado para Omakase
  const [omakaseSelection, setOmakaseSelection] = useState(null);

  const categories = ['Todos', 'Rolls', 'Nigiri', 'Sashimi'];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const categoryMatch = activeCategory === 'Todos' || item.category === activeCategory;
      const allergenMatch = hideAllergens ? !item.allergens.some(a => ['gluten', 'crustaceos'].includes(a)) : true;
      return categoryMatch && allergenMatch;
    });
  }, [activeCategory, hideAllergens]);

  const handleUpdateQuantity = (id, delta, e) => {
    e.stopPropagation();
    setQuantities(prev => {
      const current = prev[id] || 1;
      const next = current + delta;
      if (next < 1) return prev;
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    const qty = quantities[item.id] || 1;
    
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || ''
    }, qty);

    setActiveItemConfig(null);
    setQuantities(prev => ({...prev, [item.id]: 1}));
  };

  const generateOmakase = () => {
    const rolls = MENU_ITEMS.filter(i => i.category === 'Rolls');
    const nigiris = MENU_ITEMS.filter(i => i.category === 'Nigiri');
    const sashimis = MENU_ITEMS.filter(i => i.category === 'Sashimi');

    const randomRoll = rolls[Math.floor(Math.random() * rolls.length)];
    const randomNigiri = nigiris[Math.floor(Math.random() * nigiris.length)];
    const randomSashimi = sashimis[Math.floor(Math.random() * sashimis.length)];

    const selection = [randomRoll, randomNigiri, randomSashimi].filter(Boolean);
    const originalPrice = selection.reduce((acc, item) => acc + item.price, 0);
    const discountedPrice = Math.floor(originalPrice * 0.85); // 15% discount

    setOmakaseSelection({
      items: selection,
      originalPrice,
      discountedPrice
    });
  };

  return (
    <section id="menu" className="py-24 bg-[#050505] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-4xl font-light text-zinc-100 tracking-tight mb-4">
            Menú <span className="font-bold text-red-600">Inteligente</span>
          </h2>
          <p className="text-zinc-400 max-w-xl font-light">
            Explora nuestra selección usando filtros en tiempo real. 
            Descubre información detallada pasando el cursor sobre las categorías.
          </p>
        </div>

        {/* Filtro de Alérgenos */}
        <div className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
          <span className="text-sm font-medium text-zinc-300">Libre de Gluten/Mariscos</span>
          <button 
            onClick={() => setHideAllergens(!hideAllergens)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${hideAllergens ? 'bg-amber-400' : 'bg-zinc-700'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${hideAllergens ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Category Tabs con Glosario Hover */}
      <div className="flex flex-wrap items-center gap-4 mb-12">
        {categories.map((category) => (
          <div key={category} className="relative group">
            <button
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeCategory === category
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500'
              }`}
            >
              {category}
              {category !== 'Todos' && <Info className="w-4 h-4 opacity-50" />}
            </button>
            {/* Tooltip Glosario */}
            {category !== 'Todos' && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-zinc-800 text-zinc-200 text-xs p-3 rounded-lg border border-zinc-700 shadow-xl z-20">
                {GLOSSARY[category]}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
              </div>
            )}
          </div>
        ))}

        {/* Botón Omakase */}
        <button 
          onClick={generateOmakase}
          className="ml-auto flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium tracking-wider uppercase transition-all bg-gradient-to-r from-amber-500 to-amber-700 text-zinc-950 hover:from-amber-400 hover:to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transform hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4" />
          Déjanos sorprenderte
        </button>
      </div>

      {/* Modal interactivo de Omakase */}
      <AnimatePresence>
        {omakaseSelection && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-zinc-900 border border-amber-500/30 rounded-2xl w-full max-w-2xl p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden"
            >
              {/* Efecto de luz de fondo para Omakase */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <button onClick={() => setOmakaseSelection(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 z-10">
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8 relative z-10">
                <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold tracking-widest uppercase rounded-full mb-3 border border-amber-500/20">Experiencia Única</span>
                <h3 className="text-3xl font-light text-zinc-100">Selección <span className="font-bold text-amber-400">Omakase</span></h3>
                <p className="text-zinc-400 mt-2 text-sm">Nuestro chef ha combinado estos elementos especialmente para ti.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 relative z-10">
                {omakaseSelection.items.map((item, i) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="bg-zinc-950/50 rounded-xl p-3 border border-zinc-800/50 flex flex-col items-center text-center"
                  >
                    <ImagePlaceholder src={item.image} alt={item.name} className="w-16 h-16 rounded-full mb-3 shadow-lg border border-zinc-800" />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{item.category}</span>
                    <h4 className="text-sm font-medium text-zinc-200 line-clamp-2 leading-tight">{item.name}</h4>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-zinc-800 relative z-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 line-through text-lg">${omakaseSelection.originalPrice.toLocaleString('es-CL')}</span>
                    <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded font-bold">-15% Omakase</span>
                  </div>
                  <div className="text-3xl font-bold text-zinc-100">
                    ${omakaseSelection.discountedPrice.toLocaleString('es-CL')}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    console.log('Añadido Omakase al carrito');
                    setOmakaseSelection(null);
                  }}
                  className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-xl font-bold tracking-widest uppercase transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Añadir Selección
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className="bg-zinc-900/20 backdrop-blur-xl border border-zinc-500/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:bg-zinc-900/40 rounded-2xl overflow-hidden transition-all duration-300 group hover:border-red-600/30"
            >
              <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => setActiveItemConfig(activeItemConfig === item.id ? null : item.id)}>
                <ImagePlaceholder
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                />
                
                {/* Overlay principal con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent flex flex-col justify-end p-4">
                  <div className="flex justify-between items-end w-full">
                    <span className="text-amber-400 text-lg font-bold">
                      ${item.price.toLocaleString('es-CL')}
                    </span>
                    
                    {/* Botón flotante (+) que desaparece cuando el overlay está activo */}
                    <button 
                      className={`w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform transition-all duration-300 hover:bg-red-500 hover:scale-110 ${activeItemConfig === item.id ? 'opacity-0 scale-75' : 'opacity-100'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveItemConfig(item.id);
                        if (!quantities[item.id]) setQuantities(prev => ({...prev, [item.id]: 1}));
                      }}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Overlay Interactivo: Controles de Cantidad */}
                <AnimatePresence>
                  {activeItemConfig === item.id && (
                    <motion.div
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "100%", opacity: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="absolute inset-x-0 bottom-0 top-1/2 p-4 bg-zinc-900/90 backdrop-blur-md flex flex-col items-center justify-center gap-3 border-t border-zinc-800"
                      onClick={(e) => e.stopPropagation()} // Evitar que cierre al cliquear el fondo
                    >
                      {/* X para cerrar */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveItemConfig(null); }}
                        className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-white"
                      >
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>

                      <div className="flex items-center gap-4 bg-[#050505] p-1 rounded-full border border-zinc-800">
                        <button 
                          onClick={(e) => handleUpdateQuantity(item.id, -1, e)}
                          className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-50"
                          disabled={(quantities[item.id] || 1) <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-white text-lg">
                          {quantities[item.id] || 1}
                        </span>
                        <button 
                          onClick={(e) => handleUpdateQuantity(item.id, 1, e)}
                          className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button 
                        onClick={(e) => handleAddToCart(item, e)}
                        className="w-full max-w-[200px] flex items-center gap-2 justify-center bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-full font-medium tracking-wide text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Añadir ${(item.price * (quantities[item.id] || 1)).toLocaleString('es-CL')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-medium text-zinc-100">{item.name}</h3>
                  <div className="flex gap-1">
                    {/* Renderizamos iconos basados en alergenos y tags */}
                    {!item.allergens.includes('gluten') && <TagIcon tag="gluten-free" />}
                    {item.tags?.map(tag => <TagIcon key={tag} tag={tag} />)}
                  </div>
                </div>
                <p className="text-zinc-400 text-sm font-light mb-4 min-h-[40px]">
                  {item.description}
                </p>
                
                {/* Cross-selling Maridaje */}
                <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-3 text-xs text-zinc-500">
                  <Wine className="w-4 h-4 text-red-500" />
                  <span>Maridaje: <span className="text-zinc-300 font-medium">{item.pairingSuggestion}</span></span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};