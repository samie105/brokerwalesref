"use server";
import dbConnect from "..";
import User, { IUser } from "../userSchema";
import { actionClient } from "@/lib/safeActionClient";
import { signUpSchemaFull } from "../schema";
import { cookies } from "next/headers";

// Function to generate a 10-digit random number
function generateRandomAccountNumber(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// Function to generate a unique 10-digit bank account number
async function generateUniqueAccountNumber() {
  let isUnique = false;
  let accountNumber = "";

  while (!isUnique) {
    accountNumber = generateRandomAccountNumber();
    const existingUser = await User.findOne({
      bankAccountNumber: accountNumber,
    });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return accountNumber;
}

const deets = {
  codeVerification: false,
  paymentVerification: false,
  paymentImageLink: "",
};

export const createUser = actionClient
  .schema(signUpSchemaFull)
  .action(async ({ parsedInput }) => {
    parsedInput.email = parsedInput.email.toLowerCase();
    const userDeets: any = { ...parsedInput, ...deets };

    await dbConnect();

    try {
      // Generate a unique 10-digit bank account number
      const uniqueAccountNumber = await generateUniqueAccountNumber();

      // Add the unique bank account number to user details
      userDeets.bankAccountNumber = uniqueAccountNumber;

      // Create a new user with the parsed input data
      const createdUser: IUser = await User.create(userDeets);

      // Set cookies
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
          bankAccountNumber: createdUser.bankAccountNumber,
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
