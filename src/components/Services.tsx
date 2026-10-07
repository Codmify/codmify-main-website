"use client";

import Reveal from "./motion/Reveal";
import BrandBackdrop from "./BrandBackdrop";
import { servicesHolder, getServiceWhatsAppUrl } from "@/utils/services-holder";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FiArrowUpRight, FiGlobe, FiSmartphone, FiPenTool, FiCpu, FiBarChart2, FiTrendingUp, FiLayers } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

const icons = [FiGlobe, FiSmartphone, FiPenTool, FiCpu, FiBarChart2, FiTrendingUp, FiLayers];
export default function Services({ full = false }: { full?: boolean }) {
  return <Box component="section" className="brand-section" id="services" sx={{ py: { xs: 8, md: 12 }, bgcolor: "white" }}>
    <BrandBackdrop dark={false} orbit={false} />
    <Container maxWidth="lg">
      <SectionHeading label="OUR CAPABILITIES" title="The right solutions for your next stage." description="From your first website to digital products and smarter operations, we help you choose a practical way forward." />
      <Grid container spacing={3}>
        {servicesHolder.slice(0, full ? undefined : 6).map((service, index) => {
          const Icon = icons[index];
          return <Grid key={service.reference} id={full ? service.reference : undefined} size={{ xs: 12, sm: 6, md: 4 }} sx={{ scrollMarginTop: 160 }}>
            <Reveal delay={(index % 3) * 0.08}><Stack component="article" className="brand-card" spacing={2} sx={{ height: "100%", p: 3, border: "1px solid #E0E8EF", borderRadius: "12px" }}>
              <Box sx={{ width: 48, height: 48, bgcolor: "#EDF2F7", color: "primary.main", borderRadius: "8px", display: "grid", placeItems: "center" }}><Icon size={24} aria-hidden="true" /></Box>
              <Typography component="h3" variant="h3" sx={{ color: "primary.main" }}>{service.title}</Typography>
              <Typography sx={{ color: "text.secondary" }}>{service.content}</Typography>
              {full && <Typography sx={{ color: "text.secondary", fontSize: ".875rem" }}>{service.capabilities.join(" · ")}</Typography>}
              <Box sx={{ mt: "auto !important", pt: 2 }}>
                {full ? <Button component="a" href={getServiceWhatsAppUrl(service)} target="_blank" rel="noopener noreferrer" endIcon={<FiArrowUpRight />} sx={{ px: 0 }}>Discuss this service</Button> : <Button component={Link} href={`/services#${service.reference}`} endIcon={<FiArrowUpRight />} sx={{ px: 0 }} aria-label={`Explore ${service.title}`}>Explore service</Button>}
              </Box>
            </Stack></Reveal>
          </Grid>;
        })}
      </Grid>
      {!full && <Button component={Link} href="/services" variant="outlined" sx={{ mt: 4 }}>View all services</Button>}
    </Container>
  </Box>;
}
