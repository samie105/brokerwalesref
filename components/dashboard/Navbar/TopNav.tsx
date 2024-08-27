"use client";
import { useFetchInfo } from "@/lib/data/fetchPost";
import Link from "next/link";
import React from "react";

export default function TopNav({
  currentMode,
}: {
  currentMode: string | string[];
}) {
  const TopNavs = [
    {
      name: "account",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
          />
        </svg>
      ),
    },
    {
      name: "fixed",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
          />
        </svg>
      ),
    },
    {
      name: "cards",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
      ),
    },
  ];
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  return (
    <>
      <div className="w-full pl-1 flex items-center space-x-2">
        <div className="font-medium text-sm bg-white rounded-md py-1 px-2">
          <span className="text-lg">👋</span>
          <span className="font-semibold"></span>
        </div>
        <div className="liner h-3 md:h-6 mx-3  md:block lg:mx-6 w-[1px] bg-neutral-300/70" />

        {TopNavs.map((nav) => (
          <Link
            href={`?mode=${nav.name}`}
            key={nav.name}
            className={`py-2 px-2 capitalize cursor-pointer flex item-center gap-x-3 rounded-sm font-medium  text-sm  ${
              currentMode === nav.name
                ? "text-base-color/80 font-semibold bg-white border border-base-color/40"
                : "text-neutral-500  bg-white"
            } `}
          >
            {" "}
            {nav.icon} {nav.name}
          </Link>
        ))}
      </div>
    </>
  );
}
