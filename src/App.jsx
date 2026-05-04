import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AllProducts from "./pages/AllProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import Cart from "./pages/cart";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { supabase } from "./lib/supabase";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = sessionStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = sessionStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Load products and categories from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const { data: categoriesData, error: catError } = await supabase
          .from("categories")
          .select("*")
          .order("id", { ascending: true });

        if (catError) throw catError;
        setCategories(categoriesData || []);

        // Fetch products
        const { data: productsData, error: prodError } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (prodError) throw prodError;

        // Map Supabase snake_case to app's camelCase
        const mappedProducts = (productsData || []).map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category,
          mainImage: p.main_image,
          thumbnails: Array.isArray(p.thumbnails) ? p.thumbnails : (p.thumbnails ? [p.thumbnails] : []),
          description: p.description
        }));
        setProducts(mappedProducts);
      } catch (err) {
        console.error("Error loading data from Supabase:", err);
      }
    };

    fetchData();
  }, []);

  // Sync cart to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Sync favorites to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add to cart
  const handleAddToCart = (product, quantity = 1) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // Toggle Favorite
  const toggleFavorite = (product) => {
    const exists = favorites.find((f) => f.id === product.id);
    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navigation
          cartCount={cart.length}
          favCount={favorites.length}
          categories={categories}
        />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  categories={categories}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetail
                  products={products}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/products"
              element={
                <AllProducts
                  products={products}
                  categories={categories}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  addToCart={handleAddToCart}
                  removeFromFavorites={(id) =>
                    setFavorites(favorites.filter((f) => f.id !== id))
                  }
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateCartQuantity}
                />
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
