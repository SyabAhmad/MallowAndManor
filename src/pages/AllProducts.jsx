import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function AllProducts({ products = [], categories, handleAddToCart, productStats = {} }) {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Debug
  console.log("AllProducts received:", products.length, "products");

  // Handle URL search parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    const search = params.get("search");

    if (cat) {
      setSelectedCategory(cat);
    }
    if (search) {
      setSearchTerm(search);
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
      return new Date(b.createdAt) - new Date(a.createdAt); // Latest
    });

  return (
<div className="animate-fade-in py-8">
       <div className="text-center mb-10">
         <h1 className="text-3xl font-black text-luxury-dark mb-2 tracking-tight">
           Our Collection
         </h1>
         <p className="text-gray-500 text-sm italic">
           Discover our curated selection of luxury{" "}
           {categories.map((c) => c.name.toLowerCase()).join(", ")}.
         </p>
       </div>

       <div className="flex flex-col lg:flex-row gap-6 mb-8">
         {/* Filters Sidebar */}
         <div className="lg:w-56 space-y-6">
           <div>
             <h3 className="font-bold text-luxury-dark mb-3 uppercase tracking-widest text-[11px]">
               Search
             </h3>
             <div className="relative">
               <input
                 type="text"
                 placeholder="Find your style..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-3 pr-8 py-2 bg-white border border-luxury-light rounded-lg focus:border-luxury-green focus:outline-none transition-all text-sm shadow-sm"
               />
               <span className="absolute right-3 top-2.5 opacity-30 text-sm">🔍</span>
             </div>
           </div>

           <div>
             <h3 className="font-bold text-luxury-dark mb-3 uppercase tracking-widest text-[11px]">
               Categories
             </h3>
             <div className="flex flex-wrap lg:flex-col gap-1.5">
               <button
                 onClick={() => setSelectedCategory("all")}
                 className={`px-3 py-2 rounded-lg text-left transition-all flex items-center gap-2 text-sm ${
                   selectedCategory === "all"
                     ? "bg-luxury-green text-white font-bold shadow-md"
                     : "bg-white text-gray-600 hover:bg-luxury-light border border-luxury-light"
                 }`}
               >
                 <span className="text-sm">✨</span> All Items
               </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id || cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-2 rounded-lg text-left transition-all flex items-center gap-2 text-sm ${
                      selectedCategory === cat.slug
                        ? "bg-luxury-green text-white font-bold shadow-md"
                        : "bg-white text-gray-600 hover:bg-luxury-light border border-luxury-light"
                    }`}
                  >
                    <span className="text-sm">{cat.icon}</span> {cat.name}
                  </button>
                ))}
             </div>
           </div>

           <div>
             <h3 className="font-bold text-luxury-dark mb-3 uppercase tracking-widest text-[11px]">
               Sort By
             </h3>
             <select
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
               className="w-full px-3 py-2 bg-white border border-luxury-light rounded-lg focus:outline-none shadow-sm text-sm"
             >
               <option value="latest">Latest Items</option>
               <option value="price-low">Price: Low to High</option>
               <option value="price-high">Price: High to Low</option>
             </select>
           </div>
         </div>

         {/* Product Grid */}
         <div className="flex-1">
           <div className="flex justify-between items-center mb-4 px-2">
             <p className="text-gray-500 text-xs">
               Showing{" "}
               <span className="text-luxury-dark font-bold">
                 {filteredProducts.length}
               </span>{" "}
               items
             </p>
           </div>

           {filteredProducts.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
{filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    stats={productStats[product.id] || { views: 0, cartAdds: 0 }}
                  />
                ))}
             </div>
           ) : (
             <div className="text-center py-16 bg-white rounded-2xl border border-luxury-light shadow-sm">
               <span className="text-4xl mb-3 block">🕯️</span>
               <h3 className="text-xl font-bold text-luxury-dark mb-2">
                 No matching items found
               </h3>
               <p className="text-gray-500 mb-4 text-sm italic">
                 Try adjusting your search or category filters.
               </p>
               <button
                 onClick={() => {
                   setSelectedCategory("all");
                   setSearchTerm("");
                 }}
                 className="mt-4 text-luxury-green font-bold underline text-sm"
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
