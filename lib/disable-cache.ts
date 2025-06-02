// This file provides utilities to ensure no caching is used throughout the application
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Sets no-cache headers on response objects
 */
export function setNoCacheHeaders(response: Response | NextResponse): Response | NextResponse {
  const headersList = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '-1',
    'Surrogate-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  };
  
  Object.entries(headersList).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

/**
 * Adds no-cache headers for use in Server Components
 * Usage: Call this at the beginning of your Server Component
 */
export function disableCacheInServerComponent() {
  const headersList = headers();
  
  headersList.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  headersList.set('Pragma', 'no-cache');
  headersList.set('Expires', '-1');
  headersList.set('Surrogate-Control', 'no-store');
  headersList.set('X-Content-Type-Options', 'nosniff');
  
  // This helps ensure the component is never cached
  return { timestamp: Date.now() };
}

/**
 * Creates a cache-busting URL parameter
 */
export function createCacheBustUrl(url: string): string {
  return url.includes('?')
    ? `${url}&_t=${Date.now()}`
    : `${url}?_t=${Date.now()}`;
} 