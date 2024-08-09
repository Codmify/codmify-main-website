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
};

export default function LandingSpecial({
  title,
  subtitle,
  children,
}: LayoutSpecProps) {
  const pathname = usePathname();

  return (
    <LandingPage>
      <Box
        height={800}
        pt={{ xs: 20, lg: 25 }}
        sx={{ background: "#121279 url('/bg-dashed.png')" }}
      >
        <Container>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
            textAlign={"center"}
            color={"white"}
            maxWidth={727}
            margin={"auto"}
            pb={8}
          >
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
          bgcolor={"white"}
          minHeight={500}
          borderRadius={{ lg: "20px" }}
          py={{ xs: 4, md: 8 }}
          px={{ xs: 1, md: 4 }}
          boxShadow={"0px 4px 4px 0px #0000001A;"}
        >
          {children}
        </Box>
      </Container>
      {pathname.split("/")[1] === "about-us" && (
        <Box py={5}>
          <OurTeam />
        </Box>
      )}
    </LandingPage>
  );
}
