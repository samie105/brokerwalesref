import React from "react";
import { Inter } from "next/font/google";
import TransferInfo from "./TransferInfo";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Transfers() {
  return (
    <div>
      {" "}
      <div className="flex justify-between items-center">
        <div className="">
          <div className="Fixed-type text-xs gap-x-1 bg-neutral-500/5 p-2 md:px-4 rounded-md inline-flex items-center font-semibold text-neutral-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
            </svg>

            <p> Transfers</p>
          </div>
          <div
            className={`Fixed-balance text-3xl mt-2  pl-3 /blur-md font-bold text-neutral-600 ${inter.className}`}
          >
            <span className="text-sm">$</span>0.00
          </div>{" "}
          <p className="text-neutral-400 text-xs mt-1 font-medium pl-3 ">
            Total successful transfers
          </p>
        </div>
        <div className="icons flex gap-x-2">
          {" "}
          <div className="create-new cursor-pointer hover:bg-base-color/10 transition-all flex items-center md:gap-x-2 bg-base-color/5 text-base-color/80 px-3 /md:px-3 py-3 rounded-sm font-medium">
            <div className="text-sm font-semibold hidden md:block">
              Make a Transfer
            </div>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
            </svg>
          </div>
          <div></div>
        </div>
      </div>
      <TransferInfo />
    </div>
  );
}
