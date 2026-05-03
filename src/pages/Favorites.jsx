import ProductCard from "../components/ProductCard";

export default function Favorites({
  favorites,
  addToCart,
  removeFromFavorites,
}) {
  if (favorites.length === 0) {
    return (
      <div className="animate-fade-in py-20 text-center">
        <div className="text-6xl mb-6 opacity-20">🤍</div>
        <h1 className="text-3xl font-black text-luxury-dark mb-3 uppercase tracking-widest">
          Your Favorites is Empty
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm italic">
          Love something but not ready to purchase? Save it here for later.
        </p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="px-8 py-3 bg-luxury-dark text-white font-black rounded-full hover:bg-luxury-green transition-all duration-300 text-sm"
        >
          Discover Products
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in py-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8 px-4">
        <div>
          <span className="text-luxury-green font-bold tracking-[0.3em] uppercase text-[11px] mb-2 block">
            Saved for you
          </span>
          <h1 className="text-3xl font-black text-luxury-dark uppercase tracking-tighter">
            My Favorites
          </h1>
        </div>
        <div className="bg-luxury-light px-6 py-2 rounded-full border border-luxury-green/20">
          <p className="font-bold text-luxury-green text-sm">
            {favorites.length} Items Saved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favorites.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard
              product={product}
              onToggleFavorite={() => removeFromFavorites(product.id)}
              isFavorite={true}
            />
            {/* Quick Remove Button */}
            <button
              onClick={() => removeFromFavorites(product.id)}
              className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-2 border-luxury-green text-luxury-green hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 text-sm"
              title="Remove from favorites"
            >
              ✕
            </button>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full py-3 bg-luxury-dark text-white font-bold rounded-lg hover:bg-luxury-green transition-all duration-300 flex items-center justify-center gap-2 text-sm active:scale-95"
            >
              <span>🛒</span> Move to Bag
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-luxury-light/30 border-2 border-luxury-light p-8 rounded-2xl text-center">
        <h2 className="text-xl font-black text-luxury-dark mb-3 italic">
          Ready to make them yours?
        </h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto text-sm italic">
          Items in your favorites are not reserved. Our stock moves fast, so
          grab your favorites before someone else does!
        </p>
        <button
          onClick={() => (window.location.href = "/cart")}
          className="px-8 py-3 bg-luxury-green text-white font-black rounded-full hover:bg-luxury-gold transition-all duration-300 shadow-lg text-sm"
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
