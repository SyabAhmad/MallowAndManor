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
      setSelectedImage(foundProduct.mainImage);
    }
  }, [id, products]);

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-luxury-green"></div>
      </div>
    );

  const handleWhatsAppOrder = () => {
    const message = `Hello Mallow & Manor! I'm interested in:
Product: ${product.name}
Price: $${product.price}
Quantity: ${quantity}
Link: ${window.location.href}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/YOUR_PHONE_NUMBER?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <div className="animate-fade-in pt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-luxury-green flex items-center gap-2 hover:gap-3 transition-all"
      >
        ← Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-luxury-light shadow-xl border border-luxury-light">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
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
            {product.thumbnails.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? "border-luxury-green shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col h-full sticky top-24">
          <div className="mb-6">
            <span className="text-luxury-green font-bold uppercase tracking-widest text-sm mb-2 block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-luxury-dark mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-luxury-green">
                $ {product.price}
              </span>
              <span className="bg-luxury-light text-luxury-green px-3 py-1 rounded-full text-sm font-semibold">
                In Stock
              </span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 mt-auto">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-luxury-dark">Quantity:</span>
              <div className="flex items-center border-2 border-luxury-light rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-luxury-light transition-colors font-bold text-xl"
                >
                  –
                </button>
                <span className="px-6 font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-luxury-light transition-colors font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-luxury-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-luxury-green transition-all shadow-lg hover:shadow-luxury-green/20"
              >
                Add to Cart 🛍️
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#128C7E] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Order on WhatsApp 💬
              </button>
            </div>

            {/* Tags/Features */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-luxury-light mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-xl">🚚</span>
                <span>Fast Global Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-xl">✨</span>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-xl">🔒</span>
                <span>Secure Packaging</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-xl">💎</span>
                <span>Luxury Collection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section (Simple) */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold mb-12 text-center text-luxury-dark">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <div
                key={p.id}
                className="cursor-pointer group"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-luxury-light">
                  <img
                    src={p.mainImage}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-luxury-dark">{p.name}</h3>
                <p className="text-luxury-green font-bold">$ {p.price}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
