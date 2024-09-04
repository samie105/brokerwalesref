import FixedHistory from "@/components/dashboard/fixed/FixedHistory";
import HeaderTab from "@/components/dashboard/fixed/HeaderTab";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const currentTab = searchParams.tab || "all";

  return (
    <div className="bg-white rounded-md p-3">
      <HeaderTab />
      <div className="separator w-20 h-0.5 my-4 bg-black/10 mx-auto"></div>

      <FixedHistory tab={currentTab} />
    </div>
  );
}
