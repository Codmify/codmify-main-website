"use client";

import { tandCs } from "@/utils/tAndCs";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, Element } from "react-scroll";

export default function Conditions() {
  return (
    <Stack
      position={"relative"}
      mt={4}
      direction={{ md: "row" }}
      gap={{ md: 4, lg: 8 }}
    >
      <Stack
        spacing={2}
        display={{ xs: "none", md: "flex" }}
        width={250}
        component={"ul"}
        sx={{
          li: {
            listStyle: "none",
          },
        }}
      >
        {tandCs.map((item) => (
          <Typography
            key={item.key}
            component={"li"}
            sx={{ cursor: "pointer", width: "fit-content" }}
          >
            <Link
              containerId="containerElement"
              activeClass="active"
              to={item.key}
              spy={true}
              smooth={true}
            >
              {item.title}
            </Link>
          </Typography>
        ))}
      </Stack>
      <Stack
        position={"sticky"}
        spacing={2}
        width={{ md: "calc(100% - 250px)" }}
        height={{ md: "calc(100dvh - 160px)" }}
        sx={{ overflowY: "auto" }}
        className="element"
        id="containerElement"
      >
        {tandCs.map((item) => (
          <Element key={item.key} name={item.key}>
            <Typography fontWeight={600}>{item.title}</Typography>
            <Typography mt={1}>{item.content}</Typography>
          </Element>
        ))}
      </Stack>
    </Stack>
  );
}
