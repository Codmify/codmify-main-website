import LandingPage from "@/wrappers/LandingPage";
import { getServiceWhatsAppUrl, servicesHolder } from "@/utils/services-holder";
import { Box, Button, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import { FiBarChart2, FiCpu, FiGlobe, FiLayers, FiPenTool, FiSmartphone, FiTrendingUp } from "react-icons/fi";
import type { IconType } from "react-icons";

export const metadata: Metadata = { title: "Services" };

const serviceIcons: Record<string, IconType> = {
  "website-development": FiGlobe,
  "mobile-development": FiSmartphone,
  "product-design": FiPenTool,
  "ai-integration": FiCpu,
  "data-analytics": FiBarChart2,
  "digital-marketing": FiTrendingUp,
  "project-delivery": FiLayers,
};

const process = [
  ["01", "Discover", "We learn about your goals, customers and the problem worth solving."],
  ["02", "Build", "We design, develop and refine with clear updates at every stage."],
  ["03", "Grow", "We launch confidently, measure what matters and support what comes next."],
];

export default function Services() {
  return (
    <LandingPage>
      <Box pt={{ xs: 28, md: 19 }} pb={{ xs: 8, md: 11 }} sx={{ background: "#121279 url('/bg-dashed.png')", color: "white" }}>
        <Container maxWidth="lg">
          <Stack maxWidth={790} spacing={3} alignItems="center" textAlign="center" mx="auto">
            <Chip label="WHAT WE DO" sx={{ color: "white", border: "1px solid rgba(255,255,255,.35)", bgcolor: "rgba(255,255,255,.08)", fontWeight: 700 }} />
            <Typography component="h1" fontWeight={700} fontSize={{ xs: 38, md: 62 }} lineHeight={1.05}>Digital services that move your business forward.</Typography>
            <Typography fontSize={{ xs: 17, md: 19 }} color="rgba(255,255,255,.82)" maxWidth={640}>From your first website to smarter systems and measurable growth, we turn ambitious ideas into useful digital products.</Typography>
            <Button component="a" href="https://wa.me/2349031874139?text=Hello%20Codmify%20team%2C%20I%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noreferrer" variant="contained" size="large" sx={{ bgcolor: "#00A5F0", px: 3, "&:hover": { bgcolor: "#008DE5" } }}>Talk to an expert</Button>
          </Stack>
        </Container>
      </Box>

      <Box py={{ xs: 7, md: 11 }} sx={{ backgroundImage: "radial-gradient(circle at 5% 10%, rgba(0,141,229,.09), transparent 21rem), radial-gradient(circle at 96% 42%, rgba(109,93,251,.08), transparent 22rem)" }}>
        <Container maxWidth="lg">
          <Stack maxWidth={680} spacing={1.5} mb={{ xs: 4, md: 6 }}>
            <Typography color="#008DE5" fontWeight={700} letterSpacing={1.2}>OUR CAPABILITIES</Typography>
            <Typography component="h2" color="#121279" fontSize={{ xs: 30, md: 42 }} fontWeight={700}>The right expertise for every stage of growth.</Typography>
          </Stack>
          <Grid container spacing={3}>
            {servicesHolder.map((service) => {
              const Icon = serviceIcons[service.reference];
              return <Grid item xs={12} sm={6} md={4} key={service.reference} id={service.reference}>
                <Stack height="100%" p={{ xs: 3, md: 3.5 }} spacing={2.25} border="1px solid #E0E8EF" borderRadius={4} bgcolor="white" position="relative" overflow="hidden" sx={{ transition: "transform .25s ease, box-shadow .25s ease", "&::before": { content: '""', position: "absolute", width: 140, height: 140, borderRadius: "50%", top: -82, right: -68, bgcolor: service.accent, opacity: .10 }, "&:hover": { transform: "translateY(-6px)", boxShadow: "0 18px 34px rgba(18,18,121,.12)" } }}>
                  <Box width={48} height={48} display="grid" sx={{ placeItems: "center", borderRadius: 3, bgcolor: `${service.accent}18`, color: service.accent }}><Icon size={25} /></Box>
                  <Typography variant="h5" color="#121279" fontWeight={700}>{service.title}</Typography>
                  <Typography color="#526573" variant="body2" lineHeight={1.7}>{service.content}</Typography>
                  <Stack direction="row" gap={0.8} flexWrap="wrap" flexGrow={1}>
                    {service.capabilities.map((capability) => <Chip key={capability} label={capability} size="small" sx={{ bgcolor: `${service.accent}12`, color: service.accent, fontWeight: 700 }} />)}
                  </Stack>
                  <Button component="a" href={getServiceWhatsAppUrl(service)} target="_blank" rel="noreferrer" sx={{ width: "fit-content", px: 0, color: "#121279" }}>Discuss this service →</Button>
                </Stack>
              </Grid>;
            })}
          </Grid>
        </Container>
      </Box>

      <Box py={{ xs: 7, md: 10 }} bgcolor="#EEF6FC">
        <Container maxWidth="lg">
          <Stack alignItems="center" textAlign="center" spacing={1.5} mb={{ xs: 4, md: 6 }}><Typography color="#008DE5" fontWeight={700} letterSpacing={1.2}>HOW WE WORK</Typography><Typography component="h2" color="#121279" fontWeight={700} fontSize={{ xs: 30, md: 42 }}>Simple process. Serious results.</Typography></Stack>
          <Grid container spacing={3}>{process.map(([number, title, detail]) => <Grid item xs={12} md={4} key={number}><Stack p={3} spacing={1.5} height="100%" borderLeft="3px solid #008DE5"><Typography color="#008DE5" fontWeight={700}>{number}</Typography><Typography variant="h5" color="#121279" fontWeight={700}>{title}</Typography><Typography color="#526573">{detail}</Typography></Stack></Grid>)}</Grid>
        </Container>
      </Box>

      <Box py={{ xs: 8, md: 11 }} bgcolor="#121279" color="white"><Container maxWidth="md"><Stack alignItems="center" textAlign="center" spacing={2.5}><Typography component="h2" fontSize={{ xs: 32, md: 46 }} lineHeight={1.1} fontWeight={700}>Not sure which service you need?</Typography><Typography color="rgba(255,255,255,.8)">Tell us what you are trying to achieve. We’ll help you find the right next step.</Typography><Button component="a" href="https://wa.me/2349031874139?text=Hello%20Codmify%20team%2C%20I%20need%20help%20choosing%20the%20right%20service%20for%20my%20business." target="_blank" rel="noreferrer" variant="contained" size="large" sx={{ bgcolor: "#00A5F0", px: 3, "&:hover": { bgcolor: "#008DE5" } }}>Chat with the team</Button></Stack></Container></Box>
    </LandingPage>
  );
}
