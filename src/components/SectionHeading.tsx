import Reveal from "./motion/Reveal";
import { Stack, Typography } from "@mui/material";

export default function SectionHeading({ label, title, description, dark = false }: {
  label: string; title: string; description?: string; dark?: boolean;
}) {
  return <Reveal><Stack spacing={2} sx={{ maxWidth: 760, mb: { xs: 4, md: 6 } }}>
    <Typography sx={{ color: dark ? "#A9DFFF" : "primary.main", fontSize: ".8125rem", fontWeight: 700, letterSpacing: 1.5 }}>{label}</Typography>
    <Typography component="h2" variant="h2" sx={{ color: dark ? "white" : "primary.main" }}>{title}</Typography>
    {description && <Typography sx={{ color: dark ? "rgba(255,255,255,.82)" : "text.secondary", maxWidth: "65ch" }}>{description}</Typography>}
  </Stack></Reveal>;
}
