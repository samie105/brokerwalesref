"use client";
import Image from "next/image";
import React from "react";
import hero from "@/public/assets/hero-logo-blue.png";
import { useColors } from "@/context/colorContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Switch } from "../ui/switch";

type navItems = {
  id: number;
  name: string;
  path: string;
  icon: any;
}[];
export default function SideBar() {
  const colors = useColors();
  const MotionLink = motion(Link);
  const pathname = usePathname();

  const nav: navItems = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M2.75 9a.75.75 0 0 1 .75.75v1.69l2.22-2.22a.75.75 0 0 1 1.06 1.06L4.56 12.5h1.69a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-3.5A.75.75 0 0 1 2.75 9ZM2.75 7a.75.75 0 0 0 .75-.75V4.56l2.22 2.22a.75.75 0 0 0 1.06-1.06L4.56 3.5h1.69a.75.75 0 0 0 0-1.5h-3.5a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75ZM13.25 9a.75.75 0 0 0-.75.75v1.69l-2.22-2.22a.75.75 0 1 0-1.06 1.06l2.22 2.22H9.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75ZM13.25 7a.75.75 0 0 1-.75-.75V4.56l-2.22 2.22a.75.75 0 1 1-1.06-1.06l2.22-2.22H9.75a.75.75 0 0 1 0-1.5h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Deposit",
      path: "/dashboard/deposit",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M4.5 13a3.5 3.5 0 0 1-1.41-6.705A3.5 3.5 0 0 1 9.72 4.124a2.5 2.5 0 0 1 3.197 3.018A3.001 3.001 0 0 1 12 13H4.5Zm.72-5.03a.75.75 0 0 0 1.06 1.06l.97-.97v2.69a.75.75 0 0 0 1.5 0V8.06l.97.97a.75.75 0 1 0 1.06-1.06L8.53 5.72a.75.75 0 0 0-1.06 0L5.22 7.97Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Fixed",
      path: "/fixed",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M7.628 1.349a.75.75 0 0 1 .744 0l1.247.712a.75.75 0 1 1-.744 1.303L8 2.864l-.875.5a.75.75 0 0 1-.744-1.303l1.247-.712ZM4.65 3.914a.75.75 0 0 1-.279 1.023L4.262 5l.11.063a.75.75 0 0 1-.744 1.302l-.13-.073A.75.75 0 0 1 2 6.25V5a.75.75 0 0 1 .378-.651l1.25-.714a.75.75 0 0 1 1.023.279Zm6.698 0a.75.75 0 0 1 1.023-.28l1.25.715A.75.75 0 0 1 14 5v1.25a.75.75 0 0 1-1.499.042l-.129.073a.75.75 0 0 1-.744-1.302l.11-.063-.11-.063a.75.75 0 0 1-.28-1.023ZM6.102 6.915a.75.75 0 0 1 1.023-.279l.875.5.875-.5a.75.75 0 0 1 .744 1.303l-.869.496v.815a.75.75 0 0 1-1.5 0v-.815l-.869-.496a.75.75 0 0 1-.28-1.024ZM2.75 9a.75.75 0 0 1 .75.75v.815l.872.498a.75.75 0 0 1-.744 1.303l-1.25-.715A.75.75 0 0 1 2 11V9.75A.75.75 0 0 1 2.75 9Zm10.5 0a.75.75 0 0 1 .75.75V11a.75.75 0 0 1-.378.651l-1.25.715a.75.75 0 0 1-.744-1.303l.872-.498V9.75a.75.75 0 0 1 .75-.75Zm-4.501 3.708.126-.072a.75.75 0 0 1 .744 1.303l-1.247.712a.75.75 0 0 1-.744 0L6.38 13.94a.75.75 0 0 1 .744-1.303l.126.072a.75.75 0 0 1 1.498 0Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Transfer",
      path: "/transfer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path d="M8.75 6h-1.5V3.56L6.03 4.78a.75.75 0 0 1-1.06-1.06l2.5-2.5a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 1 1-1.06 1.06L8.75 3.56V6H11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.25v5.25a.75.75 0 0 0 1.5 0V6Z" />
        </svg>
      ),
    },
    {
      id: 5,
      name: "Settings",
      path: "/settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path d="M6.5 2.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0V4.5h6.75a.75.75 0 0 0 0-1.5H6.5v-.75ZM11 6.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-.75h2.25a.75.75 0 0 0 0-1.5H11V6.5ZM5.75 10a.75.75 0 0 1 .75.75v.75h6.75a.75.75 0 0 1 0 1.5H6.5v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM2.75 7.25H8.5v1.5H2.75a.75.75 0 0 1 0-1.5ZM4 3H2.75a.75.75 0 0 0 0 1.5H4V3ZM2.75 11.5H4V13H2.75a.75.75 0 0 1 0-1.5Z" />
        </svg>
      ),
    },
    {
      id: 6,
      name: "Support",
      path: "/support",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M1 8.74c0 .983.713 1.825 1.69 1.943.904.108 1.817.19 2.737.243.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556.92-.053 1.833-.134 2.738-.243.976-.118 1.689-.96 1.689-1.942V4.259c0-.982-.713-1.824-1.69-1.942a44.45 44.45 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482Zm3-3.49a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 5.25ZM4.75 7a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="w-full h-screen overflow-scroll flex flex-col gap-y-2 /items-center j/ustify-center">
      <div className="side-bar-cont bg-white w-full  rounded-md p-4">
        <div className="">
          {" "}
          <Image
            src={hero}
            alt=""
            width={1000}
            height={1000}
            className="w-14 h-5 opacity-80"
            style={{ color: colors.defaultblue }}
          />
        </div>
        <div className="space-y-3 mt-8">
          <p className="font-semibold uppercase text-neutral-700 text-xs">
            {" "}
            menu
          </p>
          <AnimatePresence>
            {nav.map((nav) => (
              <MotionLink
                href={nav.path}
                key={nav.path}
                // style={
                //   nav.path === pathname
                //     ? { color: colors.defaultblue }
                //     : { display: "block" }
                // }
                className={`${
                  nav.path === pathname
                    ? `text-base-color/70  font-semibold rounded-md`
                    : " text-neutral-700/80 font-medium hover:bg-gray-100  hover:opacity-100"
                } cursor-pointer block /overflow-hidden rounded-md text-sm px-3 py-3 relative transition`}
              >
                <motion.div>
                  <motion.div className="z-30 flex items-center gap-x-2">
                    {nav.icon}
                    <p>{nav.name}</p>
                  </motion.div>
                  {nav.path === pathname ? (
                    <motion.div
                      transition={{ type: "tween" }}
                      style={{ backgroundColor: colors.defaultblue + "09" }}
                      layoutId="underline"
                      className="absolute  mover bg-[#ffffff26] rounded-md top-0 left-0 w-full h-full z-10 "
                    ></motion.div>
                  ) : null}
                </motion.div>
              </MotionLink>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="bg-white w-full h-auto rounded-lg p-4">
        <p className="font-semibold uppercase text-neutral-700 text-xs">
          {" "}
          quick controls
        </p>
        <div
          style={{ background: colors.defaultblue + "09" }}
          className="darkmode  flex py-4 px-2 rounded-md mt-2 justify-between items-center"
        >
          <div className="flex items-center gap-x-2 text-neutral-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
                clipRule="evenodd"
              />
            </svg>

            <p className="  text-sm font-medium">Notifications</p>
          </div>{" "}
          <Switch className="h-4 w-7" />
        </div>
        <div
          style={{ background: colors.defaultblue + "09" }}
          className="darkmode  flex py-4 px-2 rounded-md mt-2 justify-between items-center"
        >
          <div className="flex items-center gap-x-2 text-neutral-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
            </svg>

            <p className="  text-sm font-medium">Dark mode</p>
          </div>{" "}
          <Switch className="h-4 w-7" />
        </div>
      </div>
    </div>
  );
}
