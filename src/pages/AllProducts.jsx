import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function AllProducts({ products = [], categories, handleAddToCart, toggleFavorite, favorites }) {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    const search = params.get("search");
    if (cat) setSelectedCategory(cat);
    if (search) setSearchTerm(search);
  }, [location]);

  const filteredProducts = products
    .filter((product) => {
      const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchSearch = !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">All Products</h1>
        <p className="text-gray-400 text-sm">
          {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand-champagne transition-colors"
          />
          <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-colors ${
              selectedCategory === "all" ? "bg-brand-walnut text-brand-cream" : "text-gray-500 hover:text-brand-walnut"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id || cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug ? "bg-brand-walnut text-brand-cream" : "text-gray-500 hover:text-brand-walnut"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-gray-50 border border-gray-200 text-sm focus:outline-none"
        >
          <option value="latest">Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              isFavorite={favorites.some(f => f.id === product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-4">No products found.</p>
          <button
            onClick={() => { setSelectedCategory("all"); setSearchTerm(""); }}
            className="text-sm font-medium underline hover:text-brand-champagne transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
