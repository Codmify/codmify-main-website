"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsappChat from "@/components/Whatsapp";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

export default function LandingPage({ children }: { children: ReactNode }) {
  return (
    <Box position={"relative"} sx={{ width: "100%" }}>
      <Navbar />
      <Box component={"main"} minHeight={"90dvh"}>
        {children}
      </Box>
      <WhatsappChat />
      <Footer />
    </Box>
  );
}
