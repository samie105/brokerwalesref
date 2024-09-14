import Settings from "@/components/dashboard/settings/Settings";
import React from "react";

export default function Page() {
  return (
    <div className="bg-white  rounded-sm md:pt-0.5 p-2 md:p-0 h-[calc(100vh-5.5rem)] w-[calc(100vw-0.8rem)] md:w-full  pb-[4.5rem]  overflow-x-hidden">
      <Settings />
    </div>
  );
}
