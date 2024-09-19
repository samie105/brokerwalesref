"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useFetchInfo } from "@/lib/data/fetchPost";

type PersonalInfoItem = {
  label: string;
  value: string;
};

export default function PersonalInformation() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;

  const [copiedField, setCopiedField] = useState<string | null>(null);

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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Card className="mb-2 rounded-sm border-none bg-neutral-50 p-0">
      <div className="p-4">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div>
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
                <Label
                  htmlFor={`info-${index}`}
                  className="text-sm font-medium"
                >
                  {item.label}
                </Label>
                <div className="flex items-center bg-neutral-100 py-2 px-3 rounded-md">
                  <div
                    id={`info-${index}`}
                    className="bg-neutral-100 capitalize p-2 text-sm rounded-md flex-grow mr-2"
                  >
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
                  <span
                    className="absolute bg-neutral-500 right-0 rounded-md p-2 flex justify-center animate__faster animate__animated capitalize animate__fadeInUp top-0 text-xs text-white"
                    role="status"
                    aria-live="polite"
                  >
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
  );
}
