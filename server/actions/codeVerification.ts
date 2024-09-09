"use server";
import { actionClient } from "@/lib/safeActionClient";
import { cookies } from "next/headers";
import { sendMail } from "@/server/mailer"; // Import the sendMail function
import { z } from "zod";
import dbConnect from "../index"; // Import the db connection
import User from "../userSchema"; // User schema import
import { encrypt, decrypt, sign, unsign } from "@/lib/encription"; // You need to implement async encryption functions

function generateRandomCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit code
}

// Schema for email validation
const emailSchema = z.object({
  email: z.string().email(), // Use `email()` for validation instead of `nonempty()`
});

// Schema for verification code validation
const codeSchema = z.object({
  code: z.string().nonempty(), // Code must be a non-empty string
});

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
};

// Async function to set a secure cookie (await for encryption and signing)
const setSecureCookie = async (
  name: string,
  value: string,
  maxAge?: number
) => {
  const encryptedValue = await encrypt(value); // Await encryption
  const signedValue = await sign(encryptedValue); // Await signing
  cookies().set(name, signedValue, {
    ...cookieOptions,
    maxAge: maxAge || 10 * 60, // Default expiration 10 minutes
  });
};

// Async function to get and verify a cookie
const getSecureCookie = async (name: string): Promise<string | null> => {
  try {
    const signedValue = cookies().get(name)?.value;
    if (!signedValue) return null;

    const unsignedValue = await unsign(signedValue); // Await unsign
    if (!unsignedValue) return null; // Invalid signature

    return await decrypt(unsignedValue); // Await decryption
  } catch (error) {
    console.error(`Error getting cookie ${name}:`, error);
    return null;
  }
};

export const sendCode = actionClient
  .schema(emailSchema)
  .action(async ({ parsedInput }) => {
    const code = generateRandomCode();
    await setSecureCookie("verificationCode", code); // Set the secure cookie
    const verificationCode = await getSecureCookie("verificationCode"); // Get the secure cookie

    if (!verificationCode) {
      throw new Error("Verification code not found");
    }

    console.log(parsedInput.email);
    if (!parsedInput.email) {
      throw new Error("User email not found");
    }

    const res = await sendMail(parsedInput.email, verificationCode); // Send verification email
    return { success: res.success };
  });

export const resendCode = actionClient
  .schema(emailSchema)
  .action(async ({ parsedInput }) => {
    const newVerificationCode = generateRandomCode();
    await setSecureCookie("verificationCode", newVerificationCode); // Set the new code in the cookie

    if (!parsedInput.email) {
      throw new Error("User email not found");
    }

    const res = await sendMail(parsedInput.email, newVerificationCode); // Resend the code
    return { success: res.success };
  });

export const verifyCode = actionClient
  .schema(codeSchema)
  .action(async ({ parsedInput }) => {
    const verificationCode = await getSecureCookie("verificationCode"); // Get the verification code from the cookie

    if (!verificationCode) {
      throw new Error("Verification code not found");
    }

    if (verificationCode === parsedInput.code) {
      await dbConnect();
      const email = await getSecureCookie("userEmail"); // Get the user's email
      const user = await User.findOneAndUpdate(
        { email },
        { codeVerification: true },
        { new: true }
      ); // Mark the email as verified

      if (!user) throw new Error("Error verifying email");

      await setSecureCookie("verified", "true"); // Set the 'verified' cookie
      return { verified: true };
    }

    return { verified: false }; // If the code doesn't match, return false
  });
