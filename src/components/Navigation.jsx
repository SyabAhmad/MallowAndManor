import { Link } from "react-router-dom";

export default function Navigation({ cartCount, favCount, categories }) {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-luxury-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">
            👑
          </span>
          <h1 className="text-2xl font-black text-luxury-green tracking-tighter uppercase italic">
            Mallow & Manor
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-luxury-green transition-colors font-bold uppercase text-xs tracking-widest border-b-2 border-transparent hover:border-luxury-green"
          >
            Home
          </Link>

          {/* Catalog with Dropdown */}
          <div className="relative group/catalog">
            <Link
              to="/products"
              className="text-gray-700 hover:text-luxury-green transition-colors font-bold uppercase text-xs tracking-widest border-b-2 border-transparent hover:border-luxury-green flex items-center gap-1"
            >
              Catalog <span className="text-[8px] opacity-40">▼</span>
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute top-full -left-4 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/catalog:opacity-100 group-hover/catalog:translate-y-0 group-hover/catalog:pointer-events-auto transition-all duration-300">
              <div className="bg-white border border-luxury-light shadow-2xl rounded-2xl p-4 w-48 backdrop-blur-xl">
                {categories &&
                  categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-luxury-light rounded-xl transition-colors text-gray-700 hover:text-luxury-green font-bold text-xs uppercase tracking-wider"
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                <div className="border-t border-luxury-light mt-2 pt-2">
                  <Link
                    to="/products"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-luxury-light rounded-xl transition-colors text-luxury-green font-bold text-xs uppercase tracking-wider"
                  >
                    <span>✨</span> View All
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/about"
            className="text-gray-700 hover:text-luxury-green transition-colors font-bold uppercase text-xs tracking-widest border-b-2 border-transparent hover:border-luxury-green"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-luxury-green transition-colors font-bold uppercase text-xs tracking-widest border-b-2 border-transparent hover:border-luxury-green"
          >
            Contact
          </Link>
        </div>

        {/* Cart & Favorites */}
        <div className="flex items-center gap-4">
          <Link
            to="/favorites"
            className="relative group p-2 rounded-full hover:bg-luxury-light transition-colors"
          >
            <span className="text-2xl">♡</span>
            {favCount > 0 && (
              <span className="absolute top-0 right-0 bg-luxury-gold text-luxury-dark text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {favCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative group p-2 rounded-full hover:bg-luxury-light transition-colors"
          >
            <span className="text-2xl">🛍️</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-luxury-green text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
