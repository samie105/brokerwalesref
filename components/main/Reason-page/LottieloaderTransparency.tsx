"use client";
import React from "react";
import Lottie from "lottie-react";
import dynamic from "next/dynamic";
import animationData from "@/public/assets/transparency.json";

export default function LottieloaderTransperency() {
  const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
    ssr: false,
  });
  return (
    <div className="  /bg-blue-50/80 rounded-xl hidden w-full md:flex items-center justify-center h-full">
      <Lottie animationData={animationData} className="w-[90%] h-[13rem]" />
    </div>
  );
}
