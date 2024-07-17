import SignupVerifyOTP from "@/components/auth/verify/signupverifycode";
import React from "react";
import { cookies } from "next/headers";

export default function page({
  params,
}: {
  params: { verificationType: string };
}) {
  const { verificationType } = params;
  const email: string | undefined = cookies().get("userEmail")?.value;
  return (
    <>
      <SignupVerifyOTP email={email} type={verificationType} />
    </>
  );
}
