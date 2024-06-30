"use client";

import { useState } from "react";
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

export default function PaymentSection() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Select your payment method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={
              selectedPaymentMethod === "bitcoin" ? "default" : "outline"
            }
            onClick={() => setSelectedPaymentMethod("bitcoin")}
          >
            <BitcoinIcon className="h-6 w-6 mr-2" />
            Bitcoin
          </Button>
          <Button
            variant={
              selectedPaymentMethod === "ethereum" ? "default" : "outline"
            }
            onClick={() => setSelectedPaymentMethod("ethereum")}
          >
            <EclipseIcon className="h-6 w-6 mr-2" />
            Ethereum
          </Button>
          <Button
            variant={
              selectedPaymentMethod === "litecoin" ? "default" : "outline"
            }
            onClick={() => setSelectedPaymentMethod("litecoin")}
          >
            <BitcoinIcon className="h-6 w-6 mr-2" />
            Litecoin
          </Button>
          <Button
            variant={
              selectedPaymentMethod === "dogecoin" ? "default" : "outline"
            }
            onClick={() => setSelectedPaymentMethod("dogecoin")}
          >
            <DogIcon className="h-6 w-6 mr-2" />
            Dogecoin
          </Button>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={selectedPaymentMethod === "paypal" ? "default" : "outline"}
            onClick={() => setSelectedPaymentMethod("paypal")}
          >
            <ShoppingCartIcon className="h-6 w-6 mr-2" />
            PayPal
          </Button>
          <Button
            variant={selectedPaymentMethod === "zelle" ? "default" : "outline"}
            onClick={() => setSelectedPaymentMethod("zelle")}
          >
            <ZapIcon className="h-6 w-6 mr-2" />
            Zelle
          </Button>
          <Button
            variant={selectedPaymentMethod === "venmo" ? "default" : "outline"}
            onClick={() => setSelectedPaymentMethod("venmo")}
          >
            <CreditCardIcon className="h-6 w-6 mr-2" />
            Venmo
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-medium">Total: $50</div>
        <Button disabled={!selectedPaymentMethod} className="ml-auto">
          Pay Now
        </Button>
      </CardFooter>
      {selectedPaymentMethod && (
        <div className="p-4 bg-muted rounded-b-lg">
          {selectedPaymentMethod === "bitcoin" && (
            <div className="grid gap-2">
              <div>Send BTC to: 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2</div>
              <div>Amount: 0.0025 BTC</div>
            </div>
          )}
          {selectedPaymentMethod === "ethereum" && (
            <div className="grid gap-2">
              <div>Send ETH to: 0x0123456789012345678901234567890123456789</div>
              <div>Amount: 0.05 ETH</div>
            </div>
          )}
          {selectedPaymentMethod === "litecoin" && (
            <div className="grid gap-2">
              <div>Send LTC to: LTCAddress1234567890abcdefghijklmnopqrstuv</div>
              <div>Amount: 0.25 LTC</div>
            </div>
          )}
          {selectedPaymentMethod === "dogecoin" && (
            <div className="grid gap-2">
              <div>Send DOGE to: DogecoinAddress1234567890abcdefghijklmnop</div>
              <div>Amount: 100 DOGE</div>
            </div>
          )}
          {selectedPaymentMethod === "paypal" && (
            <div className="grid gap-2">
              <div>Pay to: payments@example.com</div>
              <div>Amount: $50</div>
            </div>
          )}
          {selectedPaymentMethod === "zelle" && (
            <div className="grid gap-2">
              <div>Pay to: zelle@example.com</div>
              <div>Amount: $50</div>
            </div>
          )}
          {selectedPaymentMethod === "venmo" && (
            <div className="grid gap-2">
              <div>Pay to: @venmo-example</div>
              <div>Amount: $50</div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function BitcoinIcon(props: any) {
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
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
    </svg>
  );
}

function CreditCardIcon(props: any) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function DogIcon(props: any) {
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
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
      <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
    </svg>
  );
}

function EclipseIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 1 0 10 10" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function ZapIcon(props: any) {
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
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}
