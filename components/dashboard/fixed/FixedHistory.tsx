"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { useState } from "react";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
export default function FixedHistory({ tab }: { tab: string }) {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const fixedHistory = data.fixedHistory;
  const testHistory: FixedType[] = [
    {
      id: "1",
      amount: 10000,
      name: "Tech Fund A",
      duration: 12,
      roi: 8.5,
      totalReturn: 10850,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
      status: "running",
    },
    {
      id: "2",
      amount: 5000,
      name: "Real Estate Trust",
      duration: 24,
      roi: 6.2,
      totalReturn: 5310,
      startDate: new Date("2023-03-15"),
      endDate: new Date("2025-03-14"),
      status: "running",
    },
    {
      id: "3",
      amount: 7500,
      name: "Green Energy ETF",
      duration: 18,
      roi: 7.8,
      totalReturn: 8085,
      startDate: new Date("2023-02-01"),
      endDate: new Date("2024-07-31"),
      status: "completed",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = testHistory.filter(
    (item) =>
      (tab === "all" || item.status === tab) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white">
      <div className=" mx-auto py-10">
        <div className="title text-neutral-800 mb-4 font-semibold">
          Fixed History
        </div>
        <div className="md:flex md:justify-between md:items-center grid grid-cols-1  mb-4">
          <Tabs value={tab || "all"} className="w-[400px]">
            <TabsList className="bg-neutral-50 text-sm text-neutral-500">
              <Link href={"?tab=all"}>
                <TabsTrigger value="all" className="text-nuetral-500">
                  All
                </TabsTrigger>
              </Link>
              <Link href={"?tab=running"}>
                <TabsTrigger value="running" className="text-nuetral-500">
                  Running
                </TabsTrigger>
              </Link>
              <Link href={"?tab=completed"}>
                <TabsTrigger value="completed" className="text-nuetral-500">
                  Completed
                </TabsTrigger>
              </Link>
            </TabsList>
          </Tabs>
          <Input
            placeholder="Search by name or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs mt-2 md:mt-0 bg-neutral-50/50 border-neutral-500/20"
          />
        </div>
        <div className=" rounded-md  ">
          <Table className="overflow-x-scroll overflow-y-hidden  mx-auto">
            <TableHeader className="text-neutral-500 ">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Duration (months)</TableHead>
                <TableHead className="text-right">ROI</TableHead>
                <TableHead className="text-right">Total Return</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow className="border-none" key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Badge
                      variant={
                        item.status === "running"
                          ? "default"
                          : item.status === "completed"
                          ? "secondary"
                          : "outline"
                      }
                      className={`flex items-center gap-x-2 ${
                        item.status === "running"
                          ? "bg-yellow-500 hover:bg-yellow-500 cursor-pointer"
                          : item.status === "completed"
                          ? "bg-green-500 hover:bg-green-500 text-white"
                          : "outline"
                      }`}
                    >
                      {item.status === "running" ? (
                        <div className="animate-spin">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <div>{item.status}</div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right/">
                    {item.duration} Months
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.totalReturn - item.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.totalReturn)}
                  </TableCell>
                  <TableCell>{formatDate(item.startDate)}</TableCell>
                  <TableCell>{formatDate(item.endDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
