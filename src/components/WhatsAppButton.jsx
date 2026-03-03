import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = ({ phoneNumber = "+56988126316", message = "Hola vi la pagina Sushihook! Me gustaría hacer una consulta." }) => {
  
  const handleWhatsAppClick = () => {
    // Limpiamos el número de cualquier caracter que no sea número
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Usar la API oficial de WhatsApp en lugar de web.whatsapp.com para mejor redirección en desktop/móvil
    const url = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;
      
    window.open(url, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWhatsAppClick}
      className="global-whatsapp-fab fixed bottom-[5.5rem] md:bottom-6 left-4 md:left-6 z-40 group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-colors overflow-hidden"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle strokeWidth={2} className="w-7 h-7 relative z-10" />
      
      {/* Efecto de pulso en el fondo (anillos que se expanden) */}
      <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping" style={{ animationDuration: '3s' }}></span>
    </motion.button>
  );
};
