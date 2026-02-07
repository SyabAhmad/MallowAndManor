import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          p-4 rounded-full shadow-2xl transition-all duration-500 transform
          ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-50 pointer-events-none"}
          bg-luxury-dark text-white hover:bg-luxury-green hover:scale-110 active:scale-90
          border-2 border-luxury-gold/30 group
        `}
      >
        <span className="text-xl block group-hover:-translate-y-1 transition-transform">
          ▲
        </span>
        <span className="text-[10px] font-black uppercase tracking-tighter mt-1 block">
          Top
        </span>
      </button>
    </div>
  );
}
