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
          {teams.map((item, id) => (
            <>
              <Box
                minWidth={293}
                height={326}
                borderRadius={"20px"}
                overflow={"hidden"}
                bgcolor={"white"}
                key={id}
              >
                <Image src={item.img} alt="team" width={293} height={257} />
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
                      sx={{width: "fit-content"}}
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
                </Box>
              </Box>
              <Box
                component={"br"}
                sx={{ display: { xs: "none", lg: "block" } }}
              />
            </>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
