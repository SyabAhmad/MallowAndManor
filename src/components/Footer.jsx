export default function Footer() {
  return (
    <footer className="bg-luxury-dark text-white mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>💚</span> Mallow & Manor
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Luxury meets affordability. Curated collection of premium products
              delivered with care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Shop All
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Get In Touch</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <p>📞 +1 (000) 000-0000</p>
              <p>📧 hello@mallowandmanor.com</p>
              <p>📍 Luxury Lane, City, Country</p>
              <div className="flex gap-3 mt-4">
                <a
                  href="#"
                  className="text-luxury-gold hover:text-white transition-colors"
                >
                  💬
                </a>
                <a
                  href="#"
                  className="text-luxury-gold hover:text-white transition-colors"
                >
                  📱
                </a>
                <a
                  href="#"
                  className="text-luxury-gold hover:text-white transition-colors"
                >
                  ✉️
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-luxury-green/20 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2026 Mallow & Manor. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-luxury-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-luxury-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
