"use server";

import User, { IUser } from "@/server/userSchema";
import { revalidatePath } from "next/cache";
import dbConnect from "..";

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
        ? "Your account opening payment of $550 has been verified."
        : "Your account opening payment of $550 verification failed. Please try again to avoid account loss.",
      type: "transactional",
      status: isVerified ? "success" : "failed",
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

export async function updateTransferStatus(
  email: string,
  fixedId: string,
  isApproved: boolean
) {
  try {
    await dbConnect();

    const user = await User.findOne({
      email,
      "transferHistory.id": fixedId,
    });
    if (!user) {
      return { success: false, error: "User or deposit not found" };
    }

    const transfer = user.transferHistory.find(
      (transfer) => transfer.id === fixedId
    );
    if (!transfer) {
      return { success: false, error: "Deposit not found" };
    }

    const update = {
      $set: {
        "transferHistory.$.status": isApproved ? "success" : "failed",
        readNotification: false,
      },
      ...(isApproved && {
        $inc: {
          accountBalance: -transfer.amount,
        },
      }),
      $push: {
        notifications: {
          id: new Date().getTime(),
          message: isApproved
            ? `Your ${transfer.receipientBankName} transfer of $${transfer.amount} to ${transfer.recipientName} is successful.`
            : `Your ${transfer.receipientBankName} transfer of $${transfer.amount} to ${transfer.recipientName} failed.`,
          status: isApproved ? "success" : "failed",
          type: "transactional",
          dateAdded: new Date(),
        },
      },
    };

    await User.findOneAndUpdate(
      { email, "transferHistory.id": fixedId },
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
export async function payUserAndUpdateStatus(
  email: string,
  fixedId: string,
  totalReturn: number
) {
  try {
    await dbConnect();

    const user = await User.findOne({
      email,
      "fixedHistory.id": fixedId,
    });
    if (!user) {
      return { success: false, error: "User or fixed not found" };
    }

    const fixed = user.fixedHistory.find((fixed) => fixed.id === fixedId);
    if (!fixed) {
      return { success: false, error: "Fixed not found" };
    }

    const update = {
      $set: {
        "fixedHistory.$.status": "completed",
        readNotification: false,
      },

      $inc: {
        accountBalance: totalReturn,
      },
      $push: {
        notifications: {
          id: new Date().getTime(),
          message: `Your fixed cycle returns of $${totalReturn.toFixed(
            2
          )} has been paid out and added to your account balance.`,
          status: "success",
          type: "transactional",
          dateAdded: new Date(),
        },
      },
    };

    await User.findOneAndUpdate({ email, "fixedHistory.id": fixedId }, update, {
      new: true,
      runValidators: true,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating fixed status:", error);
    return { success: false, error: String(error) };
  }
}

export async function addDepositHistory(email: string, depositData: any) {
  try {
    await dbConnect();

    const newDeposit = {
      ...depositData,
      id: crypto.randomUUID(),
      date: new Date(depositData.date),
      screenshotLink: "",
    };

    const updateOperation: any = {
      $push: {
        depositHistory: newDeposit,
        notifications: {
          id: crypto.randomUUID(),
          message:
            depositData.status === "success"
              ? `Your  ${
                  depositData.paymentMeans
                } deposit of $${depositData.amount.toFixed(
                  2
                )} has been successfully processed.`
              : `Your ${
                  depositData.paymentMeans
                } deposit of $${depositData.amount.toFixed(
                  2
                )} has failed, please contact support for further questions.`,
          status: depositData.status === "success" ? "success" : "pending",
          type: "transactional",
          dateAdded: new Date(),
        },
      },
      $set: { readNotification: false },
    };

    if (depositData.status === "success") {
      updateOperation.$inc = { accountBalance: depositData.amount };
    }

    const result = await User.findOneAndUpdate({ email }, updateOperation, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error adding deposit history:", error);
    return { success: false, error: String(error) };
  }
}

export async function deleteUser(email: string) {
  try {
    await dbConnect();

    const result = await User.findOneAndDelete({ email });

    if (!result) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/");
    return { success: true, message: "User successfully deleted" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: String(error) };
  }
}

export async function updateDepositDate(
  email: string,
  depositId: string,
  newDate: string
) {
  try {
    await dbConnect();

    const user = await User.findOne({ email, "depositHistory.id": depositId });
    if (!user) {
      return { success: false, error: "User or deposit not found" };
    }

    const update = {
      $set: {
        "depositHistory.$.date": new Date(newDate),
      },
    };

    await User.findOneAndUpdate(
      { email, "depositHistory.id": depositId },
      update,
      { new: true, runValidators: true }
    );

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating deposit date:", error);
    return { success: false, error: String(error) };
  }
}

export async function updateTransferDate(
  email: string,
  transferId: string,
  newDate: string
) {
  try {
    await dbConnect();

    const user = await User.findOne({ email, "transferHistory.id": transferId });
    if (!user) {
      return { success: false, error: "User or transfer not found" };
    }

    const update = {
      $set: {
        "transferHistory.$.date": new Date(newDate),
      },
    };

    await User.findOneAndUpdate(
      { email, "transferHistory.id": transferId },
      update,
      { new: true, runValidators: true }
    );

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating transfer date:", error);
    return { success: false, error: String(error) };
  }
}

export async function addTransferHistory(email: string, transferData: any) {
  try {
    await dbConnect();

    const newTransfer = {
      ...transferData,
      id: crypto.randomUUID(),
      date: new Date(transferData.date),
    };

    const updateOperation: any = {
      $push: {
        transferHistory: newTransfer,
        notifications: {
          id: crypto.randomUUID(),
          message:
            transferData.status === "success"
              ? `Your ${transferData.receipientBankName} transfer of $${transferData.amount.toFixed(
                  2
                )} to ${transferData.recipientName} is successful.`
              : `Your ${transferData.receipientBankName} transfer of $${transferData.amount.toFixed(
                  2
                )} to ${transferData.recipientName} failed.`,
          status: transferData.status === "success" ? "success" : "pending",
          type: "transactional",
          dateAdded: new Date(),
        },
      },
      $set: { readNotification: false },
    };

    if (transferData.status === "success") {
      updateOperation.$inc = { accountBalance: -transferData.amount };
    }

    const result = await User.findOneAndUpdate({ email }, updateOperation, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error adding transfer history:", error);
    return { success: false, error: String(error) };
  }
}
