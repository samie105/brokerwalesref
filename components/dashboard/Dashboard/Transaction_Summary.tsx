"use client";
import React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useFetchInfo } from "@/lib/data/fetchPost";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function TransactionSummary({
  currentMode,
  transactionTab,
}: {
  currentMode: string | string[];
  transactionTab: string | string[];
}) {
  const tabs = [
    {
      name: "deposits",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
          />
        </svg>
      ),
    },
    {
      name: "transfers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
          />
        </svg>
      ),
    },
  ];
  const { data: deets } = useFetchInfo();
  const data = deets!.data;

  const transactionHistory = [
    {
      id: 1,
      amount: 23332,
      date: new Date(),
      receipientAccountNumber: 5553333332,
      status: "pending",
      receipientNmae: "Oj Richie",
      receipientBankName: "Chase Bank",
    },
    {
      id: 1,
      amount: -23774,
      date: new Date(),
      receipientAccountNumber: 5553333332,
      status: "pending",
      receipientNmae: "Matthew Hogswart",
      receipientBankName: "Truist Bank",
    },
    {
      id: 1,
      amount: 4000,
      date: new Date(),
      receipientAccountNumber: 5553333332,
      status: "pending",
      receipientNmae: "James Addijones",
      receipientBankName: "Bank of America",
    },
  ];

  const totalAmount = transactionHistory.reduce(
    (acc, current) => acc + (current.amount > 0 ? current.amount : 0),
    0
  );

  return (
    <div className="w-full border-none shadow-none rounded-md p-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="">
          <div className="Fixed-type text-s gap-x-1 bg-base-color/5/ p-2 rounded-md inline-flex items-center font-semibold text-neutral-700 /text-base-color/80">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M9.638 1.093a.75.75 0 0 1 .724 0l2 1.104a.75.75 0 1 1-.724 1.313L10 2.607l-1.638.903a.75.75 0 1 1-.724-1.313l2-1.104ZM5.403 4.287a.75.75 0 0 1-.295 1.019l-.805.444.805.444a.75.75 0 0 1-.724 1.314L3.5 7.02v.73a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .388-.657l1.996-1.1a.75.75 0 0 1 1.019.294Zm9.194 0a.75.75 0 0 1 1.02-.295l1.995 1.101A.75.75 0 0 1 18 5.75v2a.75.75 0 0 1-1.5 0v-.73l-.884.488a.75.75 0 1 1-.724-1.314l.806-.444-.806-.444a.75.75 0 0 1-.295-1.02ZM7.343 8.284a.75.75 0 0 1 1.02-.294L10 8.893l1.638-.903a.75.75 0 1 1 .724 1.313l-1.612.89v1.557a.75.75 0 0 1-1.5 0v-1.557l-1.612-.89a.75.75 0 0 1-.295-1.019ZM2.75 11.5a.75.75 0 0 1 .75.75v1.557l1.608.887a.75.75 0 0 1-.724 1.314l-1.996-1.101A.75.75 0 0 1 2 14.25v-2a.75.75 0 0 1 .75-.75Zm14.5 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-.388.657l-1.996 1.1a.75.75 0 1 1-.724-1.313l1.608-.887V12.25a.75.75 0 0 1 .75-.75Zm-7.25 4a.75.75 0 0 1 .75.75v.73l.888-.49a.75.75 0 0 1 .724 1.313l-2 1.104a.75.75 0 0 1-.724 0l-2-1.104a.75.75 0 1 1 .724-1.313l.888.49v-.73a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg> */}
            <p> Recent Transactions</p>
          </div>
          <div className="flex items-center font-medium space-x-2">
            {tabs.map((tab) => (
              <Link
                href={`?mode=${currentMode}&tab=${tab.name}`}
                key={tab.name}
                className={` px-3 py-2 flex gap-x-2 items-center rounded-sm text-sm capitalize ${
                  tab.name === transactionTab
                    ? "bg-base-color/5 text-base-color/80 font-semibold"
                    : "bg-neutral-400/5 text-neutral-500"
                }`}
              >
                {tab.icon} <p>{tab.name}</p>
              </Link>
            ))}
          </div>
          <div
            className={`Fixed-balance text-3xl mt-2 /blur-md font-bold text-neutral-600 ${inter.className}`}
          >
            <span className="text-sm">$</span>
            {totalAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>{" "}
        </div>
      </div>
      <div className="text-xs text-neutral-500 font-medium mt-2">
        Total in <span className="capitalize">{transactionTab}</span>
      </div>

      <div className="separator w-20 h-0.5 mt-4 bg-black/10 mx-auto"></div>
      <div className="Fixed-info">
        <h1 className="text-neutral-700 hidden font-bold text-sm mt-5">
          Transaction history
        </h1>
        <div className="Fixed-limit-info mt-5 space-y-6">
          {transactionHistory.length >= 1 && (
            <div className="space-y-1 ">
              {transactionHistory.slice(0, 2).map((history, index) => (
                <>
                  <div
                    key={history.id}
                    className="border-neutral-500/10 flex justify-between items-center  /border rounded-md p-2"
                  >
                    {" "}
                    <div className="first-box flex items-center gap-x-2">
                      {" "}
                      <div className="logo-area rounded-full bg-neutral-500/10 p-4 text-neutral-600 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                          />
                        </svg>
                      </div>
                      <div className="transaction-details">
                        <div className="name font-semibold">
                          {history.receipientNmae}
                        </div>
                        <div
                          className={`detail text-xs font-normal text-neutral-500 ${inter.className}`}
                        >
                          {history.date.toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          |{" "}
                          {history.date.toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </div>
                      </div>{" "}
                    </div>
                    <div
                      className={`amount-box font-semibold text-sm ${
                        inter.className
                      } ${
                        history.amount < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {history.amount < 0
                        ? `-$${Math.abs(history.amount).toLocaleString()}`
                        : `+$${history.amount.toLocaleString()}`}
                    </div>{" "}
                  </div>{" "}
                  {index < transactionHistory.slice(0, 2).length - 1 && (
                    <div className="separator w-10 h-[1px] my-1 bg-black/10 mx-auto"></div>
                  )}
                </>
              ))}
            </div>
          )}

          {transactionHistory.length < 1 && (
            <div className="flex items-center min-h-44 h-full justify-center">
              <div className="inner-items /text-center">
                <div className="icon flex justify-center text-neutral-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.236a1 1 0 0 1-.894-.553l-.448-.894A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text text-neutral-500 text-sm font-semibold">
                  No History Here
                </div>
              </div>
            </div>
          )}
          {transactionHistory.length >= 1 && (
            <Link
              className="fixed-main-hist-link flex items-center justify-center text-sm gap-x-1 font-semibold text-base-color/80 border border-base-color/10 hover:bg-base-color/5 transition-all /bg-black/5 w-full rounded-md py-3"
              href={`/dashboard/${transactionTab}`}
            >
              <p>View all history</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
