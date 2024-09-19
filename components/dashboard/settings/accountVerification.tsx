"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFetchInfo } from "@/lib/data/fetchPost";

export default function AccountVerification() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  return (
    <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
      <div className="p-4">
        <div className="text-base text-neutral-700 font-semibold py-1">
          Account Verification
        </div>
        <div className="mt- text-sm text-neutral-500 font-medium">
          Manage your account verification
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <div className="account-section transition-all  cursor-pointer bg-neutral-100 p-2 rounded-md flex items-center justify-between">
              <div className="flex space-x-1">
                <Avatar>
                  {<AvatarImage src={data.profilePictureLink} />}
                  <AvatarFallback className="font-bold text-sm border border-base-color/30 text-base-color/80 bg-base-color/5">
                    {data.firstName.charAt(0).toUpperCase()}
                    {data.lastName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="pl-1">
                  <div className="name  text-sm text-neutral-500 font-semibold">
                    {data.firstName} {data.lastName}
                  </div>
                  <div className="account-type mt-0.5 text-xs font-medium text-neutral-400">
                    Not Verified
                  </div>
                </div>
              </div>
              <div className="veification-status pl-3 font-medium text-sm">
                <div
                  className={`badge bg-red-500/10 border border-red-50 px-2 py-1.5 text-xs rounded-md font-semibold text-red-500 flex items-center space-x-1`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Button
            disabled={false}
            className="w-full disabled:bg-neutral-400 font-semibold bg-base-color/70 text-white rounded-sm"
          >
            Verify account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
