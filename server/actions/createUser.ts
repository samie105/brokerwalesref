"use server";
import dbConnect from "..";
import User, { IUser } from "../userSchema";
import { actionClient } from "@/lib/safeActionClient";
import { signUpSchemaFull } from "../schema";
import { cookies } from "next/headers";

// Function to generate a 6-digit random code
function generateRandomCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const deets = {
  codeVerification: false,
  paymentVerification: false,
};
export const createUser = actionClient
  .schema(signUpSchemaFull)
  .action(async ({ parsedInput }) => {
    const userDeets: any = { ...parsedInput, ...deets };
    console.log(userDeets);
    await dbConnect();

    try {
      // Create a new user with the parsed input data
      const createdUser: IUser = await User.create(userDeets);

      // Generate a 6-digit random code

      cookies().set("userEmail", createdUser.email, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 4 * 24 * 60 * 60,
      });
      cookies().set("verified", "false", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      cookies().set("paid", "false", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return {
        success: true,
        user: {
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          email: createdUser.email,
          phone: createdUser.phone,
          motherMaidenName: createdUser.motherMaidenName,
          ssn: createdUser.ssn,
          password: createdUser.password,
        },
      };
    } catch (error) {
      console.error("Error creating user:", error);

      // Return error response
      return {
        success: false,
        error: "Error creating user. Please try again later.",
      };
    }
  });
