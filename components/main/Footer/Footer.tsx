"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import hero from "@/public/assets/hero-logo.png";
import { useColors } from "@/context/colorContext";

export default function Footer() {
  const colors = useColors();
  return (
    <footer className="bg-[#02062d] text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start">
          <Image
            src={hero}
            alt=""
            width={1000}
            height={1000}
            className="w-16 h-6"
          />
        </div>
        <div className="grid gap-2">
          <h4 className="text- font-semibold">Lending</h4>
          <div className="grid gap-1">
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              Small Businesses
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              Start ups
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              Enterprises
            </Link>
          </div>
        </div>
        <div className="grid gap-2">
          <h4 className="text- font-semibold">About</h4>
          <div className="grid gap-1">
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              Our Story
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              Careers
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              News
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              Investors
            </Link>
          </div>
        </div>
        <div className="grid gap-2">
          <h4 className="text- font-semibold">Resources</h4>
          <div className="grid gap-1">
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              Accessibility
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              Legal
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white text-sm"
              prefetch={false}
            >
              Help Center
            </Link>
            {/* <Link
              href="#"
              className="text-gray-300 hover:text-white flex justify-center items-center gap-2"
              prefetch={false}
            >
              Help Center
              <ArrowRightIcon className="w-4 h-4" />
            </Link> */}
          </div>
        </div>
        <div className="grid gap-4 w-full">
          <h4 className="text-lg font-semibold">Newsletter</h4>
          <p className="text-gray-400 text-sm">
            Subscribe to our newsletter to stay up-to-date with the latest news
            and updates.
          </p>
          <form className="flex space-x-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 /border-gray-700 text-white border-0"
            />
            <Button type="submit" style={{ background: colors.defaultblue }}>
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
        &copy; 2024 Bank Inc. All rights reserved.
      </div>
    </footer>
  );
}

// function ArrowRightIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M5 12h14" />
//       <path d="m12 5 7 7-7 7" />
//     </svg>
//   );
// }
