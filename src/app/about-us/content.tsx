import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const solutions = [
  {
    title: "Extensive Talent Database",
    desc: "Access a curated pool of qualified developers and designers tailored to your project needs.",
  },
  {
    title: "Rigorous Screening and Vetting",
    desc: "Our candidates undergo a thorough evaluation to ensure top-quality results.",
  },
  {
    title: "Rigorous Screening and Vetting",
    desc: "Our candidates undergo a thorough evaluation to ensure top-quality results.",
  },
  {
    title: "Expert Digital Teams",
    desc: " Beyond freelancers, our in-house professionals deliver end-to-end project execution.",
  },
  {
    title: "Customized Recruitment",
    desc: " Work with our expert recruiters to find specialists that align with your goals, timelines, and budget.",
  },
];
const supports = [
  {
    title: "Exclusive Job Board",
    desc: "Discover entry-level roles and internships to kickstart your career.",
  },
  {
    title: "Vibrant Community",
    desc: " Join our social media platforms for networking, learning, and mentorship.",
  },
  {
    title: "Career Guidance",
    desc: "Access tips and resources for crafting standout resumes, mastering interviews, and navigating the tech industry.",
  },
];
const services = [
  {
    title: "UI/UX Design and Web Development",
    desc: "Create visually stunning and user-friendly websites and apps.",
  },
  {
    title: "Graphic Design",
    desc: "Develop compelling visuals, from logos to marketing materials.",
  },
  {
    title: "Graphic Design",
    desc: "Develop compelling visuals, from logos to marketing materials.",
  },
  {
    title: "Software Development",
    desc: "Build custom software solutions with our dedicated team and freelance talent.",
  },
  {
    title: "Digital Marketing",
    desc: "Implement data-driven strategies in SEO, social media, and content creation.",
  },
];

export default function Content() {
  return (
    <Stack spacing={2}>
      <Typography>
        At Codmify, we’re more than just a talent marketplace—we are your
        comprehensive digital solutions partner. Our platform seamlessly
        connects businesses with top-tier developers, designers, and a network
        of skilled professionals ready to bring your projects to life. From
        software development to digital marketing, we have the expertise to
        drive your success.
      </Typography>
      <Stack gap="30px">
        <Box>
          <Typography>
            Navigating the talent landscape can be daunting. Codmify simplifies
            this process by offering:
          </Typography>
          <Box component={"ul"} pl={3}>
            {solutions.map((cnt) => (
              <Typography component={"li"} key={cnt.title} sx={{ mt: "12px" }}>
                <span style={{ fontWeight: 600 }}>{`${cnt.title}:`}</span>
                {cnt.desc}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography>
            We are committed to fostering the growth of junior talent. Our
            support includes:
          </Typography>
          <Box component={"ul"} pl={3}>
            {supports.map((cnt) => (
              <Typography component={"li"} key={cnt.title} sx={{ mt: "12px" }}>
                <span style={{ fontWeight: 600 }}>{`${cnt.title}:`}</span>
                {cnt.desc}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography>
            Codmify also offers direct access to a range of digital services
            through our in-house experts:
          </Typography>
          <Box component={"ul"} pl={3}>
            {services.map((cnt) => (
              <Typography component={"li"} key={cnt.title} sx={{ mt: "12px" }}>
                <span style={{ fontWeight: 600 }}>{`${cnt.title}:`}</span>
                {cnt.desc}
              </Typography>
            ))}
          </Box>
        </Box>
      </Stack>
      <Box mt={"30px"}>
        <Typography>
          Codmify is designed to be your all-in-one solution for both talent and
          digital services. With a commitment to quality and innovation, we’re
          here to help your business thrive while supporting the next generation
          of digital talent.
        </Typography>
        <Typography mt="15px">
          Ready to elevate your business? Partner with Codmify and explore our
          comprehensive digital solutions.
        </Typography>
      </Box>
      <Box py={2} />
      <Link href={"/#contact-us"}>
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
      </Link>
    </Stack>
  );
}
