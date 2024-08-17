import React from "react";
import Notification from "./Notification";
import NavOptions from "./NavOptions";
import Translate from "./Translate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOut from "./SignOut";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className=" relative w-full">
      <div className="bg-white mx-auto rounded-md w-full flex justify-between items-center absolute px-2 py-2">
        <div className="account-info">
          <Link
            href={"/dashboard/settings"}
            className="account-section transition-all cursor-pointer hover:bg-[#0013BB09] p-2 rounded-md flex /pl-1 items-center space-x-2"
          >
            <Avatar>
              {<AvatarImage src="https://github.com/shadcn.png" />}
              <AvatarFallback className="font-bold border border-base-color/30 text-sm text-base-color/80 bg-base-color/5">
                SR
              </AvatarFallback>
            </Avatar>
            <div className="pl-1">
              {" "}
              <div className="name  text-sm text-neutral-500 font-semibold">
                <span className="font-medium">Hello, </span>Richfield
              </div>
              <div className="account-type mt-0.5 text-xs font-medium text-neutral-400">
                Checkings | <code>**0980</code>
              </div>
            </div>
            <div className="veification-status pl-3 font-medium text-sm">
              <div
                className={`badge bg-red-50 border border-red-50 px-2 py-1.5 text-xs rounded-md font-semibold text-red-500 flex items-center space-x-1`}
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

                <p>Not Verified</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="control-center flex /space-x-1.5 items-center">
          <Translate />
          <div className="liner h-2 mx-3 w-0.5 bg-neutral-300/70" />

          <Notification />
          <NavOptions />
          <div className="liner h-6 mx-6 w-0.5 bg-neutral-300/70" />
          <SignOut />
        </div>
      </div>
    </div>
  );
}
