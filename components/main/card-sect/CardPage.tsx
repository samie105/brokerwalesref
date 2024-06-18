"use client";
import { useColors } from "@/context/colorContext";
import React, { useEffect, useState } from "react";
import ImageJuggler from "./ImageJuggler";
import Image from "next/image";

export default function CardPage() {
  const colors = useColors();

  return (
    <div>
      <div className="px-10 md:px-20 h-full w-full savings_cont grid md:grid-cols-2 grid-cols-1 mt-16 mb-16 md:items-center bg-neutral-400/10 py-10 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-fixed z-10 bg-repeat opacity-35">
          <Image
            src="/assets/cardbg.svg"
            alt=""
            width={1000}
            height={1000}
            className="h-full/ w-full opacity-5  parallax-image  /object-cover"
          />
        </div>
        <div className="text-cont z-20">
          <div className="flex items-center gap-x-3">
            <div className="register bg-green-700/10 text-xs text-green-500 p-2 rounded-full font-bold flex items-center gap-2 cursor-pointer hover:bg-[#]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <p>Cards</p>
            </div>
          </div>
          <div className="large-text text-2xl mt-3 font-bold text-neutral-700">
            Explore Credit Card Options
          </div>
          <div className="small-text text-sm mt-1 font-medium text-neutral-500 md:text-balance">
            Discover the best credit card options at <b>Wilson Bank</b>,
            tailored to maximize your purchasing power and financial
            flexibility. Benefit from our expert advice and exclusive rewards as
            you manage your spending efficiently.
          </div>

          <div className="flex mt-5 text-sm md:justify-start">
            {" "}
            <div
              className="  px-6 py-4 rounded-xl font-bold text-white flex items-center gap-3 cursor-pointer hover:bg-[#]"
              style={{ background: colors.defaultblue }}
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
            </div>
          </div>
        </div>

        <div className="h-[250px] mt-5 mt:mt-0 order-first md:order-none">
          {" "}
          <ImageJuggler />
        </div>
      </div>
    </div>
  );
}
