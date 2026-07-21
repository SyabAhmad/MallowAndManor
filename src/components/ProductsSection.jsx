import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductsSection({ products = [], onAddToCart, productStats = {} }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = (products || [])
    .filter((product) => {
      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <section id="products" className="py-12 border-t border-luxury-light">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div className="max-w-xl">
          <span className="text-luxury-green font-bold tracking-[0.4em] uppercase text-xs mb-3 block">
            Discovery
          </span>
          <h2 className="text-3xl font-black text-luxury-dark uppercase tracking-tighter mb-2">
            Curated <span className="text-luxury-green italic">Selection</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Explore our handcrafted pieces designed for excellence and elegance.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="w-full md:w-auto space-y-4">
          {/* Search Bar */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search masterpieces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 px-4 py-3 bg-white border border-luxury-light rounded-2xl focus:border-luxury-green focus:outline-none transition-all shadow-sm group-hover:shadow-md"
            />
            <span className="absolute right-4 top-3.5 opacity-20 group-hover:opacity-100 transition-opacity">
              🔍
            </span>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap border-2 ${
                selectedCategory === "all"
                  ? "bg-luxury-dark text-white border-luxury-dark shadow-lg ring-2 ring-luxury-dark ring-offset-2"
                  : "bg-white text-gray-500 border-luxury-light hover:border-luxury-green hover:text-luxury-green"
              }`}
            >
              All Items
            </button>
            {["bangles", "nails", "abayas", "necklaces"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap border-2 capitalize ${
                  selectedCategory === cat
                    ? "bg-luxury-green text-white border-luxury-green shadow-lg ring-2 ring-luxury-green ring-offset-2"
                    : "bg-white text-gray-400 border-luxury-light hover:border-luxury-green hover:text-luxury-green"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
{filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => onAddToCart(product)}
                stats={productStats[product.id] || { views: 0, cartAdds: 0 }}
              />
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found. Try adjusting your search or filters.
          </p>
        </div>
      )}
    </section>
  );
}
