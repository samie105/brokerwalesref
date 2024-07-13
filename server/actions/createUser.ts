"use server";
import dbConnect from "..";
import { z } from "zod";
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
      const randomCode = generateRandomCode();

      // Save the random code in cookies
      cookies().set("verificationCode", randomCode, {
        path: "/",
        httpOnly: true,
      });

      // Set user information in cookies (you can set any information you deem necessary)
      cookies().set("userEmail", createdUser.email, {
        path: "/",
        httpOnly: false,
      });

      // Return success response with the created user data (excluding sensitive information)
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
