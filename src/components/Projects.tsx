import { projects } from "@/constants/data";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { GoArrowRight } from "react-icons/go";

const Projects = () => {
  return (
    <Box sx={styles.wrapper}>
      <Container>
        <Typography sx={styles.pTitle}>Our Projects</Typography>
        <Grid container spacing={4} justifyContent={"flex-start"} mt={"50px"}>
          {projects.map((project) => (
            <Grid key={project.title} item lg={4} md={4} sm={6} xs={12}>
              <Box sx={styles.pItem}>
                <Box
                  sx={{ position: "relative", width: "100%", height: "200px" }}
                >
                  <Image src={project.image} fill alt="project" />
                </Box>
                <Typography sx={styles.pItemTitle}>{project.title}</Typography>
                <Typography sx={styles.pItemDesc}>{project.desc}</Typography>
                <Box mt={"auto"}>
                  <Button sx={styles.viewBtn} endIcon={<GoArrowRight />}>
                    View case study
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;

const styles = {
  wrapper: {
    minHeight: "100vh",
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
};
