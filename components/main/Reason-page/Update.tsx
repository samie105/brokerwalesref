import { useColors } from "@/context/colorContext";
import React from "react";
import Image from "next/image";
import LottieLoaderUpdate from "./LottieLoaderUpdate";
import Link from "next/link";
export default function Update() {
  const colors = useColors();
  return (
    <div className="mt-8 privacy items-center s/hadow-md bg-white shadow-lg shadow-gray-200 rounded-lg overflow-hidden /shadow-md md:mx-20 /md:px-10 grid md:grid-cols-2">
      <div className="text-cont order-last flex md:py-20 md:px-12 py-6 px-5 /items-center h-full">
        {/* <div className="h-2/6 w-4 mr-6 bg-blue-700 rounded-full overflow-hidden"></div> */}
        {/* <div
          className="count hidden md:block text-[7rem] font-black text-blue-100 font-sans mr-6"
          style={{
            color: colors.defaultblue + "25",
          }}
        >
          3
        </div> */}
        <div>
          {" "}
          <div
            className="icon rounded-xl p-2 font-semibold text-sm inline-flex items-center gap-2"
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
            <p>Update</p>
          </div>
          <div className="name font-bold mt-2 /pr-2 text-lg text-neutral-600">
            Improvement & Innovations
          </div>
          <div className="desc mt-4 md:mt-2 /font-medium text-sm text-neutral-500 font-medium /p-2 rounded-sm pr-5 text-balance">
            At Wilson Investment Bank & Co, we are committed to innovation and
            continuous improvement. Our cutting-edge technology and digital
            solutions are constantly evolving to meet the changing needs of our
            customers. From mobile banking enhancements to new security
            features, we are dedicated to providing you with the latest tools
            and technologies to enhance your banking experience. With Wilson
            Investments bank & Co, you can expect ongoing innovation and a
            forward thinking approach to banking services.
            {/* From mobile banking enhancements to new security
            features, we are dedicated to providing you with the latest tools
            and technologies to enhance your banking experience. */}
          </div>
          <div className="flex">
            {" "}
            <Link
              href="#"
              style={{ background: colors.defaultblue }}
              className="flex h-12 items-center justify-center gap-x-2 mt-8 rounded-md px-8 text-sm /font-medium font-bold text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              <p>{"Stay Updated"}</p>{" "}
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

      <div className="image order-first bg-blue-700/5 h-full md:order-none">
        {/* <Image
          src={"/assets/updatewcu.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full /rounded-xl"
        /> */}
        <LottieLoaderUpdate />
      </div>
    </div>
  );
}
