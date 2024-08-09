import LandingSpecial from "@/components/LandingSpecial";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Content from "./content";

export default function AboutUs() {
  return (
    <LandingSpecial
      title="About Us"
      subtitle="Discover who we are, our mission, and the values that drive us. Learn about our journey and what sets us apart."
    >
      <Content />
    </LandingSpecial>
  );
}
