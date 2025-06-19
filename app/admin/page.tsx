import Admin from "@/components/admin";
import dbConnect from "@/server";
import User, { IUser } from "@/server/userSchema";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { disableCacheInServerComponent } from "@/lib/disable-cache";

// Ensure dynamic content and no caching at the page level as well
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  // Use both methods to ensure no caching
  disableCacheInServerComponent();
  noStore();

  await dbConnect();

  const rawData = await User.find({}).lean();
  const data: IUser[] = JSON.parse(JSON.stringify(rawData));

  return (
    <div className="w-full h-screen bg-white dark:bg-neutral-950">
      <Admin initialData={data} />
    </div>
  );
}
