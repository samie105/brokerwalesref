"use client";
import { useColors } from "@/context/colorContext";
import React from "react";
import Privacy from "./Pricacy";
import Transparency from "./Transparency";
import Update from "./Update";
import Support from "./Support";
import Line from "./Line";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scoll";

export default function ReasonPage() {
  const content = [
    {
      title: "Private and Secured",
      description:
        "  At Wilson Investment Bank & Co, your privacy and securities are our top priorities. With state-of-the-art encryption technology, multi-factor authentication, and continuous monitoring, we ensure that your sensitive information and transactions are safeguarded atevery step.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/assets/privacywcu.png"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Transparency",
      description:
        " At Wilson Investment Bank & Co, transparency is paramount. We provide clear and concise information about our fees, terms. and policies, ensuring you have full visibility into your banking experience. Additionally, our dedicated team of professionals is committed to providing honest and reliable assistance whenever you need it.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/assets/transparencywcu.png"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Improvement and Innovation",
      description:
        " At Wilson Investment Bank & Co, we are committed to innovation and continuous improvement. Our cutting-edge technology and digital solutions are constantly evolving to meet the changing needs of our customers.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/assets/updatewcu.png"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Responsive Support",
      description:
        "  At Wilson Investment Bank & Co, we prioritize customer satisfaction above all else. Our dedicated team is here to listen to your feedback, address your concerns, and provide personalized support every step of the way. Whether you have questions about your account, need assistance with a transaction, or want to explore new banking features, we’re here to help.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/assets/supportwcu.png"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
  ];
  const colors = useColors();
  return (
    <div className="mt-14 /md:px-20 px-7">
      <div className="text-cont md:text-center">
        {" "}
        <div className="flex text-xs mb-2 gap-3 md:justify-center ">
          {" "}
          <div
            className="register p-2 rounded-full font-bold flex items-center gap-2 cursor-pointer hover:bg-[#]"
            style={{
              background: colors.defaultblue + "10",
              color: colors.defaultblue,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>

            <p>Why Trust Us</p>
          </div>
        </div>
        <div className="large-text text-2xl font-bold text-neutral-800">
          Why Choose Wilson Bank?
        </div>
        <div className="smaller-text text-neutral-600 px-32 text-sm font-medium mt-2 text-balance">
          At Wilson Bank, we prioritize the security and reliability of your
          financial endeavors. Our extensive portfolio, encompassing everything
          from savings and checking accounts to sophisticated mortgage
          solutions, is crafted to cater to your specific financial
          requirements. <br className="hidden md:block" />
        </div>
      </div>
      {/* <Privacy />
      <Line />
      <Transparency />
      <Line />
      <Update />
      <Line />
      <Support /> */}
      <div className="pt-10">
        <StickyScroll content={content} />
      </div>
    </div>
  );
}
