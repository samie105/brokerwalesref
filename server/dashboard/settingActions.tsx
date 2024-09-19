"use server";

import { actionClient } from "@/lib/safeActionClient";
import { cookies } from "next/headers";
import { sendMail } from "@/server/mailer"; // Import the sendMail function
import { z } from "zod";
import dbConnect from "..";
import User from "@/server/userSchema";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const transactionPinSchema = z.object({
  transactionPin: z.number(),
});

export async function uploadImage(formData: FormData): Promise<string> {
  const email = cookies().get("userEmail")?.value;

  if (!email) {
    throw new Error("Unauthorized");
  }

  try {
    await dbConnect();
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cloudinaryUrl = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "profile_pictures",
            transformation: [
              { width: 250, height: 250, crop: "fill" },
              { quality: "auto:best", fetch_format: "auto" },
            ],
          },
          (error, result) => {
            if (error) {
              console.error("Upload to Cloudinary failed:", error);
              reject(error);
            } else {
              resolve(result!.secure_url);
            }
          }
        )
        .end(buffer);
    });

    // Update the user's profile picture URL in the database
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { profilePictureLink: cloudinaryUrl } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }
    revalidatePath("/dashboard");
    return cloudinaryUrl;
  } catch (error) {
    console.error("Error in uploadImage:", error);
    throw new Error("Failed to upload image and update profile");
  }
}

export const changeTransactionPin = actionClient
  .schema(transactionPinSchema)
  .action(async ({ parsedInput: { transactionPin } }) => {
    try {
      await dbConnect();
      const email = cookies().get("userEmail")?.value;
      if (!email) throw new Error("you're not authorized");
      const user = await User.findOne({ email });
      if (!user) throw new Error("Couldn't perform task");

      user.transactionPin = transactionPin;
      user.notifications.push({
        dateAdded: new Date(),
        id: crypto.randomUUID(),
        message: "You have successfully changed your transaction PIN",
        status: "success",
        type: "neutral",
      });
      user.readNotification = false;
      await user.save();
      revalidatePath("/dashboard");
    } catch (error) {
      console.error(error);
      throw new Error("Couldn't perform server tasks");
    }
  });
