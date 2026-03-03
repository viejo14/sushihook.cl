import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Wine, Flame, Star, Crown, Leaf, Plus, Minus, ShoppingCart, Sparkles, X } from 'lucide-react';
import { MENU_ITEMS, GLOSSARY } from '../data';
import { useCart } from '../context/CartContext';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ReusableModal } from './ReusableModal';

// Componente para renderizar iconos de tags/alérgenos
const TagIcon = ({ tag }) => {
  switch (tag) {
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

const getCardDescription = (description = '') => {
  const normalized = description.replace(/\s+/g, ' ').trim();
  const [summary] = normalized.split(/incluye:/i);
  return (summary || normalized).trim();
};

export const SmartMenu = () => {
  const DRINK_PRICE = 1500;
  const DEFAULT_SAUCE = 'Agridulce';
  const SAUCE_OPTIONS = ['Agridulce', 'Soya', 'Mixta'];
  const DRINK_OPTIONS = [
    { id: 'cocacola-original', name: 'Coca-Cola', image: '/images/imges-menu/cocacola-original.jpeg' },
    { id: 'fanta', name: 'Fanta', image: '/images/imges-menu/FANTA-350CC-LATA.jpg' },
    { id: 'pepsi', name: 'Pepsi', image: '/images/imges-menu/pepsi.jpeg' },
    { id: 'sprite', name: 'Sprite', image: '/images/imges-menu/sprite.jpeg' }
  ];
  const createEmptyDrinkSelection = () =>
    DRINK_OPTIONS.reduce((acc, drink) => ({ ...acc, [drink.id]: 0 }), {});
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('Todos');
  
  // Estado para manejar qué tarjeta tiene abierto el control de cantidad y las cantidades
  const [activeItemConfig, setActiveItemConfig] = useState(null); // id del item seleccionado
  const [quantities, setQuantities] = useState({}); // { id: cantidad }
  const [sauces, setSauces] = useState({}); // { id: salsa }
  const [drinkSelections, setDrinkSelections] = useState({}); // { id: { drinkId: cantidad } }

  // Estado para Omakase
  const [omakaseSelection, setOmakaseSelection] = useState(null);
  const [omakaseSauce, setOmakaseSauce] = useState(DEFAULT_SAUCE);
  const [omakaseDrinkSelection, setOmakaseDrinkSelection] = useState(createEmptyDrinkSelection());

  useEffect(() => {
    if (!omakaseSelection) return;

    const body = document.body;
    const currentCount = Number(body.dataset.modalOpenCount || '0');
    const nextCount = currentCount + 1;

    body.dataset.modalOpenCount = String(nextCount);
    body.classList.add('modal-open');

    return () => {
      const openCount = Number(body.dataset.modalOpenCount || '1');
      const updatedCount = Math.max(0, openCount - 1);

      if (updatedCount === 0) {
        body.classList.remove('modal-open');
        delete body.dataset.modalOpenCount;
      } else {
        body.dataset.modalOpenCount = String(updatedCount);
      }
    };
  }, [omakaseSelection]);

  const categories = useMemo(() => {
    const categoryOrder = ['Rolls', 'Piezas', 'Hand Roll', 'Sushi Burger'];
    const availableCategories = Array.from(new Set(MENU_ITEMS.map(item => item.category)));
    const orderedCategories = categoryOrder.filter(category => availableCategories.includes(category));
    const extraCategories = availableCategories.filter(category => !categoryOrder.includes(category));
    return ['Todos', ...orderedCategories, ...extraCategories];
  }, []);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const categoryMatch = activeCategory === 'Todos' || item.category === activeCategory;
      return categoryMatch;
    });
  }, [activeCategory]);

  const selectedItem = useMemo(
    () => MENU_ITEMS.find(item => item.id === activeItemConfig) || null,
    [activeItemConfig]
  );

  const handleUpdateQuantity = (id, delta, e) => {
    if (e) e.stopPropagation();
    setQuantities(prev => {
      const current = prev[id] || 1;
      const next = current + delta;
      if (next < 1) return prev;
      return { ...prev, [id]: next };
    });
  };

  const openItemConfig = (itemId, e) => {
    if (e) e.stopPropagation();
    setActiveItemConfig(prev => (prev === itemId ? null : itemId));
    if (!quantities[itemId]) {
      setQuantities(prev => ({ ...prev, [itemId]: 1 }));
    }
    if (!sauces[itemId]) {
      setSauces(prev => ({ ...prev, [itemId]: DEFAULT_SAUCE }));
    }
    if (!drinkSelections[itemId]) {
      setDrinkSelections(prev => ({ ...prev, [itemId]: createEmptyDrinkSelection() }));
    }
  };

  const handleSetSauce = (id, sauce, e) => {
    if (e) e.stopPropagation();
    setSauces(prev => ({ ...prev, [id]: sauce }));
  };

  const getDrinkSelectionForItem = (itemId) => {
    return drinkSelections[itemId] || createEmptyDrinkSelection();
  };

  const getTotalDrinksForItem = (itemId) => {
    const selectedDrinks = getDrinkSelectionForItem(itemId);
    return Object.values(selectedDrinks).reduce((total, count) => total + count, 0);
  };

  const getTotalDrinksFromSelection = (selection) => {
    return Object.values(selection).reduce((total, count) => total + count, 0);
  };

  const handleUpdateDrinkFlavorCount = (itemId, flavorId, delta, e) => {
    if (e) e.stopPropagation();
    setDrinkSelections(prev => {
      const currentSelection = prev[itemId] || createEmptyDrinkSelection();
      const current = currentSelection[flavorId] || 0;
      const next = Math.max(0, current + delta);
      return {
        ...prev,
        [itemId]: {
          ...currentSelection,
          [flavorId]: next
        }
      };
    });
  };

  const handleAddToCart = (item, e) => {
    if (e) e.stopPropagation();
    const qty = quantities[item.id] || 1;
    const sauce = sauces[item.id] || DEFAULT_SAUCE;
    const selectedDrinks = getDrinkSelectionForItem(item.id);
    const totalDrinks = getTotalDrinksForItem(item.id);
    const drinkExtraPrice = totalDrinks * DRINK_PRICE;
    const selectedDrinkEntries = DRINK_OPTIONS
      .map(drink => ({ ...drink, qty: selectedDrinks[drink.id] || 0 }))
      .filter(drink => drink.qty > 0);

    const drinkSummary = selectedDrinkEntries.length
      ? selectedDrinkEntries.map(drink => `${drink.name} x${drink.qty}`).join(', ')
      : 'No';

    const drinksKey = selectedDrinkEntries.length
      ? selectedDrinkEntries.map(drink => `${drink.id}:${drink.qty}`).join('|')
      : 'none';
    
    addToCart({
      cartItemId: `${item.id}::salsa:${sauce.toLowerCase()}::bebidas:${drinksKey}`,
      id: item.id,
      name: item.name,
      price: item.price,
      extraPrice: drinkExtraPrice,
      image: item.image || '',
      selectedOptions: [
        `Salsa: ${sauce}`,
        `Bebidas: ${drinkSummary}${totalDrinks > 0 ? ` (+$${drinkExtraPrice.toLocaleString('es-CL')})` : ''}`
      ]
    }, qty);

    setActiveItemConfig(null);
    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
    setSauces(prev => ({ ...prev, [item.id]: DEFAULT_SAUCE }));
    setDrinkSelections(prev => ({ ...prev, [item.id]: createEmptyDrinkSelection() }));
  };

  const generateOmakase = () => {
    const shuffled = [...MENU_ITEMS].sort(() => Math.random() - 0.5);
    const selection = shuffled.slice(0, Math.min(3, shuffled.length));
    if (!selection.length) return;
    const originalPrice = selection.reduce((acc, item) => acc + item.price, 0);
    const discountedPrice = Math.floor(originalPrice * 0.85); // 15% discount

    setOmakaseSelection({
      items: selection,
      originalPrice,
      discountedPrice
    });
    setOmakaseSauce(DEFAULT_SAUCE);
    setOmakaseDrinkSelection(createEmptyDrinkSelection());
  };

  return (
    <section id="menu" className="py-24 bg-[#050505] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="mb-16">
        <div>
          <h2 className="text-4xl font-light text-zinc-100 tracking-tight mb-4">
            Menú <span className="font-bold text-red-600">Inteligente</span>
          </h2>
          <p className="text-zinc-400 max-w-xl font-light">
            Explora nuestra selección usando filtros en tiempo real. 
            Descubre información detallada pasando el cursor sobre las categorías.
          </p>
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
              {category !== 'Todos' && GLOSSARY[category] && <Info className="w-4 h-4 opacity-50" />}
            </button>
            {/* Tooltip Glosario */}
            {category !== 'Todos' && GLOSSARY[category] && (
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
          <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
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
              className="relative my-2 sm:my-6 bg-zinc-900 border border-amber-500/30 rounded-2xl w-full max-w-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-3rem)] overflow-y-auto"
            >
              {/* Efecto de luz de fondo para Omakase */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <button
                onClick={() => {
                  setOmakaseSelection(null);
                  setOmakaseSauce(DEFAULT_SAUCE);
                  setOmakaseDrinkSelection(createEmptyDrinkSelection());
                }}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 z-10"
              >
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

              <div className="space-y-4 mb-6 relative z-10">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                  <p className="text-xs text-zinc-400 mb-3 text-center uppercase tracking-wide">Tipo de salsa</p>
                  <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
                    {SAUCE_OPTIONS.map((sauceOption) => (
                      <button
                        key={sauceOption}
                        onClick={() => setOmakaseSauce(sauceOption)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          omakaseSauce === sauceOption
                            ? 'bg-amber-500 text-zinc-950 border-amber-400'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                        }`}
                      >
                        {sauceOption}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                  <p className="text-xs text-zinc-400 mb-3 text-center uppercase tracking-wide">Bebidas</p>
                  <div className="max-w-md mx-auto text-center text-sm text-zinc-300 bg-[#050505] p-2 rounded-xl border border-zinc-800">
                    {getTotalDrinksFromSelection(omakaseDrinkSelection) > 0
                      ? `${getTotalDrinksFromSelection(omakaseDrinkSelection)} bebida(s) seleccionada(s)`
                      : 'Sin bebida'}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                    {DRINK_OPTIONS.map((drink) => {
                      const drinkCount = omakaseDrinkSelection[drink.id] || 0;
                      const isSelected = drinkCount > 0;
                      return (
                        <div
                          key={drink.id}
                          className={`rounded-lg border p-2 transition-colors ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10'
                              : 'border-zinc-700 bg-zinc-900 hover:border-zinc-500'
                          }`}
                        >
                          <div className="h-12 w-full rounded-md overflow-hidden mb-1 bg-zinc-800">
                            <img
                              src={drink.image}
                              alt={drink.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-zinc-200 block mb-1">{drink.name}</span>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                setOmakaseDrinkSelection(prev => ({
                                  ...prev,
                                  [drink.id]: Math.max(0, (prev[drink.id] || 0) - 1)
                                }))
                              }
                              className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-50"
                              disabled={drinkCount <= 0}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-medium text-white">{drinkCount}</span>
                            <button
                              onClick={() =>
                                setOmakaseDrinkSelection(prev => ({
                                  ...prev,
                                  [drink.id]: (prev[drink.id] || 0) + 1
                                }))
                              }
                              className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
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
                    const optionLabel = omakaseSelection.items
                      .map(item => item.name)
                      .join(', ');
                    const selectedDrinkEntries = DRINK_OPTIONS
                      .map(drink => ({ ...drink, qty: omakaseDrinkSelection[drink.id] || 0 }))
                      .filter(drink => drink.qty > 0);
                    const totalDrinks = selectedDrinkEntries.reduce((sum, drink) => sum + drink.qty, 0);
                    const drinkExtraPrice = totalDrinks * DRINK_PRICE;
                    const drinksKey = selectedDrinkEntries.length
                      ? selectedDrinkEntries.map(drink => `${drink.id}:${drink.qty}`).join('|')
                      : 'none';
                    const drinkSummary = selectedDrinkEntries.length
                      ? selectedDrinkEntries.map(drink => `${drink.name} x${drink.qty}`).join(', ')
                      : 'No';

                    addToCart({
                      cartItemId: `omakase::${omakaseSelection.items.map(item => item.id).join('-')}::salsa:${omakaseSauce.toLowerCase()}::bebidas:${drinksKey}`,
                      id: 100000,
                      name: 'Seleccion Omakase',
                      price: omakaseSelection.discountedPrice,
                      extraPrice: drinkExtraPrice,
                      image: omakaseSelection.items[0]?.image || '',
                      selectedOptions: [
                        `Incluye: ${optionLabel}`,
                        `Salsa: ${omakaseSauce}`,
                        `Bebidas: ${drinkSummary}${totalDrinks > 0 ? ` (+$${drinkExtraPrice.toLocaleString('es-CL')})` : ''}`
                      ]
                    }, 1);
                    setOmakaseSelection(null);
                    setOmakaseSauce(DEFAULT_SAUCE);
                    setOmakaseDrinkSelection(createEmptyDrinkSelection());
                  }}
                  className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-xl font-bold tracking-widest uppercase transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Añadir Selección $
                  {(
                    omakaseSelection.discountedPrice +
                    (getTotalDrinksFromSelection(omakaseDrinkSelection) * DRINK_PRICE)
                  ).toLocaleString('es-CL')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ReusableModal
        isOpen={!!selectedItem}
        onClose={() => setActiveItemConfig(null)}
        title={selectedItem?.name}
        subtitle={selectedItem ? `$${selectedItem.price.toLocaleString('es-CL')}` : ''}
        maxWidth="max-w-2xl"
      >
        {selectedItem && (
          <div className="space-y-5">
            <div className="h-56 w-full rounded-xl overflow-hidden border border-zinc-800">
              <ImagePlaceholder
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full"
              />
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                <p className="text-xs text-zinc-400 mb-3 text-center uppercase tracking-wide">Cantidad</p>
                <div className="max-w-md mx-auto flex items-center justify-center gap-4 bg-[#050505] p-1 rounded-full border border-zinc-800">
                  <button
                    onClick={(e) => handleUpdateQuantity(selectedItem.id, -1, e)}
                    className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-50"
                    disabled={(quantities[selectedItem.id] || 1) <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-medium text-white text-lg">
                    {quantities[selectedItem.id] || 1}
                  </span>
                  <button
                    onClick={(e) => handleUpdateQuantity(selectedItem.id, 1, e)}
                    className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                <p className="text-xs text-zinc-400 mb-3 text-center uppercase tracking-wide">Bebidas</p>
                <div className="max-w-md mx-auto text-center text-sm text-zinc-300 bg-[#050505] p-2 rounded-xl border border-zinc-800">
                  {getTotalDrinksForItem(selectedItem.id) > 0
                    ? `${getTotalDrinksForItem(selectedItem.id)} bebida(s) seleccionada(s)`
                    : 'Sin bebida'}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                  {DRINK_OPTIONS.map((drink) => {
                    const drinkCount = getDrinkSelectionForItem(selectedItem.id)[drink.id] || 0;
                    const isSelected = drinkCount > 0;
                    return (
                      <div
                        key={drink.id}
                        className={`rounded-lg border p-2 transition-colors ${
                          isSelected
                            ? 'border-red-500 bg-red-600/10'
                            : 'border-zinc-700 bg-zinc-900 hover:border-zinc-500'
                        }`}
                      >
                        <div className="h-12 w-full rounded-md overflow-hidden mb-1 bg-zinc-800">
                          <img
                            src={drink.image}
                            alt={drink.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-zinc-200 block mb-1">{drink.name}</span>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => handleUpdateDrinkFlavorCount(selectedItem.id, drink.id, -1, e)}
                            className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-50"
                            disabled={drinkCount <= 0}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-medium text-white">{drinkCount}</span>
                          <button
                            onClick={(e) => handleUpdateDrinkFlavorCount(selectedItem.id, drink.id, 1, e)}
                            className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <p className="text-xs text-zinc-400 mb-3 text-center uppercase tracking-wide">Tipo de salsa</p>
              <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
                {SAUCE_OPTIONS.map((sauceOption) => (
                  <button
                    key={sauceOption}
                    onClick={(e) => handleSetSauce(selectedItem.id, sauceOption, e)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      (sauces[selectedItem.id] || DEFAULT_SAUCE) === sauceOption
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                    }`}
                  >
                    {sauceOption}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={(e) => handleAddToCart(selectedItem, e)}
              className="w-full py-3.5 flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition-colors shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            >
              <ShoppingCart className="w-4 h-4" />
              Añadir ${(
                (selectedItem.price * (quantities[selectedItem.id] || 1)) +
                (getTotalDrinksForItem(selectedItem.id) * DRINK_PRICE)
              ).toLocaleString('es-CL')}
            </button>
          </div>
        )}
      </ReusableModal>

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
              onClick={() => openItemConfig(item.id)}
              className="bg-zinc-900/20 backdrop-blur-xl border border-zinc-500/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:bg-zinc-900/40 rounded-2xl overflow-hidden transition-all duration-300 group hover:border-red-600/30 cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
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
                      className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform transition-all duration-300 hover:bg-red-500 hover:scale-110"
                      onClick={(e) => openItemConfig(item.id, e)}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-medium text-zinc-100">{item.name}</h3>
                  <div className="flex gap-1">
                    {/* Renderizamos iconos basados en tags */}
                    {item.tags?.map(tag => <TagIcon key={tag} tag={tag} />)}
                  </div>
                </div>
                <p className="text-zinc-400 text-sm font-light mb-4 min-h-[40px] line-clamp-3">
                  {getCardDescription(item.description)}
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

