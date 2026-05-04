// Static seasonal collections with your own images
const seasonalCollections = [
  {
    id: "bangles",
    name: "Bangles",
    icon: "💍",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  },
  {
    id: "nails",
    name: "Nails",
    icon: "💅",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
  },
  {
    id: "abayas",
    name: "Abayas",
    icon: "👗",
    image: "https://images.unsplash.com/photo-1583267746897-2cf415888172?w=600&q=80",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    icon: "✨",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
];

export default function Collections({ onCategoryClick }) {
  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-luxury-green font-bold tracking-[0.3em] uppercase text-[11px] mb-2 block">
            Curation
          </span>
          <h2 className="text-3xl font-black text-luxury-dark uppercase tracking-tighter italic">
            Seasonal{" "}
            <span className="text-luxury-green underline decoration-luxury-gold decoration-2 underline-offset-4">
              Collections
            </span>
          </h2>
        </div>
        <p className="text-gray-500 italic text-sm max-w-sm">
          "Style is a way to say who you are without having to speak."
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {seasonalCollections.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="group cursor-pointer relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-luxury-light"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 via-luxury-dark/20 to-transparent flex flex-col justify-end p-5">
              <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {category.icon}
                </div>
                <h3 className="text-xl font-black mb-1">{category.name}</h3>
                <p className="text-luxury-gold font-bold tracking-widest text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
