import React from "react";
import Notification from "./Notification";
import NavOptions from "./NavOptions";
import hero from "@/public/assets/hero-logo-blue.png";
import Translate from "./Translate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOut from "./SignOut";
import Link from "next/link";
import User, { IUser } from "@/server/userSchema";
import { cookies } from "next/headers";
import dbConnect from "@/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchDetails } from "@/server/actions/createUser";
import Image from "next/image";

export default async function Navbar() {
  await dbConnect();
  const email = cookies().get("userEmail")?.value;
  const rawData = await User.findOne({ email });
  const data: IUser | null = JSON.parse(JSON.stringify(rawData));

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["deets"],
    queryFn: fetchDetails,
  });
  if (data)
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className=" relative w-full">
          <div className="bg-white mx-auto rounded-md w-full flex justify-between items-center absolute px-3 md:px-2 py-3 md:py-2 ">
            <div className="account-info hidden md:block">
              <Link
                href={"/dashboard/settings"}
                className="account-section transition-all cursor-pointer hover:bg-[#0013BB09] p-2 rounded-md flex /pl-1 items-center space-x-2"
              >
                <Avatar>
                  {<AvatarImage src="https://github.com/shadcn.png" />}
                  <AvatarFallback className="font-bold border border-base-color/30 text-sm text-base-color/80 bg-base-color/5">
                    {data.firstName.charAt(0).toUpperCase()}
                    {data.lastName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="pl-1">
                  {" "}
                  <div className="name  text-sm text-neutral-500 font-semibold">
                    <span className="font-medium">Hello, </span>
                    {data.lastName}
                  </div>
                  <div className="account-type capitalize mt-0.5 text-xs font-medium text-neutral-400">
                    {data.accountType} |{" "}
                    <code>
                      **
                      {data.bankAccountNumber.substring(
                        data.bankAccountNumber.length - 4
                      )}
                    </code>
                  </div>
                </div>
                <div className="veification-status pl-3 font-medium text-sm">
                  <div
                    className={`badge bg-red-50/60 border border-red-50 px-2 py-1.5 text-xs rounded-md font-semibold text-red-500 flex items-center space-x-1`}
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

                    <p className="hidden md:block">Not Verified</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="navbar md:hidden p-3 rounded-md text-base-color/80 bg-base-color/5 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 10.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="image">
                <Image
                  src={hero}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-14 h-5 opacity-80"
                />
              </div>
            </div>
            <div className="control-center flex /space-x-1.5 items-center">
              {/* <Translate />
              <div className="liner hidden md:block h-2 mx-3 w-0.5 bg-neutral-300/70" /> */}

              <Notification />
              <NavOptions data={data} />
              <div className="liner h-3 md:h-6 mx-3 hidde/n md:block lg:mx-6 w-[1px] bg-neutral-300/70" />
              <SignOut />
            </div>
          </div>
        </div>
      </HydrationBoundary>
    );
}
