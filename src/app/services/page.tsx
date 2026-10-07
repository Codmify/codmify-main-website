import LandingPage from "@/wrappers/LandingPage";
import PageIntro from "@/components/PageIntro";
import Services from "@/components/Services";
import DeliveryProcess from "@/components/DeliveryProcess";
import { Box, Button, Container } from "@mui/material";
import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Services" };
export default function ServicesPage() {
  return <LandingPage>
    <PageIntro label="WHAT WE DO" title="Digital solutions for the way you do business." description="From your first website to smarter systems, we turn business needs into useful digital products.">
      <Button component="a" href="https://wa.me/2349031874139?text=Hello%20Codmify%20team%2C%20I%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer" variant="contained" color="secondary" sx={{ alignSelf: "flex-start" }}>Discuss your project</Button>
    </PageIntro>
    <Services full />
    <DeliveryProcess />
    <Box component="section" sx={{ bgcolor: "primary.main", py: { xs: 8, md: 12 } }}><Container maxWidth="lg">
      <SectionHeading dark label="LET’S TALK" title="Not sure where to start?" description="Tell us what you want to achieve. We’ll help you find the right next step." />
      <Button component="a" href="https://wa.me/2349031874139?text=Hello%20Codmify%20team%2C%20I%20need%20help%20choosing%20the%20right%20service%20for%20my%20business." target="_blank" rel="noopener noreferrer" variant="contained" color="secondary">Chat with the team</Button>
    </Container></Box>
  </LandingPage>;
}
