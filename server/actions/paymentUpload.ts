"use server";
import { z } from "zod";
import dbConnect from "..";
import User from "../userSchema";
import { actionClient } from "@/lib/safeActionClient";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import axios from "axios";

// Define the schema for the image URL
const imageUrlSchema = z.object({
  file: z.any(), // Ensure file is a non-empty string representing the file path
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = actionClient
  .schema(imageUrlSchema)
  .action(async ({ parsedInput: { file } }) => {
    await dbConnect();

    try {
      // Upload file to Cloudinary using the file path
      const result: {
        secure_url: string;
      } = await axios.post(`${process.env.CONNECTION_CLOUDINARY_API}`, file);
      // Extract secure URL from Cloudinary response
      const secureUrl = result.secure_url;
      const email = cookies().get("userEmail")?.value;

      if (!email) {
        throw new Error("User email not found in cookies");
      }

      // Update user's paymentImageLink in the database
      const user = await User.findOneAndUpdate(
        { email },
        { paymentImageLink: secureUrl },
        { new: true } // Return the updated document
      );

      if (!user) {
        throw new Error("User not found");
      }
      cookies().set("paid", "true", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return {
        success: true,
        paymentImageLink: user.paymentImageLink,
      };
    } catch (error) {
      console.error("Error uploading image or updating user:", error);

      return {
        success: false,
        error:
          "Error uploading image or updating user. Please try again later.",
      };
    }
  });
