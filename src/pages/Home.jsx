import { useNavigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import Collections from "../components/Collections";
import ProductsSection from "../components/ProductsSection";
import OfferHeadline from "../components/OfferHeadline";

export default function Home({ products, categories, handleAddToCart, productStats = {}, toggleFavorite, favorites }) {
  const navigate = useNavigate();

  return (
    <div>
      {/* Offer Banner */}
      <OfferHeadline text="✦ SALE SALE SALE ✦ Flat 30% Off on All Abayas ✦ Use Code: GULW30 ✦ Flat 20% Off on Bangles ✦ Use Code: BANGLE20" />

      {/* Hero */}
      <HeroCarousel />

      {/* Trust bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-1">Free Shipping</h4>
            <p className="text-xs text-gray-400">On all orders over Rs. 5,000</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-1">Handcrafted</h4>
            <p className="text-xs text-gray-400">Every piece made with intention</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-1">Premium Quality</h4>
            <p className="text-xs text-gray-400">Curated for excellence</p>
          </div>
        </div>
      </div>

      {/* Collections */}
      <Collections
        onCategoryClick={(cat) => navigate(`/products?category=${cat}`)}
      />

      {/* Featured Products */}
      <ProductsSection
        onAddToCart={handleAddToCart}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      {/* Second Offer Banner - Gold themed */}
      <div
        className="w-full overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 45%, #1a1a1a 100%)",
          padding: "14px 0",
        }}
      >
        <div
          className="flex w-max whitespace-nowrap"
          style={{
            animationName: "marquee",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDuration: "280s",
            animationDirection: "reverse",
            willChange: "transform",
          }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-3 px-10 text-xs font-bold tracking-[0.2em] uppercase select-none"
                  style={{ color: "#C9A84C" }}
                >
                  <span
                    className="w-2 h-2 rotate-45 shrink-0"
                    style={{ backgroundColor: "#C9A84C" }}
                  />
                  ✨ Sale is Live ✨ Free Delivery on Orders Over Rs.5000 ✨ Use Code: FREESHIP ✨
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Location / Delivery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Map */}
            <div className="relative h-[350px] lg:h-auto lg:min-h-[450px] bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13605435.82338966!2d60.93428445!3d30.375321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db52d2f3d59673%3A0x7f7409cf6da3f30f!2sPakistan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80"
                title="Pakistan Delivery Map"
              />
            </div>

            {/* Info */}
            <div className="bg-brand-black text-brand-cream p-10 lg:p-14 flex flex-col justify-center">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-brand-cream/40 mb-4 block">
                Nationwide Reach
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Delivering Elegance<br />All Over Pakistan
              </h2>
              <p className="text-brand-cream/50 text-sm leading-relaxed mb-8">
                From the vibrant streets of Karachi to the serene valleys of the North,
                we ensure your luxury treasures reach you with care.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot"].map((city) => (
                  <div key={city} className="flex items-center gap-2 text-sm text-brand-cream/70">
                    <svg className="w-3 h-3 text-brand-gold shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {city}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm text-brand-cream/50 border-t border-brand-cream/10 pt-6">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  85+ Districts
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Free over Rs. 5,000
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Material callout */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-4 block">
              What We're Made Of
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Thoughtfully Sourced
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { name: "Artisanal Craft", desc: "Handpicked by experts" },
              { name: "Premium Materials", desc: "Quality you can feel" },
              { name: "Sustainable", desc: "Less waste, more beauty" },
              { name: "Nationwide Delivery", desc: "Across all of Pakistan" },
            ].map((item, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold tracking-wider uppercase mb-2">{item.name}</h4>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-brand-black py-16 px-8 md:px-16 text-center text-brand-cream">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-brand-cream/50 mb-4 block">
            Stay Connected
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-brand-cream/50 text-sm max-w-md mx-auto mb-8">
            Sign up for early access to exclusive drops and seasonal events.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-brand-cream/10 border border-brand-cream/20 text-brand-cream text-sm placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-cream/50 transition-colors"
            />
            <button className="px-8 py-3 bg-brand-cream text-brand-dark text-sm font-semibold tracking-wider uppercase hover:bg-brand-gold hover:text-brand-cream transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
