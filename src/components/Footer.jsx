import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-luxury-dark text-white mt-16 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              to="/"
              className="text-3xl font-black flex items-center gap-2 tracking-tighter italic"
            >
              <span className="text-luxury-gold">👑</span> Mallow & Manor
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md italic">
              "Redefining elegance for the modern soul. Our curated anthology of
              bangles, abayas, and accessories is designed to celebrate your
              unique identity."
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/mallowandmanor/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-luxury-gold hover:border-luxury-gold transition-all group"
                aria-label="Instagram"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  📸
                </span>
              </a>
              <a
                href="https://www.tiktok.com/@mallowandmanor?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-luxury-gold hover:border-luxury-gold transition-all group"
                aria-label="TikTok"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  ♪
                </span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-luxury-gold tracking-widest uppercase text-xs mb-6">
              Collections
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-luxury-gold transition-colors block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-luxury-gold transition-colors block"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-luxury-gold transition-colors block"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-luxury-gold transition-colors block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-luxury-gold tracking-widest uppercase text-xs mb-6">
              Support
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link
                  to="#"
                  className="hover:text-luxury-gold transition-colors block"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-luxury-gold transition-colors block"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-luxury-gold transition-colors block"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="hover:text-luxury-gold transition-colors block"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-luxury-gold tracking-widest uppercase text-xs mb-6">
              Connect
            </h4>
            <div className="space-y-4 text-gray-400">
              <p className="flex items-center gap-3">
                <span className="text-luxury-gold">📞</span> +92 344 4778119
              </p>
              <p className="flex items-center gap-3 break-all">
                <span className="text-luxury-gold">📧</span>{" "}
                hello@mallowandmanor.com
              </p>
              <p className="flex items-center gap-3">
                <span className="text-luxury-gold">📍</span> Pakistan | Luxury
                Headquarters
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>&copy; 2026 Mallow & Manor. Royal Elegance Defined.</p>
          <div className="flex gap-8 mt-4 md:mt-0 uppercase tracking-widest">
            <Link to="#" className="hover:text-luxury-gold transition-colors">
              Privacy
            </Link>
            <Link to="#" className="hover:text-luxury-gold transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
