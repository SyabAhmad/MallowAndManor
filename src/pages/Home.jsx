import { useNavigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import Collections from "../components/Collections";
import ProductsSection from "../components/ProductsSection";

export default function Home({ products, categories, handleAddToCart, productStats = {} }) {
  const navigate = useNavigate();

  return (
    <div>
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
        products={products}
        onAddToCart={handleAddToCart}
        productStats={productStats}
      />

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
            <div className="bg-luxury-dark text-white p-10 lg:p-14 flex flex-col justify-center">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-white/40 mb-4 block">
                Nationwide Reach
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Delivering Elegance<br />All Over Pakistan
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                From the vibrant streets of Karachi to the serene valleys of the North,
                we ensure your luxury treasures reach you with care.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot"].map((city) => (
                  <div key={city} className="flex items-center gap-2 text-sm text-white/70">
                    <svg className="w-3 h-3 text-luxury-gold shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {city}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm text-white/50 border-t border-white/10 pt-6">
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
      <section className="py-20 bg-luxury-light">
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
        <div className="bg-luxury-dark py-16 px-8 md:px-16 text-center text-white">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-white/50 mb-4 block">
            Stay Connected
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-8">
            Sign up for early access to exclusive drops and seasonal events.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
            />
            <button className="px-8 py-3 bg-white text-luxury-dark text-sm font-semibold tracking-wider uppercase hover:bg-luxury-gold hover:text-white transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
