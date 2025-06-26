"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateDepositDetails, updateTransferDetails } from "@/server/admin/edit-user-actions";
import { Calendar, Loader2 } from "lucide-react";

interface EditHistoryDateProps {
  email: string;
  itemId: string;
  currentDate: string | Date;
  type: "deposit" | "transfer";
  onDateUpdated: () => void;
  currentTime?: string;
  currentNarration?: string;
}

export default function EditHistoryDate({ 
  email, 
  itemId, 
  currentDate, 
  type, 
  onDateUpdated,
  currentTime = "",
  currentNarration = ""
}: EditHistoryDateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newDate, setNewDate] = useState(
    new Date(currentDate).toISOString().split("T")[0]
  );
  const [newTime, setNewTime] = useState(currentTime);
  const [newNarration, setNewNarration] = useState(currentNarration);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const updateData = {
        date: newDate,
        time: newTime,
        narration: newNarration
      };
      
      const result = type === "deposit" 
        ? await updateDepositDetails(email, itemId, updateData)
        : await updateTransferDetails(email, itemId, updateData);
        
      if (result.success) {
        toast.success(`${type} updated successfully`);
        setIsOpen(false);
        onDateUpdated();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(`Failed to update ${type}: ` + (error as Error).message);
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
              Edit {type === "deposit" ? "Deposit" : "Transfer"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Current date: {new Date(currentDate).toLocaleDateString()}
              {currentTime && `, Time: ${currentTime}`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="narration">Narration</Label>
            <Input
              id="narration"
              type="text"
              placeholder={`Add a description for this ${type}`}
              value={newNarration}
              onChange={(e) => setNewNarration(e.target.value)}
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
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 