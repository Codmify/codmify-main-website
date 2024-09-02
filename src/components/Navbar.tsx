"use client";
import { MenuIcon } from "@/lib/icons";
import { navLinks } from "@/utils/nav-menus";
import {
  Backdrop,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const [isSideOpen, setIsSideOpen] = useState(false);
  return (
    <Box
      position={"fixed"}
      top={{ lg: "5dvh" }}
      left={0}
      width={"100dvw"}
      component={"nav"}
      zIndex={100}
    >
      <Container
        sx={{
          bgcolor: "white",
          borderRadius: { lg: "10px" },
          p: { xs: 1, md: 3 },
          boxShadow: "2px 2px 20px 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Stack
          alignItems={"center"}
          justifyContent={"space-between"}
          direction={"row"}
          gap={2}
        >
          <Link href={"/"}>
            <Image
              alt="codmify-brand"
              src="/codmify-nav-logo.svg"
              width={146}
              height={33}
            />
          </Link>
          <Stack
            direction={{ md: "row" }}
            alignItems={{ md: "center" }}
            gap={{ xs: 2, xl: 3 }}
            sx={{
              position: { xs: "fixed", md: "static" },
              top: 0,
              right: 0,
              width: { xs: 250, md: "auto" },
              height: { xs: "100dvh", md: "auto" },
              bgcolor: "white",
              zIndex: 99,
              px: { xs: 2, md: 0 },
              pt: { xs: 6, md: 0 },
              pb: { xs: 4, md: 0 },
              transform: {
                xs: `translateX(${isSideOpen ? 0 : 200}%)`,
                md: "translateX(0%)",
              },
              transition: "all .5s",
              ".active .MuiTypography-root": {
                fontWeight: "bold !important",
                textDecoration: "underline",
              },
            }}
          >
            {navLinks.map((menu) => (
              <Typography
                key={menu.url}
                color={
                  pathname.split("/")[1] === menu.url.split("/")[1]
                    ? "#121279"
                    : "#323F49"
                }
                fontWeight={
                  pathname.split("/")[1] === menu.url.split("/")[1] ? 700 : 600
                }
                component={Link}
                href={menu.url}
              >
                {menu.label}
              </Typography>
            ))}
            <Button
              size="large"
              variant="contained"
              sx={{ display: { xs: "inline-flex", md: "none" }, mt: 4 }}
            >
              Get Started
            </Button>
          </Stack>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            direction={"row"}
            gap={2}
          >
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" } }}
              onClick={() => setIsSideOpen(!isSideOpen)}
            >
              <MenuIcon style={{ height: 45, color: "#121279" }} />
            </IconButton>
            <Button
              size="large"
              variant="contained"
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Backdrop
        open={isSideOpen}
        sx={{ zIndex: 97 }}
        onClick={() => setIsSideOpen(false)}
      />
    </Box>
  );
}
