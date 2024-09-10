"use client";
import React from "react";
import { Inter } from "next/font/google";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { toast } from "sonner";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DepHeader() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;

  return (
    <div className="grid md:grid-cols-3 grid-cols-1">
      {" "}
      <div className="md:bg-white py-4 px-2 rounded-sm bor/der b/order-neutral-500/10">
        <div className="Fixed-type text-xs gap-x-1 bg-neutral-500/5 p-2 md:px-4 rounded-sm inline-flex items-center font-semibold text-neutral-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M4.5 13a3.5 3.5 0 0 1-1.41-6.705A3.5 3.5 0 0 1 9.72 4.124a2.5 2.5 0 0 1 3.197 3.018A3.001 3.001 0 0 1 12 13H4.5Zm.72-5.03a.75.75 0 0 0 1.06 1.06l.97-.97v2.69a.75.75 0 0 0 1.5 0V8.06l.97.97a.75.75 0 1 0 1.06-1.06L8.53 5.72a.75.75 0 0 0-1.06 0L5.22 7.97Z"
              clipRule="evenodd"
            />
          </svg>
          <p>Deposits</p>
        </div>
        <div
          className={`Fixed-balance text-3xl mt-2  pl-2 /blur-md font-bold text-neutral-600 ${inter.className}`}
        >
          <span className="text-sm">$</span>
          {data.fixedBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>{" "}
        <p className="text-neutral-400 text-xs mt-1 font-medium pl-2 ">
          Available Balance
        </p>
      </div>
      <div className="md:bg-white bg-neutral-50/70 py-4 px-2 rounded-sm border border-neutral-500/10">
        <div className="flex justify-between items-center">
          <div>
            <div className="Fixed-type text-xs gap-x-1 bg-neutral-500/5 p-2 md:px-4 rounded-sm inline-flex items-center font-semibold text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <p>Account Info</p>
            </div>
            <div
              className={`Fixed-balance text-xl mt-2  pl-2 /blur-md font-bold text-neutral-600 ${inter.className}`}
            >
              {data.bankRoutingNumber}
            </div>{" "}
            <p className="text-neutral-400 text-xs mt-1 font-medium pl-2 ">
              Bank routing number
            </p>
          </div>

          <div className="copy-icon">
            <div
              className="cont p-3 rounded-full cursor-pointer bg-neutral-500/5 text-neutral-600"
              onClick={() => {
                toast.success("Copied");
                navigator.clipboard.writeText(data.bankRoutingNumber);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="md:bg-white bg-neutral-50/70 py-4 px-2 rounded-sm border border-neutral-500/10">
        <div className="flex justify-between items-center">
          <div>
            <div className="Fixed-type text-xs gap-x-1 bg-neutral-500/5 p-2 md:px-4 rounded-sm inline-flex items-center font-semibold text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <p>Account Info</p>
            </div>
            <div
              className={`Fixed-balance text-xl mt-2  pl-2 /blur-md font-bold text-neutral-700 ${inter.className}`}
            >
              {data.bankAccountNumber}
            </div>{" "}
            <p className="text-neutral-400 text-xs mt-1 font-medium pl-2 ">
              Bank account number
            </p>
          </div>

          <div className="copy-icon">
            <div
              className="cont p-3 rounded-full cursor-pointer bg-neutral-500/5 text-neutral-600"
              onClick={() => {
                toast.success("Copied");
                navigator.clipboard.writeText(data.bankAccountNumber);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
