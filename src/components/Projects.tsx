"use client";

import Reveal from "./motion/Reveal";
import BrandBackdrop from "./BrandBackdrop";
import { ourProjects } from "@/constants/data";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return <Box component="section" className="brand-section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "primary.main" }}><BrandBackdrop dark={true} orbit={false} />
    <Container maxWidth="lg">
    <SectionHeading dark label="SELECTED WORK" title="Digital experiences, put into practice." description="Explore a selection of the websites and platforms in our portfolio." />
    <Grid container spacing={3}>{ourProjects.slice(0, 3).map((project, index) => <Grid key={project.title} size={{ xs: 12, sm: 6, md: 4 }}>
      <Reveal delay={index * 0.08}><Stack component="article" className="brand-card brand-project" sx={{ height: "100%", bgcolor: "white", borderRadius: "12px", overflow: "hidden" }}>
        <Box sx={{ aspectRatio: "16 / 10", position: "relative", bgcolor: "#EDF2F7" }}><Image src={project.image} fill alt={`${project.title} website preview`} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" style={{ objectFit: "cover" }} /></Box>
        <Stack spacing={2} sx={{ p: 3, flexGrow: 1 }}>
          <Typography component="h3" variant="h3" sx={{ color: "primary.main" }}>{project.title}</Typography>
          <Typography sx={{ color: "text.secondary" }}>{project.desc}</Typography>
          <Box sx={{ mt: "auto !important", pt: 2 }}><Button component="a" href={project.url} target="_blank" rel="noopener noreferrer" endIcon={<FiArrowUpRight />} sx={{ px: 0 }} aria-label={`Visit ${project.title} (opens in a new tab)`}>Visit project</Button></Box>
        </Stack>
      </Stack></Reveal>
    </Grid>)}</Grid>
    <Button component={Link} href="/our-projects" variant="contained" color="secondary" sx={{ mt: 4 }}>View all projects</Button>
  </Container></Box>;
}
