import { useColors } from "@/context/colorContext";
import React from "react";
import LottieLoaderPrivacy from "./LottieLoaderPrivacy";
import Image from "next/image";
import Link from "next/link";
export default function Privacy() {
  const colors = useColors();
  return (
    <div className="mt-8 z-30 privacy bg-white items-end md:items-center /bg-white gap-8 /px- shadow-lg shadow-gray-200 rounded-lg overflow-hidden /mx-5 /shadow-md md:mx-20 /md:px-10 grid grid-cols-1 s/hadow-md md:grid-cols-2">
      <div className="image bg-blue-700/5 h-full order-first md:order-none">
        {/* <Image
          src={"/assets/privacywcu.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full /rounded-xl"
        /> */}
        <LottieLoaderPrivacy />
      </div>{" "}
      <div className="text-cont md:py-20 py-6 px-8 md:px-12 flex /items-center h-full order-last md:order-none">
        {/* <div className="h-2/6 w-4 mr-6 bg-blue-700 rounded-full overflow-hidden"></div> */}
        {/* <div
          className="count text-[7rem] font-black hidden md:block text-blue-100 font-sans md:mr-6 mr-3"
          style={{
            color: colors.defaultblue + "25",
          }}
        >
          1
        </div> */}
        <div>
          {" "}
          <div
            className="icon inline-flex rounded-lg py-2 px-2 text-sm font-semibold bg-green-500/10 text-green-600  items-center gap-x-2 /justify-center"
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
            <p>Privacy</p>
          </div>
          <div className="name font-bold mt-2 text-lg text-neutral-600">
            Private and Secured
          </div>
          <div className="desc mt-4 md:mt-2 font-medium md:pr-6 md:text-balance text-sm text-neutral-500 /font-semibold /p-2 rounded-sm /text-balance">
            At Wilson Investment Bank & Co, your privacy and securities are our
            top priorities. With state-of-the-art encryption technology,
            multi-factor authentication, and continuous monitoring, we ensure
            that your sensitive information and transactions are safeguarded at
            every step. Rest assured, your financial data remains private and
            protected, allowing you to bank with confidence and peace of mind.
          </div>
          <div className="flex">
            {" "}
            <Link
              href="#"
              style={{ background: colors.defaultblue }}
              className="flex h-12 items-center justify-center gap-x-2 mt-8 rounded-md px-8 text-sm /font-medium font-bold text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              <p>{"Stay Secured"}</p>{" "}
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
      </div>
    </div>
  );
}
