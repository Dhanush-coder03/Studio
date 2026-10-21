/**
 * Studio API Service
 * Communicates with the Express + MongoDB backend on /api
 */

const API_ROOT = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '';
const API_BASE = API_ROOT ? `${API_ROOT}/api` : '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[Studio API] Error requesting ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Health
  checkHealth: () => request('/health'),
  seedDatabase: (force = false) => request('/seed', { method: 'POST', body: JSON.stringify({ force }) }),

  // Images
  getImages: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/images${query ? `?${query}` : ''}`);
  },
  createImage: (imageData) => request('/images', { method: 'POST', body: JSON.stringify(imageData) }),
  deleteImage: (id) => request(`/images/${id}`, { method: 'DELETE' }),

  // Services
  getServices: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/services${query ? `?${query}` : ''}`);
  },
  createService: (serviceData) => request('/services', { method: 'POST', body: JSON.stringify(serviceData) }),
  updateService: (id, serviceData) => request(`/services/${id}`, { method: 'PUT', body: JSON.stringify(serviceData) }),
  deleteService: (id) => request(`/services/${id}`, { method: 'DELETE' }),

  // Gallery
  getGallery: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/gallery${query ? `?${query}` : ''}`);
  },
  createGalleryItem: (galleryData) => request('/gallery', { method: 'POST', body: JSON.stringify(galleryData) }),
  updateGalleryItem: (id, galleryData) => request(`/gallery/${id}`, { method: 'PUT', body: JSON.stringify(galleryData) }),
  deleteGalleryItem: (id) => request(`/gallery/${id}`, { method: 'DELETE' }),

  // Packages
  getPackages: () => request('/packages'),
  createPackage: (pkgData) => request('/packages', { method: 'POST', body: JSON.stringify(pkgData) }),
  updatePackage: (id, pkgData) => request(`/packages/${id}`, { method: 'PUT', body: JSON.stringify(pkgData) }),
  deletePackage: (id) => request(`/packages/${id}`, { method: 'DELETE' }),

  // Contact Info
  getContactInfo: () => request('/contact/info'),
  updateContactInfo: (contactData) => request('/contact/info', { method: 'PUT', body: JSON.stringify(contactData) }),

  // Inquiries / Leads
  getInquiries: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/contact/inquiries${query ? `?${query}` : ''}`);
  },
  createInquiry: (inquiryData) => request('/contact/inquiries', { method: 'POST', body: JSON.stringify(inquiryData) }),
  updateInquiryStatus: (id, status) => request(`/contact/inquiries/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteInquiry: (id) => request(`/contact/inquiries/${id}`, { method: 'DELETE' }),
};

export default api;
