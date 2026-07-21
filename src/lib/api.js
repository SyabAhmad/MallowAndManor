const API_URL = import.meta.env.VITE_API_URL || '/api';

let accessToken = null;

export const setAccessToken = (token) => { accessToken = token; };
export const getAccessToken = () => accessToken;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const request = async (path, options = {}, retries = 2) => {
  const headers = { ...options.headers };
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  let res;
  for (let attempt = 0; attempt <= retries; attempt++) {
    res = await fetch(`${API_URL}${path}`, { ...options, headers, credentials: 'include' });
    if (res.ok || res.status === 401 || res.status === 404) break;
    if (res.status >= 500 && attempt < retries) await sleep(2000 * (attempt + 1));
  }

  // Auto-refresh on 401
  if (res.status === 401 && !path.includes('/auth/')) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      headers['Authorization'] = `Bearer ${accessToken}`;
      res = await fetch(`${API_URL}${path}`, { ...options, headers, credentials: 'include' });
    }
  }

  return res;
};

const refreshAccessToken = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) return false;
    const data = await res.json();
    accessToken = data.accessToken;
    return true;
  } catch {
    return false;
  }
};

// Public API
export const fetchProducts = async () => {
  const res = await request('/products');
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await request(`/products/${id}`);
  return res.json();
};

export const fetchCategories = async () => {
  const res = await request('/categories');
  return res.json();
};

export const trackEvent = async (eventType, eventData = {}) => {
  try {
    await request('/analytics', {
      method: 'POST',
      body: { eventType, eventData, userAgent: navigator.userAgent, referrer: document.referrer || null },
    });
  } catch (err) {
    console.error('Analytics error:', err);
  }
};

export const fetchProductStats = async () => {
  const res = await request('/analytics/stats');
  return res.json();
};

export const fetchAnalytics = async () => {
  const res = await request('/admin/analytics');
  return res.json();
};

// Auth API
export const login = async (email, password) => {
  const res = await request('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  const data = await res.json();
  if (res.ok) accessToken = data.accessToken;
  return data;
};

export const logout = async () => {
  await request('/auth/logout', { method: 'POST' });
  accessToken = null;
};

export const getCurrentUser = async () => {
  const res = await request('/auth/me');
  return res.json();
};

// Admin API
export const createProduct = async (productData) => {
  const res = await request('/admin/products', { method: 'POST', body: productData });
  return res.json();
};

export const updateProduct = async (id, productData) => {
  const res = await request(`/products/${id}`, { method: 'PUT', body: productData });
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await request(`/products/${id}`, { method: 'DELETE' });
  return res.json();
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request('/upload', { method: 'POST', body: formData });
  return res.json();
};
