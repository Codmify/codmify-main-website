import Packages from "@/components/Packages";
import LandingPage from "@/wrappers/LandingPage";
import { Metadata } from "next";
import { Box } from "@mui/material";

export const metadata: Metadata = { title: "Website Packages" };

export default function PricingPage() {
  return (
    <LandingPage><Box sx={{
      pt: { xs: 13, md: 15 }
    }}><Packages /></Box></LandingPage>
  );
}
