import PaymentSection from "@/components/auth/signup/PaymentSection";
import SignupVerifyOTP from "@/components/auth/verify/signupverifycode";
import LoginVerifyOTP from "@/components/auth/verify/loginverifycode";
import React from "react";

export default function page({
  params,
}: {
  params: { userId: string; verificationType: string };
}) {
  const { userId, verificationType } = params;
  return (
    <>
      {verificationType === "signup-verification" ? (
        <SignupVerifyOTP />
      ) : (
        <LoginVerifyOTP />
      )}
    </>
  );
}
