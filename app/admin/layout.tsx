import React from "react";
import { disableCacheInServerComponent } from "@/lib/disable-cache";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Ensure dynamic content and no caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Disable all caching for this layout and all children
  disableCacheInServerComponent();
  noStore();

  // Check if user is an admin
  const role = cookies().get("role")?.value;

  // Redirect non-admin users to dashboard
  if (role !== "admin") {
    redirect("/dashboard");
  }

  return <div className="admin-layout">{children}</div>;
}
