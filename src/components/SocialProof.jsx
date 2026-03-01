import React from 'react';
import { Instagram } from 'lucide-react';

const SOCIAL_POSTS = [
  "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400&auto=format&fit=crop", // 0
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400&auto=format&fit=crop", // 1
  "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=400&auto=format&fit=crop", // 2
  "https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=400&auto=format&fit=crop", // 3
  "/images/sushiburger.png", // 4
  "/images/hallroll.webp", // 5
];

export const SocialProof = () => {
  return (
    <section id="social" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <Instagram className="w-10 h-10 text-zinc-500 mb-4" />
          <h2 className="text-3xl font-light text-zinc-200 tracking-wide mb-2">
            @SushiHookSushi
          </h2>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">
            Comparte tu experiencia #SushiExperience
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {SOCIAL_POSTS.map((img, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-zinc-900 rounded-lg">
              <img 
                src={img} 
                alt={`Social Feed ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="text-white w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};