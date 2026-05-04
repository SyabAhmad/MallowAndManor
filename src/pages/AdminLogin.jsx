import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        // Wait a moment for session to be fully set
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 500);
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-dark">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">👑</div>
            <h1 className="text-3xl font-black text-luxury-dark mb-2">
              Admin Login
            </h1>
            <p className="text-gray-500 text-sm">
              Mallow & Manor Admin Panel
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none transition-all"
                placeholder="admin@mallowandmanor.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none transition-all"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-luxury-dark text-white py-3 rounded-xl font-bold hover:bg-luxury-green transition-all disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 text-gray-500 text-sm hover:text-luxury-green transition-colors"
          >
            ← Back to Store
          </button>
        </div>
      </div>
    </div>
  );
}
