"use client";
import Navbar from "@/components/dashboard/Navbar/Navbar";
import SideBar from "@/components/dashboard/SideBar";
import { useColors } from "@/context/colorContext";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const color = useColors();
  return (
    <div className="grid p-3 gap-x-2 grid-cols-12 relative w-screen h-screen overflow-hidden bg-[#0013BB09]">
      <div className="lg:col-span-2 md:col-span-3">
        <SideBar />
      </div>
      <div className="md:col-span-9 lg:col-span-10 relative">
        <nav>
          <Navbar />
        </nav>
        <div className="mt-20">{children}</div>
      </div>
    </div>
  );
}
