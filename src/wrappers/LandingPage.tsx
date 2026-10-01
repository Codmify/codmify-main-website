"use client";

import { useAnniversary } from "@/components/Anniversary";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsappChat from "@/components/Whatsapp";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

export default function LandingPage({ children }: { children: ReactNode }) {
  const anniversary = useAnniversary();
  return (
    <Box className={anniversary ? "anniversary-active" : undefined}
      sx={{
        position: "relative",
        width: "100%"
      }}>
      <Navbar />
      <Box component={"main"} sx={{
        minHeight: "90dvh",
        pt: anniversary ? { xs: "48px", sm: "40px" } : 0
      }}>
        {children}
      </Box>
      <ScrollToTop />
      <WhatsappChat />
      <Footer />
    </Box>
  );
}
