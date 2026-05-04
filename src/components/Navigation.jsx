import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navigation({ cartCount, favCount, categories }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsMobileMenuOpen(false);
    }
  };

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

          {/* Center - Empty or minimal */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            {/* Empty - removed Today's Deals, Brands, Categories, Delivery */}
          </div>

          {/* Right Side - Search, Cart, Favorites */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="w-40 lg:w-56 px-4 py-2 bg-luxury-light/50 border border-luxury-light rounded-full focus:border-luxury-green focus:outline-none transition-all text-xs font-medium"
              />
              <span
                className="absolute right-3 text-xs opacity-30 cursor-pointer"
                onClick={() => {
                  if (searchTerm.trim()) {
                    navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
                    setSearchTerm("");
                  }
                }}
              >
                🔍
              </span>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full px-4 py-2.5 bg-luxury-light/50 border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none text-sm"
            />
            <span
              className="absolute right-4 top-3 opacity-30 cursor-pointer"
              onClick={() => {
                if (searchTerm.trim()) {
                  navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
                  setSearchTerm("");
                  setIsMobileMenuOpen(false);
                }
              }}
            >
              🔍
            </span>
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
