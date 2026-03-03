import React from 'react';
import { Instagram } from 'lucide-react';

const SOCIAL_POSTS = [
  "/images/images-social/social-sushi.webp",
  "/images/images-social/social-sushi2.jpg",
  "/images/images-social/sosial-sushi3.avif",
  "/images/images-social/social-sushi4.jpg",
  "/images/images-social/social-sushi5.webp",
  "/images/images-social/social-sishi6.jpeg",
  "/images/images-social/social-sushi7.jpg",
  "/images/images-social/social-sushi8.jpeg",
  "/images/images-social/Tips-comer-sushi.jpg",
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
