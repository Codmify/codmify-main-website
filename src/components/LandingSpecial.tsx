import LandingPage from "@/wrappers/LandingPage";
import { Box, Container, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";

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
          minHeight={800}
          borderRadius={{ lg: "20px" }}
          py={{ xs: 4, md: 8 }}
          px={{ xs: 1, md: 4 }}
          sx={{boxShadow: "0px 4px 4px #0000001A", mb: '4em'}}
        
        >
          {children}
        </Box>
      </Container>
    </LandingPage>
  );
}
