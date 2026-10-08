"use client";
import LandingPage from "@/wrappers/LandingPage";
import PageIntro from "@/components/PageIntro";
import PhoneField from "@/components/PhoneField";
import usePhoneCountry from "@/components/usePhoneCountry";
import { servicesHolder } from "@/utils/services-holder";
import { validateHire } from "@/lib/contact-validation";
import { Box, Button, CircularProgress, Container, FormHelperText, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import ConsentField from "@/components/ConsentField";
import { FiCheck, FiSend, FiArrowRight, FiMessageCircle } from "react-icons/fi";
import useHireUs from "./useHireUs";
import SnackbarComp, { useToast } from "@/components/Toast";

const titles = servicesHolder.map(service => service.title);
const empty = { name: "", email: "", phone: "", companyName: "", projectDescription: "" };
export default function PageWrap() {
  const { selected, setSelected, handleClick } = useHireUs();
  const { country, setCountry, markCountryTouched } = usePhoneCountry();
  const [data, setData] = useState(empty);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const submitting = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const { handleMessage, handleSnack, snackBarOpen, setSnackBarOpen } = useToast();
  useEffect(() => {
    if (!cooldown) return;
    const timer = setTimeout(() => setCooldown(value => Math.max(0, value - 1)), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);
  function change(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setData(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || cooldown > 0) return;
    const checked = validateHire({ ...data, country, consent, category: selected.join(", ") }, titles);
    setErrors(checked.errors);
    if (!checked.valid) {
      const first = Object.keys(checked.errors)[0];
      const field = form.current?.querySelector<HTMLElement>(first === "category" ? '[data-service="true"]' : `[name="${first}"]`);
      field?.focus({ preventScroll: true });
      field?.scrollIntoView({ block: "center", behavior: "instant" });
      return;
    }
    submitting.current = true;
    setLoading(true);
    try {
      const response = await fetch("/api/hire-us-mail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...checked.data, website }) });
      const result = await response.json();
      if (response.ok) {
        handleMessage("success", result.message);
        setData(empty); setSelected([]); setConsent(false); setCooldown(30);
      } else {
        if (result.errors) setErrors(result.errors);
        if (response.status === 429) setCooldown(Math.min(600, Math.max(30, Number(response.headers.get("Retry-After")) || 60)));
        handleMessage("error", result.message || "Unable to send your enquiry. Please try again.");
      }
    } catch {
      handleMessage("error", "We couldn’t confirm delivery. Your enquiry is saved here; please wait before trying again.");
      setCooldown(30);
    } finally { submitting.current = false; setLoading(false); }
  }
  return <LandingPage>
    <PageIntro label="START A PROJECT" title="Tell us what you want to build." description="Share a few details and we’ll help you turn your idea into a clear, practical next step." />
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "#EDF2F7" }}><Container maxWidth="lg">
      <Grid container spacing={{ xs: 4, md: 5 }} sx={{ alignItems: "stretch" }}>
        <Grid size={{ xs: 12, md: 4 }} sx={{ order: { xs: 2, md: 1 } }}>
          <Stack data-hire-sidebar spacing={3} sx={{ position: { md: "sticky" }, top: 160, maxHeight: { md: "calc(100dvh - 184px)" }, overflowY: { md: "auto" }, scrollbarWidth: "thin", pr: { md: 1 } }}>
            <Typography sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5, fontSize: ".8125rem" }}>LET’S BUILD SOMETHING USEFUL</Typography>
            <Typography component="h2" sx={{ color: "primary.main", fontWeight: 700, fontSize: { xs: "1.75rem", md: "2.25rem" }, lineHeight: 1.2 }}>A good project starts with a conversation.</Typography>
            <Typography sx={{ color: "text.secondary" }}>You don’t need a finished brief. Tell us where you are and what you want to achieve.</Typography>
            <Stack spacing={2.5} sx={{ py: 2 }}>
              {[["01", "Share your idea", "Choose the services you’re considering."], ["02", "Tell us a little more", "Help us understand your business and goals."], ["03", "Plan the next step", "We’ll review your enquiry and get in touch."]].map(([number, title, detail]) => <Stack key={number} direction="row" spacing={2}>
                <Box sx={{ width: 36, height: 36, borderRadius: "50%", bgcolor: "white", color: "primary.main", border: "1px solid #D7E2EB", display: "grid", placeItems: "center", flexShrink: 0, fontSize: ".75rem", fontWeight: 700 }}>{number}</Box>
                <Box><Typography sx={{ color: "primary.main", fontWeight: 700 }}>{title}</Typography><Typography sx={{ color: "text.secondary", fontSize: ".875rem" }}>{detail}</Typography></Box>
              </Stack>)}
            </Stack>
            <Box sx={{ p: 3, borderRadius: "12px", bgcolor: "primary.main", color: "white" }}>
              <FiMessageCircle size={24} aria-hidden="true" />
              <Typography sx={{ fontWeight: 700, mt: 1.5 }}>Prefer a quick chat?</Typography>
              <Typography sx={{ fontSize: ".875rem", color: "#D7E6FF", mt: 1 }}>Talk through your idea with us on WhatsApp.</Typography>
              <Button component="a" href="https://wa.me/2349031874139?text=Hello%20Codmify%20team%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" endIcon={<FiArrowRight />} sx={{ color: "white", px: 0, mt: 1 }}>Start a conversation</Button>
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }} sx={{ order: { xs: 1, md: 2 } }}>
      <Box component="form" ref={form} noValidate onSubmit={submit} aria-busy={loading} sx={{ position: "relative", width: "100%", mx: "auto", bgcolor: "white", border: "1px solid #E0E8EF", borderRadius: "12px", p: { xs: 3, md: 5 } }}>
        <Stack spacing={4}>
          <Box><Typography component="h2" sx={{ color: "primary.main", mb: 1, fontWeight: 700, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>Your project enquiry</Typography><Typography sx={{ color: "text.secondary" }}>Choose the services you need, then tell us about your project.</Typography></Box>
          <Box component="fieldset" sx={{ border: 0, minWidth: 0 }}>
            <Typography component="legend" sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}>What can we help with? *</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 1.5 }}>
              {titles.map(title => <Button key={title} data-service="true" type="button" aria-pressed={selected.includes(title)} aria-describedby={errors.category ? "service-error" : undefined} disabled={loading} variant="outlined" startIcon={<Box sx={{ width: 22, height: 22, borderRadius: "6px", border: selected.includes(title) ? "1px solid #121279" : "1px solid #BCCBD8", bgcolor: selected.includes(title) ? "primary.main" : "white", display: "grid", placeItems: "center", color: "white" }}>{selected.includes(title) && <FiCheck size={14} />}</Box>} sx={{ minHeight: 60, textAlign: "left", justifyContent: "flex-start", px: 2, py: 1.5, fontSize: ".875rem", borderColor: selected.includes(title) ? "primary.main" : "#D7E2EB", bgcolor: selected.includes(title) ? "#F0F3FF" : "white", "&:hover": { bgcolor: "#F0F3FF", borderColor: "primary.main" } }} onClick={() => { handleClick(title); setErrors(previous => ({ ...previous, category: undefined })); }}>{title}</Button>)}
            </Box>
            <Button type="button" disabled={loading} sx={{ px: 0, mt: 1 }} onClick={() => { setSelected(selected.length === titles.length ? [] : titles); setErrors(previous => ({ ...previous, category: undefined })); }}>{selected.length === titles.length ? "Clear all" : "Select all"}</Button>
            {errors.category && <FormHelperText error id="service-error">{errors.category}</FormHelperText>}
          </Box>
          <Box sx={{ borderTop: "1px solid #E0E8EF", pt: 4 }}>
          <Typography component="h3" sx={{ fontSize: "1rem", fontWeight: 700, color: "primary.main", mb: 3 }}>Your contact details</Typography>
          <Grid container spacing={3}>
            {[{ name: "name", label: "Your name", required: true, max: 100, complete: "name" }, { name: "email", label: "Email address", required: true, max: 254, complete: "email" }, { name: "companyName", label: "Company name (optional)", max: 150, complete: "organization" }].map(field => <Grid key={field.name} size={{ xs: 12, sm: field.name === "companyName" ? 12 : 6 }}>
              <TextField fullWidth name={field.name} label={field.label} required={field.required} type={field.name === "email" ? "email" : "text"} value={data[field.name as keyof typeof data]} onChange={change} disabled={loading} error={Boolean(errors[field.name])} helperText={errors[field.name]} slotProps={{ htmlInput: { maxLength: field.max, autoComplete: field.complete } }} />
            </Grid>)}
            <Grid size={12}><PhoneField country={country} value={data.phone} disabled={loading} error={errors.phone} countryError={errors.country} onCountryChange={value => { markCountryTouched(); setCountry(value); setErrors(previous => ({ ...previous, country: undefined, phone: undefined })); }} onChange={value => { markCountryTouched(); setData(previous => ({ ...previous, phone: value })); setErrors(previous => ({ ...previous, phone: undefined })); }} /></Grid>
            <Grid size={12}><Typography component="h3" sx={{ fontSize: "1rem", fontWeight: 700, color: "primary.main", mt: 1, mb: 2 }}>Tell us about your project</Typography><TextField name="projectDescription" label="What would you like to build?" placeholder="Tell us about your idea, audience and preferred timeline." required fullWidth multiline rows={5} value={data.projectDescription} onChange={change} disabled={loading} error={Boolean(errors.projectDescription)} helperText={errors.projectDescription || "10–5,000 characters."} slotProps={{ htmlInput: { maxLength: 5000 } }} /></Grid>
          </Grid></Box>
          <Box sx={{ position: "absolute", top: 0, left: 0, width: "1px", height: "1px", overflow: "hidden", clipPath: "inset(50%)", pointerEvents: "none" }} aria-hidden="true"><input name="website" aria-label="Leave this field empty" autoComplete="off" tabIndex={-1} value={website} onChange={event => setWebsite(event.target.value)} /></Box>
          <ConsentField checked={consent} disabled={loading} error={errors.consent} onChange={value => { setConsent(value); setErrors(previous => ({ ...previous, consent: undefined })); }} />
          <Button type="submit" disabled={loading || cooldown > 0} variant="contained" endIcon={loading ? <CircularProgress color="inherit" size={18} /> : <FiSend />} sx={{ width: "100%", minHeight: 52 }}>{loading ? "Sending…" : cooldown > 0 ? `Please wait ${cooldown}s` : "Send project enquiry"}</Button>
        </Stack>
      </Box>
        </Grid>
      </Grid>
    </Container></Box>
    <SnackbarComp snackBarOpen={snackBarOpen} setSnackBarOpen={setSnackBarOpen} alert={handleSnack.alert} message={handleSnack.message} />
  </LandingPage>;
}
