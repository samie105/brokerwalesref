"use server";
import dbConnect from "..";
import { z } from "zod";
import User from "../userSchema";
import { actionClient } from "@/lib/safeActionClient";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Define a schema specifically for checking the email and phone
const creditCard = z.object({
  cardType: z.string(),
  cardNumber: z.string(),
  cardExpiry: z.string(),
  cardCVC: z.string(),
  cardBillingAddress: z.string(),
  cardZipCode: z.string(),
});

export const createCard = actionClient
  .schema(creditCard)
  .action(
    async ({
      parsedInput: {
        cardNumber,
        cardExpiry,
        cardCVC,
        cardType,
        cardBillingAddress,
        cardZipCode,
      },
    }) => {
      await dbConnect();
      const email = cookies().get("userEmail")?.value;
      try {
        const user = await User.findOne({
          email,
        });

        if (user) {
          user.card = {
            cardNumber,
            cardExpiry,
            cardCVC,
            cardType,
            cardBillingAddress,
            cardZipCode,
          };
          user.save();
        }
        revalidatePath("/");
        return { message: `${cardType} card created succesfully` };
      } catch (error) {
        console.error("Error Creating card", error);
        throw new Error("Error attempting card creation");
      }
    }
  );
