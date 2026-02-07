export default function Collections({ categories, onCategoryClick }) {
  // Map hardcoded images for our fixed categories if needed, or use generic ones
  const categoryAssets = {
    bangles:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    nails:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    abayas:
      "https://images.unsplash.com/photo-1583267746897-2cf415888172?w=600&q=80",
    necklaces:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  };

  return (
    <section className="mb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-luxury-green font-bold tracking-[0.4em] uppercase text-xs mb-3 block">
            Curation
          </span>
          <h2 className="text-5xl font-black text-luxury-dark uppercase tracking-tighter italic">
            Seasonal{" "}
            <span className="text-luxury-green underline decoration-luxury-gold decoration-4 underline-offset-8">
              Collections
            </span>
          </h2>
        </div>
        <p className="text-gray-500 italic max-w-sm">
          "Style is a way to say who you are without having to speak."
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="group cursor-pointer relative h-96 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-luxury-light"
          >
            <img
              src={
                categoryAssets[category.id] ||
                "https://images.unsplash.com/photo-1541339907198-e08759df9a13?w=600"
              }
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 via-luxury-dark/20 to-transparent flex flex-col justify-end p-8">
              <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {category.icon}
                </div>
                <h3 className="text-3xl font-black mb-1">{category.name}</h3>
                <p className="text-luxury-gold font-bold tracking-widest text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  View Anthology →
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
