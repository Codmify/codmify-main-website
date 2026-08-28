"use client";

import { PolicySection } from "@/constants/policies";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, Element } from "react-scroll";

interface PolicyLayoutProps {
  sections: PolicySection[];
}

export default function PolicyLayout({ sections }: PolicyLayoutProps) {
  return (
    <Stack
      direction={{ md: "row" }}
      sx={{
        position: "relative",
        mt: 4,
        gap: { md: 4, lg: 8 }
      }}>
      <Stack
        spacing={2}
        component={"ul"}
        sx={{
          display: { xs: "none", md: "flex" },
          width: 250,

          li: {
            listStyle: "none",
          },

          position: "sticky",
          top: 100,
          height: "fit-content"
        }}>
        {sections.map((item) => (
          <Typography
            key={item.key}
            component={"li"}
            sx={{ cursor: "pointer", width: "fit-content" }}
          >
            <Link
              activeClass="active"
              to={item.key}
              spy={true}
              smooth={true}
              duration={500}
              offset={-20}
            >
              {item.title}
            </Link>
          </Typography>
        ))}
      </Stack>
      <Stack spacing={3} sx={{
        width: { md: "calc(100% - 250px)" }
      }}>
        {sections.map((item) => (
          <Element key={item.key} name={item.key}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 1
              }}>
              {item.title}
            </Typography>
            {item.content && (
              <Typography
                sx={{
                  mt: 1,
                  color: "text.secondary"
                }}>
                {item.content}
              </Typography>
            )}
            {item.list && (
              <Box
                component={"ul"}
                sx={{
                  mt: 2,
                  pl: 3,
                  li: {
                    mb: 1.5,
                    color: "text.secondary",
                  },
                }}
              >
                {item.list.map((listItem, index) => (
                  <Typography component={"li"} key={index}>
                    {listItem}
                  </Typography>
                ))}
              </Box>
            )}
          </Element>
        ))}
      </Stack>
    </Stack>
  );
}
