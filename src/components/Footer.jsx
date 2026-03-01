import React from 'react';
import { MapPin, Phone, Mail, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#030303] border-t border-zinc-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/logo-sushihook.png" alt="SushiHook" className="h-10 w-10 object-contain" />
              <span className="text-2xl font-light tracking-widest text-zinc-100 uppercase">
                Sushi<span className="font-bold text-red-600">HOOK</span>
              </span>
            </div>
            <p className="text-zinc-500 font-light max-w-sm mb-8">
              Elevando el arte milenario del sushi a través de una experiencia HOOK inmersiva y sabores excepcionales.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-zinc-100 text-sm tracking-widest uppercase mb-6 font-medium">Contacto</h4>
            <ul className="space-y-4 font-light text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Av. Vitacura 2345<br/>Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                <span>+56 9 8765 4321</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-600 shrink-0" />
                <span>concierge@SushiHook.cl</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-100 text-sm tracking-widest uppercase mb-6 font-medium">Horario</h4>
            <ul className="space-y-3 font-light text-sm text-zinc-400">
              <li className="flex justify-between">
                <span>Lun - Mié</span>
                <span>13:00 - 22:30</span>
              </li>
              <li className="flex justify-between">
                <span>Jue - Sáb</span>
                <span>13:00 - 23:30</span>
              </li>
              <li className="flex justify-between text-red-500">
                <span>Domingo</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 mt-4 flex flex-col items-center justify-center gap-6 text-xs font-light text-zinc-600 tracking-wider">
          
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 uppercase">
            <p className="text-zinc-500">© {new Date().getFullYear()} Sushi HOOK. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Términos</a>
            </div>
          </div>

          {/* Credits Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-8 mt-2 border-t border-zinc-800 w-full transition-opacity duration-300">
            
            <div className="flex items-center gap-3">
              <img src="/images/logo-sushihook.png" alt="SushiHook" className="h-7 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all" />
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">Respaldo Tecnológico</span>
              <a href="https://syrtix.com" target="_blank" rel="noreferrer" className="flex items-center hover:scale-105 transition-transform duration-300">
                <img 
                  src="/images/logo_syrtix.png" 
                  alt="Syrtix" 
                  className="h-7 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all"
                />
              </a>
            </div>

            <div className="hidden sm:block w-[2px] h-8 bg-zinc-700"></div>
            <div className="sm:hidden w-16 h-[2px] bg-zinc-700 my-1"></div>

          </div>

        </div>
      </div>
    </footer>
  );
};