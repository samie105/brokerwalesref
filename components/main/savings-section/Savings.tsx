"use client";
import { useColors } from "@/context/colorContext";
import React from "react";
import LottieLoader from "./LottieLoader";

export default function Savings() {
  const colors = useColors();
  return (
    <div className="px-10 md:px-20 savings_cont grid md:grid-cols-2 flex-col-reverse grid-cols-1 mt-8 items-center">
      <div className="text-cont ">
        <div className="flex items-center gap-x-3">
          <div
            className="register p-2 rounded-full font-bold flex items-center text-xs gap-2 cursor-pointer hover:bg-[#]"
            style={{
              background: colors.defaultblue + "10",
              color: colors.defaultblue,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h1.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 9.62 4H11.5A1.5 1.5 0 0 1 13 5.5v1H3v-3ZM3.081 8a1.5 1.5 0 0 0-1.423 1.974l1 3A1.5 1.5 0 0 0 4.081 14h7.838a1.5 1.5 0 0 0 1.423-1.026l1-3A1.5 1.5 0 0 0 12.919 8H3.081Z" />
            </svg>

            <p>Savings</p>
          </div>
          <div className="register bg-green-700/10 text-xs text-green-500 p-2 rounded-full font-bold flex items-center gap-2 cursor-pointer hover:bg-[#]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M2.22 2.22a.75.75 0 0 1 1.06 0L5.5 4.44V2.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h1.69L2.22 3.28a.75.75 0 0 1 0-1.06Zm10.5 0a.75.75 0 1 1 1.06 1.06L11.56 5.5h1.69a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 9 6.25v-3.5a.75.75 0 0 1 1.5 0v1.69l2.22-2.22ZM2.75 9h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-1.69l-2.22 2.22a.75.75 0 0 1-1.06-1.06l2.22-2.22H2.75a.75.75 0 0 1 0-1.5ZM9 9.75A.75.75 0 0 1 9.75 9h3.5a.75.75 0 0 1 0 1.5h-1.69l2.22 2.22a.75.75 0 1 1-1.06 1.06l-2.22-2.22v1.69a.75.75 0 0 1-1.5 0v-3.5Z"
                clipRule="evenodd"
              />
            </svg>

            <p>Investment</p>
          </div>
        </div>
        <div className="large-text text-2xl mt-3 font-bold text-neutral-700">
          Save & Invest with Us
        </div>
        <div className="small-text text-sm mt-1 font-medium text-neutral-500 text-balance">
          Experience unparalleled savings and investment opportunities at{" "}
          <b>Wilson Bank</b>, where your financial growth and security are our
          top priorities. Join us to take advantage of our expert financial
          guidance and comprehensive solutions.
        </div>
        <div className="flex mt-5 text-sm md:justify-start">
          {" "}
          <div
            className="  px-6 py-4 rounded-xl font-bold text-white flex items-center gap-3 cursor-pointer hover:bg-[#]"
            style={{ background: colors.defaultblue }}
          >
            <p>Start Investing</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 block"
            >
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="lottie order-first md:order-none">
        <LottieLoader />
      </div>
      <div></div>
    </div>
  );
}
