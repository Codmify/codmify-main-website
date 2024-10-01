"use client";

import Confetti from "@/components/Confetti";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AnimatedModal from "@/components/Welcome";
import WhatsappChat from "@/components/Whatsapp";
import { Box } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";

export default function LandingPage({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("welcome")) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  return (
    <Box position={"relative"} sx={{ width: "100%" }}>
      <Navbar />
      <Box component={"main"} minHeight={"90dvh"}>
        {children}
      </Box>
      <Confetti />
      <AnimatedModal
        isOpen={show}
        onClose={() => {
          sessionStorage.getItem("welcome");
          setShow(!show);
        }}
      />
      <WhatsappChat />
      <Footer />
    </Box>
  );
}
