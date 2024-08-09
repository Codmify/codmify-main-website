import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Content() {
  return (
    <Stack spacing={2}>
      <Typography>
        Fichub is a platform that connects businesses with expert developers and
        designers, and helps junior designers and techies find jobs and get
        hired. We are committed to providing our clients with the best possible
        service, and we make it our mission to help junior techies reach their
        full potential.
      </Typography>
      <Typography>
        We understand that finding the right talent can be a challenge,
        especially when it comes to specialized fields like development and
        design. That&lsquo;s why we offer a variety of services to help
        businesses find the perfect candidates for their projects.
      </Typography>
      <Box>
        <Typography>Our services include:</Typography>
        <Box component={"ul"} pl={3}>
          <Typography component={"li"}>
            A large database of qualified developers and designers
          </Typography>
          <Typography component={"li"}>
            A screening process to ensure that all candidates meet our high
            standards
          </Typography>
          <Typography component={"li"}>
            A team of experienced recruiters who can help you find the right
            talent for your specific needs
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography>
          We also offer a variety of resources to help junior designers and
          techies find jobs and get hired. These resources include:
        </Typography>
        <Box component={"ul"} pl={3}>
          <Typography component={"li"}>
            A job board with listings for entry-level positions and internships
          </Typography>
          <Typography component={"li"}>
            A community on WhatsApp where junior designers and techies can
            connect with each other and learn from experienced developers and
            designers
          </Typography>
          <Typography component={"li"}>
            A variety of articles and blog posts with tips on how to find a job
            in tech, write a resume, and prepare for an interview
          </Typography>
        </Box>
      </Box>
      <Typography>
        At Fichub, we believe that everyone has the potential to be a great
        developer or designer. We are committed to helping our clients find the
        best possible talent, and we are dedicated to helping junior designers
        and techies reach their full potential.
      </Typography>
      <Typography>
        If you are a business looking for expert developers or designers, or if
        you are a junior designer or techie looking for a job, contact Fichub
        today!
      </Typography>
      <Box py={2} />
      <Button
        size="large"
        variant="contained"
        endIcon={
          <Image
            src={"/contact-us-icon.svg"}
            alt="contact-us-icon"
            width={12}
            height={14}
          />
        }
        sx={{ width: "fit-content" }}
      >
        Contact Us
      </Button>
    </Stack>
  );
}
