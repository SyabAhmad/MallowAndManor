import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  const [selectedImage, setSelectedImage] = useState(product.mainImage);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-luxury-light group flex flex-col h-full">
      {/* Main Image Container */}
      <Link
        to={`/product/${product.id}`}
        className="relative h-72 overflow-hidden block"
      >
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Category Label */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-luxury-green text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
          {product.category}
        </div>
      </Link>

      {/* Thumbnail Images */}
      <div className="flex gap-2.5 p-3.5 bg-luxury-light/20 backdrop-blur-sm border-b border-luxury-light">
        {[product.mainImage, ...product.thumbnails]
          .slice(0, 4)
          .map((img, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setSelectedImage(img)}
              className={`w-12 h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                selectedImage === img
                  ? "border-luxury-green scale-105 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="text-xl font-bold text-luxury-dark group-hover:text-luxury-green transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed h-10">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Price
            </span>
            <span className="text-2xl font-black text-luxury-green leading-none">
              Rs. {product.price}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-luxury-dark text-white px-6 py-3.5 rounded-xl font-bold hover:bg-luxury-green hover:shadow-lg hover:shadow-luxury-green/25 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Add</span>
            <span className="text-lg leading-none">🛍️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
