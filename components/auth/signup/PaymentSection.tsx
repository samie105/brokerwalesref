"use client";

import { ChangeEvent, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useColors } from "@/context/colorContext";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

type PaymentMethod = {
  name: string;
  src: string;
  address: string;
};

type Props = {
  selectedMethod: PaymentMethod | null;
};

const paymentMethods = [
  {
    name: "bitcoin",
    src: "/assets/mbp/bitcoin.webp",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
  {
    name: "ethereum",
    src: "/assets/mbp/ETH.svg",
    address: "0x32Be343B94f860124dC4fEe278FDCBD38C102D88",
  },
  {
    name: "litecoin",
    src: "/assets/mbp/LTC.svg",
    address: "LZTH9Zg2VPRuQyjFGejrBWTUFGk62stUpD",
  },
  {
    name: "dogecoin",
    src: "/assets/mbp/DOGE.svg",
    address: "D7Y55gG8U3JDPJ4mdZY2A9XWcFXBJ2dQW9",
  },
  {
    name: "paypal",
    src: "/assets/mbp/paypal.webp",
    address: "example@paypal.com",
  },
  {
    name: "zelle",
    src: "/assets/mbp/zelle.png",
    address: "example@zelle.com",
  },
  {
    name: "venmo",
    src: "/assets/mbp/venmo.png",
    address: "@example",
  },
  {
    name: "cashapp",
    src: "/assets/mbp/cashapp.png",
    address: "@cahapp",
  },
];

export default function PaymentSection() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [paid, setPaid] = useState(false);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied successfully");
  };

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const colors = useColors();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const selectedMethod = paymentMethods.find(
    (method) => method.name === selectedPaymentMethod
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Payment</CardTitle>
            <CardDescription className="text-sm">
              Select your payment method
            </CardDescription>
          </div>
          <div
            style={{
              color: colors.defaultblue,
              background: colors.defaultblue + "10",
            }}
            className="bg-gray-100 font-medium font-sans p-2 rounded-full"
          >
            <p>$50</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.slice(0, 4).map((method) => (
              <Button
                key={method.name}
                className="border py-5"
                style={
                  selectedPaymentMethod === method.name
                    ? { backgroundColor: colors.defaultblue }
                    : {
                        backgroundColor: colors.defaultblue + "07",
                        color: "#333",
                      }
                }
                onClick={() => setSelectedPaymentMethod(method.name)}
              >
                <Image
                  alt=""
                  src={method.src}
                  width={1000}
                  height={1000}
                  className="h-5 w-5 mr-2"
                />
                {method.name.charAt(0).toUpperCase() + method.name.slice(1)}
              </Button>
            ))}
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.slice(4).map((method) => (
              <Button
                key={method.name}
                className="border py-5"
                style={
                  selectedPaymentMethod === method.name
                    ? { backgroundColor: colors.defaultblue }
                    : {
                        backgroundColor: colors.defaultblue + "07",
                        color: "#333",
                      }
                }
                onClick={() => setSelectedPaymentMethod(method.name)}
              >
                <Image
                  alt=""
                  src={method.src}
                  width={1000}
                  height={1000}
                  className="h-5 w-5 mr-2 rounded-full"
                />
                {method.name.charAt(0).toUpperCase() + method.name.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Dialog>
            <DialogTrigger
              disabled={!selectedPaymentMethod}
              className="ml-auto w-full justify-center disabled:bg-gray-200 bg-blue-800 text-white px-4 py-3 rounded-md text-sm font-semibold flex items-center gap-x-2 disabled:cursor-not-allowed"
            >
              <p>Pay Now</p>
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
            </DialogTrigger>
            <DialogContent>
              {selectedMethod && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center justify-center gap-x-3">
                    <Image
                      alt=""
                      src={selectedMethod.src}
                      width={100}
                      height={100}
                      className="h-10 w-10 rounded-full"
                    />
                    <div
                      style={{
                        color: "#0000ff",
                        background: "#0000ff10",
                      }}
                      className="bg-gray-100 font-medium font-sans p-3 rounded-full"
                    >
                      <p>$50</p>
                    </div>
                  </div>

                  <div className="address box w-full text-sm">
                    <label htmlFor={selectedMethod.address + "address"}>
                      {selectedMethod.name.charAt(0).toUpperCase() +
                        selectedMethod.name.slice(1)}{" "}
                      ID
                    </label>
                    <div className="bg-gray-100 mt-1 text-sm rounded-md flex items-center justify-between p-4">
                      <p>{selectedMethod.address}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={() => handleCopy(selectedMethod.address)}
                        className="size-5 cursor-pointer text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="payment-checker">
                    <div className="notes text-xs bg-gray-100 text-black/80 font-medium/ rounded-md p-2">
                      Copy the payment id and make the transaction. When done,
                      click on the button below to proceed. Be sure to have made
                      the transaction before proceeding as the payment id is
                      bound to change
                    </div>
                    <Button
                      className="btn w-full h-12 text-sm gap-x-2 mt-3"
                      style={{ background: colors.defaultblue }}
                    >
                      {" "}
                      <p>Click to proceed</p>
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
                  </div>
                  {paid && (
                    <div className="w-full">
                      <Label className="block text-sm font-medium text-gray-700">
                        Upload Payment Screenshot
                      </Label>
                      <div
                        {...getRootProps()}
                        className="mt-1 flex items-center justify-between p-4 bg-gray-100 rounded-md cursor-pointer"
                      >
                        <Input {...getInputProps()} />
                        <p className="text-gray-500 text-sm">
                          {uploadedFile === null ? (
                            <>
                              Drag & drop a file here, or click to select a file
                            </>
                          ) : (
                            <>Not the file? Upload a different file</>
                          )}
                        </p>
                      </div>
                      {uploadedFile && (
                        <div className="mt-4 bg-gray-100 text-sm p-4 rounded-md flex items-center justify-between">
                          <span>{uploadedFile.name}</span>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => setUploadedFile(null)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
