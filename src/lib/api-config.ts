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
 * Enhanced fetch wrapper that includes credentials for cross-origin cookie support.
 * When the frontend is deployed on GitHub Pages and the API is on Vercel,
 * cookies won't be sent unless credentials: 'include' is set.
 */
export function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  return fetch(url, {
    ...options,
    credentials: 'include',
  })
}
