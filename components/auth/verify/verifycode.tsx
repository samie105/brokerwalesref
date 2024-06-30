"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useColors } from "@/context/colorContext";
import dynamic from "next/dynamic";
import animationData from "@/components/auth/verify/verify.json";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
  ssr: false,
});
export default function VerifyOTP() {
  const [value, setValue] = useState<string | null>(null);
  const colors = useColors();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <div className="flex justify-center">
          <Lottie animationData={animationData} className="w-[90%] h-[13rem]" />
        </div>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl font-bold">Verify your email</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to{" "}
            <span className="font-bold">samsonrichfield@gmail.com</span> email
            address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              pattern="^[0-9]+$"
              onChange={(val) => setValue(val)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex text-sm justify-center text-muted-foreground">
            <p>
              {"Didn't receive the code?"}{" "}
              <Link href="#" className="underline" prefetch={false}>
                Resend
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            style={{ background: colors.defaultblue }}
            type="submit"
            disabled={value == null || value?.length < 6}
            className="w-full h-12 font-bold flex items-center gap-x-1"
          >
            <p>Verify code</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
