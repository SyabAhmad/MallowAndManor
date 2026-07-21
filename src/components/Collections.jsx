const collections = [
  {
    id: "bangles",
    name: "Bangles",
    tagline: "Artisanal adornments",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  },
  {
    id: "nails",
    name: "Nails",
    tagline: "Precision artistry",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
  },
  {
    id: "abayas",
    name: "Abayas",
    tagline: "Silk & sobriety",
    image: "https://images.unsplash.com/photo-1583267746897-2cf415888172?w=600&q=80",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    tagline: "Royal adornments",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
];

export default function Collections({ onCategoryClick }) {
  return (
    <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-4 block">
          Collections
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {collections.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-1">
              {category.name}
            </h3>
            <p className="text-xs text-gray-400">{category.tagline}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
