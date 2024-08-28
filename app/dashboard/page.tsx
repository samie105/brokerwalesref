import React from "react";
import { Chart } from "@/components/dashboard/Dashboard/Chart";
import Fixed from "@/components/dashboard/Dashboard/Fixed";
import Dashboard from "@/components/dashboard/Dashboard/Main";
import dbConnect from "@/server";
import { fetchDetails } from "@/server/actions/createUser";

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import TopNav from "@/components/dashboard/Navbar/TopNav";
import AcctSectManager from "@/components/dashboard/Dashboard/AcctSectManager";
import QuickLinkSect from "@/components/dashboard/Dashboard/QuickLinkSect";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentMode = searchParams.mode || "account";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["deets"],
    queryFn: fetchDetails,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className=" overflow-hidden p-1/ rounded-md ">
        <div className="h-[calc(100vh-5.5rem)] hidden md:block overflow-y-scroll overflow-x-hidden rounded-md">
          {" "}
          <Dashboard />
          <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-y-1 gap-x-2 pb-2">
            {" "}
            <Fixed />
            <Chart />
          </div>
        </div>
        <div className="h-[calc(100vh-5.5rem)] overflow-y-scroll md:hidden overflow-x-hidden rounded-md">
          <div className="mt-" />

          <TopNav currentMode={currentMode} />
          <div className="mt-1" />
          <AcctSectManager currentMode={currentMode} />
          <QuickLinkSect />
        </div>
      </div>
    </HydrationBoundary>
  );
}
