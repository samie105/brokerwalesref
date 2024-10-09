import Admin from "@/components/admin";
import User, { IUser } from "@/server/userSchema";
import React from "react";

export default async function page() {
  const rawData = await User.find();
  const data: IUser | null = JSON.parse(JSON.stringify(rawData));

  return (
    <div className="w-full h-screen bg-white dark:bg-neutral-950">
      {" "}
      <Admin initialData={data} />
    </div>
  );
}
