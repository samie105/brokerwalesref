"use server";
import { actionClient } from "@/lib/safeActionClient";
import { cookies } from "next/headers";
import { z } from "zod";
import dbConnect from "..";
import User from "../userSchema";
import { revalidatePath } from "next/cache";

const updateFixedHistorySchema = z.object({
  id: z.any(),
  roi: z.number(),
  totalReturn: z.number(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  amount: z.number(),
  duration: z.number(),
  status: z.enum(["completed", "running"]),
});
export const updateFixedHistory = actionClient
  .schema(updateFixedHistorySchema)
  .action(async ({ parsedInput }) => {
    await dbConnect();
    const email = cookies().get("userEmail")?.value;
    const user = await User.findOne({ email });
    try {
      if (user) {
        user.accountBalance -= parsedInput.amount;
        user.fixedHistory.push({
          id: parsedInput.id,
          roi: parsedInput.roi,
          totalReturn: parsedInput.totalReturn,
          name: parsedInput.name,
          startDate: parsedInput.startDate,
          endDate: parsedInput.endDate,
          amount: parsedInput.amount,
          duration: parsedInput.duration,
          status: parsedInput.status,
        });
        user.notifications.push({
          id: Date.now() + Math.random(),
          message: `Your ${parsedInput.name} fixed cycle of $${parsedInput.amount} is ongoing`,
          status: "neutral",
          type: "neutral",
          dateAdded: new Date(),
        });
        user.readNotification = false;
        revalidatePath("/");
        await user.save();
      }
    } catch (error) {
      throw error;
    }
    return { message: "Fixed cycle created succesfully" };
  });
