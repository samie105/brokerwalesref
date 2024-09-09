import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, unsign } from "@/lib/encription"; // Ensure this path is correct

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Helper function to retrieve and decrypt signed cookies
  async function getSecureCookie(
    request: NextRequest,
    name: string
  ): Promise<string | null> {
    const signedValue = request.cookies.get(name)?.value;
    if (!signedValue) return null;

    const unsignedValue = await unsign(signedValue); // Await the async unsign function
    if (!unsignedValue) return null; // Cookie signature is invalid

    return await decrypt(unsignedValue); // Await the async decrypt function
  }

  // Await the cookie retrievals concurrently using Promise.all for better performance
  const [verified, email, paid] = await Promise.all([
    getSecureCookie(request, "verified"),
    getSecureCookie(request, "userEmail"),
    getSecureCookie(request, "paid"),
  ]);

  // Redirect logic
  if (pathname === "/auth") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/auth/verify")) {
    // If no email, redirect to login
    if (!email) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    // If already verified, redirect to dashboard
    if (verified === "true") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup")
  ) {
    // If email exists, redirect to dashboard
    if (email) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    // If no email, redirect to login
    if (!email) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    // If email exists but not verified, redirect to login-verification
    if (verified === "false") {
      return NextResponse.redirect(
        new URL("/auth/verify/login-verification", request.url)
      );
    }
    // If verified but not paid, redirect to payment-means
    if (verified === "true" && paid === "false") {
      return NextResponse.redirect(new URL("/auth/payment-means", request.url));
    }
  }

  if (pathname.startsWith("/auth/payment-means")) {
    // If no email, redirect to login
    if (!email) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    // If email exists but not verified, redirect to login-verification
    if (verified === "false") {
      return NextResponse.redirect(
        new URL("/auth/verify/login-verification", request.url)
      );
    }
  }

  // Default to continue to the requested page if no conditions are met
  return NextResponse.next();
}

// Export the matcher to specify which paths should be processed by this middleware
export const config = {
  matcher: [
    "/auth",
    "/auth/login",
    "/auth/signup",
    "/auth/verify",
    "/dashboard",
    "/auth/verify/login-verification",
    "/auth/payment-means",
  ],
};
