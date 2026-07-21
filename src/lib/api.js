const API_URL = import.meta.env.VITE_API_URL || '/api';

let accessToken = localStorage.getItem('accessToken');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const request = async (path, options = {}, retries = 1) => {
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
    if (res.status >= 500 && attempt < retries) await sleep(1000 * (attempt + 1));
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
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      credentials: 'include',
    });
    if (!res.ok) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return false;
    }
    const data = await res.json();
    accessToken = data.accessToken;
    localStorage.setItem('accessToken', data.accessToken);
    if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
    return true;
  } catch {
    return false;
  }
};

const safeJson = async (res) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Server returned ${res.status}: ${text.slice(0, 200)}`);
  }
};

// Public API
export const fetchProducts = async () => {
  const res = await request('/products');
  return safeJson(res);
};

export const fetchProductById = async (id) => {
  const res = await request(`/product/${id}`);
  return safeJson(res);
};

export const fetchCategories = async () => {
  const res = await request('/categories');
  return safeJson(res);
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
  return safeJson(res);
};

export const fetchAnalytics = async () => {
  const res = await request('/admin/analytics');
  return safeJson(res);
};

// Auth API
export const login = async (email, password) => {
  const res = await request('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  const data = await safeJson(res);
  if (res.ok && data.accessToken) {
    accessToken = data.accessToken;
    localStorage.setItem('accessToken', data.accessToken);
  }
  return data;
};

export const logout = async () => {
  await request('/auth/logout', { method: 'POST' });
  accessToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const getCurrentUser = async () => {
  const res = await request('/auth/me');
  return safeJson(res);
};

// Admin API
export const createProduct = async (productData) => {
  const res = await request('/admin/products', { method: 'POST', body: productData });
  return safeJson(res);
};

export const updateProduct = async (id, productData) => {
  const res = await request(`/product/${id}`, { method: 'PUT', body: productData });
  return safeJson(res);
};

export const deleteProduct = async (id) => {
  const res = await request(`/product/${id}`, { method: 'DELETE' });
  return safeJson(res);
};

export const uploadImage = async (file) => {
  const signRes = await request('/upload/sign');
  if (!signRes.ok) {
    const err = await safeJson(signRes);
    throw new Error(err.error || 'Failed to get upload signature');
  }
  const { cloudName, apiKey, signature, timestamp, folder } = await signRes.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('cloud_name', cloudName);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    throw new Error('Cloudinary upload failed: ' + text.slice(0, 200));
  }

  const data = await uploadRes.json();
  return { url: data.secure_url };
};
