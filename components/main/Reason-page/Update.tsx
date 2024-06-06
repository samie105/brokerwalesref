import { useColors } from "@/context/colorContext";
import React from "react";
import Image from "next/image";
import LottieLoaderUpdate from "./LottieLoaderUpdate";
export default function Update() {
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
          3
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
                d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="name font-bold mt-2 pr-2 text-lg text-neutral-600">
            Improvement & Innovations
          </div>
          <div className="desc mt-2 /font-medium text-xs text-neutral-500 font-semibold p-2 rounded-sm /text-balance">
            At Wilson Investment Bank & Co, we are committed to innovation and
            continuous improvement. Our cutting-edge technology and digital
            solutions are constantly evolving to meet the changing needs of our
            customers.
            {/* From mobile banking enhancements to new security
            features, we are dedicated to providing you with the latest tools
            and technologies to enhance your banking experience. */}
          </div>
        </div>
      </div>
      <LottieLoaderUpdate />
      <div className="image">
        <Image
          src={"/assets/updatewcu.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full rounded-xl"
        />
      </div>
    </div>
  );
}
