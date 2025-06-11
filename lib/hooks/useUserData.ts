import { useFetchInfo } from "@/lib/data/fetchPost";

/**
 * A hook that safely retrieves user data with proper TypeScript checks
 * 
 * Returns a safe version of user data with default values for all potentially
 * undefined properties, preventing TypeScript errors in components.
 */
export function useFetchUserData() {
  const { data: deets, ...rest } = useFetchInfo();
  
  // Create a safe version of the data with defaults for all properties
  const safeData = {
    data: {
      firstName: deets?.data?.firstName || "",
      lastName: deets?.data?.lastName || "",
      accountType: deets?.data?.accountType || "Checking",
      accountBalance: deets?.data?.accountBalance || 0,
      card: {
        cardNumber: deets?.data?.card?.cardNumber || "",
        cardExpiry: deets?.data?.card?.cardExpiry || "",
        cardCVC: deets?.data?.card?.cardCVC || "",
      },
      isPaidOpeningDeposit: deets?.data?.isPaidOpeningDeposit || false,
      paymentVerification: deets?.data?.paymentVerification || false,
      bankAccountNumber: deets?.data?.bankAccountNumber || "",
      profilePictureLink: deets?.data?.profilePictureLink || "",
      // Add all other properties used in components with safe defaults
    }
  };
  
  return { data: safeData, ...rest };
}

/**
 * Create a safely typed user data object with default values
 * Use this in components where the standard useFetchInfo is already in use
 */
export function safeUserData(deets: any) {
  if (!deets?.data) {
    return {
      firstName: "",
      lastName: "",
      accountType: "Checking",
      accountBalance: 0,
      card: {
        cardNumber: "",
        cardExpiry: "",
        cardCVC: "",
      },
      isPaidOpeningDeposit: false,
      paymentVerification: false,
      bankAccountNumber: "",
      profilePictureLink: "",
      // Add all other properties used in components with safe defaults
    };
  }
  
  return {
    ...deets.data,
    card: {
      cardNumber: deets.data?.card?.cardNumber || "",
      cardExpiry: deets.data?.card?.cardExpiry || "",
      cardCVC: deets.data?.card?.cardCVC || "",
    },
    accountBalance: deets.data.accountBalance || 0,
    isPaidOpeningDeposit: deets.data.isPaidOpeningDeposit || false,
    paymentVerification: deets.data.paymentVerification || false,
  };
} 