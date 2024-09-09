"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { aboutUsMenu, servicesMenu, socials } from "@/utils/nav-menus";
import Link from "next/link";
import Image from "next/image";
import { servicesHolder } from "@/utils/services-holder";

export default function Footer() {
  return (
    <Box
      component={"footer"}
      bgcolor={"#121279"}
      borderRadius={{ lg: "30px 30px 0 0" }}
    >
      <Container
        sx={{
          py: 5,
          px: { xs: 2, md: 4 },
        }}
      >
        <Stack
          direction={{ sm: "row" }}
          gap={4}
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
              alt="codmify-brand"
              src="/codmify-nav-logo.svg"
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
              {servicesHolder.map((item, id) => (
                <Typography
                  variant="body2"
                  component={Link}
                  href={"/services#" + item.reference}
                  key={id}
                >
                  {item.title}
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
                href={"tel:+2349031874139"}
              >
                +234 903 187 4139
              </Typography>
              <Typography
                variant="body2"
                component={"a"}
                href={"mailto:codmify@gmail.com"}
              >
                codmify@gmail.com
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box borderTop={"1px solid white"} mt={3} pt={2}>
          <Typography
            textAlign={"center"}
            variant="caption"
            display={"block"}
            color={"white"}
          >
            Copyright {new Date().getFullYear()} All rights reserved |
            CodmifyHub.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
