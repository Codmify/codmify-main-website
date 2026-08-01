"use client";

import LandingPage from "@/wrappers/LandingPage";
import { servicesHolder } from "@/utils/services-holder";
import { Box, Button, CircularProgress, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FiArrowRight, FiCheck, FiClock, FiMessageCircle, FiSend } from "react-icons/fi";
import useHireUs from "./useHireUs";
import SnackbarComp, { useToast } from "@/components/Toast";

const servicesTitles = servicesHolder.map((service) => service.title);

const inputStyle = {
  "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "white", "& fieldset": { borderColor: "#D7E2EB" }, "&:hover fieldset": { borderColor: "#008DE5" }, "&.Mui-focused fieldset": { borderColor: "#121279 !important", borderWidth: 2 } },
};

export default function PageWrap() {
  const { selected, setSelected, handleClick } = useHireUs();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", companyName: "", projectDescription: "" });
  const [loading, setLoading] = useState(false);
  const { handleMessage, handleSnack, snackBarOpen, setSnackBarOpen } = useToast();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selected.length === 0) {
      handleMessage("info", "Please choose at least one service.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/hire-us-mail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, category: selected.join(", ") }) });
      if (!response.ok) throw new Error("Request failed");
      handleMessage("success", "Your project enquiry has been sent. We’ll be in touch soon!");
      setFormData({ name: "", email: "", phone: "", companyName: "", projectDescription: "" });
      setSelected([]);
    } catch {
      handleMessage("error", "We couldn’t send your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LandingPage>
      <Box pt={{ xs: 28, md: 19 }} pb={{ xs: 8, md: 11 }} sx={{ background: "#121279 url('/bg-dashed.png')", color: "white" }}>
        <Container maxWidth="lg"><Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={7}><Stack spacing={2.5} maxWidth={680}>
            <Typography color="#51C4FF" fontWeight={700} letterSpacing={1.2}>START A PROJECT</Typography>
            <Typography component="h1" fontSize={{ xs: 38, md: 58 }} lineHeight={1.06} fontWeight={700}>Tell us what you want to build.</Typography>
            <Typography fontSize={{ xs: 17, md: 19 }} color="rgba(255,255,255,.82)">Share a few details and our team will help you turn your idea into a clear, practical next step.</Typography>
          </Stack></Grid>
          <Grid item xs={12} md={5}><Stack p={3} spacing={2} border="1px solid rgba(255,255,255,.20)" borderRadius={4} bgcolor="rgba(255,255,255,.07)">
            {["Clear recommendations tailored to your goals", "A straightforward delivery plan and timeline", "Response from our team within 1–2 business days"].map((item) => <Stack key={item} direction="row" spacing={1.25} alignItems="flex-start"><Box component={FiCheck} color="#51C4FF" fontSize={20} mt="2px" /><Typography>{item}</Typography></Stack>)}
          </Stack></Grid>
        </Grid></Container>
      </Box>

      <Box py={{ xs: 6, md: 10 }} sx={{ backgroundImage: "radial-gradient(circle at 10% 4%, rgba(0,141,229,.1), transparent 23rem), radial-gradient(circle at 95% 70%, rgba(18,18,121,.06), transparent 22rem)" }}>
        <Container maxWidth="lg"><Box component="form" onSubmit={handleSubmit} maxWidth={1040} mx="auto">
          <Stack spacing={1} mb={5}><Typography color="#008DE5" fontWeight={700} letterSpacing={1.2}>PROJECT ENQUIRY</Typography><Typography component="h2" fontSize={{ xs: 30, md: 42 }} color="#121279" fontWeight={700}>A few details to get started.</Typography><Typography color="#526573">Select the areas where you need support, then tell us a little about your project.</Typography></Stack>
          <Stack p={{ xs: 2, md: 4 }} spacing={4} bgcolor="white" border="1px solid #E0E8EF" borderRadius={4} boxShadow="0 14px 36px rgba(18,18,121,.08)">
            <Box><Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} gap={2}><Box><Typography variant="h6" color="#121279" fontWeight={700}>1. What can we help with?</Typography><Typography variant="body2" color="#526573">Choose one or more services.</Typography></Box><Button disabled={loading} onClick={() => setSelected(selected.length === servicesTitles.length ? [] : servicesTitles)} sx={{ color: "#121279", whiteSpace: "nowrap" }}>{selected.length === servicesTitles.length ? "Clear all" : "Select all"}</Button></Stack>
              <Stack direction="row" flexWrap="wrap" gap={1.25}>{servicesHolder.map((service) => { const active = selected.includes(service.title); return <Button key={service.title} type="button" onClick={() => handleClick(service.title)} variant={active ? "contained" : "outlined"} disabled={loading} startIcon={active ? <FiCheck /> : undefined} sx={{ borderColor: active ? "#121279" : "#D7E2EB", bgcolor: active ? "#121279" : "white", color: active ? "white" : "#334957", px: 1.8, "&:hover": { borderColor: "#121279", bgcolor: active ? "#121279" : "#F1F6FA" } }}>{service.title}</Button>; })}</Stack>
            </Box>
            <Box><Typography variant="h6" color="#121279" fontWeight={700}>2. Tell us about your project</Typography><Typography variant="body2" color="#526573" mt={0.4} mb={2}>The more context you share, the better we can prepare.</Typography>
              <Grid container spacing={2.5}>
                {[{ label: "Your name", name: "name", placeholder: "e.g. John Doe", required: true }, { label: "Email address", name: "email", placeholder: "you@company.com", required: true, type: "email" }, { label: "Phone number", name: "phone", placeholder: "e.g. +234 800 000 0000", required: true, type: "tel" }, { label: "Company name", name: "companyName", placeholder: "Optional" }].map((field) => <Grid item xs={12} sm={6} key={field.name}><Typography component="label" htmlFor={field.name} variant="body2" fontWeight={700} color="#334957" mb={0.75} display="block">{field.label}</Typography><TextField id={field.name} name={field.name} type={field.type || "text"} value={formData[field.name as keyof typeof formData]} onChange={handleInputChange} disabled={loading} required={field.required} placeholder={field.placeholder} fullWidth sx={inputStyle} /></Grid>)}
                <Grid item xs={12}><Typography component="label" htmlFor="projectDescription" variant="body2" fontWeight={700} color="#334957" mb={0.75} display="block">What would you like to build?</Typography><TextField id="projectDescription" name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} disabled={loading} required placeholder="Tell us about your idea, audience, preferred timeline or anything else we should know." fullWidth multiline rows={5} sx={inputStyle} /></Grid>
              </Grid>
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" gap={2} pt={1} borderTop="1px solid #E7EDF2"><Stack direction="row" spacing={1} alignItems="center" color="#526573"><FiClock /><Typography variant="body2">We typically reply within 1–2 business days.</Typography></Stack><Button type="submit" disabled={loading} variant="contained" size="large" endIcon={loading ? <CircularProgress color="inherit" size={18} /> : <FiSend />} sx={{ px: 3 }}>Send project enquiry</Button></Stack>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" alignItems="center" spacing={1} mt={3} color="#526573"><FiMessageCircle color="#25D366" size={20} /><Typography variant="body2">Prefer a quick chat?</Typography><Button component="a" href="https://wa.me/2349031874139?text=Hello%20Codmify%20team%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" sx={{ color: "#121279", p: 0, minWidth: "auto" }}>Message us on WhatsApp <FiArrowRight style={{ marginLeft: 5 }} /></Button></Stack>
        </Box></Container>
      </Box>
      <SnackbarComp snackBarOpen={snackBarOpen} setSnackBarOpen={setSnackBarOpen} alert={handleSnack.alert} message={handleSnack.message} />
    </LandingPage>
  );
}
