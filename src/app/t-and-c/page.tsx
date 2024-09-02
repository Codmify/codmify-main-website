/* eslint-disable react/no-unescaped-entities */
import LandingSpecial from "@/components/LandingSpecial";
import { Typography } from "@mui/material";
import React from "react";
import Conditions from "./conditions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function AboutUs() {
  return (
    <LandingSpecial
      title="Terms and Condition"
      subtitle="Get in touch with us for collaborations, inquiries, or to learn more about our services. We're here to assist you!"
    >
      <Typography>
        These Terms and Conditions ("Terms") govern your use of the FIC Hub
        website (the "Website") and any software solutions, products, or
        services provided by FIC Hub ("FIC Hub," "we," or "us"). By accessing or
        using the Website or any software solutions provided by FIC Hub, you
        agree to be bound by these Terms. If you do not agree with these Terms,
        please do not use our Website or services.
      </Typography>
      <Conditions />
    </LandingSpecial>
  );
}
