import LandingSpecial from "@/components/LandingSpecial";
import PolicyLayout from "@/components/PolicyLayout";
import { termsAndConditions } from "@/constants/policies";
import { Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read Codmify Hub's Terms and Conditions for agency services and proprietary platforms. Understand your rights and obligations when using our services.",
};

export default function TermsAndConditions() {
  return (
    <LandingSpecial
      title="Terms and Conditions"
      subtitle="By accessing our website, engaging our agency services, or using any of our proprietary platforms, you agree to be bound by these Terms and Conditions."
    >
      <Typography variant="body2" color="text.secondary" mb={2}>
        Last Updated: January 26, 2026
      </Typography>
      <PolicyLayout sections={termsAndConditions} />
    </LandingSpecial>
  );
}
