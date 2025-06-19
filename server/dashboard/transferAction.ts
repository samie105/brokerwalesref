"use server";

import { actionClient } from "@/lib/safeActionClient";
import { cookies } from "next/headers";
import { z } from "zod";
import dbConnect from "..";
import User from "../userSchema";
import { revalidatePath } from "next/cache";

const updateTransferHistorySchema = z.object({
  id: z.string().or(z.number()),
  recipientName: z.string(),
  amount: z.number().positive(),
  date: z.date(),
  receipientAccountNumber: z.number().int().positive(),
  receipientRoutingNumber: z.number().int().positive(),
  status: z.enum(["success", "failed", "pending"]),
  receipientBankName: z.string(),
});

export const updateTransferHistory = actionClient
  .schema(updateTransferHistorySchema)
  .action(async ({ parsedInput }) => {
    await dbConnect();
    const email = cookies().get("userEmail")?.value;

    if (!email) {
      throw new Error("User email not found in cookies");
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      user.transferHistory.push({ ...parsedInput });
      user.notifications.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        message: `Your transfer of $${parsedInput.amount.toLocaleString()} to ${
          parsedInput.recipientName
        } is ${parsedInput.status}`,
        status: "neutral",
        type: "neutral",
        dateAdded: new Date(),
      });
      user.readNotification = false;

      await user.save();
      revalidatePath("/");

      return {
        success: true,
        message: "Transfer history updated successfully",
      };
    } catch (error) {
      console.error("Error updating transfer history:", error);
      throw new Error("Failed to update transfer history");
    }
  });
