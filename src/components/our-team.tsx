import BrandBackdrop from "./BrandBackdrop";
import Reveal from "./motion/Reveal";
import { teams } from "@/utils/teams";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FiArrowUpRight, FiLinkedin } from "react-icons/fi";

export default function OurTeam() {
  return (
    <Box
      component="section"
      className="brand-section"
      id="leadership"
      aria-labelledby="leadership-heading"
      sx={{ py: { xs: 7, md: 10 }, bgcolor: "primary.main", color: "white" }}
    >
      <BrandBackdrop dark />
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 6 }}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            mb: { xs: 4, md: 5 },
          }}
        >
          <Box sx={{ maxWidth: 620 }}>
            <Typography
              sx={{ color: "#A9DFFF", fontWeight: 700, letterSpacing: 1.5, fontSize: 13, mb: 1.5 }}
            >
              OUR LEADERSHIP
            </Typography>
            <Typography
              component="h2"
              id="leadership-heading"
              sx={{ fontSize: { xs: 32, md: 44 }, lineHeight: 1.12, fontWeight: 700 }}
            >
              The founders behind Codmify.
            </Typography>
          </Box>
          <Typography sx={{ maxWidth: 370, color: "rgba(255,255,255,.82)", lineHeight: 1.75 }}>
            Company direction, product innovation, business development and client delivery. Meet our leadership.
          </Typography>
        </Stack>
        <Typography sx={{ display: { xs: "block", sm: "none" }, color: "#A9DFFF", fontSize: ".875rem", mb: 2 }}>Swipe to meet our founders →</Typography>
        <Box
          role="region" aria-label="Leadership cards" tabIndex={0}
          sx={{
            display: "grid", gap: 3,
            gridAutoFlow: { xs: "column", sm: "row" },
            gridAutoColumns: { xs: "86%", sm: "auto" },
            gridTemplateColumns: { sm: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
            overflowX: { xs: "auto", sm: "visible" },
            scrollSnapType: { xs: "x mandatory", sm: "none" },
            overscrollBehaviorX: "contain", pb: { xs: 2, sm: 0 },
            scrollbarWidth: "thin", scrollbarColor: "#A9DFFF #29298A",
            "&:focus-visible": { outline: "2px solid #A9DFFF", outlineOffset: 4 },
          }}
        >
          {teams.map((member, index) => (
            <Box key={member.name} sx={{ minWidth: 0, scrollSnapAlign: "start" }}>
              <Reveal delay={index * 0.08}><Stack
                className="brand-card brand-project"
                component="article"
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  bgcolor: "white",
                  color: "primary.main",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
              >
                <Box sx={{ position: "relative", aspectRatio: "1 / 1", bgcolor: "#EDF2F7" }}>
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 900px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Stack spacing={1} sx={{ p: 2.5, flexGrow: 1 }}>
                  <Typography sx={{ color: "#526573", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
                    {member.founderTitle}
                  </Typography>
                  <Typography component="h3" sx={{ fontWeight: 700, fontSize: 20, lineHeight: 1.3 }}>
                    {member.name}
                  </Typography>
                  <Typography sx={{ color: "#526573", fontSize: 14, lineHeight: 1.6 }}>
                    {member.role}
                  </Typography>
                  <Box sx={{ mt: "auto !important", pt: 2.5 }}>
                    <Box
                      component="a"
                      href={member.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${member.name}'s LinkedIn profile (opens in a new tab)`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        minHeight: 44,
                        borderTop: "1px solid #E0E8EF",
                        pt: 1.5,
                        color: "primary.main",
                        fontSize: 14,
                        fontWeight: 700,
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                        "&:focus-visible": { outline: "2px solid #008DE5", outlineOffset: 4, borderRadius: 1 },
                      }}
                    >
                      <FiLinkedin aria-hidden="true" />
                      LinkedIn profile
                      <FiArrowUpRight aria-hidden="true" style={{ marginLeft: "auto" }} />
                    </Box>
                  </Box>
                </Stack>
              </Stack></Reveal>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
