import FAQ from "@/components/FAQ";
import LandingSpecial from "@/components/LandingSpecial";
import React from "react";
import Content from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutUs() {
  return (
    <>
      <LandingSpecial
        title="About Us"
        subtitle="Discover who we are, our mission, and the values that drive us. Learn about our journey and what sets us apart."
      >
        <Content />
      </LandingSpecial>
      <FAQ />
    </>
  );
}
