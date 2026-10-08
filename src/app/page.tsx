import DeliveryProcess from "@/components/DeliveryProcess";
import OurTeam from "@/components/our-team";
import ContactUs from "@/components/ContactUs";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ProjectCTA from "@/components/ProjectCTA";
import Services from "@/components/Services";
import LandingPage from "@/wrappers/LandingPage";

export default function Home() {
  return (
    <LandingPage>
      <Hero />
      <Services />
      <Projects />
      <DeliveryProcess />
      <OurTeam />
      <ProjectCTA />
      <FAQ />
      <ContactUs />
    </LandingPage>
  );
}
