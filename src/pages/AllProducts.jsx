import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function AllProducts({ products, categories, handleAddToCart }) {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Handle URL category parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [location]);

  const filteredProducts = products
    .filter((product) => {
      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return b.id - a.id; // Latest
    });

  return (
    <div className="animate-fade-in py-10">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-luxury-dark mb-4 tracking-tight">
          Our Collection
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto italic">
          Discover our curated selection of luxury{" "}
          {categories.map((c) => c.name.toLowerCase()).join(", ")}.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-8">
          <div>
            <h3 className="font-bold text-luxury-dark mb-4 uppercase tracking-widest text-sm">
              Search
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Find your style..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-white border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none transition-all shadow-sm"
              />
              <span className="absolute right-4 top-3.5 opacity-30">🔍</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-luxury-dark mb-4 uppercase tracking-widest text-sm">
              Categories
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-3 rounded-xl text-left transition-all flex items-center gap-3 ${
                  selectedCategory === "all"
                    ? "bg-luxury-green text-white font-bold shadow-lg"
                    : "bg-white text-gray-600 hover:bg-luxury-light border border-luxury-light"
                }`}
              >
                <span>✨</span> All Items
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-3 rounded-xl text-left transition-all flex items-center gap-3 ${
                    selectedCategory === cat.id
                      ? "bg-luxury-green text-white font-bold shadow-lg"
                      : "bg-white text-gray-600 hover:bg-luxury-light border border-luxury-light"
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span> {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-luxury-dark mb-4 uppercase tracking-widest text-sm">
              Sort By
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-luxury-light rounded-xl focus:outline-none shadow-sm"
            >
              <option value="latest">Latest Items</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 px-2">
            <p className="text-gray-500 text-sm">
              Showing{" "}
              <span className="text-luxury-dark font-bold">
                {filteredProducts.length}
              </span>{" "}
              masterpieces
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-luxury-light shadow-sm">
              <span className="text-6xl mb-4 block">🕯️</span>
              <h3 className="text-xl font-bold text-luxury-dark mb-2">
                No matching pieces found
              </h3>
              <p className="text-gray-500 mb-6 font-light italic">
                Try adjusting your search or category filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
                className="mt-6 text-luxury-green font-bold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
