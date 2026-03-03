import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import Navbar from './components/Navbar';
import { Hero } from './components/Hero';
import { SmartMenu } from './components/SmartMenu';
import { RollBuilder } from './components/RollBuilder';
import { SocialProof } from './components/SocialProof';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { FloatingIngredients } from './components/FloatingIngredients';
import { FloatingCart } from './components/FloatingCart';
import { WhatsAppButton } from './components/WhatsAppButton';
import { NotFoundPage } from './components/NotFoundPage';
import { SyrtixPromoBanner } from './components/SyrtixPromoBanner';
import { useCart } from './context/CartContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [showSticky, setShowSticky] = useState(false);
  const { toggleCart, cartCount } = useCart();
  
  // Custom simple router to detect 404
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Escuchar cambios en el historial (ideal para Single Page Apps simples)
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  useEffect(() => {
    // Lógica para mostrar/ocultar el botón sticky en móvil al scrollear
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <CustomCursor />

      {/* Ruteo Simple Mapeado - Renderiza 404 si la ruta no es la raíz */}
      {currentPath !== '/' && currentPath !== '/index.html' ? (
        <NotFoundPage />
      ) : (
        <>
          {/* Pantalla de Carga Inicial */}
          {loading && <Preloader onComplete={() => setLoading(false)} />}

          <div className="min-h-screen bg-[#050505] font-sans selection:bg-red-600/30">
            
            {/* Componente Parallax de Fondo */}
            <FloatingIngredients />

            {/* Componentes Flotantes (Carrito y WhatsApp) */}
            <FloatingCart />
            <WhatsAppButton phoneNumber="+56988126316" />
            
            {/* Promo Syrtix B2B Banner (Modal Lateral) */}
            <SyrtixPromoBanner />

            <div className="relative z-10">
              <Navbar />
              <main>
                <Hero />
                <SmartMenu />
                <RollBuilder />
                <SocialProof />
              </main>
              <Footer />
            </div>

            {/* Sticky CTA (Solo visible en móviles después de bajar del Hero) */}
            {!cartCount && (
              <div 
                className={`global-sticky-menu-cta md:hidden fixed bottom-0 left-0 right-0 p-4 z-40 transition-transform duration-500 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent ${showSticky ? 'translate-y-0' : 'translate-y-[150%]'}`}
              >
                <button 
                  onClick={() => {
                    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-medium tracking-wide shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Ver Menú
                </button>
              </div>
            )}

          </div>
        </>
      )}
    </>
  );
}

export default App;
