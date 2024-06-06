import { useColors } from "@/context/colorContext";
import React from "react";
import LottieloaderTransperency from "./LottieloaderTransparency";
import Image from "next/image";
import LottieloaderSupport from "./LottieloaderSupport";
export default function Support() {
  const colors = useColors();
  return (
    <div className="mt-12 privacy items-center gap-8 px-10 grid md:grid-cols-3">
      <LottieloaderSupport />
      <div className="image">
        <Image
          src={"/assets/supportwcu.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full rounded-xl"
        />
      </div>{" "}
      <div className="text-cont flex /items-center h-full">
        {" "}
        <div className="h-2/6 w-4 mr-6 bg-blue-700 rounded-full overflow-hidden"></div>{" "}
        <div>
          {" "}
          <div
            className="icon rounded-xl p-1 h-10 w-10 flex items-center justify-center"
            style={{
              background: colors.defaultblue + "10",
              color: colors.defaultblue,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="name font-bold mt-2 text-lg pr-2 text-neutral-600">
            Responsive Support
          </div>
          <div className="desc mt-2 /font-medium text-xs text-neutral-500  font-semibold p-2 rounded-sm /text-balance">
            At Wilson Investment Bank & Co, we prioritize customer satisfaction
            above all else. Our dedicated team is here to listen to your
            feedback, address your concerns, and provide personalized support
            every step of the way. Whether you have questions about your
            account, need assistance with a transaction, or want to explore new
            banking features, we’re here to help.
          </div>
        </div>
      </div>
    </div>
  );
}
