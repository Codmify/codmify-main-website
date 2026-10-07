import { AnniversaryStory } from "@/components/Anniversary";
import FAQ from "@/components/FAQ";
import OurTeam from "@/components/our-team";
import LandingPage from "@/wrappers/LandingPage";
import PageIntro from "@/components/PageIntro";
import { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = { title: "About Us" };

export default function AboutUs() {
  return (
    <LandingPage>
      <PageIntro label="ABOUT CODMIFY" title="A digital partner for your next chapter." description="We bring strategy, design and technology together to help businesses build a stronger digital presence and more useful products." />
      <Content />
      <AnniversaryStory />
      <OurTeam />
      <FAQ />
    </LandingPage>
  );
}
