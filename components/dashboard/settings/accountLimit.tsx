"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import { useFetchInfo } from "@/lib/data/fetchPost";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AccountLimit() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  return (
    <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
      <div className="p-4">
        <div className="text-base text-neutral-700 font-semibold py-1">
          Account Limit
        </div>
        <div className="mt- text-sm text-neutral-500 font-medium">
          Manage your account limits
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
          <Button className="w-full font-semibold bg-base-color/70 text-white rounded-sm">
            Increase Limit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
