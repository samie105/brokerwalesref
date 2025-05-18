import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Wrapper for fetch that ensures no caching occurs
 */
export function fetchNoCache(
  url: RequestInfo | URL, 
  options: RequestInit = {}
): Promise<Response> {
  return fetch(url, {
    ...options,
    cache: 'no-store',
    headers: {
      ...options.headers,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
