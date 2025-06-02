import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper function to add no-cache headers to responses
function addNoCacheHeaders(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '-1');
  response.headers.set('Surrogate-Control', 'no-store');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const verified = request.cookies.get("verified")?.value;
  const email = request.cookies.get("userEmail")?.value;
  const paid = request.cookies.get("paid")?.value;
  const role = request.cookies.get("role")?.value;

  // If the user is not an admin and tries to access an admin route, redirect to dashboard
  if (role !== "admin" && pathname.startsWith("/admin")) {
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    return addNoCacheHeaders(response);
  }

  // If the role is admin, allow access to all routes
  if (role === "admin") {
    const response = NextResponse.next();
    return addNoCacheHeaders(response);
  }

  // Existing redirect logic for non-admin users
  if (pathname === "/auth") {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    return addNoCacheHeaders(response);
  }

  if (pathname.startsWith("/auth/verify")) {
    if (!email) {
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      return addNoCacheHeaders(response);
    }
    if (verified === "true") {
      const response = NextResponse.redirect(new URL("/dashboard", request.url));
      return addNoCacheHeaders(response);
    }
  }

  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup")
  ) {
    if (email) {
      const response = NextResponse.redirect(new URL("/dashboard", request.url));
      return addNoCacheHeaders(response);
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!email) {
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      return addNoCacheHeaders(response);
    }
    if (verified === "false") {
      const response = NextResponse.redirect(
        new URL("/auth/verify/login-verification", request.url)
      );
      return addNoCacheHeaders(response);
    }
    if (verified === "true" && paid === "false") {
      const response = NextResponse.redirect(new URL("/auth/payment-means", request.url));
      return addNoCacheHeaders(response);
    }
  }

  if (pathname.startsWith("/auth/payment-means")) {
    if (!email) {
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      return addNoCacheHeaders(response);
    }
    if (verified === "false") {
      const response = NextResponse.redirect(
        new URL("/auth/verify/login-verification", request.url)
      );
      return addNoCacheHeaders(response);
    }
  }

  // Add no-cache headers to all responses
  return addNoCacheHeaders(NextResponse.next());
}

// Export the matcher to specify which paths should be processed by this middleware
export const config = {
  matcher: [
    "/(.*)", // Match all paths to apply no-cache headers
  ],
};
