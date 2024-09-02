import LandingSpecial from "@/components/LandingSpecial";
import ProjectCard from "@/components/ProjectCard";
import { ourProjects } from "@/constants/data";
import { Stack } from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Projects",
};

export default function OurProjects() {
  return (
    <LandingSpecial
      title="Our Projects"
      subtitle="Explore our portfolio of innovative projects that showcase our expertise and creativity across various industries."
    >
      <Stack gap={"60px"}>
        {ourProjects.map((item) => (
          <ProjectCard
            key={item.title}
            title={item.title}
            additionDesc={item.additionalDesc}
            desc={item.desc}
            img={item.image}
            url={item.url}
            reverse={"row"}
          />
        ))}
      </Stack>
    </LandingSpecial>
  );
}
