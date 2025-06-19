// This ensures all dashboard routes are always dynamically rendered and never cached
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";
export const preferredRegion = "auto";
export const maxDuration = 5;
