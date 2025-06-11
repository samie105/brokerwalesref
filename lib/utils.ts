import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { revalidatePath } from "next/cache"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Wrapper for fetch that ensures absolutely no caching occurs
 */
export function fetchNoCache(
  url: RequestInfo | URL, 
  options: RequestInit = {}
): Promise<Response> {
  // Add a cache-busting parameter to GET requests
  if (typeof url === 'string' && (!options.method || options.method === 'GET')) {
    const urlWithCacheBuster = url.includes('?') 
      ? `${url}&_nocache=${Date.now()}`
      : `${url}?_nocache=${Date.now()}`;
    url = urlWithCacheBuster;
  }

  return fetch(url, {
    ...options,
    cache: 'no-store',
    headers: {
      ...options.headers,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '-1',
      'Surrogate-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/**
 * Enhanced revalidatePath to ensure no caching occurs
 * Use this instead of direct revalidatePath calls
 */
export function revalidatePathNoCache(path: string) {
  // First use Next.js revalidate mechanism
  revalidatePath(path);
  
  // Force a timestamp query parameter to be appended
  // which effectively busts any potential cache
  return {
    path: path.includes('?') 
      ? `${path}&_t=${Date.now()}` 
      : `${path}?_t=${Date.now()}`
  };
}

/**
 * Type guard to safely access user data
 * Since fetchDetails now always returns a data structure, this provides type safety
 */
export function safeUserData<T>(data: T | null | undefined): data is T {
  return data !== null && data !== undefined;
}

/**
 * Safely get user data with fallback
 */
export function getUserData(deets: any) {
  if (!deets?.data) {
    console.warn('User data not available, using fallback');
    return null;
  }
  return deets.data;
}
