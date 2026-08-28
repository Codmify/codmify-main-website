"use client";

import { useCurrency } from "@/contexts/CurrencyContext";
import { getLowestStartingPrice, getPackageDisplayPrice, getPackageWhatsAppUrl, websitePackages } from "@/utils/packages";
import { Box, Button, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";
import Reveal from "./motion/Reveal";

type PackagesProps = { compact?: boolean };

export default function Packages({ compact = false }: PackagesProps) {
  const currency = useCurrency();

  return (
    <Box component="section" id="packages" py={{ xs: 7, md: 10 }} sx={{ backgroundColor: compact ? "#F4F7FA" : "#FAFCFF", backgroundImage: "radial-gradient(circle at 8% 25%, rgba(0, 141, 229, .10), transparent 23rem), radial-gradient(circle at 93% 75%, rgba(18, 18, 121, .08), transparent 22rem)" }}>
      <Container maxWidth="lg">
        <Reveal>
        <Stack alignItems="center" textAlign="center" spacing={1.5} mb={{ xs: 4, md: 6 }}>
          <Typography variant="h3" fontWeight={700} color="#121279" fontSize={{ xs: 30, md: 42 }}>
            Smart websites from {getLowestStartingPrice(currency)}
          </Typography>
          <Typography color="#4A5E6D" maxWidth={650}>
            Choose a package that fits where your business is today. Every plan is built for speed, security and mobile visitors.
          </Typography>
        </Stack>
        </Reveal>
        <Grid container spacing={3} alignItems="stretch">
          {websitePackages.map((pkg, index) => {
            const displayPrice = getPackageDisplayPrice(pkg, currency);
            return (
              <Grid key={pkg.name} item xs={12} sm={6} lg={3} display="flex">
                <Reveal delay={index * 0.1}>
                <Stack width="100%" p={3} spacing={2} border="1px solid" borderColor={pkg.featured ? "#121279" : "#D7E0E7"} borderRadius={4} bgcolor="white" position="relative" overflow="hidden" boxShadow={pkg.featured ? "0 12px 30px rgba(18,18,121,.16)" : "0 8px 24px rgba(22, 64, 98, .06)"} sx={{ transition: "transform .25s ease, box-shadow .25s ease", "&::before": { content: '""', position: "absolute", width: 160, height: 160, borderRadius: "50%", top: -90, right: -70, background: pkg.featured ? "rgba(0, 141, 229, .12)" : "rgba(0, 141, 229, .07)" }, "&::after": { content: '""', position: "absolute", width: 85, height: 85, borderRadius: "50%", bottom: -45, left: -35, border: "18px solid rgba(18, 18, 121, .04)" }, "& > *": { position: "relative", zIndex: 1 }, "&:hover": { transform: "translateY(-6px)", boxShadow: "0 16px 32px rgba(18, 18, 121, .14)" } }}>
                  {pkg.featured && <Chip label="MOST POPULAR" color="primary" size="small" sx={{ alignSelf: "flex-start" }} />}
                  <Box>
                    <Typography variant="h5" fontWeight={700} color="#121279">{pkg.name}</Typography>
                    <Typography variant="body2" color="#4A5E6D" mt={1} minHeight={compact ? 64 : 78}>{pkg.audience}</Typography>
                  </Box>
                  <Box>
                    {!pkg.customQuote && <Typography variant="caption" fontWeight={700} color="#4A5E6D">STARTING FROM</Typography>}
                    <Typography fontSize={{ xs: 30, md: 34 }} lineHeight={1.15} fontWeight={700} color="#008DE5">{displayPrice}</Typography>
                  </Box>
                  <Typography variant="body2" color="#4A5E6D">{pkg.intro}</Typography>
                  <Stack spacing={1} flexGrow={1}>
                    {pkg.features.map((feature) => <Stack key={feature} direction="row" spacing={0.8} alignItems="flex-start"><IoCheckmarkCircle color="#008DE5" size={18} style={{ marginTop: 2, flexShrink: 0 }} /><Typography variant="body2">{feature}</Typography></Stack>)}
                  </Stack>
                  <Box pt={1} borderTop="1px solid #E3E9EE">
                    <Typography variant="caption" fontWeight={700} color="#4A5E6D">TIMELINE</Typography>
                    <Typography variant="body2" fontWeight={600}>{pkg.timeline}</Typography>
                  </Box>
                  <Button component="a" href={getPackageWhatsAppUrl(pkg, displayPrice)} target="_blank" rel="noreferrer" variant="contained" size="large">{pkg.cta}</Button>
                  {pkg.sample && <Link href={pkg.sample.url} target="_blank" style={{ textAlign: "center", color: "#121279", fontSize: 14, fontWeight: 700 }}>{pkg.sample.label}</Link>}
                </Stack>
                </Reveal>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
