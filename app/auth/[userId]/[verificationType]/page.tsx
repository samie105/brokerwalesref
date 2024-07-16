import PaymentSection from "@/components/auth/signup/PaymentSection";
import SignupVerifyOTP from "@/components/auth/verify/signupverifycode";
import LoginVerifyOTP from "@/components/auth/verify/loginverifycode";
import React from "react";
import { cookies } from "next/headers";

export default function page({
  params,
}: {
  params: { userId: string; verificationType: string };
}) {
  const { userId, verificationType } = params;
  const email: string | undefined = cookies().get("userEmail")?.value;
  return (
    <>
      {verificationType === "signup-verification" ? (
        <SignupVerifyOTP email={email} />
      ) : (
        <LoginVerifyOTP />
      )}
    </>
  );
}
