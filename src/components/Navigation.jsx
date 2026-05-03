import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation({ cartCount, favCount, categories }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const locations = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad",
    "Multan", "Peshawar", "Quetta", "Hyderabad", "Sialkot"
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-luxury-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">
              👑
            </span>
            <h1 className="text-lg font-black text-luxury-green tracking-tighter uppercase italic hidden sm:block">
              Mallow & Manor
            </h1>
          </Link>

          {/* Center - Navigation Items */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {/* Today's Deals Button */}
            <Link
              to="/products?sort=deals"
              className="px-4 py-2 bg-luxury-gold/10 text-luxury-gold hover:bg-luxury-gold hover:text-white transition-all rounded-full font-bold uppercase text-[11px] tracking-wider border border-luxury-gold/30"
            >
              Today's Deals
            </Link>

            {/* Brand Dropdown */}
            <div className="relative" onMouseEnter={() => setIsBrandOpen(true)} onMouseLeave={() => setIsBrandOpen(false)}>
              <button className="px-3 py-2 text-gray-700 hover:text-luxury-green transition-colors font-semibold uppercase text-[11px] tracking-widest flex items-center gap-1">
                Brands <span className="text-[8px] opacity-40">▼</span>
              </button>
              {isBrandOpen && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-white border border-luxury-light shadow-xl rounded-xl p-2">
                    <Link to="/products?brand=premium" className="block px-4 py-2 hover:bg-luxury-light rounded-lg text-gray-700 hover:text-luxury-green font-semibold text-xs uppercase tracking-wider transition-colors">
                      Premium Collection
                    </Link>
                    <Link to="/products?brand=luxury" className="block px-4 py-2 hover:bg-luxury-light rounded-lg text-gray-700 hover:text-luxury-green font-semibold text-xs uppercase tracking-wider transition-colors">
                      Luxury Line
                    </Link>
                    <Link to="/products?brand=exclusive" className="block px-4 py-2 hover:bg-luxury-light rounded-lg text-gray-700 hover:text-luxury-green font-semibold text-xs uppercase tracking-wider transition-colors">
                      Exclusive Edits
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div className="relative" onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}>
              <button className="px-3 py-2 text-gray-700 hover:text-luxury-green transition-colors font-semibold uppercase text-[11px] tracking-widest flex items-center gap-1">
                Categories <span className="text-[8px] opacity-40">▼</span>
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full left-0 pt-2 w-52">
                  <div className="bg-white border border-luxury-light shadow-xl rounded-xl p-2">
                    {categories && categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.id}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-luxury-light rounded-lg transition-colors text-gray-700 hover:text-luxury-green font-semibold text-xs uppercase tracking-wider"
                      >
                        <span>{cat.icon}</span>
                        {cat.name}
                      </Link>
                    ))}
                    <div className="border-t border-luxury-light mt-1 pt-1">
                      <Link
                        to="/products"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-luxury-light rounded-lg transition-colors text-luxury-green font-semibold text-xs uppercase tracking-wider"
                      >
                        ✨ View All
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div className="relative" onMouseEnter={() => setIsLocationOpen(true)} onMouseLeave={() => setIsLocationOpen(false)}>
              <button className="px-3 py-2 text-gray-700 hover:text-luxury-green transition-colors font-semibold uppercase text-[11px] tracking-widest flex items-center gap-1">
                📍 Deliver To <span className="text-[8px] opacity-40">▼</span>
              </button>
              {isLocationOpen && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-white border border-luxury-light shadow-xl rounded-xl p-2 max-h-64 overflow-y-auto">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        className="block w-full text-left px-4 py-2 hover:bg-luxury-light rounded-lg text-gray-700 hover:text-luxury-green font-semibold text-xs uppercase tracking-wider transition-colors"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Search, Cart, Favorites */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-40 lg:w-56 px-4 py-2 bg-luxury-light/50 border border-luxury-light rounded-full focus:border-luxury-green focus:outline-none transition-all text-xs font-medium"
              />
              <span className="absolute right-3 text-xs opacity-30">🔍</span>
            </div>

            {/* Favorites */}
            <Link
              to="/favorites"
              className="relative group p-2 rounded-full hover:bg-luxury-light transition-colors"
            >
              <span className="text-xl">♡</span>
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-dark text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative group p-2 rounded-full hover:bg-luxury-light transition-colors"
            >
              <span className="text-xl">🛍️</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-green text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-luxury-green"
            >
              {isMobileMenuOpen ? (
                <span className="text-xl">✕</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-luxury-light ${
          isMobileMenuOpen ? "max-h-[80vh] py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="px-6 flex flex-col gap-4">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2.5 bg-luxury-light/50 border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none text-sm"
            />
            <span className="absolute right-4 top-3 opacity-30">🔍</span>
          </div>

          <Link to="/products?sort=deals" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 bg-luxury-gold/10 text-luxury-gold rounded-xl font-bold uppercase text-xs tracking-widest border border-luxury-gold/30 text-center">
            Today's Deals
          </Link>

          <div className="space-y-2">
            <p className="text-luxury-green font-black uppercase text-xs tracking-widest">Categories</p>
            {categories && categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 bg-luxury-light/30 rounded-lg text-gray-700 font-semibold text-xs uppercase tracking-wider"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>

          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-semibold uppercase text-xs tracking-widest py-2">
            About
          </Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-semibold uppercase text-xs tracking-widest py-2">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
