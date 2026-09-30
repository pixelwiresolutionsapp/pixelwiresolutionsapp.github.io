/**
 * API Base URL configuration.
 * 
 * - On Vercel/local: API calls go to /api (same origin)
 * - On GitHub Pages: API calls go to the Vercel backend URL
 * 
 * Set NEXT_PUBLIC_API_URL in your environment to override the default.
 * For GitHub Pages deployment, set it to your Vercel app URL, e.g.:
 *   NEXT_PUBLIC_API_URL=https://your-app.vercel.app
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

export function getApiUrl(path: string): string {
  // path should start with /api/...
  return `${API_BASE}${path}`
}

export const API = API_BASE ? `${API_BASE}/api` : '/api'

/**
 * Fetch wrapper for cross-origin API calls from GitHub Pages.
 * 
 * IMPORTANT: We do NOT include credentials: 'include' by default.
 * When Access-Control-Allow-Origin is '*' (wildcard), browsers REJECT
 * responses if credentials are included — the origin must be specific.
 * 
 * Since admin auth uses localStorage (not cookies), we don't need
 * credentials for most API calls. Only admin login/verify/logout
 * endpoints need credentials for cookie-based sessions, and those
 * are called with explicit credentials in the login component.
 */
export function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  return fetch(url, options)
}
