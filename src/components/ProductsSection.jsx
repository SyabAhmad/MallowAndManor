import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductsSection({ products = [], onAddToCart, productStats = {}, favorites = [], onToggleFavorite }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = (products || [])
    .filter((product) => {
      return selectedCategory === "all" || product.category === selectedCategory;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-4 block">
            Discovery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Curated Selection
          </h2>
        </div>

        {/* Category filters */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {[
            { id: "all", label: "All" },
            { id: "bangles", label: "Bangles" },
            { id: "nails", label: "Nails" },
            { id: "abayas", label: "Abayas" },
            { id: "necklaces", label: "Necklaces" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-luxury-dark text-white"
                  : "text-gray-500 hover:text-luxury-dark"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart(product)}
              stats={productStats[product.id] || { views: 0, cartAdds: 0 }}
              isFavorite={favorites.some(f => f.id === product.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400">
            No products found. Try adjusting your filters.
          </p>
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="text-center mt-12">
          <button
            onClick={() => (window.location.href = "/products")}
            className="text-sm font-semibold tracking-wider uppercase border-b-2 border-luxury-dark pb-1 hover:text-luxury-green hover:border-luxury-green transition-colors"
          >
            View All Products
          </button>
        </div>
      )}
    </section>
  );
}
