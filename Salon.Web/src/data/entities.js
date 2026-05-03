// Storage keys (single source of truth).
export const STORAGE_KEYS = {
  SERVICES: 'services',
  PRODUCTS: 'products',
  BOOKINGS: 'bookings',
  NEWS: 'news',
};

// Booking statuses.
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export const BOOKING_STATUS_LIST = Object.values(BOOKING_STATUS);

// Service categories.
export const SERVICE_CATEGORIES = ['Hair', 'Nails', 'Makeup', 'Skincare', 'Brows & Lashes'];

// Product categories.
export const PRODUCT_CATEGORIES = ['Hair', 'Nails', 'Skincare', 'Makeup', 'Tools'];

// News categories.
export const NEWS_CATEGORIES = ['Promotion', 'Announcement', 'Event', 'Schedule'];

/**
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} description
 * @property {number} price       price in MDL
 * @property {number} duration    duration in minutes
 * @property {string} image       url or path
 * @property {boolean} liked
 * @property {string} createdAt   ISO timestamp
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} description
 * @property {number} price
 * @property {number} stock
 * @property {string} image
 * @property {boolean} liked
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} clientName
 * @property {string} phone
 * @property {string} serviceId
 * @property {string} date          YYYY-MM-DD
 * @property {string} time          HH:mm
 * @property {string} notes
 * @property {'pending'|'confirmed'|'cancelled'|'completed'} status
 * @property {string} createdAt
 */

/**
 * @typedef {Object} NewsPost
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} content
 * @property {string} image
 * @property {boolean} pinned
 * @property {boolean} liked
 * @property {string} createdAt
 */
