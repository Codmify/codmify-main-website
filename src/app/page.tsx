import { AnniversaryStory } from "@/components/Anniversary";
import ContactUs from "@/components/ContactUs";
import FAQ from "@/components/FAQ";
import CinematicLanding from "@/components/CinematicLanding";
import Projects from "@/components/Projects";
import Packages from "@/components/Packages";
import LandingPage from "@/wrappers/LandingPage";

export default function Home() {
  return (
    <LandingPage>
      <CinematicLanding />
      <AnniversaryStory />
      <Projects />
      <Packages compact />
      <FAQ />
      <ContactUs />
    </LandingPage>
  );
}
