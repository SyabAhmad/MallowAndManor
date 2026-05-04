import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail({ products, handleAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.mainImage || "");
    }
  }, [id, products]);

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-luxury-green"></div>
      </div>
    );

  const handleWhatsAppOrder = () => {
    // Sanitize phone number (remove any non-numeric characters)
    const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "923444778119";
    const cleanNumber = rawNumber.replace(/\D/g, "");

    const message = `Hello Mallow & Manor! 👑

I want to know more about this product:
✨ Name: ${product.name}
💰 Price: Rs. ${product.price}
🔢 Quantity: ${quantity}

🔗 Link: ${window.location.href}

Looking forward to hearing from you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    // Use window.open with _blank and fallback to window.location if blocked
    const newWindow = window.open(whatsappUrl, "_blank");
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      window.location.href = whatsappUrl;
    }
  };

  return (
<div className="animate-fade-in pt-4">
       <button
         onClick={() => navigate(-1)}
         className="mb-6 text-luxury-green flex items-center gap-2 hover:gap-3 transition-all text-sm"
       >
         ← Back to Shop
       </button>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Left: Image Gallery */}
         <div className="space-y-3">
           <div className="aspect-square rounded-xl overflow-hidden bg-luxury-light shadow-lg border border-luxury-light">
             <img
               src={selectedImage}
               alt={product.name}
               className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
             />
           </div>
<div className="grid grid-cols-4 gap-3">
              {product.thumbnails && product.thumbnails.length > 0 ? (
                product.thumbnails.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? "border-luxury-green shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))
              ) : (
                <button
                  onClick={() => setSelectedImage(product.mainImage)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === product.mainImage ? "border-luxury-green shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img
                    src={product.mainImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              )}
            </div>
         </div>

         {/* Right: Product Info */}
         <div className="flex flex-col h-full sticky top-20">
           <div className="mb-4">
             <span className="text-luxury-green font-bold uppercase tracking-widest text-[11px] mb-1 block">
               {product.category}
             </span>
             <h1 className="text-2xl md:text-3xl font-extrabold text-luxury-dark mb-3 leading-tight">
               {product.name}
             </h1>
             <div className="flex items-center gap-3 mb-4">
               <span className="text-2xl font-bold text-luxury-green">
                 Rs. {product.price}
               </span>
               <span className="bg-luxury-light text-luxury-green px-2 py-0.5 rounded-full text-xs font-semibold">
                 In Stock
               </span>
             </div>
             <p className="text-gray-600 text-sm leading-relaxed mb-6">
               {product.description}
             </p>
           </div>

           <div className="space-y-4 mt-auto">
             {/* Quantity Selector */}
             <div className="flex items-center gap-3">
               <span className="font-semibold text-luxury-dark text-sm">Quantity:</span>
               <div className="flex items-center border-2 border-luxury-light rounded-lg overflow-hidden">
                 <button
                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
                   className="px-3 py-1.5 hover:bg-luxury-light transition-colors font-bold"
                 >
                   –
                 </button>
                 <span className="px-4 font-bold text-sm">{quantity}</span>
                 <button
                   onClick={() => setQuantity(quantity + 1)}
                   className="px-3 py-1.5 hover:bg-luxury-light transition-colors font-bold"
                 >
                   +
                 </button>
               </div>
             </div>

             {/* Actions */}
             <div className="flex flex-col sm:flex-row gap-3">
               <button
                 onClick={() => handleAddToCart(product)}
                 className="flex-1 bg-luxury-dark text-white py-3 rounded-lg font-bold text-sm hover:bg-luxury-green transition-all shadow-md"
               >
                 Add to Cart 🛍️
               </button>
               <button
                 onClick={handleWhatsAppOrder}
                 className="flex-1 bg-[#25D366] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#128C7E] transition-all shadow-md flex items-center justify-center gap-2"
               >
                 Order on WhatsApp 💬
               </button>
             </div>

             {/* Tags/Features */}
             <div className="grid grid-cols-2 gap-3 pt-6 border-t border-luxury-light mt-6">
               <div className="flex items-center gap-2 text-xs text-gray-500">
                 <span>🚚</span>
                 <span>Fast Delivery</span>
               </div>
               <div className="flex items-center gap-2 text-xs text-gray-500">
                 <span>✨</span>
                 <span>Premium Quality</span>
               </div>
               <div className="flex items-center gap-2 text-xs text-gray-500">
                 <span>🔒</span>
                 <span>Secure Packaging</span>
               </div>
               <div className="flex items-center gap-2 text-xs text-gray-500">
                 <span>💎</span>
                 <span>Luxury Collection</span>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Recommended Section */}
       <div className="mt-16">
         <h2 className="text-2xl font-bold mb-8 text-center text-luxury-dark">
           You Might Also Like
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {products
             .filter((p) => p.id !== product.id)
             .slice(0, 4)
             .map((p) => (
               <div
                 key={p.id}
                 className="cursor-pointer group"
                 onClick={() => navigate(`/product/${p.id}`)}
               >
                 <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-luxury-light">
                   <img
                     src={p.mainImage}
                     alt={p.name}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                 </div>
                 <h3 className="font-bold text-luxury-dark text-sm">{p.name}</h3>
                 <p className="text-luxury-green font-bold text-sm">Rs. {p.price}</p>
               </div>
             ))}
         </div>
       </div>
     </div>
  );
}
