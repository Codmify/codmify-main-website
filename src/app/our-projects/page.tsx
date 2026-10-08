import PageIntro from "@/components/PageIntro";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { ourProjects } from "@/constants/data";
import LandingPage from "@/wrappers/LandingPage";
import { Box, Container, Stack } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Our Projects" };

export default function OurProjects() {
  return (
    <LandingPage>
      <PageIntro label="OUR WORK" title="Ideas brought into everyday use." description="A selection of websites, platforms and mobile experiences from our portfolio." />
      <Box
        sx={{
          py: { xs: 7, md: 11 },
          bgcolor: "#EDF2F7"
        }}><Container maxWidth="lg"><SectionHeading label="SELECTED PROJECTS" title="Built around people and their needs." /><Stack spacing={{ xs: 3, md: 4 }}>{ourProjects.map((item, index) => <ProjectCard key={item.title} title={item.title} additionDesc={item.additionalDesc} desc={item.desc} img={item.image} url={item.url} reverse={index % 2 === 0 ? "row" : "row-reverse"} images={item.images} links={item.links} />)}</Stack></Container></Box>
    </LandingPage>
  );
}
