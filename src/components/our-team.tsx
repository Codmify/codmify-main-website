import { teams } from "@/utils/teams";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function OurTeam() {
  return (
    <Box bgcolor={"#121279"}>
      <Container sx={{ py: 5 }}>
        <Typography variant="h5" textAlign={"center"} color={"white"}>
          Meet Our Team
        </Typography>
        <Box
          sx={{
            py: 5,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: 2, md: 3, lg: 4 },
            placeItems: "center",
          }}
        >
          {teams.map((item, id) => (
            <Box
              key={id}
              borderRadius={"20px"}
              overflow={"hidden"}
              bgcolor={"white"}
              sx={{
                width: "100%",
                maxWidth: 293,
                height: "fit-content",
              }}
            >
              <Image
                src={item.img}
                alt="team"
                width={293}
                height={257}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <Stack
                alignItems={"center"}
                bgcolor={"#2020DB"}
                p={2}
                sx={{
                  "a:hover": {
                    textDecoration: "underline !important",
                    color: "white",
                  },
                }}
              >
                <a href={item.url} target="_blank">
                  <Typography
                    fontWeight={600}
                    textAlign={"center"}
                    variant="body2"
                    color={"white"}
                    sx={{ width: "fit-content" }}
                  >
                    {item.name}
                  </Typography>
                </a>
                <Typography
                  textAlign={"center"}
                  display={"block"}
                  variant="caption"
                  color={"white"}
                >
                  {item.role}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
