"use server";
import { actionClient } from "@/lib/safeActionClient";
import { cookies } from "next/headers";
import { sendMail } from "@/server/mailer"; // Import the sendMail function
import { z } from "zod";

const email = z.object({
  email: z.string().nonempty().optional(),
});
export const sendCode = actionClient
  .schema(email)
  .action(async ({ parsedInput }) => {
    const verificationCode = cookies().get("verificationCode");

    if (!verificationCode) {
      throw new Error("Verification code not found");
    }

    // const email = cookies().get("userEmail");
    console.log(parsedInput.email);
    if (!parsedInput.email) {
      throw new Error("User email not found");
    }

    const res = await sendMail(parsedInput.email, verificationCode.value);
    if (res.success) return { success: true };
    if (!res.success) return { success: false };
  });
