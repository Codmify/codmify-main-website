import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function PromoBar() {
  return (
    <Stack className="promo-bar" position="fixed" top={0} left={0} zIndex={200} width="100%" height={{ xs: "86px", sm: "52px", md: "44px" }} direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="center" spacing={{ xs: 0.35, sm: 1.5 }} px={{ xs: 1.5, sm: 2 }} color="white">
      <Typography position="relative" zIndex={1} fontSize={{ xs: 14, sm: 15 }} fontWeight={700} lineHeight={1.2} textAlign="center">
        <Box component="span" display={{ xs: "inline", md: "none" }}>Limited offer · Websites from ₦50,000</Box>
        <Box component="span" display={{ xs: "none", md: "inline" }}>Limited-time offer: professional websites from ₦50,000</Box>
      </Typography>
      <Button component={Link} href="/pricing" size="small" variant="outlined" sx={{ position: "relative", zIndex: 1, minHeight: { xs: 31, sm: "auto" }, px: { xs: 2.25, sm: 1.5 }, color: "white", borderColor: "white", whiteSpace: "nowrap", fontWeight: 700, "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,.12)" } }}>View packages</Button>
    </Stack>
  );
}
