"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    smartsupp: any;
    _smartsupp: any;
  }
}

export default function LiveSupport() {
  // useEffect(() => {
  //   window._smartsupp = window._smartsupp || {};
  //   window._smartsupp.key = "6ee0bd2232ffd2436b089aaec1b5cb7e59a0b5fc";
  //   window.smartsupp =
  //     window.smartsupp ||
  //     function () {
  //       (window.smartsupp._ = window.smartsupp._ || []).push(arguments);
  //     };
  //   window.smartsupp._ = window.smartsupp._ || [];

  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.async = true;
  //   script.src = "https://www.smartsuppchat.com/loader.js?";
  //   document.head.appendChild(script);

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  return <Script src="http://code.jivosite.com/widget/5LyZp2781C" strategy="afterInteractive"></Script>;
}
