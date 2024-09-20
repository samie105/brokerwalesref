import React from "react";
import ImageJuggler from "./ImageJuggler";
import Link from "next/link";
import Image from "next/image";
import mastercard from "@/public/assets/cards/card_types/mastercard.png";
import visa from "@/public/assets/cards/card_types/visa.png";
import discover from "@/public/assets/cards/card_types/discover.png";

export default function CardPage() {
  return (
    <div>
      <div className="px-10 md:px-20 h-full w-full savings_cont grid md:grid-cols-2 grid-cols-1 gap-x-10 mb-9 md:items-center /bg-neutral-400/10 py-10 overflow-hidden relative">
        <div className="text-cont z-20 lg:pr-10">
          <div className="flex items-center gap-x-3">
            <div className="register  bg-neutral-50 text-xs text-neutral-600 py-2 px-3 rounded-md font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#]">
              <Image
                src={mastercard}
                width={1000}
                height={1000}
                className="h-5 w-auto"
                alt=""
              />

              <p>Mastercard</p>
            </div>
            <div className="register bg-neutral-50 text-xs text-neutral-600 py-2 px-3 rounded-md font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#]">
              <Image
                src={visa}
                width={1000}
                height={1000}
                className="h-5 w-auto"
                alt=""
              />

              <p>Visa</p>
            </div>
            <div className="register  bg-neutral-50 text-xs text-neutral-600 py-2 px-3 rounded-md font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#]">
              <Image
                src={discover}
                width={1000}
                height={1000}
                className="h-5 w-auto"
                alt=""
              />

              <p>Discover</p>
            </div>
          </div>
          <div className="large-text text-3xl md:text-5xl  mt-5 font-semibold text-neutral-700">
            Explore Credit Card Options
          </div>
          <div className="small-text text-base lg:text-lg mt-5 font-medium text-neutral-500 md:text-balance">
            Discover the best credit card options at{" "}
            <span className="font-semibold">Wilson Bank</span>, tailored to
            maximize your purchasing power and financial flexibility. Benefit
            from our expert advice and exclusive rewards as you manage your
            spending efficiently.
          </div>

          <div className="flex mt-5 md:mt-8 gap-x-2 text-sm md:justify-start">
            {" "}
            <Link
              href={"/auth/login"}
              className=" bg-base-color/80 px-6 py-4 rounded-full font-bold text-white flex items-center gap-3 cursor-pointer hover:bg-[#]"
            >
              <p>Get a card</p>
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
            </Link>
            <Link
              href={"/auth/login"}
              className=" bg-neutral-50 hidden hover:bg-neutral-100 transition-all lg:flex px-6 py-4 rounded-full font-bold text-neutral-600  items-center gap-3 cursor-pointer hover:bg-[#]"
            >
              <p>Create an Account</p>
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
            </Link>
          </div>
        </div>

        <div className="mt-5 size-full mt:mt-0 order-first ">
          {" "}
          <ImageJuggler />
        </div>
      </div>
    </div>
  );
}
