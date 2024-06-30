import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useColors } from "@/context/colorContext";
import { z } from "zod";
import { useSignUpContext } from "@/context/signUpFormContext";

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number is too short")
    .regex(
      /^\+?(\d{1,3})?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
      "Invalid phone number format"
    ),
  dob: z.string().refine((date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  }, "You must be at least 18 years old"),
});

export default function SignUpForm({ setSteps }: { setSteps: any }) {
  const colors = useColors();
  const { formData, setFormData } = useSignUpContext();
  const [d, setD] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const onSubmit = (data: any) => {
    setSteps(1);
    setFormData(data);
    console.log("Form Data:", data);
    console.log(formData);
    setD(data);
  };
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input
            id="first-name"
            {...register("firstName")}
            onChange={handleInputChange}
            value={formData.firstName || ""}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm font-medium">
              {String(errors.firstName.message)}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input
            id="last-name"
            {...register("lastName")}
            onChange={handleInputChange}
            value={formData.lastName || ""}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm font-medium">
              {String(errors.lastName.message)}
            </p> // Provide a fallback to avoid TypeScript error
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email")}
          onChange={handleInputChange}
          value={formData.email || ""}
          type="email"
          placeholder="m@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm font-medium">
            {String(errors.email.message)}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          {...register("phone")}
          onChange={handleInputChange}
          value={formData.phone || ""}
          placeholder="+1 (555) 555-5555"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm font-medium">
            {String(errors.phone.message)}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          {...register("dob")}
          onChange={handleInputChange}
          value={formData.dob || ""}
          type="date"
        />
        {errors.dob && (
          <p className="text-red-500 text-sm font-medium">
            {String(errors.dob.message)}
          </p>
        )}
      </div>
      <Button
        type="button"
        onClick={handleSubmit(onSubmit)}
        style={{ background: colors.defaultblue }}
        className="w-full h-12"
      >
        Proceed <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-gray-900 hover:underline dark:text-gray-50"
          prefetch={false}
        >
          Login
        </Link>
      </div>
    </form>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
