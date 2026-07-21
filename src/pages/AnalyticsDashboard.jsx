import { useState, useEffect } from "react";
import { fetchAnalytics } from "../lib/api";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState({
    pageViews: 0,
    productViews: 0,
    addToCart: 0,
    checkouts: 0,
    totalEvents: 0,
  });
  const [chartData, setChartData] = useState({
    pageViews: [],
    productViews: [],
    addToCart: [],
    totalByDay: [],
  });

  const eventsPerPage = 10;

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const data = await fetchAnalytics();
      setAnalytics(data || []);

      // Calculate stats
      const pageViews = data.filter(d => d.eventType === "page_view").length;
      const productViews = data.filter(d => d.eventType === "product_view").length;
      const addToCart = data.filter(d => d.eventType === "add_to_cart").length;
      const checkouts = data.filter(d => d.eventType === "checkout").length;

      setStats({
        pageViews,
        productViews,
        addToCart,
        checkouts,
        totalEvents: data.length,
      });

      // Process chart data - group by day
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
      });

      const pageViewsByDay = last7Days.map(day => ({
        date: day,
        count: data.filter(d =>
          d.eventType === "page_view" &&
          d.createdAt && d.createdAt.startsWith(day)
        ).length
      }));

      const productViewsByDay = last7Days.map(day => ({
        date: day,
        count: data.filter(d =>
          d.eventType === "product_view" &&
          d.createdAt && d.createdAt.startsWith(day)
        ).length
      }));

      const addToCartByDay = last7Days.map(day => ({
        date: day,
        count: data.filter(d =>
          d.eventType === "add_to_cart" &&
          d.createdAt && d.createdAt.startsWith(day)
        ).length
      }));

      const totalByDay = last7Days.map(day => ({
        date: day,
        count: data.filter(d => d.createdAt && d.createdAt.startsWith(day)).length
      }));

      setChartData({
        pageViews: pageViewsByDay,
        productViews: productViewsByDay,
        addToCart: addToCartByDay,
        totalByDay,
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

  const formatDay = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Pagination
  const totalPages = Math.ceil(analytics.length / eventsPerPage);
  const startIndex = (page - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = analytics.slice(startIndex, endIndex);

  const renderBarChart = (data, color, label) => {
    const max = Math.max(...data.map(d => d.count), 1);
    return (
      <div className="mt-4">
        <h3 className="font-bold text-luxury-dark mb-3">{label}</h3>
        <div className="space-y-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16 shrink-0">
                {formatDay(item.date)}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full rounded-full ${color} transition-all duration-500`}
                  style={{ width: `${(item.count / max) * 100}%` }}
                >
                  <span className="px-2 text-xs text-white font-bold leading-6">
                    {item.count > 0 ? item.count : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-luxury-light shadow-lg p-6">
          <h2 className="font-bold text-luxury-dark mb-4">Page Views (Last 7 Days)</h2>
          {renderBarChart(chartData.pageViews, "bg-blue-500", "")}
        </div>

        <div className="bg-white rounded-2xl border border-luxury-light shadow-lg p-6">
          <h2 className="font-bold text-luxury-dark mb-4">Product Views (Last 7 Days)</h2>
          {renderBarChart(chartData.productViews, "bg-purple-500", "")}
        </div>

        <div className="bg-white rounded-2xl border border-luxury-light shadow-lg p-6">
          <h2 className="font-bold text-luxury-dark mb-4">Add to Cart (Last 7 Days)</h2>
          {renderBarChart(chartData.addToCart, "bg-green-500", "")}
        </div>

        <div className="bg-white rounded-2xl border border-luxury-light shadow-lg p-6">
          <h2 className="font-bold text-luxury-dark mb-4">Total Events (Last 7 Days)</h2>
          {renderBarChart(chartData.totalByDay, "bg-luxury-green", "")}
        </div>
      </div>

      {/* Events Table with Pagination */}
      <div className="bg-white rounded-2xl border border-luxury-light shadow-lg overflow-hidden">
        <div className="p-4 border-b border-luxury-light flex justify-between items-center">
          <h2 className="font-bold text-luxury-dark">Recent Events</h2>
          <span className="text-xs text-gray-500">
            Page {page} of {totalPages}
          </span>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : analytics.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No events yet</div>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead className="bg-luxury-light/30">
                  <tr>
                    <th className="text-left p-3 text-xs uppercase tracking-wider">Event</th>
                    <th className="text-left p-3 text-xs uppercase tracking-wider">Data</th>
                    <th className="text-left p-3 text-xs uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEvents.map((event) => (
                    <tr key={event._id} className="border-t border-luxury-light hover:bg-luxury-light/10">
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          event.eventType === 'page_view' ? 'bg-blue-100 text-blue-700' :
                          event.eventType === 'product_view' ? 'bg-purple-100 text-purple-700' :
                          event.eventType === 'add_to_cart' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {event.eventType.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">
                        {JSON.stringify(event.eventData)}
                      </td>
                      <td className="p-3 text-gray-500">
                        {formatDate(event.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="p-4 border-t border-luxury-light flex justify-between items-center">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-luxury-light rounded-lg hover:bg-luxury-light/70 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, analytics.length)} of {analytics.length}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-luxury-green text-white rounded-lg hover:bg-luxury-dark disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold transition-colors"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
