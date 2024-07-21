import SideBar from "@/components/dashboard/SideBar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-12 bg-blue-50">
      <div className="col-span-3">
        <SideBar />
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  );
}
