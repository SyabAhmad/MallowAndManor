import { useNavigate } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, (item.quantity || 1) + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    const itemsList = cart
      .map(
        (item) =>
          `- ${item.name} (${item.quantity}x) - $${item.price * item.quantity}`,
      )
      .join("\n");
    const message = `Hello Mallow & Manor! I'd like to place an order:

${itemsList}

Total Amount: $${total}
Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/YOUR_PHONE_NUMBER?text=${encodedMessage}`,
      "_blank",
    );
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <div className="text-8xl mb-8">🛍️</div>
        <h1 className="text-4xl font-black text-luxury-dark mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8 max-w-sm">
          Looks like you haven't added anything yet. Discover our latest
          arrivals!
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-luxury-green text-white px-10 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black text-luxury-dark mb-10 flex items-center gap-4">
        Your Shopping Bag{" "}
        <span className="text-luxury-green text-2xl">({cart.length})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 flex gap-6 border border-luxury-light shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={item.mainImage}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-luxury-dark text-lg sm:text-xl">
                      {item.name}
                    </h3>
                    <p className="text-luxury-green font-semibold text-sm capitalize">
                      {item.category}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-luxury-light rounded-xl overflow-hidden bg-luxury-light/20">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 hover:bg-luxury-light transition-colors font-bold"
                    >
                      –
                    </button>
                    <span className="px-4 font-bold text-sm">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 hover:bg-luxury-light transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xl font-black text-luxury-dark">
                    $ {item.price * (item.quantity || 1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-luxury-light shadow-xl h-fit sticky top-24">
          <h2 className="text-2xl font-black text-luxury-dark mb-6">Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="font-bold text-luxury-dark">$ {total}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="text-luxury-green font-bold">
                Calculated at WhatsApp
              </span>
            </div>
            <div className="border-t border-luxury-light pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-luxury-dark">
                  Total
                </span>
                <span className="text-3xl font-black text-luxury-green">
                  $ {total}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#128C7E] transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            ORDER VIA WHATSAPP 💬
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-[0.2em] font-bold">
            Fast response & safe delivery
          </p>
        </div>
      </div>
    </div>
  );
}
