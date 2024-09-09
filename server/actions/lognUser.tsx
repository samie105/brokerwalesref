"use server";
import { actionClient } from "@/lib/safeActionClient";
import User from "../userSchema";
import dbConnect from "..";
import { z } from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { encrypt, decrypt, sign, unsign } from "@/lib/encription";

const loginDeets = z.object({
  email: z.string().email(),
  password: z.string(),
});

const setSecureCookie = async (name: string, value: string, maxAge: number) => {
  const encryptedValue = await encrypt(value);
  const signedValue = await sign(encryptedValue);
  cookies().set(name, signedValue, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: maxAge,
  });
};

export const loginUser = actionClient
  .schema(loginDeets)
  .action(async ({ parsedInput: { email, password } }) => {
    await dbConnect();
    const lowerCaseEmail = email.toLowerCase();

    try {
      const user = await User.findOne({ email: lowerCaseEmail });
      if (!user) {
        return { success: false, message: "No user found with such email" };
      }

      // Assuming the stored password is already hashed
      // In a real-world scenario, you'd use a proper password hashing library like bcrypt
      const passwordMatch = password === user.password;

      if (!passwordMatch) {
        return {
          success: false,
          message: "Password doesn't match with this account",
        };
      }

      // Set cookies using the encryption technique
      await setSecureCookie(
        "verified",
        user.codeVerification ? "true" : "false",
        4 * 24 * 60 * 60
      );
      await setSecureCookie(
        "paid",
        user.paymentVerification ? "true" : "false",
        4 * 24 * 60 * 60
      );
      await setSecureCookie("userEmail", user.email, 4 * 24 * 60 * 60);

      revalidatePath("/auth");

      return {
        success: true,
        message: "Logged in successfully, redirecting...",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "An error occurred during login. Please try again.",
      };
    }
  });
