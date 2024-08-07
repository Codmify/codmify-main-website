import LandingSpecial from "@/components/LandingSpecial";
import { Box } from "@mui/material";
import React from "react";

export default function OurProjects() {
  return (
    <LandingSpecial
      title="Our Projects"
      subtitle="Explore our portfolio of innovative projects that showcase our expertise and creativity across various industries."
    >
      <Box bgcolor={"tomato"} height={700}></Box>
    </LandingSpecial>
  );
}
