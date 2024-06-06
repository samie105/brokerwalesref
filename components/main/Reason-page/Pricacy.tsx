import { useColors } from "@/context/colorContext";
import React from "react";
import LottieLoaderPrivacy from "./LottieLoaderPrivacy";
import Image from "next/image";
export default function Privacy() {
  const colors = useColors();
  return (
    <div className="mt-12 privacy items-center gap-8 px-10 grid md:grid-cols-3">
      <div className="text-cont flex /items-center h-full">
        {/* <div className="h-2/6 w-4 mr-6 bg-blue-700 rounded-full overflow-hidden"></div> */}
        <div
          className="count text-[7rem] font-black text-blue-100 font-sans mr-6"
          style={{
            color: colors.defaultblue + "25",
          }}
        >
          1
        </div>
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
                d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.75Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="name font-bold mt-2 text-lg text-neutral-600">
            Private and Secured
          </div>
          <div className="desc mt-2 /font-medium text-xs text-neutral-500 font-semibold /p-2 rounded-sm /text-balance">
            At Wilson Investment Bank & Co, your privacy and securities are our
            top priorities. With state-of-the-art encryption technology,
            multi-factor authentication, and continuous monitoring, we ensure
            that your sensitive information and transactions are safeguarded at
            every step.
          </div>
        </div>
      </div>
      <LottieLoaderPrivacy />
      <div className="image">
        <Image
          src={"/assets/privacywcu.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full rounded-xl"
        />
      </div>
    </div>
  );
}
