"use client";
import { useColors } from "@/context/colorContext";
import React from "react";
import LottieLoader from "./LottieLoader";
import CountUp from "react-countup";

export default function Wcu() {
  type wcuType = {
    number: number;
    description: string;
    plus: string;
    classname: string;
  }[];
  type wcuCardType = {
    name: string;
    desc: string;
    classname: string;
    icon: any;
  }[];
  const wcuCardData: wcuCardType = [
    {
      name: "Checkings",
      desc: "Effortlessly manage your finances with our checking feature. Enjoy online access, mobile banking amd peace of mind all in one place",
      classname: "bg-purple-700/10 text-purple-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Savings",
      desc: "Easily grow your savings with our savings account. Enjoy online access, mobile banking and peace of mind all tailored to your needs",
      classname: "bg-purple-700/10 text-purple-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Credit cards",
      classname: "bg-orange-700/10 text-orange-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      desc: "Maximize your spending power with our credit cards. Enjoy convience, security and rewards all in one swipe",
    },
    {
      name: "Mortgages",
      desc: "Unlock your dream home with our mortgage solutions. Flexible options, expert guidance and peace of mind every step of the way",
      classname: "bg-blue-700/10 text-blue-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M14.916 2.404a.75.75 0 0 1-.32 1.011l-.596.31V17a1 1 0 0 1-1 1h-2.26a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5H2V9.957a.75.75 0 0 1-.596-1.372L2 8.275V5.75a.75.75 0 0 1 1.5 0v1.745l10.404-5.41a.75.75 0 0 1 1.012.319ZM15.861 8.57a.75.75 0 0 1 .736-.025l1.999 1.04A.75.75 0 0 1 18 10.957V16.5h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75V9.21a.75.75 0 0 1 .361-.64Z" />
        </svg>
      ),
    },
    {
      name: "Autos",
      desc: "Hit the road with confidence. Ou auto loans offer competitive rates, flexible terms and streamlined approval so you can drive away happy",
      classname: "bg-red-700/10 text-red-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M4.606 12.97a.75.75 0 0 1-.134 1.051 2.494 2.494 0 0 0-.93 2.437 2.494 2.494 0 0 0 2.437-.93.75.75 0 1 1 1.186.918 3.995 3.995 0 0 1-4.482 1.332.75.75 0 0 1-.461-.461 3.994 3.994 0 0 1 1.332-4.482.75.75 0 0 1 1.052.134Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M5.752 12A13.07 13.07 0 0 0 8 14.248v4.002c0 .414.336.75.75.75a5 5 0 0 0 4.797-6.414 12.984 12.984 0 0 0 5.45-10.848.75.75 0 0 0-.735-.735 12.984 12.984 0 0 0-10.849 5.45A5 5 0 0 0 1 11.25c.001.414.337.75.751.75h4.002ZM13 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Business",
      desc: "Power your business forward with Wilson Investment Bank & Co. Tailored solutions, expert guidance and dedicated support so you can focus on what matters",
      classname: "bg-black/5 text-black/80",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
        </svg>
      ),
    },
    {
      name: "Sports & Entertainment",
      desc: "Elevate your game with our sports and entertainment solutions. From athlete management to event planning, we’ve got you covered with tailored services and industry expertise",
      classname: "bg-cyan-700/10 text-cyan-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M12 1.69a.494.494 0 0 0-.438-.494 32.352 32.352 0 0 0-7.124 0A.494.494 0 0 0 4 1.689v.567c-.811.104-1.612.24-2.403.406a.75.75 0 0 0-.595.714 4.5 4.5 0 0 0 4.35 4.622A3.99 3.99 0 0 0 7 8.874V10H6a1 1 0 0 0-1 1v2h-.667C3.597 13 3 13.597 3 14.333c0 .368.298.667.667.667h8.666a.667.667 0 0 0 .667-.667c0-.736-.597-1.333-1.333-1.333H11v-2a1 1 0 0 0-1-1H9V8.874a3.99 3.99 0 0 0 1.649-.876 4.5 4.5 0 0 0 4.35-4.622.75.75 0 0 0-.596-.714A30.897 30.897 0 0 0 12 2.256v-.567ZM4 3.768c-.49.066-.976.145-1.458.235a3.004 3.004 0 0 0 1.64 2.192A3.999 3.999 0 0 1 4 5V3.769Zm8 0c.49.066.976.145 1.458.235a3.004 3.004 0 0 1-1.64 2.192C11.936 5.818 12 5.416 12 5V3.769Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Travel",
      desc: "Embark on unforgettable journeys with oyr travel services. From booking flights to planning adventures, we’re here to make your travel dreams a reality seamlessly and stress-free",
      classname: "bg-green-700/10 text-green-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-6.5 6.326a6.52 6.52 0 0 1-1.5.174 6.487 6.487 0 0 1-5.011-2.36l.49-.98a.423.423 0 0 1 .614-.164l.294.196a.992.992 0 0 0 1.491-1.139l-.197-.593a.252.252 0 0 1 .126-.304l1.973-.987a.938.938 0 0 0 .361-1.359.375.375 0 0 1 .239-.576l.125-.025A2.421 2.421 0 0 0 12.327 6.6l.05-.149a1 1 0 0 0-.242-1.023l-1.489-1.489a.5.5 0 0 1-.146-.353v-.067a6.5 6.5 0 0 1 5.392 9.23 1.398 1.398 0 0 0-.68-.244l-.566-.566a1.5 1.5 0 0 0-1.06-.439h-.172a1.5 1.5 0 0 0-1.06.44l-.593.592a.501.501 0 0 1-.13.093l-1.578.79a1 1 0 0 0-.553.894v.191a1 1 0 0 0 1 1h.5a.5.5 0 0 1 .5.5v.326Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];
  const wcu: wcuType = [
    {
      description: "Years of Experience",
      plus: "Y+",
      number: 4,
      classname: "",
    },
    {
      description: "Active Customers",
      plus: "+",
      number: 2000,
      classname: "",
    },
    {
      description: "Monthly Volume",
      plus: "M",
      number: 10,
      classname: "",
    },
    {
      description: "Trust Pilot",
      plus: "",
      number: 4.6,
      classname: "",
    },
  ];
  const colors = useColors();
  return (
    <div className="wcu_cont mt-14 md:px-20 px-10">
      <div className="text-lottie-cont md:text-center">
        <div className="text-cont">
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
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2 2.75A.75.75 0 0 1 2.75 2h9.5a.75.75 0 0 1 0 1.5h-9.5A.75.75 0 0 1 2 2.75ZM2 6.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 2 6.25Zm0 3.5A.75.75 0 0 1 2.75 9h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 2 9.75ZM9.22 9.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V8.56l-.97.97a.75.75 0 0 1-1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>

              <p>Features</p>
            </div>
          </div>
          <div className="large-text text-2xl font-bold text-neutral-800">
            Best Features provided by us.
          </div>
          <div className="smaller-text text-neutral-600 text-sm font-medium mt-2 text-balance">
            From savings to checking accounts to mortgages and lots more.{" "}
            <br className="hidden md:block" />
            We offer a vast range of financial products to meet your individual
            needs.
          </div>
        </div>
      </div>
      <div className="grid-data-cont grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-2 w-full">
          <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 lg:gap-y-6 lg:justify-around gap-x-2 md:justify-center md:item-center">
            {" "}
            <LottieLoader />
            {wcu.map((data) => (
              <div key={data.number} className="my-6">
                <div className="number text-neutral-800 font-bold">
                  <CountUp
                    end={data.number}
                    duration={5}
                    decimals={data.description === "Trust Pilot" ? 1 : 0}
                  />
                  {data.plus}
                </div>
                <div className="desc text-[10px] text-neutral-600 text-wrap">
                  {data.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-10">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-3 mt-5">
            {wcuCardData.map((data) => (
              <div key={data.desc}>
                <div className="card /shadow-[0px_5px_10px_1px_#33333308] /border /border-blue-500/10 rounded-xl py-4 px-4 md:px-6">
                  <div
                    className={`icon rounded-xl p-1 h-10 w-10 flex items-center justify-center  ${data.classname}`}
                  >
                    {data.icon}
                  </div>
                  <div className="name font-bold mt-2 /text-lg text-neutral-700">
                    {data.name}
                  </div>
                  <div className="desc mt-2 font-medium text-sm text-neutral-500 text-balance">
                    {data.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
