"use client";
import React from "react";
import { useColors } from "@/context/colorContext";
import { randomUUID } from "crypto";
import { usePathname } from "next/navigation";
import hero from "@/public/assets/hero-logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const MotionLink = motion(Link);

  type navItems = { id: number; name: string; path: string }[];
  const pathname = usePathname();
  const nav: navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Contacts", path: "/contact" },
  ];
  const colors = useColors();
  return (
    <div
      className="nav_cont z-50 fixed top-0 w-full md:py-4 py-6 px-10 flex items-center text-sm justify-between"
      style={{ background: colors.defaultblue }}
    >
      <div className="logo text-white font-bold">
        <Image
          src={hero}
          alt=""
          width={1000}
          height={1000}
          className="w-16 h-6"
        />
      </div>
      <div className="menu  hidden md:flex text-sm items-center">
        <AnimatePresence>
          {nav.map((nav) => (
            <motion.div
              key={nav.path}
              className={`${
                nav.path === pathname
                  ? `font-bold text-[#fff]   rounded-xl`
                  : "text-white/80 font-medium  hover:opacity-100"
              } cursor-pointer /overflow-hidden px-5 py-2 relative transition`}
            >
              <MotionLink href={nav.path}>
                <motion.p className="z-30">{nav.name}</motion.p>
                {nav.path === pathname ? (
                  <motion.div
                    transition={{ type: "spring" }}
                    layoutId="underline"
                    className="absolute mover bg-[#ffffff26] rounded-full top-0 left-0 w-full h-full z-10"
                  ></motion.div>
                ) : null}
              </MotionLink>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="cta hidden md:flex  items-center gap-5">
        <div className=" font-bold text-white  cursor-pointer hover:opacity-90 transition-all">
          Sign-in
        </div>
        <div
          className=" px-5 py-3 rounded-full font-bold text-white cursor-pointer hover:opacity-90 transition-all"
          style={{ background: colors.darkdefualtblue }}
        >
          Get Started
        </div>
      </div>
      <div className="sidemenu md:hidden">
        <Sheet>
          <SheetTrigger>
            <div className="icon text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </SheetTrigger>{" "}
          <SheetContent
            className="border-none /relative text-white w-[80%]"
            side={"left"}
            style={{ background: colors.defaultblue }}
          >
            {" "}
            <SheetHeader>
              {" "}
              <div className="logo flex justify-center text-white font-bold">
                <Image
                  src={hero}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-16 h-6"
                />{" "}
              </div>{" "}
            </SheetHeader>
            <div className="mt-20">
              <p className="uppercase font-bold mb-5 text-white/80 /text-sm">
                MENU
              </p>
              <AnimatePresence>
                {nav.map((nav) => (
                  <motion.div
                    key={nav.path}
                    className={`${
                      nav.path === pathname
                        ? `font-bold text-[#fff] rounded-xl`
                        : "text-white font-bold opacity-70 hover:opacity-100"
                    } cursor-pointer /overflow-hidden text-sm  px-5 py-4 relative transition`}
                  >
                    <MotionLink href={nav.path}>
                      <motion.p className="z-30">{nav.name}</motion.p>
                      {nav.path === pathname ? (
                        <motion.div
                          transition={{ type: "spring" }}
                          layoutId="underline"
                          className="absolute mover bg-[#ffffff26] rounded-xl top-0 left-0 w-full h-full z-10"
                        ></motion.div>
                      ) : null}
                    </MotionLink>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="cta absolute bottom-4 text-sm left-0 w-full px-5 text-center">
              <p className=" line h-0.5 w-[20%] bg-white/30 rounded-full mx-auto mb-4"></p>
              <div className=" px-5 py-3 rounded-xl  font-semibold bg-white/10 text-white cursor-pointer hover:opacity-90 transition-all">
                Sign-in
              </div>
              <div
                className="mt-2 px-5 py-3 rounded-xl font-semibold text-white cursor-pointer hover:opacity-90 transition-all"
                style={{ background: colors.darkdefualtblue }}
              >
                Get Started
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
