import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageOff, FishSymbol } from 'lucide-react';

/**
 * ImagePlaceholder
 * Renderiza la imagen y, si esta falla en cargar, muestra una animación 
 * elegante con el estilo oscuro y premium de la marca.
 */
export const ImagePlaceholder = ({ src, alt, className, style, width, height }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className={`relative overflow-hidden bg-zinc-900/50 ${className || ''}`}
      style={{ ...style, width: width || '100%', height: height || '100%' }}
    >
      {/* Skeletons de Carga */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-zinc-900 animate-pulse flex items-center justify-center"
          >
            <div className="w-8 h-8 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Imagen Real (Se oculta si hay error) */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Estado "Imagen Rota" Animado */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-[#0A0A0A] border-[1px] border-dashed border-zinc-800"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-zinc-700 mb-2 relative"
            >
              <div className="absolute inset-0 bg-red-600/10 blur-xl rounded-full"></div>
              <FishSymbol strokeWidth={1} className="w-10 h-10 relative z-10" />
            </motion.div>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-medium">Img Not Found</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
