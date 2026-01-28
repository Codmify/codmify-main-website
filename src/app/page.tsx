import ContactUs from "@/components/ContactUs";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import LandingPage from "@/wrappers/LandingPage";

export default function Home() {
  return (
    <LandingPage>
      <Hero />
      <Services />
      <Projects />
      <FAQ />
      <ContactUs />
    </LandingPage>
  );
}
