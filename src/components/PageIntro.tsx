import BrandBackdrop from "./BrandBackdrop";
import { Box, Container, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export default function PageIntro({ label, title, description, children }: {
  label: string; title: string; description: string; children?: ReactNode;
}) {
  return <Box component="section" className="brand-section" sx={{ bgcolor: "primary.main", color: "white", pt: { xs: 20, md: 23 }, pb: { xs: 8, md: 12 } }}>
    <BrandBackdrop dark={true} orbit={true} />
    <Container maxWidth="lg"><Stack spacing={3} sx={{ maxWidth: 850 }}>
      <Typography sx={{ color: "#A9DFFF", fontSize: ".8125rem", fontWeight: 700, letterSpacing: 1.5 }}>{label}</Typography>
      <Typography component="h1" variant="h1">{title}</Typography>
      <Typography sx={{ color: "rgba(255,255,255,.82)", fontSize: { xs: "1.125rem", md: "1.25rem" }, lineHeight: 1.65, maxWidth: "60ch" }}>{description}</Typography>
      {children}
    </Stack></Container>
  </Box>;
}
