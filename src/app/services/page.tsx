import LandingSpecial from "@/components/LandingSpecial";
import { servicesHolder } from "@/utils/services-holder";
import { Button, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Services",
};

export default function Services() {
  return (
    <LandingSpecial
      title="Our Services"
      subtitle="From UI/UX design to web development, explore the range of services we offer to help bring your ideas to life."
    >
      <Stack
        direction={{ md: "row" }}
        justifyContent={"space-between"}
        gap={2}
        flexWrap={"wrap"}
      >
        {servicesHolder.map((service) => (
          <Stack
            id={service.reference}
            key={service.title}
            width={{ md: "49%" }}
            bgcolor={service.contrast ? "#121279" : "#E7EBEF"}
            borderRadius={"45px"}
            spacing={2}
            p={{ xs: 2, md: 4 }}
          >
            <Image
              src={
                service.contrast ? "/project-alt-icon.svg" : "/project-icon.svg"
              }
              alt="pen-icon"
              width={61}
              height={61}
            />
            <Typography
              variant="h5"
              fontWeight={600}
              color={service.contrast ? "white" : "#000"}
            >
              {service.title}
            </Typography>
            <Typography
              variant="body2"
              color={service.contrast ? "white" : "#4D4D4D"}
            >
              {service.content}
            </Typography>
            <Button
              startIcon={
                <Image
                  src={
                    service.contrast ? "/hire-alt-icon.svg" : "/hire-icon.svg"
                  }
                  alt="pen-icon"
                  width={41}
                  height={41}
                />
              }
              sx={{ width: "fit-content" }}
            >
              Hire Us
            </Button>
          </Stack>
        ))}
      </Stack>
    </LandingSpecial>
  );
}
