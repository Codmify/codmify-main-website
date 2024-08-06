"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import {
  aboutUsMenu,
  servicesMenu,
  socials,
  usefulFoot,
} from "@/utils/nav-menus";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <Box>
      <Container
        sx={{
          bgcolor: "#121279",
          borderRadius: "30px 30px 0 0",
          py: 5,
          px: { xs: 2, md: 4 },
        }}
      >
        <Stack
          direction={"row"}
          gap={{ xs: 2, md: 4 }}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          sx={{
            ".MuiTypography-root": {
              color: "white !important",
            },
            a: {
              width: "fit-content !important",
            },
          }}
        >
          <Stack
            flex={{ md: 1 }}
            gap={2}
            width={{ xs: "100%", md: "auto" }}
            mb={{ xs: 2, md: 0 }}
          >
            <Image
              alt="fichub-brand"
              src="/fichub-nav-logo.svg"
              width={148}
              height={33}
            />
            <Typography variant="body2" maxWidth={{ md: 300 }}>
              Moving with ICT global standards and building a workforce for
              tomorrow&lsquo;s challenge.
            </Typography>
            <Stack pt={2} gap={2} direction={"row"} flexWrap={"wrap"}>
              {socials.map((item, id) => (
                <a href={item.url} key={id}>
                  <Box
                    component={"img"}
                    src={item.image}
                    width={38}
                    height={38}
                    borderRadius={"50%"}
                  />
                </a>
              ))}
            </Stack>
          </Stack>
          <Stack flex={{ xs: 1, lg: 0.5 }} spacing={1.5} className="alignEnd">
            <Typography variant="h6">Services</Typography>
            <Stack spacing={1}>
              {servicesMenu.map((item, id) => (
                <Typography
                  variant="body2"
                  component={Link}
                  href={item.url}
                  key={id}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>
          </Stack>
          <Stack flex={{ xs: 1, lg: 0.5 }} spacing={1.5} className="alignEnd">
            <Typography variant="h6">About Us</Typography>
            <Stack spacing={1}>
              {aboutUsMenu.map((item, id) => (
                <Typography
                  variant="body2"
                  component={Link}
                  href={item.url}
                  key={id}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>
          </Stack>
          <Stack flex={{ xs: 1, lg: 0.5 }} spacing={1.5} className="alignEnd">
            <Typography variant="h6">Contact Us</Typography>
            <Stack spacing={1}>
              <Typography
                variant="body2"
                component={"a"}
                href={"tel:+2349099446126"}
              >
                +234 909 944 6126
              </Typography>
              <Typography
                variant="body2"
                component={"a"}
                href={"mailto:decentjobtechskills@gmail.com"}
              >
                decentjobtechskills@gmail.com
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box borderTop={"1px solid white"} mt={3} pt={2}>
          <Typography textAlign={"center"} color={"white"}>
            Copyright {new Date().getFullYear()} All rights reserved | FicHub.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
