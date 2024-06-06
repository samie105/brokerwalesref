"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useColors } from "@/context/colorContext";

export default function ContactInfo() {
  const colors = useColors();
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="w-full lg:px-8 px-4 /bg-white rounded-lg /shadow-md">
        <form className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="mb-1" htmlFor="first-name">
                First Name
              </Label>
              <Input
                id="first-name"
                className="rounded-lg h-12 bg-blue-600/5"
                placeholder="John"
              />
            </div>
            <div className="flex-1">
              <Label className="mb-1" htmlFor="last-name">
                Last Name
              </Label>
              <Input
                id="last-name"
                className="rounded-lg h-12 bg-blue-600/5"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="mb-1" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                className="rounded-lg h-12 bg-blue-600/5"
                placeholder="You@example.com"
                type="email"
              />
            </div>
            <div className="flex-1">
              <Label className="mb-1" htmlFor="phone-number">
                Phone Number
              </Label>
              <Input
                id="phone-number"
                className="rounded-lg h-12 bg-blue-600/5"
                placeholder="+1 (xxx) xxxx"
                type="tel"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="" htmlFor="message">
              Message
            </Label>
            <Textarea
              className="min-h-[150px] rounded-lg bg-blue-600/5"
              id="message"
              placeholder="Message"
            />
          </div>
          <Button
            className="w-full h-12 text-white font-bold flex rounded-lg items-center gap-x-3"
            style={{
              background: colors.defaultblue,
            }}
          >
            <p>Submit</p>
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
        </form>
      </div>
    </div>
  );
}
