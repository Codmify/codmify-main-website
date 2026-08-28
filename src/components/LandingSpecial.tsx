"use client";

import LandingPage from "@/wrappers/LandingPage";
import { Box, Container, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import OurTeam from "./our-team";

type LayoutSpecProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  afterContent?: ReactNode;
};

export default function LandingSpecial({
  title,
  subtitle,
  children,
  afterContent,
}: LayoutSpecProps) {
  const pathname = usePathname();

  return (
    <LandingPage>
      <Box
        sx={{
          height: 800,
          pt: { xs: 20, lg: 25 },
          background: "#121279 url('/bg-dashed.png')"
        }}>
        <Container>
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "white",
              maxWidth: 727,
              margin: "auto",
              pb: 8
            }}>
            <Typography variant="h4">{title}</Typography>
            <Typography>{subtitle}</Typography>
          </Stack>
        </Container>
      </Box>
      <Container
        sx={{
          p: "0px !important",
          marginTop: { xs: "-27rem !important", lg: "-25rem !important" },
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            position: "relative",
            minHeight: 500,
            borderRadius: { lg: "20px" },
            marginTop: "-25rem",
            py: { xs: 4, md: 8 },
            px: { xs: 1, md: 4 },
            boxShadow: "0px 4px 4px #0000001A",
            mb: "4em"
          }}>
          {children}
        </Box>
      </Container>
      {pathname.split("/")[1] === "about-us" && (
        <Box sx={{
          py: 5
        }}>
          <OurTeam />
        </Box>
      )}
      {afterContent}
    </LandingPage>
  );
}
