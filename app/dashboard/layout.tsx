import Navbar from "@/components/dashboard/Navbar/Navbar";
import SideBar from "@/components/dashboard/SideBar";
import Providers from "@/lib/queryClient";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="grid gap-x-1.5 md:grid-cols-12 relative w-screen h-screen overflow-hidden bg-neutral-100">
        <div className="lg:col-span-2 pl-2 py-2 hidden md:block md:col-span-3">
          <SideBar />
        </div>
        <div className="md:col-span-9 lg:col-span-10 relative">
          <nav className="px-2 pt-2">
            <Navbar />
          </nav>
          <div className="mt-[4.6rem] pl-2 pr-1.5 md:mt-20">{children}</div>
        </div>
      </div>
    </Providers>
  );
}
