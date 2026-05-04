import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart, stats = { views: 0, cartAdds: 0 } }) {
  const [selectedImage, setSelectedImage] = useState(product.mainImage);

  // Debug
  console.log("ProductCard stats for", product.id, stats);

  return (
<div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-luxury-light group flex flex-col h-full">
       {/* Main Image Container */}
       <Link
         to={`/product/${product.id}`}
         className="relative h-48 overflow-hidden block"
       >
         <img
           src={selectedImage}
           alt={product.name}
           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
         />
         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

         {/* Category Label */}
         <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-luxury-green text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">
           {product.category}
         </div>
       </Link>

{/* Thumbnail Images */}
        <div className="flex gap-2 p-2.5 bg-luxury-light/20 border-b border-luxury-light">
          {[product.mainImage, ...(product.thumbnails || [])]
            .filter(img => img)
            .slice(0, 4)
            .map((img, idx) => (
             <div
               key={idx}
               onMouseEnter={() => setSelectedImage(img)}
               className={`w-10 h-10 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                 selectedImage === img
                   ? "border-luxury-green scale-105"
                   : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
               }`}
             >
               <img src={img} alt="" className="w-full h-full object-cover" />
             </div>
           ))}
       </div>

       {/* Content */}
       <div className="p-4 flex flex-col flex-grow">
         <Link to={`/product/${product.id}`} className="block mb-1">
           <h3 className="text-base font-bold text-luxury-dark group-hover:text-luxury-green transition-colors line-clamp-1">
             {product.name}
           </h3>
         </Link>
         <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed h-8">
           {product.description}
         </p>

<div className="mt-auto flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                Price
              </span>
              <span className="text-xl font-black text-luxury-green leading-none">
                Rs. {product.price}
              </span>
            </div>

{/* Stats */}
            <div className="flex gap-3 text-[9px] text-gray-400">
              <span title="Views">👁 {stats.views || 0}</span>
              <span title="Times added to cart">🛒 {stats.cartAdds || 0}</span>
            </div>

           <button
             onClick={() => onAddToCart(product)}
             className="bg-luxury-dark text-white px-4 py-2.5 rounded-lg font-bold hover:bg-luxury-green active:scale-95 transition-all flex items-center gap-1.5 text-sm"
           >
             <span>Add</span>
             <span className="text-base leading-none">🛍️</span>
           </button>
         </div>
       </div>
     </div>
  );
}
