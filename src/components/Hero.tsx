"use client";

import Reveal from "./motion/Reveal";
import BrandBackdrop from "./BrandBackdrop";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return <Box component="section" className="brand-section" sx={{ bgcolor: "primary.main", color: "white", pt: { xs: 20, md: 24 }, pb: { xs: 8, md: 12 } }}>
    <BrandBackdrop dark={true} orbit={true} />
    <Container maxWidth="lg"><Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: "center" }}>
      <Grid size={{ xs: 12, md: 8 }}><Reveal><Stack spacing={3}>
        <Typography sx={{ color: "#A9DFFF", fontSize: ".8125rem", fontWeight: 700, letterSpacing: 1.5 }}>YOUR DIGITAL SOLUTIONS PARTNER</Typography>
        <Typography component="h1" variant="h1" sx={{ maxWidth: 780 }}>Build your next stage of business.</Typography>
        <Typography sx={{ color: "rgba(255,255,255,.82)", fontSize: { xs: "1.125rem", md: "1.25rem" }, lineHeight: 1.65, maxWidth: "55ch" }}>Codmify brings strategy, design and technology together to build websites, digital products and systems that help your business move forward.</Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: { xs: "stretch", sm: "flex-start" }, pt: 1 }}>
          <Button component={Link} href="/hire-us" variant="contained" color="secondary" endIcon={<FiArrowRight />}>Discuss your project</Button>
          <Button component={Link} href="/our-projects" variant="outlined" sx={{ color: "white", borderColor: "rgba(255,255,255,.6)", "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,.08)" } }}>Explore our work</Button>
        </Stack>
      </Stack></Reveal></Grid>
      <Grid size={{ xs: 12, md: 4 }}><Reveal delay={0.15}><Stack sx={{ borderLeft: "1px solid rgba(255,255,255,.3)", pl: 3 }} spacing={3}>
        {[["01", "A stronger digital presence", "Websites and experiences built around your audience."], ["02", "Products with a purpose", "Useful platforms and apps for everyday needs."], ["03", "Smarter ways to work", "Automation and systems that support your operations."]].map(([n,t,d]) => <Box key={n}><Typography sx={{ color: "#A9DFFF", fontSize: ".75rem", mb: 1 }}>{n}</Typography><Typography component="h2" sx={{ fontSize: "1.125rem", fontWeight: 700, mb: 1 }}>{t}</Typography><Typography sx={{ fontSize: ".875rem", color: "rgba(255,255,255,.82)" }}>{d}</Typography></Box>)}
      </Stack></Reveal></Grid>
    </Grid></Container>
  </Box>;
}
