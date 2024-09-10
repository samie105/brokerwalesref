"use client";
import React, { useState, useMemo } from "react";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { Inter } from "next/font/google";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DepositHistory() {
  const { data: deets } = useFetchInfo();
  const data = deets?.data;
  const [searchTerm, setSearchTerm] = useState("");

  const sortedAndFilteredHistory = useMemo(() => {
    const history = data?.depositHistory || [];
    return history
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((deposit) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          deposit.amount.toString().includes(searchLower) ||
          deposit.paymentMeans.toLowerCase().includes(searchLower) ||
          deposit.status.toLowerCase().includes(searchLower)
        );
      });
  }, [data?.depositHistory, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) {
      return ""; // or some other default value
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return ""; // or some other default value
    }
    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <Card className="w-full px-0 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-600">
          Deposit History
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search deposits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        {sortedAndFilteredHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? "No matching deposits found."
                : "No deposit history available."}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={inter.className}>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredHistory.map((deposit) => (
                <TableRow key={deposit.id} className="border-none">
                  <TableCell className={`font-medium ${inter.className}`}>
                    $
                    {deposit.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="capitalize">
                    {deposit.paymentMeans}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${getStatusColor(deposit.status)}`}
                    >
                      {deposit.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDate(deposit.date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
