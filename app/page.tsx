import Hero from "@/components/main/hero-section/hero-page";
import Discover from "@/components/main/discover-section/Discover";
import React from "react";
import Wcu from "@/components/main/wcu-page/Wcu";
import Savings from "@/components/main/savings-section/Savings";
import Testimonials from "@/components/main/testimonials/Testimonials";
import SupportContact from "@/components/main/support-contact/Support";
import CardPage from "@/components/main/card-sect/CardPage";
import ReasonPage from "@/components/main/Reason-page/ReasonPage";
import Footer from "@/components/main/Footer/Footer";
import Category from "@/components/main/bank_cat/Category";

export default function page() {
  return (
    <div className=" ">
      <Hero />
      <Discover />
      <Wcu />
      <Savings />
      <Category />
      <ReasonPage />
      <CardPage />
      <Testimonials />
      <SupportContact />
      <Footer />
    </div>
  );
}
