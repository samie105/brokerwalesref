"use client";

import { Card, CardContent } from "@/components/ui/card";
import Cards, { Focused } from "react-credit-cards-2";
import { format } from "date-fns";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import React, { MouseEvent, useEffect, useState } from "react";
import { useColors } from "@/context/colorContext";
import { Inter } from "next/font/google";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createCard, DeleteCard } from "@/server/dashboard/cardActions";
import { useAction } from "next-safe-action/hooks";
import { useFetchInfo } from "@/lib/data/fetchPost";
import Fixed from "./Fixed";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AcctSectManager({
  currentMode,
}: {
  currentMode: string | string[];
}) {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const colors = useColors();
  let toastId: any;
  const [state, setState] = useState<{
    number: string;
    expiry: string;
    cvc: string;
    name: string;
    focus: Focused;
  }>({
    number: data.card.cardNumber,
    // number: "",
    expiry: "",
    cvc: "",
    name: ``,
    focus: "",
  });
  const showCvc = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setState((prev) => ({
      ...prev,
      focus: state.focus === name ? "" : (name as Focused),
    }));
  };
  const cardDeet = {
    name: data.firstName + " " + data.lastName,
    number: data.card.cardNumber,
    expiry: data.card.cardExpiry,
    cvc: data.card.cardCVC,
  };
  const { execute, status } = useAction(DeleteCard, {
    onSuccess({ data }) {
      toast.success(data?.message, {
        id: toastId,
        duration: 3000,
      });
      setState((prev) => {
        return {
          ...prev,
          number: "",
          expiry: "",
          cvc: "",
        };
      });
      toast.dismiss(toastId);
    },

    onExecute() {
      toast.loading("Please wait, Deleting card", {
        id: toastId,
      });
    },

    onError(error) {
      if (error.error.fetchError)
        toast.error("Error communicating with providers", {
          id: toastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId,
        });
      if (error.error.validationErrors)
        toast.error("Error deleting card", {
          id: toastId,
        });

      toast.dismiss(toastId);
    },
  });
  const handleCardDeletion = async () => {
    execute({ action: "delete card" });
  };

  return (
    <>
      {currentMode === "account" && (
        <div>
          <div className="card ">
            <Card className="shadow-none border-0 border-none bg-transparent">
              <CardContent className="p-0 shadow-none border-none border-0">
                <div className="py-5 px-6 w-full rounded-sm bg-blue-800">
                  <div className="flex items-center justify-between">
                    {" "}
                    <div className="">
                      <div className="account-type text-xs bg-white/5 border border-white/10 p-1.5 rounded-sm font-medium text-neutral-300">
                        Checking account
                      </div>
                      <div
                        className={`account-balance text-3xl mt-2 /blur-md font-bold text-neutral-100 ${inter.className}`}
                      >
                        <span className="text-sm">$</span>
                        {data.accountBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div className="actions flex items-center space-x-2">
                      <div className="deposit-action rounded-md bg-white/5 borde/r border-white/10 p-3 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="transfer-action rounded-md bg-white/5 bord/er border-white/10 p-3 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2 mt-5">
                    <div className="bg-white/5 text-white text-sm rounded-md border font-semibold border-white/10 flex items-center  space-x-2 px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.638 1.093a.75.75 0 0 1 .724 0l2 1.104a.75.75 0 1 1-.724 1.313L10 2.607l-1.638.903a.75.75 0 1 1-.724-1.313l2-1.104ZM5.403 4.287a.75.75 0 0 1-.295 1.019l-.805.444.805.444a.75.75 0 0 1-.724 1.314L3.5 7.02v.73a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .388-.657l1.996-1.1a.75.75 0 0 1 1.019.294Zm9.194 0a.75.75 0 0 1 1.02-.295l1.995 1.101A.75.75 0 0 1 18 5.75v2a.75.75 0 0 1-1.5 0v-.73l-.884.488a.75.75 0 1 1-.724-1.314l.806-.444-.806-.444a.75.75 0 0 1-.295-1.02ZM7.343 8.284a.75.75 0 0 1 1.02-.294L10 8.893l1.638-.903a.75.75 0 1 1 .724 1.313l-1.612.89v1.557a.75.75 0 0 1-1.5 0v-1.557l-1.612-.89a.75.75 0 0 1-.295-1.019ZM2.75 11.5a.75.75 0 0 1 .75.75v1.557l1.608.887a.75.75 0 0 1-.724 1.314l-1.996-1.101A.75.75 0 0 1 2 14.25v-2a.75.75 0 0 1 .75-.75Zm14.5 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-.388.657l-1.996 1.1a.75.75 0 1 1-.724-1.313l1.608-.887V12.25a.75.75 0 0 1 .75-.75Zm-7.25 4a.75.75 0 0 1 .75.75v.73l.888-.49a.75.75 0 0 1 .724 1.313l-2 1.104a.75.75 0 0 1-.724 0l-2-1.104a.75.75 0 1 1 .724-1.313l.888.49v-.73a.75.75 0 0 1 .75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>Fixed</p>
                    </div>
                    <div className="bg-white/5 text-white text-sm rounded-md border font-semibold border-white/10 flex items-center  space-x-2 px-3 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>Cards</p>
                    </div>
                  </div>
                  {/* <div className="separator w-20 h-0.5 mt-4 bg-white/10 mx-auto"></div> */}
                </div>
                <div className="acount-info mt-2 py-5 bg-white rounded-sm px-6">
                  <h1 className="text-neutral-600 py-2 px-3 rounded bg-neutral-500/5 inline font-med/ium text-sm ">
                    Account Info
                  </h1>
                  <div className="account-limit-info mt-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <div className="icon-cont rounded-full relative justify-center items-center flex bg-base-color/5 border text-base-color/80 border-base-color/10 p-3 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div className="liner absolute h-7 w-[1px] bg-base-color/10 z-0 -bottom-7"></div>
                        </div>
                        <div className="account-limit text-neutral-500/80 font-semibold text-sm">
                          <div>Account limit</div>
                          <div className="amount text-neutral-700 font-semibold /text-base">
                            <p className={`${inter.className}`}>
                              ${data.accountLimit.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div
                        className={`text-red-500 text-sm font-semibold ${inter.className}`}
                      >
                        ~ $4000
                      </div> */}
                    </div>
                  </div>
                  <div className="separator w-5 h-0.5 my-1 bg-black/10 mx-auto"></div>

                  <div className="account-limit-info mt-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <div className="icon-cont rounded-full bg-base-color/5 border text-base-color/80 border-base-color/10 p-3 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="account-dep-ver text-neutral-500/80 font-semibold text-sm">
                          <div>Opening deposit</div>
                          <div className="amount text-neutral-700 font-semibold /text-base">
                            <p className={`${inter.className}`}>$50</p>
                          </div>
                        </div>
                      </div>
                      {!data.isPaidOpeningDeposit ? (
                        <div
                          className={`text-yellow-500 bg-yellow-500/5 rounded py-1 px-2 border-yellow-500/20 border text-xs font-semibold `}
                        >
                          Pending
                        </div>
                      ) : (
                        <div
                          className={`text-green-500 bg-green-500/5 rounded py-1 px-2 border-green-500/20 border text-xs font-semibold `}
                        >
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      {currentMode === "cards" && (
        <div>
          <Card
            className={`card b/order relative shadow-none border-none rounded-md md:p-3 pt-2 md:pt-0 /border w-full inset-1 min-h-48 pb-3 md:pb:0 /border-dashed border-neutral-600 `}
          >
            {data.card.cardNumber === "" && (
              <div className="image-cont absolute w-full h-full animate-spi top-0 left-0">
                <Image alt="" src={"/assets/cards/no_card_bg.svg"} fill />
              </div>
            )}
            {data.card.cardNumber !== "" && (
              <div>
                {" "}
                <div className="w-full md:pt-4 relative">
                  {" "}
                  <Cards
                    number={data.card.cardNumber || ""}
                    expiry={data.card.cardExpiry || ""}
                    cvc={data.card.cardCVC || ""}
                    name={data.firstName + " " + data.lastName || ""}
                    focused={state.focus}
                  />
                  {state.focus === "" && (
                    <div className="absolute animate__animated animate__lightSpeedInRight bankName uppercase bottom-2 left-[60px] text-sm text-neutral-300 font-medium">
                      <code>Wilson Bank</code>
                    </div>
                  )}{" "}
                </div>
                <div className="separator w-20 h-0.5 mt-4 mb-2 bg-black/10 mx-auto"></div>
                <div className="card-actions /mt-1 cont px-1 md:px-3">
                  <div className="flex justify-between items-center /shadow-sm w-full rounded-md px-3 /pt-2">
                    <div
                      className="card-balance space-y-1 /px-4 py-1 rounded-md"
                      // style={{ background: colors.defaultblue + "09" }}
                    >
                      <div className="text-xs font-semibold text-neutral-500">
                        Card balance
                      </div>
                      <div
                        className={`text-xl font-bold text-neutral-700 ${inter.className}`}
                      >
                        $
                        {data.cardBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>

                    <div className="actions flex items-center gap-x-2">
                      <div
                        className="topup cursor-pointer rounded-md b/order text-base-color/80 border-black/10 p-3"
                        style={{ background: colors.defaultblue + "09" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>
                      </div>
                      <CreditCardDetails
                        status={status}
                        state={cardDeet}
                        cardInfo={data.card}
                      />
                      <button
                        disabled={status === "executing"}
                        name="cvc"
                        onClick={showCvc}
                        className="showcvc disabled:opacity-25 cursor-pointer rounded-md b/order text-base-color/80 border-black/10 p-3"
                        style={{ background: colors.defaultblue + "09" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h2a.75.75 0 0 0 0-1.5h-2ZM13.75 2a.75.75 0 0 0 0 1.5h2a.75.75 0 0 1 .75.75v2a.75.75 0 0 0 1.5 0v-2A2.25 2.25 0 0 0 15.75 2h-2ZM3.5 13.75a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 4.25 18h2a.75.75 0 0 0 0-1.5h-2a.75.75 0 0 1-.75-.75v-2ZM18 13.75a.75.75 0 0 0-1.5 0v2a.75.75 0 0 1-.75.75h-2a.75.75 0 0 0 0 1.5h2A2.25 2.25 0 0 0 18 15.75v-2ZM7 10a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" />
                        </svg>
                      </button>
                      <Dialog>
                        <DialogTrigger
                          disabled={status === "executing"}
                          className="disabled:opacity-25"
                        >
                          <div className="deleteCard cursor-pointer rounded-md b/order text-red-600 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-pointer border-red-600/10 bg-red-600/10 p-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="w-[90%]">
                          <DialogTitle className="text-neutral-600">
                            Delete Credit Card
                          </DialogTitle>
                          <DialogDescription className="text-neutral-600">
                            Please note that this action is irreversible, please
                            review and be sure of this action
                          </DialogDescription>

                          <div className="actions flex justify-between items-center">
                            <SheetClose className="py-3 px-5 rounded-sm cursor-pointer border bg-neutral-100 text-neutral-600">
                              <div className="cancel font-semibold ">
                                Cancel
                              </div>
                            </SheetClose>
                            <SheetClose
                              onClick={handleCardDeletion}
                              className="p-3 rounded-sm cursor-pointer flex items-center space-x-2 bg-red-600 text-white font-semibold"
                            >
                              <p>Delete card</p>{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </SheetClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {data.card.cardNumber === "" && (
              <>
                <div className="flex /border items-center justify-center w-md min-h-80 md:h-full  rounded-md ">
                  <div className="space-y-2 b/order p-4 bg-[#ffffff6a] backdrop-filter backdrop-blur-sm rounded-md text-center">
                    {" "}
                    <CreateCardForm setState={setState} />
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
      {currentMode === "fixed" && <Fixed />}
    </>
  );
}

type CreateCardFormProps = {
  setState: React.Dispatch<
    React.SetStateAction<{
      number: string;
      expiry: string;
      cvc: string;
      name: string;
      focus: Focused;
    }>
  >;
};
export function CreateCardForm({ setState }: CreateCardFormProps) {
  const cardProviders = [
    {
      name: "Mastercard",
      imagePath: "/assets/cards/card_types/mastercard.png",
      digits: 51 || 52 || 53 || 54 || 55,
      initials: "MC",
    },
    {
      name: "Visa",
      imagePath: "/assets/cards/card_types/visa.jpg",
      digits: 4,
      initials: "V",
    },
    {
      name: "American Express",
      imagePath: "/assets/cards/card_types/amex.png",
      digits: 34 || 37,
      initials: "AMEX",
    },
    {
      name: "Discover",
      imagePath: "/assets/cards/card_types/discover.png",
      digits: 6011 || 64 || 65,
      initials: "D",
    },
    {
      name: "Diners Club",
      imagePath: "/assets/cards/card_types/dinerclub.png",
      digits: 300 || 301 || 302 || 303 || 36 || 38,
      initials: "DC",
    },
  ];
  const addressRegex = new RegExp(
    "^\\s*\\d+([a-z]?\\s)?[a-z0-9\\s\\-',]+(?:\\s*(?:street|avenue|road|lane|drive|blvd|way|circle|court|plaza|terrace|place|pkwy|hwy|\\p{L}+))?,\\s*[a-z0-9\\s\\-',]+,\\s*[a-z0-9\\s\\-',]+\\s*$",
    "iu"
  );
  let toastId: any;
  const [cardType, setCardType] = useState("");
  const [cardBillingAddress, setcardBillingAddress] = useState("");
  const [cardBillingAddressError, setcardBillingAddressError] = useState("");
  const [cardZipCode, setcardZipCode] = useState("");
  const [cardZipCodeError, setcardZipCodeError] = useState("");
  const isFormValid =
    !(cardType === "" || cardBillingAddress === "" || cardZipCode === "") &&
    cardZipCode.length >= 5;
  const handlecardZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setcardZipCode(value);
    if (value.length! < 5) {
      setcardZipCodeError("Zip code must be 5 digits or higher");
    } else {
      setcardZipCodeError("");
    }
  };
  const handlecardBillingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const address = e.target.value;
    if (!addressRegex.test(address)) {
      setcardBillingAddressError("Invalid address format");
    } else {
      setcardBillingAddressError("");
    }
    setcardBillingAddress(address);
  };
  function generateCardNumber(cardType: string): string {
    const providers: { [key: string]: number[] } = {
      Mastercard: [51, 52, 53, 54, 55],
      Visa: [4],
      "American Express": [34, 37],
      Discover: [6011, 64, 65],
      "Diners Club": [300, 301, 302, 303, 36, 38],
    };

    if (providers.hasOwnProperty(cardType)) {
      const initialDigits: number[] =
        providers[cardType as keyof typeof providers];
      if (!initialDigits) {
        throw new Error(`Invalid card type: ${cardType}`);
      }

      const initialDigit =
        initialDigits[Math.floor(Math.random() * initialDigits.length)];
      let cardNumber = initialDigit.toString();

      // Generate remaining 11 digits
      for (let i = 0; i < 15; i++) {
        cardNumber += Math.floor(Math.random() * 10);
      }

      // If the generated card number is longer than 12 digits, remove the last digit
      if (cardNumber.length > 16) {
        cardNumber = cardNumber.slice(0, 16);
      }

      // If the generated card number is shorter than 12 digits, pad leading zeros
      if (cardNumber.length < 16) {
        cardNumber =
          "000000000000".slice(0, 16 - cardNumber.length) + cardNumber;
      }

      return cardNumber;
    } else {
      throw new Error(`Invalid card type: ${cardType}`);
    }
  }

  function generateExpiryDate(): string {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 2);
    const expiryDate = format(currentDate, "MM/yy");
    return expiryDate;
  }
  function generateCVC(): string {
    const cvc = Math.floor(1000 + Math.random() * 9000).toString();
    return cvc.slice(-3);
  }

  const { execute, status } = useAction(createCard, {
    onSuccess({ data }) {
      toast.success(data?.message, {
        id: toastId,
        duration: 3000,
      });
      setState((prev) => {
        return {
          ...prev,
          number: data?.data.cardNumber,
          expiry: data?.data.cardExpiry,
          cvc: data?.data.cardCVC,
        };
      });
      toast.dismiss(toastId);
    },

    onExecute() {
      toast.loading("Please wait, Creating card", {
        id: toastId,
      });
    },

    onError(error) {
      if (error.error.fetchError)
        toast.error("Error communicating with providers", {
          id: toastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId,
        });
      if (error.error.validationErrors)
        toast.error("Error creating card", {
          id: toastId,
        });

      toast.dismiss(toastId);
    },
  });
  const handleCreateCard = () => {
    const cardNumber = generateCardNumber(cardType);
    const cardExpiry = generateExpiryDate();
    const cardCVC = generateCVC();

    execute({
      cardNumber,
      cardExpiry,
      cardCVC,
      cardType,
      cardBillingAddress,
      cardZipCode,
    });
  };
  return (
    <>
      {" "}
      <div className="icon text-neutral-500/ text-base-color/80 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
          <path
            fillRule="evenodd"
            d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="text font-semibold text-neutral-800/ text-base-color/80">
        Get a <span className="text-base-color/80 font-bold">card</span>
      </div>
      <div className="text-sm note font-medium text-balance ">
        Get a credit card for your day to day
        <br /> purchases from us
      </div>
      <Dialog>
        <DialogTrigger className="flex w-full justify-center">
          <div className="btn py-3 px-6 mt-3 text-sm font-bold flex justify-center items-center space-x-2 rounded-sm bg-base-color text-white">
            <p>Order</p>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </DialogTrigger>
        <DialogContent className="rounded-md w-[90%] transition-all">
          <div className="text-base flex items-center gap-x-2 text-neutral-700/">
            <div className="font-semibold flex items-center gap-x-2 bg-[#0013BB08] p-2 /inline rounded-sm text-base-color/90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                <path
                  fillRule="evenodd"
                  d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              <p>Get a Credit card</p>
            </div>
          </div>
          <DialogDescription className="text-sm fontme text-neutral-500">
            Get a card for day to day activity, online purchases and any payment
            related activity
          </DialogDescription>
          <div className="card-display mt-1 flex justify-between items-center">
            {cardProviders.map((_) => (
              <div
                key={_.imagePath}
                className="size-12 flex items-center justify-center"
              >
                <Image
                  alt=""
                  width={100}
                  height={100}
                  src={_.imagePath}
                  className="aspect-auto"
                />
              </div>
            ))}
          </div>

          <div className="card-select mt-4">
            <div className="tt text-neutral-600 font-medium text-sm">
              Select a provider
            </div>
            <Select onValueChange={(val) => setCardType(val)}>
              <SelectTrigger className="mt-2 font-semibold items-center">
                <SelectValue
                  className="placeholder:text-neutral-300"
                  placeholder="Select a card provider"
                />
              </SelectTrigger>
              <SelectContent>
                {cardProviders.map((_) => (
                  <SelectItem
                    key={_.initials}
                    value={_.name}
                    className="flex /w-full items-center /gap-x-2"
                  >
                    <div className="flex w-full items-center py-2 gap-x-2">
                      {" "}
                      <div className="flex items-center justify-center h-6 w-9">
                        <Image
                          src={_.imagePath}
                          height={1000}
                          width={1000}
                          alt=""
                          className="aspect-auto"
                        />
                      </div>
                      <div className="text-sm font-semibold text-neutral-600 capitalize">
                        {_.name} ({_.initials})
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="billing-address-form">
            <div className="billing-form">
              <div className="tt text-neutral-600 font-medium text-sm">
                Billing address
              </div>
              <Input
                type="text"
                value={cardBillingAddress}
                onChange={handlecardBillingAddressChange}
                className="mt-2 h/-11 placeholder:text-neutral-400"
                placeholder="Street address, city, state"
              />
            </div>
            {cardBillingAddressError && (
              <div className="bg-red-500/5 mt-3 p-2 border/ /border-red-500/20 rounded-sm text-red-500 animate__animated animate__fadeInUp animate__faster  font-medium/ text-sm">
                {cardBillingAddressError}
              </div>
            )}
          </div>
          <div className="zip-code">
            <div className="zip-code-form">
              <div className="tt text-neutral-600 font-medium text-sm">
                Zip code
              </div>
              <Input
                type="number"
                maxLength={6}
                minLength={6}
                min={6}
                value={cardZipCode}
                onChange={handlecardZipCodeChange}
                max={6}
                className="mt-2 h/-11 placeholder:text-neutral-400"
                placeholder="XXXXXX"
              />
            </div>
            {cardZipCodeError && (
              <div className="bg-red-500/5 mt-3 p-2 rounded-sm animate__animated animate__fadeInUp animate__faster text-red-500 font-medium/ text-sm">
                {cardZipCodeError}
              </div>
            )}
          </div>
          <DialogClose className="zip-code mt-2">
            <Button
              onClick={handleCreateCard}
              disabled={!isFormValid || status === "executing"}
              className="text-white bg-base-color/90 h-11 w-full"
            >
              Create card
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CreditCardDetails({
  state,
  cardInfo,
  status,
}: {
  state: {
    name: string;
    number: string;
    expiry: string;
    cvc: string;
  };
  cardInfo: { cardBillingAddress: string; cardZipCode: string };
  status: string;
}) {
  const data = Object.entries(state);
  return (
    <>
      <Dialog>
        <DialogTrigger
          disabled={status === "executing"}
          className="disabled:opacity-25"
        >
          <div className="card-details cursor-pointer rounded-md /border text-base-color/80 border-black/10 p-3 bg-base-color/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[90%]">
          <DialogTitle className="tt text-lg text-neutral-700 font-medium">
            <div className="text-base flex items-center gap-x-2 text-neutral-700/">
              <div className="font-semibold flex items-center gap-x-2 bg-[#0013BB08] p-2 /inline rounded-sm text-base-color/90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11a2.5 2.5 0 0 1 0 5h-11A2.5 2.5 0 0 1 2 4.5ZM2.75 9.083a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2.75 12.663a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2.75 16.25a.75.75 0 0 0 0 1.5h14.5a.75.75 0 1 0 0-1.5H2.75Z" />
                </svg>{" "}
                <p>Credit Information</p>
              </div>
            </div>
          </DialogTitle>
          <div className="separator w-20 h-0.5 mt-1 bg-black/10 mx-auto"></div>

          <div className="space-y-1 mt-4">
            <div className="tt billing font-medium">Billing Info</div>
            {data.map((_) => (
              <div key={_[0]}>
                {_[0] != "focus" && (
                  <div className="flex bg-/neutral-50 rounded-md py-3 px-2 items-center justify-between">
                    <div>
                      <div className="capitalize text-neutral-500 font-medium text-sm /font-semibold">
                        Card {_[0]}
                      </div>
                      <div
                        className={`${inter.className} text-neutral-600 font-medium /text-sm  f/ont-light`}
                      >
                        {_[1]}
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(_[1]);
                        toast.success(
                          `Card ${_[0].toUpperCase()} copied`.toUpperCase()
                        );
                      }}
                      className="icon cursor-pointer hover:bg-base-color/10 transition-all bg-base-color/5 hover:text-base-color/80 text-base-color/50 p-2 rounded-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="billing-address">
            <div className="tt text-neutral-500/ font-medium">
              Billing Address
            </div>
            <div>
              <div className="flex bg-/neutral-50 rounded-md py-3 px-2 items-center justify-between">
                <div>
                  <div className="capitalize text-neutral-500 font-medium text-sm /font-semibold">
                    Card Billing Address
                  </div>
                  <div
                    className={`${inter.className} text-neutral-600 font-medium /text-sm  f/ont-light`}
                  >
                    {cardInfo.cardBillingAddress}
                  </div>
                </div>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(cardInfo.cardBillingAddress);
                    toast.success(`Card Billing Address copied`.toUpperCase());
                  }}
                  className="icon cursor-pointer hover:bg-base-color/10 transition-all bg-base-color/5 hover:text-base-color/80 text-base-color/50 p-2 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <div className="flex bg-/neutral-50 rounded-md py-3 px-2 items-center justify-between">
                <div>
                  <div className="capitalize text-neutral-500 font-medium text-sm /font-semibold">
                    Card Zip Code
                  </div>
                  <div
                    className={`${inter.className} text-neutral-600 font-medium /text-sm  f/ont-light`}
                  >
                    {cardInfo.cardZipCode}
                  </div>
                </div>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(cardInfo.cardZipCode);
                    toast.success(`Card Zip Code copied`.toUpperCase());
                  }}
                  className="icon cursor-pointer hover:bg-base-color/10 transition-all bg-base-color/5 hover:text-base-color/80 text-base-color/50 p-2 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
