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
        <Stack
          mx={"auto"}
          py={5}
          direction={"row"}
          flexWrap={{ md: "wrap" }}
          gap={2}
          alignItems={"center"}
          justifyContent={{ md: "center" }}
          sx={{ overflowX: "auto" }}
        >
          {Array(7)
            .fill("")
            .map((_, id) => (
              <Box
                minWidth={293}
                height={326}
                borderRadius={"20px"}
                overflow={"hidden"}
                bgcolor={"white"}
                key={id}
              >
                <Image
                  src={"/team-1.png"}
                  alt="team"
                  width={293}
                  height={257}
                />
                <Box bgcolor={"#2020DB"} p={2}>
                  <Typography
                    fontWeight={600}
                    textAlign={"center"}
                    variant="body2"
                    color={"white"}
                  >
                    John Alafiatayo
                  </Typography>
                  <Typography
                    textAlign={"center"}
                    display={"block"}
                    variant="caption"
                    color={"white"}
                  >
                    Graphics Designer and logo Creator
                  </Typography>
                </Box>
              </Box>
            ))}
        </Stack>
      </Container>
    </Box>
  );
}
