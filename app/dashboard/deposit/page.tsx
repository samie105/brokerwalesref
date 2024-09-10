import React from "react";
import Deposits from "@/components/dashboard/deposit/Deposit";
import DepHeader from "@/components/dashboard/deposit/DepHeader";

export default function Page() {
  return (
    <div className="bg-white md:bg-transparent rounded-sm md:pt-0.5 p-2 md:p-0 h-[calc(100vh-5.5rem)] w-[calc(100vw-0.8rem)] md:w-full  /pb-[4.5rem]  overflow-x-hidden">
      <DepHeader />
      <Deposits />
    </div>
  );
}
