import { useNavigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import Collections from "../components/Collections";
import ProductsSection from "../components/ProductsSection";
import TrustBadges from "../components/TrustBadges";
import Philosophy from "../components/Philosophy";
import MapSection from "../components/MapSection";

export default function Home({ products, categories, handleAddToCart }) {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in space-y-24 pb-20">
      {/* Hero Carousel */}
      <section>
        <HeroCarousel />
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Collections */}
      <Collections
        categories={categories}
        onCategoryClick={(cat) => {
          navigate(`/products?category=${cat}`);
        }}
      />

      {/* Philosophy Section */}
      <Philosophy />

      {/* Products Section */}
      <ProductsSection
        products={products}
        categories={categories}
        onAddToCart={handleAddToCart}
      />

      {/* Nationwide Map Section */}
      <MapSection />

      {/* Newsletter / Final CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-luxury-dark rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-green/20 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-[2s]"></div>
          <div className="relative z-10">
            <span className="text-luxury-gold font-bold tracking-[0.4em] uppercase text-sm mb-6 block">
              Join the Elite
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Mallow & Manor <br />
              <span className="italic font-light text-gray-300">Privé</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 italic leading-relaxed">
              Sign up for early access to our most exclusive drops and private
              seasonal events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-luxury-gold transition-all text-white"
              />
              <button className="px-10 py-5 bg-white text-luxury-dark font-black rounded-full hover:bg-luxury-gold hover:text-white transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
