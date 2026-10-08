"use client";
import { AnniversaryBanner, AnniversaryBadge } from "./Anniversary";
import { navLinks } from "@/utils/nav-menus";
import { Box, Button, Container, Drawer, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = navLinks.filter(item => item.url !== "/hire-us");
  return <Box component="nav" aria-label="Main navigation" sx={{ position: "fixed", top: 0, width: "100%", zIndex: 1200, bgcolor: "white", borderBottom: "1px solid #E0E8EF" }}>
    <AnniversaryBanner />
    <Container maxWidth="lg"><Stack direction="row" sx={{ minHeight: { xs: 80, md: 96 }, gap: 3, alignItems: "center", justifyContent: "space-between" }}>
      <Link href="/" aria-label="Codmify home" style={{ display: "flex", alignItems: "center", gap: 12 }}><Image alt="Codmify" src="/brand/logo-2.png" width={146} height={28} /><Box sx={{ display: { xs: "none", sm: "block" } }}><AnniversaryBadge /></Box></Link>
      <Stack direction="row" spacing={3} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
        {links.map(item => <Box component={Link} key={item.url} href={item.url} aria-current={pathname === item.url ? "page" : undefined} sx={{ minHeight: 48, display: "flex", alignItems: "center", fontSize: ".875rem", fontWeight: pathname === item.url ? 700 : 500, color: "primary.main", borderBottom: pathname === item.url ? "2px solid #121279" : "2px solid transparent" }}>{item.label}</Box>)}
        <Button component={Link} href="/hire-us" variant="contained">Discuss a project</Button>
      </Stack>
      <IconButton aria-label="Open navigation menu" aria-expanded={open} aria-controls={open ? "mobile-navigation" : undefined} onClick={() => setOpen(true)} sx={{ display: { md: "none" }, width: 48, height: 48, color: "primary.main" }}><FiMenu /></IconButton>
    </Stack></Container>
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Stack id="mobile-navigation" spacing={2} sx={{ width: "min(320px, 100vw)", p: 3 }}>
        <IconButton aria-label="Close navigation menu" onClick={() => setOpen(false)} sx={{ alignSelf: "flex-end", width: 48, height: 48 }}><FiX /></IconButton>
        {links.map(item => <Button component={Link} key={item.url} href={item.url} onClick={() => setOpen(false)} aria-current={pathname === item.url ? "page" : undefined} sx={{ justifyContent: "flex-start", bgcolor: pathname === item.url ? "#EDF2F7" : undefined }}>{item.label}</Button>)}
        <Button component={Link} href="/hire-us" onClick={() => setOpen(false)} variant="contained">Discuss a project</Button>
      </Stack>
    </Drawer>
  </Box>;
}
