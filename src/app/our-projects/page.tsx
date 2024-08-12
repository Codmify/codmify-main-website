import LandingSpecial from "@/components/LandingSpecial";
import ProjectCard from "@/components/ProjectCard";
import { ourProjects } from "@/constants/data";
import { Stack } from "@mui/material";
import React from "react";

export default function OurProjects() {
  return (
    <LandingSpecial
      title="Our Projects"
      subtitle="Explore our portfolio of innovative projects that showcase our expertise and creativity across various industries."
    >
      <Stack gap={"60px"}>
        <ProjectCard
          title={ourProjects[0].title}
          additionDesc={ourProjects[0].additionalDesc}
          desc={ourProjects[0].desc}
          img={ourProjects[0].image}
          reverse={"row"}
        />
        <ProjectCard
          title={ourProjects[1].title}
          additionDesc={ourProjects[1].additionalDesc}
          desc={ourProjects[1].desc}
          img={ourProjects[1].image}
          reverse={"row-reverse"}
        />
        <ProjectCard
          title={ourProjects[2].title}
          additionDesc={ourProjects[2].additionalDesc}
          desc={ourProjects[2].desc}
          img={ourProjects[2].image}
          reverse={"row"}
        />
      </Stack>
    </LandingSpecial>
  );
}
