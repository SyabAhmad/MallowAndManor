import { useState, useEffect } from "react";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Royal Adornments",
      subtitle: "Exquisite Bangles & Necklaces for True Royalty",
      image: "MallowAndManor.jpeg",
      accent: "text-luxury-green",
    },
    {
      title: "Silk & Sobriety",
      subtitle: "Designer Abayas for Unmatched Grace",
      image:
        "https://images.unsplash.com/photo-1583267746897-2cf415888172?q=80&w=1587&auto=format&fit=crop",
      accent: "text-luxury-gold",
    },
    {
      title: "Precision Artistry",
      subtitle: "Custom Nails That Tell a Story",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1632&auto=format&fit=crop",
      accent: "text-white",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-[2.5rem] shadow-2xl mb-20 group">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
            idx === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start px-12 md:px-24">
            <div className="animate-fade-in space-y-4">
              <span
                className={`uppercase tracking-[0.4em] font-bold text-xs ${slide.accent}`}
              >
                New Arrivals
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-2 max-w-2xl drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-xl">
                {slide.subtitle}
              </p>
              <button className="bg-white text-luxury-dark px-10 py-4 rounded-full font-bold hover:bg-luxury-green hover:text-white transition-all transform hover:scale-110 shadow-xl">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Decorative Dots */}
      <div className="absolute bottom-10 left-12 flex gap-3 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-500 rounded-full ${
              idx === currentSlide
                ? "bg-white w-12 h-2.5"
                : "bg-white/30 w-2.5 h-2.5 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
