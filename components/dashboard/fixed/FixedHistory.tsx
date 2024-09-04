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
        <div className="md:flex md:justify-between md:items-center grid grid-cols-1 mb-4">
          <Tabs value={tab || "all"} className="w-[400px]">
            <TabsList className="bg-neutral-50 text-sm text-neutral-500">
              <Link href={"?tab=all"}>
                <TabsTrigger value="all">All</TabsTrigger>
              </Link>
              <Link href={"?tab=running"}>
                <TabsTrigger value="running">Running</TabsTrigger>
              </Link>
              <Link href={"?tab=completed"}>
                <TabsTrigger value="completed">Completed</TabsTrigger>
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
        <div className="border0non rounded-md w-full ">
          <Table className="overflow-x-scroll overflow-y-hidden max-w-full">
            <TableHeader className="text-neutral-500 ">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Duration (months)</TableHead>
                <TableHead className="text-right">ROI</TableHead>
                <TableHead className="text-right">Total Return</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow className="border-none" key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell className="text-right">
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
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "running"
                          ? "default"
                          : item.status === "completed"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
