"use client";

import React, { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Inter } from "next/font/google";
import { CopyIcon } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type PersonalInfoItem = {
  label: string;
  value: string;
};

export default function Settings() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const [isUploading, setIsUploading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showTransactionPin, setShowTransactionPin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);

    setIsChangingPassword(false);
  };

  const personalInfo: PersonalInfoItem[] = [
    { label: "First Name", value: data.firstName },
    { label: "Last Name", value: data.lastName },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "Account Type", value: data.accountType },
    { label: "Account Number", value: data.bankAccountNumber },
    { label: "Routing Number", value: data.bankRoutingNumber },
    { label: "Mother's Maiden Name", value: data.motherMaidenName },
  ];

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
      }, 2000);
    }
  };

  const ToggleVisibility = ({
    show,
    onToggle,
  }: {
    show: boolean;
    onToggle: () => void;
  }) => (
    <Button
      type="button"
      className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
      size="icon"
      onClick={onToggle}
    >
      {show ? (
        <EyeOffIcon className="h-4 w-4" />
      ) : (
        <EyeIcon className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <div className="md:container mx-auto p-2 md:p-4">
      <h1 className="text-lg font-semibold mb-2 md:hidden">Account Settings</h1>

      <div className="grid grid-cols-1 ">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-2">
          <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
            <div className="p-4">
              <div className="text-base text-neutral-700 font-semibold py-1">
                Profile Picture
              </div>
              <div className="mt- text-sm text-neutral-500 font-medium">
                Update your profile picture
              </div>
            </div>
            <CardContent className="flex items-center p-4 space-x-4">
              <Avatar className="h-24 w-24">
                {<AvatarImage src="https://github.com/shadcn.png" />}
                <AvatarFallback className="font-bold text-sm border border-base-color/30 text-base-color/80 bg-base-color/5">
                  {data.firstName.charAt(0).toUpperCase()}
                  {data.lastName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="mb-2 border-neutral-500/10 cursor-pointer bg-neutral-100"
                />
                <button
                  disabled={isUploading}
                  className="rounded-sm font-semibold py-2 px-4 text-sm disabled:opacity-35 bg-base-color/70 text-white"
                >
                  {isUploading ? "Uploading..." : "Change"}
                </button>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
            <div className="p-4">
              <div className="text-base text-neutral-700 font-semibold py-1">
                Preference
              </div>
              <div className="mt- text-sm text-neutral-500 font-medium">
                Manage your preferences
              </div>
            </div>
            <CardContent className="p-4">
              <div className="notifications bg-neutral-100 flex py-4 px-4 rounded-md mt-2 justify-between items-center">
                <div className="flex items-center gap-x-2 text-neutral-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-neutral-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                  <p className="  text-sm font-medium">Notifications</p>
                </div>{" "}
                <Switch className="h-4 w-7" />
              </div>
              {/* <div className="separator w-8 h-[1px] bg-black/10 mx-auto"></div> */}

              <div className="darkmode bg-neutral-100 flex py-4 px-4 rounded-md mt-2 justify-between items-center">
                <div className="flex items-center gap-x-2 text-neutral-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 text-neutral-500 animate-spin"
                  >
                    <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
                  </svg>

                  <p className="  text-sm font-medium">Dark mode</p>
                </div>{" "}
                <Switch className="h-4 w-7" />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
            <div className="p-4">
              <div className="text-base text-neutral-700 font-semibold py-1">
                Transaction
              </div>
              <div className="mt- text-sm text-neutral-500 font-medium">
                Manage your transaction pin
              </div>
            </div>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <div className="py-2 px-3 flex items-center justify-between bg-neutral-100 rounded-sm ">
                    <div className="name_pin">
                      <div className="name text-xs font-medium text-neutral-500">
                        Transaction Pin
                      </div>
                      <div
                        className={`${inter.className} transition-all ${
                          showTransactionPin ? "blur-md" : ""
                        } text-neutral-700 mt-1 font-bold text-xl`}
                      >
                        7463
                      </div>
                    </div>
                    <div className="ctrls flex items-center gap-x-1">
                      {" "}
                      <ToggleVisibility
                        show={showTransactionPin}
                        onToggle={() =>
                          setShowTransactionPin(!showTransactionPin)
                        }
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-full font-semibold bg-base-color/70 text-white rounded-sm">
                  Change pin
                </Button>
              </div>
            </CardContent>{" "}
          </Card>
          <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
            <div className="p-4">
              <div className="text-base text-neutral-700 font-semibold py-1">
                Social Security
              </div>
              <div className="mt- text-sm text-neutral-500 font-medium">
                View your social security number
              </div>
            </div>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <div className="py-2 px-3 flex items-center justify-between bg-neutral-100 rounded-sm ">
                    <div className="name_pin">
                      <div className="name text-xs font-medium text-neutral-500">
                        SSN
                      </div>
                      <div
                        className={`${inter.className} transition-all ${
                          showTransactionPin ? "blur-md" : ""
                        } text-neutral-700 mt-1 font-bold text-lg`}
                      >
                        {data.ssn}
                      </div>
                    </div>
                    <div className="ctrls flex items-center gap-x-1">
                      {" "}
                      <ToggleVisibility
                        show={showTransactionPin}
                        onToggle={() =>
                          setShowTransactionPin(!showTransactionPin)
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* <Button className="w-full font-semibold bg-base-color/70 text-white rounded-sm">
                  Change pin
                </Button> */}
              </div>
            </CardContent>{" "}
          </Card>
          <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
            <div className="p-4">
              <div className="text-base text-neutral-700 font-semibold py-1">
                Account Limit
              </div>
              <div className="mt- text-sm text-neutral-500 font-medium">
                Manage your account limits
              </div>
            </div>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <div className="py-2 px-3 flex items-center justify-between bg-neutral-100 rounded-sm ">
                    <div className="name_pin">
                      <div className="name text-xs font-medium text-neutral-500">
                        Account Limit
                      </div>
                      <div
                        className={`limit text-neutral-700 font-bold text-lg `}
                      >
                        <span className="text-xs font-semibold ">$</span>
                        <span className={`${inter.className}`}>
                          {data.accountLimit.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full font-semibold bg-base-color/70 text-white rounded-sm">
                  Increase Limit
                </Button>
              </div>
            </CardContent>{" "}
          </Card>
          <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
            <div className="p-4">
              <div className="text-base text-neutral-700 font-semibold py-1">
                Account Verification
              </div>
              <div className="mt- text-sm text-neutral-500 font-medium">
                Manage your account verification
              </div>
            </div>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <div className="account-section transition-all  cursor-pointer bg-neutral-100 p-2 rounded-md flex /pl-1 items-center space-x-2/ justify-between">
                    <div className="flex space-x-1">
                      <Avatar>
                        {<AvatarImage src="https://github.com/shadcn.png" />}
                        <AvatarFallback className="font-bold text-sm border border-base-color/30 text-base-color/80 bg-base-color/5">
                          {data.firstName.charAt(0).toUpperCase()}
                          {data.lastName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="pl-1">
                        {" "}
                        <div className="name  text-sm text-neutral-500 font-semibold">
                          {data.firstName} {data.lastName}
                        </div>
                        <div className="account-type mt-0.5 text-xs font-medium text-neutral-400">
                          Not Verified
                        </div>
                      </div>
                    </div>
                    <div className="veification-status pl-3 font-medium text-sm">
                      <div
                        className={`badge bg-red-500/10 border border-red-50 px-2 py-1.5 text-xs rounded-md font-semibold text-red-500 flex items-center space-x-1`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  disabled={false}
                  className="w-full disabled:bg-neutral-400 font-semibold bg-base-color/70 text-white rounded-sm"
                >
                  Verify account
                </Button>
              </div>
            </CardContent>{" "}
          </Card>
        </div>

        <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
          <div className="p-4">
            <div className="grid md:grid-cols-2 grid-cols-1">
              {" "}
              <div>
                {" "}
                <div className="text-base text-neutral-700 font-semibold py-1">
                  Personal Information
                </div>
                <div className="mt- text-sm text-neutral-500 font-medium md:text-balance">
                  These are your account information with us, which are securely
                  stored and protected from unauthorized access.
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="px-5 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalInfo.map((item, index) => (
                  <div key={index} className="relative mt-3">
                    <Label className="text-sm font-medium">{item.label}</Label>
                    <div className="flex items-center bg-neutral-100 py-2 px-3 rounded-md ">
                      <div className="bg-neutral-100 capitalize p-2 text-sm rounded-md flex-grow mr-2">
                        {item.value}
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className="p-2 hover:bg-neutral-200/70 rounded-full transition-colors"
                        aria-label={`Copy ${item.label}`}
                      >
                        <CopyIcon className="h-4 w-4" />
                      </button>
                    </div>
                    {copiedField === item.label && (
                      <span className="absolute bg-neutral-500 right-0 rounded-md p-2 flex justify-center animate__faster animate__animated capitalize animate__fadeInUp  top-0 text-xs text-white">
                        <p className="z-20">Copied!</p>
                        <div className="arrow bg-neutral-500 rounded absolute size-4 rotate-45 -bottom-1 z-10 mx-auto"></div>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
//   <Dialog
//                   open={isChangingPassword}
//                   onOpenChange={setIsChangingPassword}
//                 >
//                   <DialogTrigger asChild>
//                     <Button>Change Password</Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                       <DialogHeader>
//                         <DialogTitle>Change Password</DialogTitle>
//                         <DialogDescription>
//                           Enter your current password and a new password below.
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="grid gap-4 py-4">
//                         <div>
//                           <Label htmlFor="current-password">
//                             Current Password
//                           </Label>
//                           <Input
//                             id="current-password"
//                             type="password"
//                             {...register("currentPassword", {
//                               required: "Current password is required",
//                             })}
//                           />
//                           {errors.currentPassword && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {errors.currentPassword.message}
//                             </p>
//                           )}
//                         </div>
//                         <div>
//                           <Label htmlFor="new-password">New Password</Label>
//                           <Input
//                             id="new-password"
//                             type="password"
//                             {...register("newPassword", {
//                               required: "New password is required",
//                               minLength: {
//                                 value: 8,
//                                 message:
//                                   "Password must be at least 8 characters long",
//                               },
//                             })}
//                           />
//                           {errors.newPassword && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {errors.newPassword.message}
//                             </p>
//                           )}
//                         </div>
//                         <div>
//                           <Label htmlFor="confirm-password">
//                             Confirm New Password
//                           </Label>
//                           <Input
//                             id="confirm-password"
//                             type="password"
//                             {...register("confirmPassword", {
//                               required: "Please confirm your new password",
//                               validate: (value) =>
//                                 value ===
//                                   document.getElementById("new-password")
//                                     ?.innerText || "Passwords do not match",
//                             })}
//                           />
//                           {errors.confirmPassword && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {errors.confirmPassword.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                       <DialogFooter>
//                         <Button type="submit">Change Password</Button>
//                       </DialogFooter>
//                     </form>
//                   </DialogContent>
//                 </Dialog>
