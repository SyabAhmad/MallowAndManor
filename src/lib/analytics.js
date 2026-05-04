import { supabase } from "./supabase";

export const trackEvent = async (eventType, eventData = {}) => {
  try {
    const { error } = await supabase
      .from("analytics")
      .insert([
        {
          event_type: eventType,
          event_data: eventData,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        },
      ]);

    if (error) console.error("Analytics error:", error);
  } catch (err) {
    console.error("Analytics error:", err);
  }
};

// Helper functions
export const trackPageView = (page) => trackEvent("page_view", { page });
export const trackProductView = (productId, productName) =>
  trackEvent("product_view", { productId, productName });
export const trackAddToCart = (productId, productName, quantity) =>
  trackEvent("add_to_cart", { productId, productName, quantity });
export const trackRemoveFromCart = (productId, productName) =>
  trackEvent("remove_from_cart", { productId, productName });
export const trackCheckout = (total, itemCount) =>
  trackEvent("checkout", { total, itemCount });

// Get product stats (views and cart adds)
export const getProductStats = async () => {
  try {
    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .in("event_type", ["product_view", "add_to_cart"]);

    if (error) throw error;

    const stats = {};
    data.forEach(event => {
      const productId = event.event_data?.productId;
      if (!productId) return;

      if (!stats[productId]) {
        stats[productId] = { views: 0, cartAdds: 0 };
      }

      if (event.event_type === "product_view") {
        stats[productId].views += 1;
      } else if (event.event_type === "add_to_cart") {
        stats[productId].cartAdds += 1;
      }
    });

    return stats;
  } catch (err) {
    console.error("Error fetching product stats:", err);
    return {};
  }
};
