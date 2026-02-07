export default function Philosophy() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <span className="text-luxury-green font-bold tracking-[0.5em] uppercase text-xs mb-6 block">
            Our Essence
          </span>
          <h2 className="text-6xl font-black text-luxury-dark mb-8 leading-tight">
            The Art of{" "}
            <span className="text-luxury-green italic">Refinement</span>
          </h2>
          <div className="space-y-6 text-gray-500 text-lg leading-relaxed italic">
            <p>
              "We believe that luxury isn't about the price tag; it's about the
              feeling of wearing something that was created with intention."
            </p>
            <p>
              Mallow & Manor was founded on the principle of curated elegance.
              We don't just sell abayas and bangles; we provide the artifacts of
              a life well-lived.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/about")}
            className="mt-10 px-10 py-5 bg-luxury-dark text-white font-black rounded-full hover:bg-luxury-gold transition-all duration-300 shadow-xl"
          >
            Read Our Story
          </button>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
            <img
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1470&auto=format&fit=crop"
              alt="Luxury Minimal"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-luxury-light rounded-full -z-0 opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-luxury-gold/20 rounded-full -z-0"></div>

          <div className="absolute top-1/2 -right-12 translate-y-[-50%] z-20 hidden lg:block">
            <div className="bg-luxury-dark text-white p-10 rounded-3xl shadow-2xl rotate-3 max-w-[200px]">
              <p className="text-2xl font-black italic mb-2">100%</p>
              <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">
                Original Bespoke Designs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
