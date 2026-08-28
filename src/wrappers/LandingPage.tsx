"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsappChat from "@/components/Whatsapp";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

export default function LandingPage({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%"
      }}>
      <Navbar />
      <Box component={"main"} sx={{
        minHeight: "90dvh"
      }}>
        {children}
      </Box>
      <ScrollToTop />
      <WhatsappChat />
      <Footer />
    </Box>
  );
}
