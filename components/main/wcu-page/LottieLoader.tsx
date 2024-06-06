"use client";
import React from "react";
import Lottie from "lottie-react";
import dynamic from "next/dynamic";
import animationData from "@/public/assets/bankLoad.json";

export default function LottieLoader() {
  const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
    ssr: false,
  });
  return (
    <div className=" hidden lg:block">
      <Lottie animationData={animationData} className="w-[60%] h-[10rem]" />
    </div>
  );
}
