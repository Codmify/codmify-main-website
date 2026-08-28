import { ourProjects } from "@/constants/data";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowRight } from "react-icons/go";
import Reveal from "./motion/Reveal";

const Projects = () => {
  return (
    <Box sx={styles.wrapper}>
      <Container>
        <Reveal>
          <Typography sx={styles.pTitle}>Our Projects</Typography>
        </Reveal>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            mt: "50px"
          }}>
          {ourProjects.slice(0, 3).map((project, index) => (
            <Grid
              key={project.title}
              size={{
                lg: 4,
                md: 4,
                sm: 6,
                xs: 12
              }}>
              <Reveal delay={index * 0.1}>
              <Box sx={styles.pItem}>
                <Box
                  sx={{ position: "relative", width: "100%", height: "200px" }}
                >
                  <Image src={project.image} fill alt="project" />
                </Box>
                <Typography
                  sx={[{
                    lineHeight: 1
                  }, styles.pItemTitle]}>
                  {project.title}
                </Typography>
                <Typography sx={styles.pItemDesc}>
                  {project.desc.length > 90
                    ? project.desc.substring(0, 90) + "..."
                    : project.desc}
                </Typography>
                <Box sx={{
                  mt: "auto"
                }}>
                  <a href={project.url} target="_blank">
                    <Button sx={styles.viewBtn} endIcon={<GoArrowRight />}>
                      View Project
                    </Button>
                  </a>
                </Box>
              </Box>
              </Reveal>
            </Grid>
          ))}
        </Grid>
        <Link
          href={"/our-projects"}
          style={{
            textAlign: "center",
            display: "block",
            margin: "2rem auto 0",
            width: "fit-content",
          }}
        >
          <Button sx={styles.btn} endIcon={<GoArrowRight />}>
            See more{" "}
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Projects;

const styles = {
  wrapper: {
    minHeight: 600,
    backgroundColor: "#121279",
    py: "4em",
  },
  pTitle: {
    color: "#FFFFFF",
    fontSize: "32px",
    fontWeight: 700,
    textAlign: "center",
  },
  pItem: {
    border: "1px solid #AAB9C5",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    minHeight: "475px",
  },
  pItemTitle: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#FAFAFA",
  },
  pItemDesc: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#FAFAFA",
  },
  viewBtn: {
    border: "2px solid #AAB9C5",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#DFDFFA",
    px: "20px",
    "&:hover": {
      "& .MuiButton-icon": {
        transition: "all .3s ease-in-out",
        transform: "rotate(-30deg)",
      },
    },
  },
  btn: {
    border: "2px solid #AAB9C5",
    backgroundColor: "#121279",
    borderRadius: "10px",
    px: "25px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#FAFAFA",
    transition: "all .3s linear",
    "&:hover": {
      "& .MuiButton-icon": {
        transition: "all .3s ease-in-out",
        transform: "rotate(-30deg)",
      },
    },
  },
};
