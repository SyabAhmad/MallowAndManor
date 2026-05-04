import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pageViews: 0,
    productViews: 0,
    addToCart: 0,
    checkouts: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from("analytics")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setAnalytics(data || []);

      // Calculate stats
      const pageViews = data.filter(d => d.event_type === "page_view").length;
      const productViews = data.filter(d => d.event_type === "product_view").length;
      const addToCart = data.filter(d => d.event_type === "add_to_cart").length;
      const checkouts = data.filter(d => d.event_type === "checkout").length;

      setStats({
        pageViews,
        productViews,
        addToCart,
        checkouts,
        totalEvents: data.length,
      });
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="animate-fade-in py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black text-luxury-dark mb-8">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-luxury-light shadow-sm">
          <p className="text-luxury-green font-black text-2xl">{stats.totalEvents}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Total Events</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-luxury-light shadow-sm">
          <p className="text-blue-600 font-black text-2xl">{stats.pageViews}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Page Views</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-luxury-light shadow-sm">
          <p className="text-purple-600 font-black text-2xl">{stats.productViews}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Product Views</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-luxury-light shadow-sm">
          <p className="text-green-600 font-black text-2xl">{stats.addToCart}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Add to Cart</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-luxury-light shadow-sm">
          <p className="text-orange-600 font-black text-2xl">{stats.checkouts}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Checkouts</p>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-2xl border border-luxury-light shadow-lg overflow-hidden">
        <div className="p-4 border-b border-luxury-light">
          <h2 className="font-bold text-luxury-dark">Recent Events</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : analytics.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No events yet</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-luxury-light/30">
                <tr>
                  <th className="text-left p-3 text-xs uppercase tracking-wider">Event</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wider">Data</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((event) => (
                  <tr key={event.id} className="border-t border-luxury-light hover:bg-luxury-light/10">
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        event.event_type === 'page_view' ? 'bg-blue-100 text-blue-700' :
                        event.event_type === 'product_view' ? 'bg-purple-100 text-purple-700' :
                        event.event_type === 'add_to_cart' ? 'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {event.event_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">
                      {JSON.stringify(event.event_data)}
                    </td>
                    <td className="p-3 text-gray-500">
                      {formatDate(event.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
