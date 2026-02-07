import ProductCard from "../components/ProductCard";

export default function Favorites({
  favorites,
  addToCart,
  removeFromFavorites,
}) {
  if (favorites.length === 0) {
    return (
      <div className="animate-fade-in py-32 text-center">
        <div className="text-8xl mb-8 opacity-20">🤍</div>
        <h1 className="text-4xl font-black text-luxury-dark mb-4 uppercase tracking-widest">
          Your Favorites is Empty
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-10 italic">
          Love something but not ready to purchase? Save it here for later.
        </p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="px-10 py-5 bg-luxury-dark text-white font-black rounded-full hover:bg-luxury-green transition-all duration-300"
        >
          Discover Products
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in py-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 px-4">
        <div>
          <span className="text-luxury-green font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
            Saved for you
          </span>
          <h1 className="text-6xl font-black text-luxury-dark uppercase tracking-tighter">
            My Favorites
          </h1>
        </div>
        <div className="bg-luxury-light px-8 py-3 rounded-full border border-luxury-green/20">
          <p className="font-bold text-luxury-green">
            {favorites.length} Items Saved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {favorites.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard
              product={product}
              onToggleFavorite={() => removeFromFavorites(product.id)}
              isFavorite={true}
            />
            {/* Quick Action Button for specific for Favorites page */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => removeFromFavorites(product.id)}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-2 border-luxury-green text-luxury-green hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
                title="Remove from favorites"
              >
                ✕
              </button>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full py-4 bg-luxury-dark text-white font-bold rounded-2xl hover:bg-luxury-green transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
            >
              <span>🛒</span> Move to Bag
            </button>
          </div>
        ))}
      </div>

      <div className="mt-32 bg-luxury-light/30 border-2 border-luxury-light p-12 rounded-[3rem] text-center">
        <h2 className="text-2xl font-black text-luxury-dark mb-4 italic">
          Ready to make them yours?
        </h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto italic">
          Items in your favorites are not reserved. Our stock moves fast, so
          grab your favorites before someone else does!
        </p>
        <button
          onClick={() => (window.location.href = "/cart")}
          className="px-12 py-5 bg-luxury-green text-white font-black rounded-full hover:bg-luxury-gold transition-all duration-300 shadow-xl"
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
