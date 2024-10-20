"use client";

import React from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const LiveSupport: React.FC = () => {
  const pathname = usePathname();

  const allowedPaths = ["/", "/dashboard/support"];

  if (!allowedPaths.includes(pathname)) {
    return null;
  }

  return (
    <Script src="//code.jivosite.com/widget/BUNsrHweAc" strategy="lazyOnload" />
  );
};

export default LiveSupport;
