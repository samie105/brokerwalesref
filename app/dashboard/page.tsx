import { Chart } from "@/components/dashboard/Dashboard/Chart";
import Fixed from "@/components/dashboard/Dashboard/Fixed";
import Dashboard from "@/components/dashboard/Dashboard/Main";
import dbConnect from "@/server";
import User, { IUser } from "@/server/userSchema";
import { revalidatePath, unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import React from "react";

export default async function page() {
  unstable_noStore();
  await dbConnect();
  const email = cookies().get("userEmail")?.value;
  const data: IUser | null = await User.findOne({ email });
  const cleanData = JSON.parse(JSON.stringify(data));
  if (data)
    return (
      <div className="bg-white/ overflow-hidden p-1/ rounded-md ">
        <div className="h-[calc(100vh-5.5rem)] overflow-scroll rounded-md">
          {" "}
          <Dashboard data={cleanData} />
          <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-x-2 ">
            {" "}
            <Fixed />
            <Chart />
          </div>
        </div>
      </div>
    );
}
