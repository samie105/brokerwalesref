/* eslint-disable react/no-unescaped-entities */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cGGo0SUXo4U
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from "next/image";
import Link from "next/link";

export default function Category() {
  return (
    <section className="w-full py-6">
      <div className="container px-4 md:px-20">
        <div className="space-y-8">
          {/* <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tighter ">
              Tailored Solutions for Businesses of All Sizes
            </h2>
            <p className="mx-auto max-w-[700px] mt-2 text-balance text-sm text-gray-500  dark:text-gray-400">
              Whether you're a small startup or a large enterprise, our banking
              services are designed to meet your unique needs and help your
              business thrive.
            </p>
          </div> */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg overflow-hidden /border /border-gray-200 bg-white /p-6 shadow-md shadow-gray-200 dark:border-gray-800 dark:bg-gray-950">
              <div className="space-y-4">
                {" "}
                <Image
                  src={"/assets/smallbusinesses.png"}
                  width={400}
                  height={250}
                  alt="Small Business"
                  className="rounded-lg/ object-cover h-60 overflow-hidden w-full"
                />{" "}
                <div className="inline-block rounded-lg bg-blue-50 mx-6 text-blue-500 font-medium px-3 py-1 text-xs dark:bg-gray-800">
                  <BriefcaseIcon className="w-4 h-4 mr-2 inline-block " />
                  Small Businesses
                </div>
                <h3 className="text- font-bold px-6">
                  Tailored for Your Growth
                </h3>
                <p className="text-gray-500 text-sm font-medium dark:text-gray-400 px-6 pb-4">
                  Our specialized banking services are designed to support small
                  businesses like yours, helping you manage your finances and
                  achieve your goals.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden /border /border-gray-200 bg-white /p-6 shadow-md shadow-gray-200 dark:border-gray-800 dark:bg-gray-950">
              <div className="space-y-4">
                <Image
                  src={"/assets/bigbusinesses.png"}
                  width={400}
                  height={300}
                  alt="Large Enterprise"
                  className="rou/nded-lg object-cover w-full h-60 overflow-hidden"
                />{" "}
                <div className="inline-block rounded-lg font-medium mx-6 text-green-500 bg-green-50 px-3 py-1 text-xs dark:bg-gray-800">
                  <BuildingIcon className="w-4 h-4 mr-2 inline-block text-sm" />
                  Large Enterprises
                </div>{" "}
                <h3 className="text- font-bold px-6">Powering Your Growth</h3>
                <p className="text-gray-500 text-sm font-medium dark:text-gray-400 px-6 pb-4">
                  Our comprehensive banking solutions are tailored to meet the
                  complex needs of large enterprises, helping you manage your
                  finances and drive your business forward.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden /border /border-gray-200 bg-white shadow-md shadow-gray-200 dark:border-gray-800 dark:bg-gray-950">
              <div className="space-y-4">
                <Image
                  src={"/assets/sstartups.png"}
                  width={1000}
                  height={1000}
                  alt="Startup"
                  className=" object-cover w-full h-60 overflow-hidden"
                />{" "}
                <div className="inline-block rounded-full mx-6 font-medium bg-red-50 text-red-500 px-3 py-1 text-xs dark:bg-gray-800">
                  <RocketIcon className="w-4 h-4 mr-2 inline-block text-sm" />
                  Startups
                </div>{" "}
                <h3 className="text font-bold px-6">Fueling Your Innovation</h3>
                <p className="text-gray-500 text-sm font-medium dark:text-gray-400 px-6 pb-4">
                  Our specialized banking services are designed to support
                  startups like yours, providing the financial tools and
                  expertise you need to turn your ideas into reality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function BriefcaseIcon(props: any) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function BuildingIcon(props: any) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function RocketIcon(props: any) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
