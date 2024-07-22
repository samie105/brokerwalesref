import React from "react";
import Notification from "./Notification";
import NavOptions from "./NavOptions";
import Translate from "./Translate";
import { logout } from "@/server/dashboard/navActions";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const router = useRouter();
  const Logout = () => {
    logout();
    router.replace("/auth/login");
  };
  return (
    <div className=" relative w-full">
      <div className="bg-white mx-auto rounded-md w-full flex justify-between items-center absolute px-2 py-2">
        <div className="account-info">
          <div className="account-section transition-all cursor-pointer hover:bg-[#0013BB09] p-2 rounded-md flex /pl-1 items-center space-x-2">
            <Avatar>
              {<AvatarImage src="https://github.com/shadcn.png" />}
              <AvatarFallback className="font-bold text-sm text-neutral-500">
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
          </div>
        </div>
        <div className="control-center flex  items-center">
          <Notification />
          <Translate />
          <NavOptions />
          <div
            onClick={Logout}
            className="sign-out rounded-md transition-all p-3 ml-4 cursor-pointer hover:bg-red-50"
          >
            <div className="flex item-center gap-x-2 text-sm text-red-300 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 text-red-300"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              <p>Sign out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
