import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

export default function LandingPage({ children }: { children: ReactNode }) {
  return (
    <Box position={"relative"}>
      <Navbar />
      <Box minHeight={"90dvh"}>{children}</Box>
      <Footer />
    </Box>
  );
}
