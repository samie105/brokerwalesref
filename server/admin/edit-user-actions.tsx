"use server";

import User, { IUser } from "@/server/userSchema";
import { revalidatePath } from "next/cache";
import dbConnect from "..";

type NotificationType = {
  id: any;
  message: string;
  status: "success" | "failed" | "neutral" | "warning";
  type: "transactional" | "card" | "neutral";
  dateAdded: Date;
};

export async function updateUser(userData: Partial<IUser>) {
  const { email, ...updateData } = userData;

  try {
    await dbConnect();
    await User.findOneAndUpdate({ email }, updateData, { new: true });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function updateDepositStatus(
  email: string,
  depositId: string,
  isApproved: boolean
) {
  try {
    await dbConnect();

    const user = await User.findOne({ email, "depositHistory.id": depositId });
    if (!user) {
      return { success: false, error: "User or deposit not found" };
    }

    const deposit = user.depositHistory.find(
      (deposit) => deposit.id === depositId
    );
    if (!deposit) {
      return { success: false, error: "Deposit not found" };
    }

    const update = {
      $set: {
        "depositHistory.$.status": isApproved ? "success" : "failed",
        readNotification: false,
      },
      ...(isApproved && {
        $inc: {
          accountBalance: deposit.amount,
        },
      }),
      $push: {
        notifications: {
          id: new Date().getTime(),
          message: isApproved
            ? `Your Mobile Deposit of $${deposit.amount} has been approved.`
            : "Your deposit has been declined.",
          status: isApproved ? "success" : "failed",
          type: "transactional",
          dateAdded: new Date(),
        },
      },
    };

    await User.findOneAndUpdate(
      { email, "depositHistory.id": depositId },
      update,
      { new: true, runValidators: true }
    );

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating deposit status:", error);
    return { success: false, error: String(error) };
  }
}

export async function updatePaymentVerification(
  email: string,
  isVerified: boolean
) {
  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, error: "User not found" };
    }

    user.paymentVerification = isVerified;
    user.isPaidOpeningDeposit = isVerified;

    const notification: NotificationType = {
      id: new Date().getTime(),
      message: isVerified
        ? "Your account opening payment of $50 has been verified."
        : "Your account opening payment of $50 verification failed. Please try again to avoid account loss.",
      status: isVerified ? "success" : "failed",
      type: "transactional",
      dateAdded: new Date(),
    };

    user.notifications.push(notification);
    user.readNotification = false;

    await user.save();
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating payment verification:", error);
    return { success: false, error: "Failed to update payment verification" };
  }
}

// export async function updateOpeningDeposit(email: string, isPaid: boolean) {
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return { success: false, error: "User not found" };
//     }

//     user.isPaidOpeningDeposit = isPaid;

//     await user.save();
//     revalidatePath("/");
//     return { success: true };
//   } catch (error) {
//     console.error("Error updating opening deposit status:", error);
//     return { success: false, error: "Failed to update opening deposit status" };
//   }
// }

// export async function markNotificationsAsRead(email: string) {
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return { success: false, error: "User not found" };
//     }

//     user.readNotification = true;
//     await user.save();
//     revalidatePath("/");
//     return { success: true };
//   } catch (error) {
//     console.error("Error marking notifications as read:", error);
//     return { success: false, error: "Failed to mark notifications as read" };
//   }
// }
