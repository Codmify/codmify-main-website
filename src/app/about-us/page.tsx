import FAQ from "@/components/FAQ";
import OurTeam from "@/components/our-team";
import LandingPage from "@/wrappers/LandingPage";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = { title: "About Us" };

export default function AboutUs() {
  return (
    <LandingPage>
      <Box
        sx={{
          pt: { xs: 28, md: 19 },
          pb: { xs: 8, md: 11 },
          background: "#121279 url('/bg-dashed.png')",
          color: "white"
        }}><Container maxWidth="lg"><Stack
        spacing={2.5}
        sx={{
          maxWidth: 790,
          alignItems: "center",
          textAlign: "center",
          mx: "auto"
        }}><Typography
        sx={{
          color: "#51C4FF",
          fontWeight: 700,
          letterSpacing: 1.2
        }}>ABOUT CODMIFY</Typography><Typography
        component="h1"
        sx={{
          fontSize: { xs: 39, md: 62 },
          lineHeight: 1.05,
          fontWeight: 700
        }}>We build digital experiences that help businesses move forward.</Typography><Typography
        sx={{
          fontSize: { xs: 17, md: 19 },
          color: "rgba(255,255,255,.82)",
          maxWidth: 650
        }}>A thoughtful mix of strategy, design and technology—made practical for ambitious teams.</Typography></Stack></Container></Box>
      <Content />
      <OurTeam />
      <FAQ />
    </LandingPage>
  );
}
