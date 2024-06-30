"use client";
import React, { useState, useEffect } from "react";
import { useColors } from "@/context/colorContext";

export default function BTT() {
  const colors = useColors();
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    // Show button when the user scrolls beyond 100 pixels
    if (window.pageYOffset > 150) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-10 left-10 rounded-full z-50 ${
        showButton ? "" : "hidden"
      }`}
      style={{ background: colors.defaultblue }}
    >
      <div className="rounded-full cursor-pointer bg-blue-700/5 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 text-white"
        >
          <path
            fillRule="evenodd"
            d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
