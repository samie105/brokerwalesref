"use client";
import { useColors } from "@/context/colorContext";
import Image from "next/image";
import Link from "next/link";

export default function Flight() {
  const colors = useColors();
  return (
    <section
      className=" py-12 md:px-28 px-5  md:py-24 lg:py-32 w-full h-full relative overflow-hidden"
      style={{ background: colors.defaultblue + "10" }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-fixed bg-repeat z-10 /opacity-10">
        <Image
          src="/assets/flight.svg"
          alt=""
          width={1000}
          height={1000}
          className="h-full/ w-full /opacity-5  parallax-image  /object-cover"
        />
      </div>
      <div className="/container grid items-center gap-6 /py-6 z-30 /px-4 bg-white rounded-lg overflow-hidden lg:pl-6 lg:grid-cols-2 /lg:gap-10 shadow-md">
        <div className="space-y-4 md:py-12 py-5 z-40 px-7 md:px-0">
          <div
            className=" rounded-lg inline-flex items-center gap-x-2  bg-gray-100 px-3 py-2 text-sm dark:bg-gray-800"
            style={{
              color: colors.defaultblue,
              background: colors.defaultblue + "10",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path d="M14 6H6v8h8V6Z" />
              <path
                fillRule="evenodd"
                d="M9.25 3V1.75a.75.75 0 0 1 1.5 0V3h1.5V1.75a.75.75 0 0 1 1.5 0V3h.5A2.75 2.75 0 0 1 17 5.75v.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v.5A2.75 2.75 0 0 1 14.25 17h-.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-.5A2.75 2.75 0 0 1 3 14.25v-.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-.5A2.75 2.75 0 0 1 5.75 3h.5V1.75a.75.75 0 0 1 1.5 0V3h1.5ZM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">Flight Booking</p>
          </div>
          <h2 className="text-3xl font-bold">
            Pay for flights with your bank account
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-sm/relaxed lg:text-sm/relaxed xl:text-sm/relaxed dark:text-gray-400">
            Secure your flight reservations directly via the Wilson Bank
            platform and conveniently settle payments using your bank account.
            This streamlined process eliminates the need for credit cards or
            external payment services, ensuring a smoother transaction
            experience.
          </p>
          <div className="flex">
            {" "}
            <Link
              href="#"
              style={{ background: colors.defaultblue }}
              className="flex h-12 items-center justify-center gap-x-2 mt-8 rounded-md px-8 text-sm /font-medium font-bold text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              <p>Book a Flight</p>{" "}
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
            </Link>
          </div>
        </div>
        <Image
          src="/assets/flight.jpg"
          width="1000"
          height="1000"
          alt="Flight booking"
          className="mx-auto aspect-video overflow-hidden h-full w-full object-cover object-center sm:w-full z-20"
        />
      </div>
    </section>
  );
}
