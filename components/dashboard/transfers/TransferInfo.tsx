"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Inter } from "next/font/google";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetchInfo } from "@/lib/data/fetchPost";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function TransferInfo() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const [showTransactionPin, setShowTransactionPin] = useState(false);

  const ToggleVisibility = ({
    show,
    onToggle,
  }: {
    show: boolean;
    onToggle: () => void;
  }) => (
    <Button
      type="button"
      className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
      size="icon"
      onClick={onToggle}
    >
      {show ? (
        <EyeOffIcon className="h-4 w-4" />
      ) : (
        <EyeIcon className="h-4 w-4" />
      )}
    </Button>
  );
  return (
    <div className="grid md:grid-cols-2 mt-5 gap-x-2 grid-cols-1">
      {" "}
      <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
        <div className="p-4">
          <div className="text-base text-neutral-700 font-semibold py-1">
            Transaction Pin
          </div>
          <div className="mt- text-sm text-neutral-500 font-medium">
            This is your transaction security pin
          </div>
        </div>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <div className="py-2 px-3 flex items-center justify-between bg-neutral-100 rounded-sm ">
                <div className="name_pin">
                  <div className="name text-xs font-medium text-neutral-500">
                    Transaction Pin
                  </div>
                  <div
                    className={`${inter.className} transition-all ${
                      showTransactionPin ? "blur-md" : ""
                    } text-neutral-700 mt-1 font-bold text-xl`}
                  >
                    7463
                  </div>
                </div>
                <div className="ctrls flex items-center gap-x-1">
                  {" "}
                  <ToggleVisibility
                    show={showTransactionPin}
                    onToggle={() => setShowTransactionPin(!showTransactionPin)}
                  />
                </div>
              </div>
            </div>
            {/* <Button className="w-full font-semibold bg-base-color/70 text-white rounded-sm">
              Change pin
            </Button> */}
          </div>
        </CardContent>{" "}
      </Card>
      <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
        <div className="p-4">
          <div className="text-base text-neutral-700 font-semibold py-1">
            Account Limit
          </div>
          <div className="mt- text-sm text-neutral-500 font-medium">
            You can't transfer above this amount
          </div>
        </div>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <div className="py-2 px-3 flex items-center justify-between bg-neutral-100 rounded-sm ">
                <div className="name_pin">
                  <div className="name text-xs font-medium text-neutral-500">
                    Account Limit
                  </div>
                  <div className={`limit text-neutral-700 font-bold text-lg `}>
                    <span className="text-xs font-semibold ">$</span>
                    <span className={`${inter.className}`}>
                      {data.accountLimit.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <Button className="w-full font-semibold bg-base-color/70 text-white rounded-sm">
              Increase Limit
            </Button> */}
          </div>
        </CardContent>{" "}
      </Card>
    </div>
  );
}
