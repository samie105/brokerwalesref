"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFetchInfo } from "@/lib/data/fetchPost";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { uploadVerificationDocuments } from "@/app/actions/verificationActions";
import { toast } from "sonner";
import { uploadVerificationDocuments } from "@/server/dashboard/settingActions";

export default function AccountVerification() {
  const { data: deets, refetch } = useFetchInfo();
  const data = deets!.data;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idType, setIdType] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("idType", idType);

    try {
      await uploadVerificationDocuments(formData);
      toast.success(
        "Documents uploaded successfully. Verification in progress."
      );
      setIsDialogOpen(false);
      refetch(); // Refresh user data
    } catch (error) {
      console.error("Error uploading documents:", error);
      toast.error("Failed to upload documents. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const idTypes = [
    "Driver's License",
    "Passport",
    "State ID",
    "Military ID",
    "Permanent Resident Card (Green Card)",
    "Social Security Card",
  ];

  return (
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
            <div className="account-section transition-all  cursor-pointer bg-neutral-100 p-2 rounded-md flex items-center justify-between">
              <div className="flex space-x-1">
                <Avatar>
                  {<AvatarImage src={data.profilePictureLink} />}
                  <AvatarFallback className="font-bold text-sm border border-base-color/30 text-base-color/80 bg-base-color/5">
                    {data.firstName.charAt(0).toUpperCase()}
                    {data.lastName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="pl-1">
                  <div className="name  text-sm text-neutral-500 font-semibold">
                    {data.firstName} {data.lastName}
                  </div>
                  <div className="account-type mt-0.5 text-xs font-medium text-neutral-400">
                    {data.accountVerified ? "Verified" : "Not Verified"}
                  </div>
                </div>
              </div>
              <div className="veification-status pl-3 font-medium text-sm">
                <div
                  className={`badge ${
                    data.accountVerified
                      ? "bg-green-500/10 border-green-50 text-green-500"
                      : "bg-red-500/10 border-red-50 text-red-500"
                  } border px-2 py-1.5 text-xs rounded-md font-semibold flex items-center space-x-1`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d={
                        data.accountVerified
                          ? "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          : "M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                      }
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full disabled:bg-neutral-400 font-semibold bg-base-color/70 text-white rounded-sm"
                disabled={data.accountVerified}
              >
                {data.accountVerified ? "Account Verified" : "Verify Account"}
              </Button>
            </DialogTrigger>
            {data.verificationDetails.status !== "success" ||
            !data.accountVerified ? (
              <DialogContent className="w-[94%]">
                <DialogHeader>
                  <DialogTitle>Account Verification</DialogTitle>
                  <DialogDescription>
                    Please provide the required information to verify your
                    account including back and front photo of the{" "}
                    <strong>selected ID</strong>.
                  </DialogDescription>
                </DialogHeader>
                {data.verificationDetails.status === "pending" && (
                  <div className="application-progress p-3 rounded-md flex gap-x-4 bg-yellow-50 text-yellow-600 justify-between/ items-center ">
                    <div className=" p-3 rounded-full bg-yellow-500/10 text-yellow-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                          clipRule="evenodd"
                        />
                        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                      </svg>
                    </div>
                    <div className="message">
                      <div className="font-semibold">Application Pending</div>
                      <div className="font-medium text-yellow-600/60 mt-1 text-sm">
                        Your last appplication is still under review, please
                        wait for a feedback before reapplication
                      </div>
                    </div>
                  </div>
                )}
                {data.verificationDetails.status === "failed" && (
                  <div className="application-progress p-3 rounded-md flex gap-x-4 bg-red-50 text-red-600 justify-between/ items-center ">
                    <div className=" p-3 rounded-full bg-red-500/10 text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="message">
                      <div className="font-semibold">Application Failed</div>
                      <div className="font-medium text-red-600/60 mt-1 text-sm">
                        Your last appplication failed for some verification
                        reasons, please apply again
                      </div>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="id-type" className="">
                        ID Type
                      </Label>
                      <Select
                        onValueChange={setIdType}
                        required
                        disabled={
                          isUploading ||
                          data.verificationDetails.status === "pending"
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          {idTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="front-photo" className="">
                        Front Photo
                      </Label>
                      <Input
                        id="front-photo"
                        name="frontPhoto"
                        type="file"
                        disabled={
                          isUploading ||
                          data.verificationDetails.status === "pending"
                        }
                        accept="image/*"
                        className="col-span-3 cursor-pointer"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="back-photo" className="">
                        Back Photo
                      </Label>
                      <Input
                        id="back-photo"
                        name="backPhoto"
                        type="file"
                        disabled={
                          isUploading ||
                          data.verificationDetails.status === "pending"
                        }
                        accept="image/*"
                        className="col-span-3 cursor-pointer"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full font-bold"
                      disabled={
                        isUploading ||
                        data.verificationDetails.status === "pending"
                      }
                    >
                      {isUploading
                        ? "Please wait..."
                        : "Submit for Verification"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            ) : (
              <DialogContent className="w-[94%]">
                <div className="application-progress p-3 rounded-md flex gap-x-4 bg-green-50 text-green-600 justify-between/ items-center ">
                  <div className=" p-3 rounded-full bg-green-500/10 text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                      <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                    </svg>
                  </div>
                  <div className="message">
                    <div className="font-semibold">Application Approved</div>
                    <div className="font-medium text-green-600/60 mt-1 text-sm">
                      Your account has been successfully verified
                    </div>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
