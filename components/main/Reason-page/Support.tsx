import { useColors } from "@/context/colorContext";
import React from "react";
import LottieloaderTransperency from "./LottieloaderTransparency";
import Image from "next/image";
import LottieloaderSupport from "./LottieloaderSupport";
import Link from "next/link";
export default function Support() {
  const colors = useColors();
  return (
    <div className="mt-8 privacy items-center gap-8 shadow-lg bg-white shadow-gray-200 rounded-lg overflow-hidden /shadow-md md:mx-20 /px-2 /md:px-10 grid md:grid-cols-2">
      {/* <div className="flex h-full bg-blue-700/10">
        <div
          className="count hidden md:block text-[7rem] font-black text-blue-100 font-sans mr-6"
          style={{
            color: colors.defaultblue + "25",
          }}
        >
          4
        </div>{" "}
        <LottieloaderSupport />
      </div> */}
      <div className="text-cont order-last md:order-none md:py-20 md:px-12 py-6 px-5 flex /items-center h-full">
        {" "}
        <div>
          {" "}
          <div
            className="icon rounded-xl p-2 inline-flex items-center text-sm font-medium gap-2 justify-center"
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
            <p>Support</p>
          </div>
          <div className="name font-bold mt-2 text-lg /pr-2 text-neutral-600">
            Responsive Support
          </div>
          <div className="desc mt-4 md:mt-2 font-medium text-sm text-neutral-500  /font-semibold /p-2 rounded-sm /text-balance">
            At Wilson Investment Bank & Co, we prioritize customer satisfaction
            above all else. Our dedicated team is here to listen to your
            feedback, address your concerns, and provide personalized support
            every step of the way. Whether you have questions about your
            account, need assistance with a transaction, or want to explore new
            banking features, we’re here to help. Trust Wilson Investment bank &
            Co for exceptional customer service that goes above and beyond your
            expectations
          </div>
          <div className="flex">
            {" "}
            <Link
              href="#"
              style={{ background: colors.defaultblue }}
              className="flex h-12 items-center justify-center gap-x-2 mt-8 rounded-md px-8 text-sm /font-medium font-bold text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              <p>{"Get Support"}</p>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>{" "}
      <div className="image h-full bg-blue-700/10 order-first md:order-none">
        {/* <Image
          src={"/assets/supportwcu.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full rounded-xl"
        /> */}
        <LottieloaderSupport />
      </div>{" "}
    </div>
  );
}
