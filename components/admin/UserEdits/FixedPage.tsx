"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { IUser } from "@/server/userSchema";
import { MoreHorizontal, Loader2, DollarSign } from "lucide-react";

// This function would be implemented in your server actions file
async function payUser(userId: string, investmentId: string) {
  // Implement the logic to pay the user
  // This is a placeholder and should be replaced with actual implementation
  return { success: true };
}

export default function FixedPage({ data }: { data: IUser }) {
  const [fixedInvestments, setFixedInvestments] = useState<FixedType[]>(
    data.fixedHistory || []
  );
  const [loadingInvestmentId, setLoadingInvestmentId] = useState<string | null>(
    null
  );

  const sortedFixedInvestments = [...fixedInvestments].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePayUser = async (id: string) => {
    setLoadingInvestmentId(id);
    try {
      const result = await payUser(data.id, id);
      if (result.success) {
        setFixedInvestments((prevInvestments) =>
          prevInvestments.map((investment) =>
            investment.id === id
              ? { ...investment, status: "completed" }
              : investment
          )
        );
        toast.success("Payment successful");
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      toast.error("Failed to process payment");
    } finally {
      setLoadingInvestmentId(null);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Fixed Investments
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>ROI</TableHead>
              <TableHead>Total Return</TableHead>
              <TableHead>Duration (days)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFixedInvestments.map((investment) => (
              <TableRow key={investment.id}>
                <TableCell>{investment.name}</TableCell>
                <TableCell>{formatDate(investment.startDate)}</TableCell>
                <TableCell>{formatDate(investment.endDate)}</TableCell>
                <TableCell>${investment.amount.toFixed(2)}</TableCell>
                <TableCell>{investment.roi}%</TableCell>
                <TableCell>${investment.totalReturn.toFixed(2)}</TableCell>
                <TableCell>{investment.duration}</TableCell>
                <TableCell>{investment.status}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="dark:border-neutral-800 dark:hover:bg-neutral-800 bg-neutral-800">
                        {loadingInvestmentId === investment.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="dark:bg-neutral-800 dark:border-neutral-800">
                      <div className="flex flex-col space-y-2">
                        <Button
                          onClick={() => handlePayUser(investment.id)}
                          className="hover:dark:bg-neutral-700 bg-transparent"
                          disabled={
                            loadingInvestmentId === investment.id ||
                            investment.status === "completed"
                          }
                        >
                          <DollarSign className="mr-2 h-4 w-4" />
                          Pay User
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
