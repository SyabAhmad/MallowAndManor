import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { supabase } from "./lib/supabase";
import { trackPageView, trackAddToCart, trackRemoveFromCart } from "./lib/analytics";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

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

  // Track page views
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  // Load products and categories from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedProducts = localStorage.getItem('mallow_products_cache');
        const cachedCategories = localStorage.getItem('mallow_categories_cache');

        if (cachedProducts && cachedCategories) {
          const prodCache = JSON.parse(cachedProducts);
          const catCache = JSON.parse(cachedCategories);
          const now = Date.now();

          if (now - prodCache.timestamp < 300000 && now - catCache.timestamp < 300000) {
            setProducts(prodCache.data);
            setCategories(catCache.data);
            return;
          }
        }

        const { data: categoriesData, error: catError } = await supabase
          .from("categories")
          .select("*")
          .order("id", { ascending: true });

        if (catError) throw catError;
        setCategories(categoriesData || []);

        localStorage.setItem('mallow_categories_cache', JSON.stringify({
          data: categoriesData || [],
          timestamp: Date.now()
        }));

        const { data: productsData, error: prodError } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (prodError) throw prodError;

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

        localStorage.setItem('mallow_products_cache', JSON.stringify({
          data: mappedProducts,
          timestamp: Date.now()
        }));
      } catch (err) {
        console.error("Error loading data from Supabase:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToCart = (product, quantity = 1) => {
    trackAddToCart(product.id, product.name, quantity);
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const toggleFavorite = (product) => {
    const exists = favorites.find((f) => f.id === product.id);
    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i.id === productId);
    if (item) trackRemoveFromCart(item.id, item.name);
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
    <>
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
            <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
          </Routes>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;