import LandingSpecial from "@/components/LandingSpecial";
import PolicyLayout from "@/components/PolicyLayout";
import { privacyPolicy } from "@/constants/policies";
import { Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Codmify Hub collects, uses, and protects your personal information. Read our comprehensive privacy policy for agency clients and platform users.",
};

export default function PrivacyPolicy() {
  return (
    <LandingSpecial
      title="Privacy Policy"
      subtitle="We respect your privacy and are committed to protecting your personal data. Learn how we collect, use, and safeguard your information."
    >
      <Typography variant="body2" color="text.secondary" mb={2}>
        Last Updated: January 26, 2026
      </Typography>
      <PolicyLayout sections={privacyPolicy} />
    </LandingSpecial>
  );
}
