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
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSignUpContext } from "@/context/signUpFormContext";
import nookies from "nookies";
import { useAction } from "next-safe-action/hooks";
import { resendCode, sendCode } from "@/server/actions/codeVerification";
import { toast } from "sonner";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
  ssr: false,
});

export default function SignupVerifyOTP() {
  const router = useRouter();
  const pathname = usePathname();
  let codeToastId: any;
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(60);
  const [resendEnabled, setResendEnabled] = useState<boolean>(false);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const colors = useColors();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { execute, status } = useAction(sendCode, {
    onExecute() {
      toast.loading("Sending code please wait...", {
        id: codeToastId,
        duration: 3000,
      });
    },
    onSuccess({ data }) {
      if (data?.success) {
        toast.success("Code sent", {
          id: codeToastId,
          duration: 3000,
        });
        setCodeSent(!codeSent);
      }
      if (!data?.success)
        toast.error("Error sending code, please try again", {
          id: codeToastId,
          duration: 3000,
        });

      toast.dismiss(codeToastId);
    },

    onError(error) {
      if (error.error.fetchError)
        toast.error("Error sending code", {
          id: codeToastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: codeToastId,
        });
      if (error.error.validationErrors)
        toast.error("Error, try again later", {
          id: codeToastId,
        });

      toast.dismiss(codeToastId);
    },
  });

  const { execute: resendCodeFn, status: resendCodeStatus } = useAction(
    resendCode,
    {
      onExecute() {
        toast.loading("Resending code please wait...", {
          id: codeToastId,
          duration: 3000,
        });
      },
      onSuccess({ data }) {
        if (data?.success) {
          toast.success("Code resent", {
            id: codeToastId,
            duration: 3000,
          });
          startCountdown();

          setResendEnabled(false);
        }
        if (!data?.success)
          toast.error("Error resending code, please try again", {
            id: codeToastId,
            duration: 3000,
          });

        toast.dismiss(codeToastId);
      },

      onError(error) {
        if (error.error.fetchError)
          toast.error("Error resending code", {
            id: codeToastId,
          });
        if (error.error.serverError)
          toast.error("Error connecting to servers", {
            id: codeToastId,
          });
        if (error.error.validationErrors)
          toast.error("Error, try again later", {
            id: codeToastId,
          });

        toast.dismiss(codeToastId);
      },
    }
  );
  const handleClick = () => {
    execute({ email: userEmail });
  };
  useEffect(() => {
    // Get the userEmail from localStorage
    const emailCookie = localStorage.getItem("email");
    if (emailCookie) {
      const email = JSON.parse(emailCookie);
      setUserEmail(email);
    }

    startCountdown();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  const startCountdown = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCountdown(60);
    setResendEnabled(false);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setResendEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const handleVerification = () => {
    if (pathname.includes("signup")) router.push("/auth/payment-means/");
  };

  const handleResendCode = () => {
    resendCodeFn({ email: userEmail });

    // Simulate the resend code action
    // Here you would typically call an API to resend the code
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <div className="flex justify-center">
          <Lottie animationData={animationData} className="w-[90%] h-[13rem]" />
        </div>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl font-bold">Verify your email</CardTitle>
          {codeSent && (
            <CardDescription>
              Enter the 6-digit code sent to{" "}
              <span className="font-bold">{userEmail}</span> email address
            </CardDescription>
          )}
          {!codeSent && (
            <CardDescription>
              {"We'll send a"} 6-digit code sent to{" "}
              <span className="font-bold">{userEmail}</span> to verify the email
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {!codeSent && (
            <>
              <Button
                type="button"
                disabled={status === "executing"}
                onClick={handleClick}
                className="flex disabled:opacity-50 items-center gap-x-2 bg-gray-100 text-sm w-full font-semibold hover:bg-gray-200 text-black/80 rounded-md h-12"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Send Code</p>
              </Button>
            </>
          )}
          {codeSent && (
            <>
              {" "}
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
                  {resendEnabled ? (
                    <Link href="#" prefetch={false} onClick={handleResendCode}>
                      {"Didn't"} Recieve Code?{" "}
                      <span className="underline">Resend code</span>{" "}
                    </Link>
                  ) : (
                    `Resend code in ${countdown} seconds`
                  )}
                </p>
              </div>
            </>
          )}
        </CardContent>
        {codeSent && (
          <CardFooter>
            <Button
              style={{ background: colors.defaultblue }}
              type="submit"
              onClick={handleVerification}
              disabled={
                value == null ||
                value?.length < 6 ||
                status === "executing" ||
                resendCodeStatus === "executing"
              }
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
        )}
      </Card>
    </div>
  );
}
