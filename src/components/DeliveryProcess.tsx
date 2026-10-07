import Reveal from "./motion/Reveal";
import BrandBackdrop from "./BrandBackdrop";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import SectionHeading from "./SectionHeading";

const steps = [
  ["01", "Understand your business", "We start with your goals, your customers and the problem you need to solve."],
  ["02", "Shape and deliver", "We agree on the scope, design the solution and build with clear updates along the way."],
  ["03", "Launch and support", "We prepare for launch and help you plan the support your product needs next."],
];
export default function DeliveryProcess() {
  return <Box component="section" className="brand-section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#EDF2F7" }}><BrandBackdrop dark={false} orbit={false} />
    <Container maxWidth="lg">
    <SectionHeading label="HOW WE WORK" title="A clear path from idea to delivery." description="An organised engagement, with shared expectations and room for your feedback." />
    <Grid container spacing={4}>{steps.map(([number, title, detail]) => <Grid key={number} size={{ xs: 12, md: 4 }}>
      <Reveal delay={Number(number) * 0.08}><Stack spacing={2} sx={{ borderTop: "2px solid #121279", pt: 3 }}>
        <Typography sx={{ fontWeight: 700, color: "primary.main" }}>{number}</Typography>
        <Typography component="h3" variant="h3" sx={{ color: "primary.main" }}>{title}</Typography>
        <Typography sx={{ color: "text.secondary" }}>{detail}</Typography>
      </Stack></Reveal>
    </Grid>)}</Grid>
  </Container></Box>;
}
