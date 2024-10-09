"use server";

import User from "@/server/userSchema";
import { revalidatePath } from "next/cache";

export async function updateUser(userData: any) {
  const { email, ...updateData } = userData;

  try {
    await User.findOneAndUpdate({ email }, updateData, { new: true });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}
