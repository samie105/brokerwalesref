"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateDepositDate, updateTransferDate } from "@/server/admin/edit-user-actions";
import { Calendar, Loader2 } from "lucide-react";

interface EditHistoryDateProps {
  email: string;
  itemId: string;
  currentDate: string | Date;
  type: "deposit" | "transfer";
  onDateUpdated: () => void;
}

export default function EditHistoryDate({ 
  email, 
  itemId, 
  currentDate, 
  type, 
  onDateUpdated 
}: EditHistoryDateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newDate, setNewDate] = useState(
    new Date(currentDate).toISOString().split("T")[0]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = type === "deposit" 
        ? await updateDepositDate(email, itemId, newDate)
        : await updateTransferDate(email, itemId, newDate);
        
      if (result.success) {
        toast.success(`${type} date updated successfully`);
        setIsOpen(false);
        onDateUpdated();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(`Failed to update ${type} date: ` + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-950"
        >
          <Calendar className="h-4 w-4 text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              Edit {type === "deposit" ? "Deposit" : "Transfer"} Date
            </h2>
            <p className="text-sm text-muted-foreground">
              Current date: {new Date(currentDate).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">New Date</Label>
            <Input
              id="date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Update Date
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 