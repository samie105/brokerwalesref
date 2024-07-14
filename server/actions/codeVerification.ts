"use server";
import { actionClient } from "@/lib/safeActionClient";
import { cookies } from "next/headers";
import { sendMail } from "@/server/mailer"; // Import the sendMail function
import { z } from "zod";

function generateRandomCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
const email = z.object({
  email: z.string().nonempty().optional(),
});
const code = z.object({
  code: z.string().nonempty().optional(),
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

export const resendCode = actionClient
  .schema(email)
  .action(async ({ parsedInput }) => {
    const verificationCode = generateRandomCode();
    cookies().set("verificationCode", verificationCode, {
      path: "/",
      httpOnly: true,
    });
    // const email = cookies().get("userEmail");
    console.log(parsedInput.email);
    if (!parsedInput.email) {
      throw new Error("User email not found");
    }

    const res = await sendMail(parsedInput.email, verificationCode);
    if (res.success) return { success: true };
    if (!res.success) return { success: false };
  });

export const verifyCode = actionClient
  .schema(code)
  .action(async ({ parsedInput }) => {
    const verificationCode = cookies().get("verificationCode");

    if (!verificationCode) {
      throw new Error("Verification code not found");
    }
    console.log(verificationCode, parsedInput.code);
    if (verificationCode.value == parsedInput.code) return { verified: true };
    if (verificationCode.value != parsedInput.code) return { verified: false };
  });
