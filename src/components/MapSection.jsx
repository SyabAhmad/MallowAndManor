export default function MapSection() {
  return (
    <section className="py-12 bg-luxury-dark text-white overflow-hidden rounded-3xl mx-4 md:mx-0 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-luxury-gold font-bold tracking-[0.3em] uppercase text-[11px] mb-3 block">
            Nationwide Reach
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            Delivering Elegance <br />
            <span className="text-luxury-gold italic">All Over Pakistan</span>
          </h2>
          <p className="text-gray-400 text-sm mb-6 italic leading-relaxed max-w-lg">
            "From the vibrant streets of Karachi to the serene valleys of the
            North, Mallow & Manor ensures your luxury treasures reach you with
            royal care."
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-2xl group-hover:bg-luxury-gold group-hover:text-luxury-dark transition-all duration-300">
                🚚
              </div>
              <div>
                <h4 className="text-base font-bold">Swift Logistics</h4>
                <p className="text-gray-500 text-sm italic">
                  85+ Districts Covered Weekly
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-2xl group-hover:bg-luxury-gold group-hover:text-luxury-dark transition-all duration-300">
                📦
              </div>
              <div>
                <h4 className="text-base font-bold">Secure Packaging</h4>
                <p className="text-gray-500 text-sm italic">
                  Double-Jeweled Protective Tucks
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-luxury-dark">
          {/* Google Maps Embed - Free iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13605435.82338966!2d60.93428445!3d30.375321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db52d2f3d59673%3A0x7f7409cf6da3f30f!2sPakistan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="opacity-40 grayscale"
            title="Pakistan Map"
          ></iframe>

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/50 via-transparent to-luxury-dark/70 pointer-events-none"></div>

          {/* Decorative truck */}
          <div className="absolute bottom-6 right-6 z-20">
            <div className="bg-luxury-gold text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 font-bold text-xs animate-bounce">
              🚚 Delivery In Progress
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
