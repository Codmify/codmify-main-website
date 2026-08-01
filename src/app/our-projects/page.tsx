import ProjectCard from "@/components/ProjectCard";
import { ourProjects } from "@/constants/data";
import LandingPage from "@/wrappers/LandingPage";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Our Projects" };

export default function OurProjects() {
  return <LandingPage>
    <Box pt={{ xs: 28, md: 19 }} pb={{ xs: 8, md: 11 }} sx={{ background: "#121279 url('/bg-dashed.png')", color: "white" }}><Container maxWidth="lg"><Stack maxWidth={800} mx="auto" alignItems="center" textAlign="center" spacing={2.5}><Typography color="#51C4FF" fontWeight={700} letterSpacing={1.2}>OUR WORK</Typography><Typography component="h1" fontSize={{ xs: 39, md: 62 }} lineHeight={1.05} fontWeight={700}>Digital products made to create real momentum.</Typography><Typography color="rgba(255,255,255,.82)" fontSize={{ xs: 17, md: 19 }} maxWidth={650}>A selection of websites, platforms and mobile experiences we’ve helped bring to life.</Typography></Stack></Container></Box>
    <Box py={{ xs: 7, md: 11 }} sx={{ backgroundImage: "radial-gradient(circle at 7% 12%, rgba(0,141,229,.10), transparent 25rem), radial-gradient(circle at 94% 55%, rgba(18,18,121,.07), transparent 25rem)" }}><Container maxWidth="lg"><Stack spacing={1.5} mb={{ xs: 4, md: 6 }}><Typography color="#008DE5" fontWeight={700} letterSpacing={1.2}>SELECTED PROJECTS</Typography><Typography component="h2" color="#121279" fontSize={{ xs: 30, md: 42 }} fontWeight={700}>Designed for people. Built for growth.</Typography></Stack><Stack spacing={{ xs: 3, md: 4 }}>{ourProjects.map((item, index) => <ProjectCard key={item.title} title={item.title} additionDesc={item.additionalDesc} desc={item.desc} img={item.image} url={item.url} reverse={index % 2 === 0 ? "row" : "row-reverse"} images={item.images} links={item.links} />)}</Stack></Container></Box>
  </LandingPage>;
}
