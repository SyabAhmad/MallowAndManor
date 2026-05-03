export default function About() {
  const stats = [
    { label: "Founded", value: "2024" },
    { label: "Happy Clients", value: "10K+" },
    { label: "Curated Items", value: "500+" },
    { label: "Global Offices", value: "3" },
  ];

  const values = [
    {
      title: "Quality Over Quantity",
      desc: "We don't sell everything. We sell the *right* things. Each item in our store is personally selected for its exceptional quality and design.",
      icon: "💎",
    },
    {
      title: "Global Craftsmanship",
      desc: "From the finest silk to the most precise watch movements, we source from artisans worldwide who live and breathe their craft.",
      icon: "🌍",
    },
    {
      title: "Seamless Luxury",
      desc: "Our unique WhatsApp integration ensures that your shopping experience is personal, fast, and human-centric.",
      icon: "✨",
    },
  ];

  return (
    <div className="animate-fade-in py-8 max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12 flex items-center justify-center p-8 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08759df9a13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-luxury-dark/60 backdrop-blur-[2px]"></div>

        <div className="relative z-10 max-w-3xl">
          <span className="text-luxury-gold font-bold tracking-[0.3em] uppercase text-[11px] mb-3 block">
            Our Story
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Crafting a Legacy of Elegance
          </h1>
          <p className="text-base text-gray-200 leading-relaxed font-light italic">
            "Mallow & Manor was born from a simple desire: to make high-end
            luxury accessible, personal, and profoundly simple for the modern
            connoisseur."
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-luxury-dark leading-snug">
            Defining Luxury for a{" "}
            <span className="text-luxury-green italic underline decoration-luxury-gold decoration-2 underline-offset-4">
              New Generation
            </span>
          </h2>
          <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
            <p>
              In a world of mass production, we stand for the unique. Mallow &
              Manor is not just an e-commerce platform; it's a curated gallery
              of excellence. Starting from a small boutique in 2024, our vision
              was to bridge the gap between digital convenience and the personal
              touch of a private concierge.
            </p>
            <p>
              We specialize in artisanal bangles, handcrafted abayas, boutique
              nails, and exclusive necklaces—items that are intimate, personal,
              and essential to your identity.
            </p>
          </div>
          <div className="flex gap-8 border-t border-luxury-light pt-6">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-black text-luxury-green">
                  {stat.value}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-luxury-light rounded-2xl overflow-hidden hover:rotate-0 transition-transform duration-500 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1491336477066-31156b5e4f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Classic Style"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Decorative badge */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-luxury-gold text-white rounded-full flex items-center justify-center p-4 text-center shadow-xl rotate-6">
            <p className="text-xs font-bold leading-tight">
              Est. 2024 • Trusted Originality
            </p>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-black text-luxury-dark text-center mb-8 underline decoration-luxury-green decoration-2 underline-offset-4">
          Our Core Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-luxury-light hover:border-luxury-green transition-all duration-300 group shadow-sm hover:shadow-lg"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {v.icon}
              </div>
              <h3 className="text-xl font-black text-luxury-dark mb-2">
                {v.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed italic">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-luxury-dark rounded-2xl p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <span className="text-luxury-gold font-bold tracking-[0.3em] uppercase text-[11px] mb-3 block">
            Exclusive Access
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            Join the Elite Circle
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            Experience luxury redefined. Every order is handled with the
            personal care you deserve.
          </p>
          <button
            onClick={() => (window.location.href = "/products")}
            className="px-6 py-2.5 bg-luxury-gold text-luxury-dark font-black rounded-full hover:bg-white transition-all duration-300 shadow-lg text-sm"
          >
            Explore Collections →
          </button>
        </div>
      </div>
    </div>
  );
}
