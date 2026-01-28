import LandingSpecial from "@/components/LandingSpecial";
import PolicyLayout from "@/components/PolicyLayout";
import { refundPolicy } from "@/constants/policies";
import { Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Understand Codmify Hub's refund policy for agency services and digital products. Learn about deposits, cancellations, and refund eligibility.",
};

export default function RefundPolicy() {
  return (
    <LandingSpecial
      title="Refund Policy"
      subtitle="Learn about our refund policy for agency services, digital products, and marketplace transactions."
    >
      <Typography variant="body2" color="text.secondary" mb={2}>
        Last Updated: January 26, 2026
      </Typography>
      <PolicyLayout sections={refundPolicy} />
    </LandingSpecial>
  );
}
