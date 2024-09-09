import SignupVerifyOTP from "@/components/auth/verify/signupverifycode";
import React from "react";
import { cookies } from "next/headers";
import { decrypt, unsign } from "@/lib/encription"; // You'll need to implement this

export default async function page({
  params,
}: {
  params: { verificationType: string };
}) {
  const getSecureCookie = async (name: string): Promise<string | null> => {
    try {
      const signedValue = cookies().get(name)?.value;
      if (!signedValue) return null;

      const unsignedValue = await unsign(signedValue);
      if (!unsignedValue) return null; // Cookie signature is invalid

      return await decrypt(unsignedValue);
    } catch (error) {
      console.error(`Error getting cookie ${name}:`, error);
      return null;
    }
  };
  const { verificationType } = params;
  const email: string | null = await getSecureCookie("userEmail");
  return (
    <>
      <SignupVerifyOTP email={email} type={verificationType} />
    </>
  );
}
