// Base API client — reads VITE_API_URL from the environment.
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5144';

// ── Token store (module-level so all API files share it) ──────────────────────
let _token = null;
let _role = null;
let _tokenExpiry = 0;
let _user = null; // { name, email } — only set for credential-based logins

const STORAGE_KEY = 'salon:auth';

/** Decode a JWT payload without verifying the signature (display only). */
export const parseJwt = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
};

// Restore from localStorage on first import.
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (Date.now() < parsed.expiry) {
      _token = parsed.token;
      _role = parsed.role;
      _tokenExpiry = parsed.expiry;
      _user = parsed.user ?? null;
    }
  }
} catch {
  // ignore
}

export const setToken = (token, role, expiresInSeconds, user = null) => {
  _token = token;
  _role = role;
  _user = user;
  _tokenExpiry = Date.now() + expiresInSeconds * 1000 - 5_000; // 5 s buffer
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token, role, expiry: _tokenExpiry, user }),
    );
  } catch {
    // ignore quota errors
  }
};

export const clearToken = () => {
  _token = null;
  _role = null;
  _user = null;
  _tokenExpiry = 0;
  localStorage.removeItem(STORAGE_KEY);
};

export const getTokenRole = () => _role;
export const getTokenUser = () => _user;
export const isTokenValid = () => Boolean(_token) && Date.now() < _tokenExpiry;

// ── Core fetch wrapper ────────────────────────────────────────────────────────
const request = async (path, options = {}) => {
  const headers = { 'Content-Type': 'application/json', ...(options.headers ?? {}) };
  if (_token) headers['Authorization'] = `Bearer ${_token}`;

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    const err = new Error(text || response.statusText || `HTTP ${response.status}`);
    err.status = response.status;
    throw err;
  }

  if (response.status === 204) return null;
  return response.json();
};

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
};
