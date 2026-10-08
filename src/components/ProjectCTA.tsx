"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import BrandBackdrop from "./BrandBackdrop";
import Reveal from "./motion/Reveal";

export default function ProjectCTA() {
  return (
    <Box component="section" aria-labelledby="project-cta-title" sx={{ py: { xs: 7, md: 10 }, bgcolor: "#EDF2F7" }}>
      <Container maxWidth="lg">
        <Box className="brand-section" sx={{
          borderRadius: "24px", bgcolor: "primary.main", color: "white",
          backgroundImage: "linear-gradient(120deg, #121279 25%, #172B87 70%, #075E98 100%)",
          p: { xs: 3, sm: 5, md: 8 },
          border: "1px solid rgba(169,223,255,.25)",
          boxShadow: "0 20px 60px rgba(18,18,121,.12)",
        }}>
          <BrandBackdrop dark orbit />
          <Reveal>
            <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 4, md: 6 }} sx={{ alignItems: { xs: "stretch", md: "center" }, justifyContent: "space-between" }}>
              <Stack spacing={2} sx={{ maxWidth: 650 }}>
                <Typography sx={{ color: "#A9DFFF", fontSize: ".8125rem", fontWeight: 700, letterSpacing: 1.5 }}>LET’S BUILD WHAT’S NEXT</Typography>
                <Typography id="project-cta-title" component="h2" variant="h2">Your next idea deserves a great start.</Typography>
                <Typography sx={{ color: "rgba(255,255,255,.85)", maxWidth: "52ch" }}>From a new website to a product that moves your business forward, tell us what you have in mind. We’ll help you shape the next step.</Typography>
              </Stack>
              <Stack spacing={2} sx={{ flexShrink: 0, alignItems: { xs: "stretch", sm: "flex-start" } }}>
                <Button component={Link} href="/hire-us" variant="contained" endIcon={<FiArrowRight />} sx={{
                  bgcolor: "white", color: "primary.main", px: 3, minHeight: 52,
                  "&:hover": { bgcolor: "#E7F5FF" },
                  "&:focus-visible": { outline: "3px solid #A9DFFF", outlineOffset: 4 },
                }}>Discuss your project</Button>
                <Typography sx={{ color: "#A9DFFF", fontSize: ".875rem" }}>A conversation is all it takes to begin.</Typography>
              </Stack>
            </Stack>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
