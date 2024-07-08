"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xjpGuKvWaIE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import hero from "@/public/assets/cardImage.jpg";
import { useColors } from "@/context/colorContext";
import { BackgroundBeams } from "@/components/ui/BackgroundBeam";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoginContext } from "@/context/loginFormContext";

// Define the validation schema with Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { formData, setFormData } = useLoginContext();
  const colors = useColors();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: LoginFormData) => {
    setFormData(data);
    router.push(
      "/auth/ikhidkfhksjndfgiskjlfgniusdjkfgniusjkdhfgniuksfgi/login-verification"
    );
  };

  return (
    <div className="grid min-h-[100dvh] w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block /border relative overflow-hidden">
        <Image
          src={hero}
          alt="Login Hero"
          width="1920"
          height="1080"
          className="h-5/6 w-5/6 object-cover"
        />
      </div>
      <div className="flex items-center justify-center mt-9 p-6 lg:p-10">
        <div className="mx-auto w-full max-w-[400px] space-y-6">
          <div className="/space-y-2 /text-center">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 /text-sm dark:text-gray-400">
              Enter your email and password to sign in
            </p>
          </div>
          <div className="w-full">
            <div className="w-10 mx-auto h-0.5 rounded-full bg-neutral-300 my-3"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2 text-sm">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2 text-sm">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-12 font-bold flex items-center gap-x-1"
              style={{ backgroundColor: colors.defaultblue }}
            >
              <p>Sign In</p>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <Link
              href="#"
              className="inline-block w-full text-right text-xs font-semibold /underline"
              prefetch={false}
            >
              Forgot your password?
            </Link>
          </form>
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="text-sm font-medium text-gray-900 hidden hover:underline dark:text-gray-50"
              prefetch={false}
            >
              Back to Home
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-gray-900 hover:underline dark:text-gray-50"
                prefetch={false}
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
