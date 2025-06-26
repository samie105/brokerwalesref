"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addTransferHistory } from "@/server/admin/edit-user-actions";

type TransferFormData = {
  recipientName: string;
  amount: number;
  receipientAccountNumber: number;
  receipientRoutingNumber: number;
  receipientBankName: string;
  status: "failed" | "success" | "pending";
  date: string;
  time: string;
  narration: string;
};

export default function CreateTransferHistory({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<TransferFormData>({
    recipientName: "",
    amount: 0,
    receipientAccountNumber: 0,
    receipientRoutingNumber: 0,
    receipientBankName: "",
    status: "pending",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    narration: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addTransferHistory(email, formData);
      if (result.success) {
        toast.success("Transfer history added successfully");
        setIsOpen(false);
        setFormData({
          recipientName: "",
          amount: 0,
          receipientAccountNumber: 0,
          receipientRoutingNumber: 0,
          receipientBankName: "",
          status: "pending",
          date: new Date().toISOString().split("T")[0],
          time: new Date().toTimeString().slice(0, 5),
          narration: "",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Failed to add transfer history: " + (error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="dark:bg-neutral-800 text-sm dark:border-neutral-700 dark:text-white text-neutral-600 bg-neutral-50">
          Add Transfer History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold">Add Transfer History</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                type="text"
                value={formData.recipientName}
                onChange={(e) =>
                  setFormData({ ...formData, recipientName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: parseFloat(e.target.value) })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                type="number"
                value={formData.receipientAccountNumber}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    receipientAccountNumber: parseInt(e.target.value) 
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                type="number"
                value={formData.receipientRoutingNumber}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    receipientRoutingNumber: parseInt(e.target.value) 
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              type="text"
              value={formData.receipientBankName}
              onChange={(e) =>
                setFormData({ ...formData, receipientBankName: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "failed" | "success" | "pending") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="narration">Narration</Label>
            <Input
              id="narration"
              type="text"
              placeholder="Add a description or note for this transfer"
              value={formData.narration}
              onChange={(e) =>
                setFormData({ ...formData, narration: e.target.value })
              }
            />
          </div>

          <Button
            type="submit"
            disabled={formData.amount <= 0 || !formData.recipientName}
            className="w-full"
          >
            Add Transfer History
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 