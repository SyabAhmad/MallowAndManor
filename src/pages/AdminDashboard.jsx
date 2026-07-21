import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout, fetchProducts, createProduct, updateProduct, deleteProduct, uploadImage } from "../lib/api";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "bangles",
    description: "",
    mainImage: "",
    thumbnails: "",
  });
  const [mainImageFile, setMainImageFile] = useState(null);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await getCurrentUser();

      if (userData.error || !userData._id) {
        navigate("/admin/login");
        return;
      }

      setUser(userData);
      loadProducts();
    } catch (err) {
      console.error("Auth error:", err);
      navigate("/admin/login");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const validateFileSize = (file) => {
    if (!file) return true;
    if (file.size > MAX_FILE_SIZE) {
      alert(`"${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is 10 MB.`);
      return false;
    }
    return true;
  };

  const handleFileUpload = async (file) => {
    if (!file) return null;

    if (file.size > MAX_FILE_SIZE) {
      alert("File too large. Maximum size is 10 MB.");
      return null;
    }

    setUploading(true);
    try {
      const result = await uploadImage(file);
      if (result.error) {
        alert("Upload failed: " + result.error);
        return null;
      }
      return result.url;
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload error: " + err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!validateFileSize(file)) {
        e.target.value = '';
        return;
      }
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, mainImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    for (const file of files) {
      if (!validateFileSize(file)) {
        e.target.value = '';
        return;
      }
    }
    const newThumbnails = files.map(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          thumbnails: [...(prev.thumbnails || []), reader.result]
        }));
      };
      reader.readAsDataURL(file);
      return { file, preview: URL.createObjectURL(file) };
    });
    setThumbnailFiles(prev => [...prev, ...newThumbnails].slice(0, 5));
  };

  const removeThumbnail = (index) => {
    setThumbnailFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      thumbnails: (prev.thumbnails || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let mainImageUrl = formData.mainImage;
    let thumbnailUrls = [];

    // Upload main image if new file selected
    if (mainImageFile && mainImageFile instanceof File) {
      const uploadedUrl = await handleFileUpload(mainImageFile);
      if (!uploadedUrl) {
        setLoading(false);
        return;
      }
      mainImageUrl = uploadedUrl;
    }

    if (!mainImageUrl) {
      alert("Please select a main image");
      setLoading(false);
      return;
    }

    // Get existing thumbnails (URLs from edit mode)
    let existingThumbnails = [];
    if (formData.thumbnails && Array.isArray(formData.thumbnails)) {
      existingThumbnails = formData.thumbnails.filter(t => typeof t === 'string' && t.startsWith('http'));
    }

    // Upload new file uploads
    for (const thumb of thumbnailFiles) {
      if (thumb.file && thumb.file instanceof File) {
        const url = await handleFileUpload(thumb.file);
        if (url) thumbnailUrls.push(url);
      }
    }

    thumbnailUrls = [...existingThumbnails, ...thumbnailUrls];

    const productData = {
      name: formData.name,
      price: parseInt(formData.price),
      category: formData.category,
      description: formData.description,
      mainImage: mainImageUrl,
      thumbnails: thumbnailUrls,
    };

    try {
      if (editingProduct) {
        const result = await updateProduct(editingProduct.id, productData);
        if (result.error) throw new Error(result.error);
      } else {
        const result = await createProduct(productData);
        if (result.error) throw new Error(result.error);
      }

      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "bangles",
        description: "",
        mainImage: "",
        thumbnails: [],
      });
      setMainImageFile(null);
      setThumbnailFiles([]);
      setShowForm(false);
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      // Map _id to id for consistency
      setProducts((data || []).map(p => ({ ...p, id: p._id })));
    } catch (err) {
      console.error("Error fetching products:", err);
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description || "",
      mainImage: product.mainImage || "",
      thumbnails: Array.isArray(product.thumbnails) ? product.thumbnails : [],
    });
    setMainImageFile(null);
    setThumbnailFiles([]);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const result = await deleteProduct(id);
      if (result.error) alert("Error deleting: " + result.error);
      else loadProducts();
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-luxury-dark text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black">
            Mallow & Manor - <span className="text-luxury-gold">Admin</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-luxury-dark">Products</h2>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.href = '/admin/analytics'}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm"
            >
              📊 Analytics
            </button>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingProduct(null);
                setFormData({
                  name: "",
                  price: "",
                  category: "bangles",
                  description: "",
                  mainImage: "",
                  thumbnails: [],
                });
              }}
              className="px-6 py-3 bg-luxury-green text-white rounded-xl font-bold hover:bg-luxury-dark transition-all"
            >
              {showForm ? "Cancel" : "+ Add Product"}
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
                    Price (Rs.)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none"
                  >
                    <option value="bangles">Bangles</option>
                    <option value="nails">Nails</option>
                    <option value="abayas">Abayas</option>
                    <option value="necklaces">Necklaces</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
                    Main Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="w-full px-4 py-3 border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none text-sm"
                  />
                  {formData.mainImage && (
                    <img src={formData.mainImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
                  Additional Images (max 5)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleThumbnailChange}
                  className="w-full px-4 py-3 border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none text-sm"
                />
                {thumbnailFiles.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {thumbnailFiles.map((thumb, idx) => (
                      <div key={idx} className="relative">
                        <img src={thumb.preview} alt={`Thumb ${idx + 1}`} className="w-16 h-16 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeThumbnail(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">{thumbnailFiles.length}/5 images selected</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-luxury-light rounded-xl focus:border-luxury-green focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || uploading}
                className="px-8 py-3 bg-luxury-dark text-white rounded-xl font-bold hover:bg-luxury-green transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : uploading ? "Uploading..." : editingProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        )}

        {/* Products List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-luxury-green mx-auto"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-luxury-light/50">
                <tr>
                  <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-gray-600">
                    Name
                  </th>
                  <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-gray-600">
                    Category
                  </th>
                  <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-gray-600">
                    Price
                  </th>
                  <th className="text-right p-4 text-xs font-bold uppercase tracking-widest text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-gray-100 hover:bg-luxury-light/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {product.mainImage && (
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        )}
                        <span className="font-bold text-luxury-dark">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-luxury-light rounded-full text-xs font-bold text-luxury-green">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold">Rs. {product.price}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No products yet. Click "Add Product" to create one.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
