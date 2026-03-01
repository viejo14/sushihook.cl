import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ImagePlaceholder } from './ImagePlaceholder';

export const FloatingCart = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Close with Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let message = "Hola! Quiero hacer el siguiente pedido:\n\n";
    cartItems.forEach(item => {
      message += `• ${item.quantity}x ${item.name} ` + 
        `${item.selectedOptions ? `(${item.selectedOptions.join(', ')}) ` : ''}` +
        `$${(item.price * item.quantity).toLocaleString('es-CL')}\n`;
    });
    message += `\n*Total: $${cartTotal.toLocaleString('es-CL')}*\n\nGracias!`;

    const vendorPhone = "56942468352"; 
    
    // Mejor redirección a WhatsApp (pasa por la landing de WhatsApp que detecta app nativa o web automáticamente)
    const url = `https://api.whatsapp.com/send?phone=${vendorPhone}&text=${encodeURIComponent(message)}`;
      
    window.open(url, '_blank');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        {/* Floating Bubble Trigger */}
        <AnimatePresence>
          {cartCount > 0 && !isCartOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={() => setIsCartOpen(true)}
              className="pointer-events-auto group relative flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-md overflow-hidden"
            >
              <motion.div
                initial={false}
                animate={{ width: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                className="overflow-hidden whitespace-nowrap overflow-visible"
              >
                <div className="pr-3 font-semibold tracking-wide">
                  Ver Pedido
                </div>
              </motion.div>
                
              <div className="relative">
                <ShoppingBag strokeWidth={2.5} className="w-6 h-6" />
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-2 -right-2 bg-amber-400 text-zinc-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-black"
                >
                  {cartCount}
                </motion.div>
              </div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-[150%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Background Overlay */}
      <AnimatePresence>
         {isCartOpen && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setIsCartOpen(false)}
             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
           />
         )}
      </AnimatePresence>

      {/* Side Slide Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-[#0A0A0A]/95 backdrop-blur-3xl border-l border-zinc-800 shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600/10 rounded-xl rounded-tl-sm border border-red-500/20">
                  <ShoppingBag className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-xl font-medium tracking-wide text-zinc-100">
                  Tu Carrito
                </h2>
                <div className="px-2 py-0.5 ml-2 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-full">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-4 scrollbar-hide">
              <AnimatePresence>
                {cartItems.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4"
                  >
                    <ShoppingBag strokeWidth={1} className="w-16 h-16 text-zinc-700" />
                    <p className="text-lg">Tu carrito está hambriento.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 px-6 py-2 border border-zinc-700 hover:border-red-500 hover:text-red-400 rounded-full transition-colors"
                    >
                      Volver al Menú
                    </button>
                  </motion.div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, x: 20 }}
                      className="relative group p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex gap-4"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-800 relative">
                        <ImagePlaceholder src={item.image} alt={item.name} />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-zinc-200 leading-tight">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {item.selectedOptions && (
                            <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                              {item.selectedOptions.join(', ')}
                            </p>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 bg-black py-1 px-2 rounded-lg border border-zinc-800">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-md bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center text-zinc-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-md bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="font-medium text-amber-400">
                            ${(item.price * item.quantity).toLocaleString('es-CL')}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-zinc-800/80 bg-[#0A0A0A]/95 backdrop-blur-xl">
                <div className="space-y-3 mb-6">
                  {/* <div className="flex justify-between text-zinc-400 text-sm">
                    <span>Subtotal</span>
                    <span>${cartTotal.toLocaleString('es-CL')}</span>
                  </div> */}
                  <div className="flex justify-between items-end border-zinc-800 pt-2">
                    <span className="text-zinc-300 font-medium">Total</span>
                    <span className="text-2xl font-bold tracking-tight text-white">
                      ${cartTotal.toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={clearCart}
                    className="p-4 rounded-xl border border-zinc-800 hover:bg-zinc-800/50 text-zinc-400 transition-colors"
                    title="Vaciar carrito"
                  >
                    <Trash2 className="w-5 h-5 mx-auto" />
                  </button>
                  <button 
                    onClick={handleWhatsAppCheckout}
                    className="flex-1 py-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all group"
                  >
                    <span>Pedir por WhatsApp</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <p className="text-center text-xs text-zinc-600 mt-3 font-light mb-6">
                  Se abrirá tu aplicación de WhatsApp con el detalle.
                </p>

                {/* Alternativas de Delivery */}
                <div className="pt-5 border-t border-zinc-800/80">
                  <p className="text-center text-xs text-zinc-500 mb-4 font-medium uppercase tracking-widest">
                    O pide a través de nuestras apps
                  </p>
                  <div className="flex justify-center gap-6">
                    <a href="https://ubereats.com" target="_blank" rel="noreferrer" title="Uber Eats" className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-800 hover:border-[#06C167] bg-white transition-colors relative group shadow-lg">
                      <img src="/images/logo-ubereat.webp" alt="Uber Eats" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="https://rappi.com" target="_blank" rel="noreferrer" title="Rappi" className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-800 hover:border-[#FF441F] bg-white transition-colors relative group shadow-lg">
                      <img src="/images/logo-rappi.jpg" alt="Rappi" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="https://pedidosya.com" target="_blank" rel="noreferrer" title="PedidosYa" className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-800 hover:border-[#EA0029] bg-white transition-colors relative group shadow-lg">
                      <img src="/images/logo-pedidosya.jpg" alt="PedidosYa" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
