"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { BiSolidPhoneCall } from "react-icons/bi";
import { GoArrowRight } from "react-icons/go";
import { IoMailSharp } from "react-icons/io5";
// import Testimonials from "./Testimonials";
import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import SnackbarComp, { useToast } from "./Toast";
import { socials } from "@/utils/nav-menus";
import Reveal from "./motion/Reveal";
import ConsentField from "./ConsentField";
import PhoneField from "./PhoneField";
import usePhoneCountry from "./usePhoneCountry";
import { validateContact, type ContactErrors } from "@/lib/contact-validation";

// Define types for form data
interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
      name: "",
      email: "",
      message: "",
      phone: "",
    }),
    [loading, setLoading] = useState(false);
  const { handleMessage, handleSnack, snackBarOpen, setSnackBarOpen } =
    useToast();

  const { country, setCountry, markCountryTouched } = usePhoneCountry();
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [website, setWebsite] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    if (!cooldown) return;
    const timer = setTimeout(() => setCooldown(value => Math.max(0, value - 1)), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") markCountryTouched();
    setFormData(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current || cooldown > 0) return;
    const checked = validateContact({ ...formData, country, consent });
    setErrors(checked.errors);
    if (!checked.valid) {
      const first = Object.keys(checked.errors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...checked.data, website }),
      });
      const result = await response.json();
      if (response.ok) {
        handleMessage("success", result.message);
        setFormData({ name: "", email: "", message: "", phone: "" });
        setConsent(false);
        setCooldown(30);
      } else {
        if (result.errors) setErrors(result.errors);
        if (response.status === 429) setCooldown(Math.min(600, Math.max(30, Number(response.headers.get("Retry-After")) || 60)));
        handleMessage("error", result.message || "Unable to send your message. Please try again.");
      }
    } catch {
      handleMessage("error", "We couldn’t confirm delivery. Your message is saved here; please wait before trying again.");
      setCooldown(30);
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.wrapper} id="contact-us">
      <Container sx={styles.container}>
        <Reveal>
        <Grid container>
          <Grid
            size={{
              lg: 4,
              md: 4,
              sm: 6,
              xs: 12
            }}>
            <Box sx={styles.contactInfo}>
              <Box>
                <Typography sx={styles.cTitle}>Contact Us</Typography>
                <Typography sx={styles.cDesc}>
                  Feel free to send a message to us!
                </Typography>
              </Box>
              <Stack sx={{
                gap: "20px"
              }}>
                <Box sx={styles.inlineFlex}>
                  <BiSolidPhoneCall style={styles.inlineIcon} />
                  <Typography style={styles.inlineText}>
                    +234 903 187 4139
                  </Typography>
                </Box>
                <Box sx={styles.inlineFlex}>
                  <IoMailSharp style={styles.inlineIcon} />
                  <Typography style={styles.inlineText}>
                    codmify@gmail.com
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                sx={{
                  gap: 1,
                  flexWrap: "wrap"
                }}>
                {socials.map((item, id) => (
                  <a href={item.url} target="_blank" key={id}>
                    <Box
                      component={"img"}
                      src={item.image}
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%"
                      }} />
                  </a>
                ))}
              </Stack>
            </Box>
          </Grid>
          <Grid
            size={{
              lg: 8,
              md: 8,
              sm: 6,
              xs: 12
            }}>
            <Box sx={styles.cForm} component={"form"} ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={loading}>
              <Box sx={{ position: "absolute", top: 0, left: 0, width: "1px", height: "1px", overflow: "hidden", clipPath: "inset(50%)", pointerEvents: "none" }} aria-hidden="true">
                <input name="website" aria-label="Leave this field empty" value={website} onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
              </Box>
              <Box sx={{
                width: "100%"
              }}>

                <TextField
                  disabled={loading}
                  name="name"
                  label="Name"
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  slotProps={{ htmlInput: { maxLength: 100, autoComplete: "name" } }}
                  size="medium"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="E.g John Doe"
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{
                width: "100%"
              }}>

                <TextField
                  disabled={loading}
                  name="email"
                  label="Email"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  slotProps={{ htmlInput: { maxLength: 254, autoComplete: "email" } }}
                  size="medium"
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="E.g johndoe@gmail.com"
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{
                width: "100%"
              }}>
                <PhoneField country={country} disabled={loading} value={formData.phone} error={errors.phone} countryError={errors.country}
                  onCountryChange={value => { markCountryTouched(); setCountry(value); setErrors(previous => ({ ...previous, phone: undefined, country: undefined })); }}
                  onChange={value => { markCountryTouched(); setFormData(previous => ({ ...previous, phone: value })); setErrors(previous => ({ ...previous, phone: undefined })); }} />
              </Box>
              <Box sx={{
                width: "100%"
              }}>

                <TextField
                  disabled={loading}
                  name="message"
                  label="Message"
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                  slotProps={{ htmlInput: { maxLength: 5000 } }}
                  size="medium"
                  onChange={handleChange}
                  value={formData.message}
                  placeholder="Write a Message here..."
                  fullWidth
                  multiline
                  rows={5}
                  required
                />
              </Box>
              <Box sx={{
                width: "100%"
              }}>
                <ConsentField checked={consent} disabled={loading} error={errors.consent} onChange={value => { setConsent(value); setErrors(previous => ({ ...previous, consent: undefined })); }} />
              </Box>
              <Box sx={{
                width: "100%"
              }}>
                <Button
                  disabled={loading || cooldown > 0}
                  variant="contained"
                  type="submit"
                  endIcon={
                    loading ? (
                      <CircularProgress color="info" size={20} />
                    ) : (
                      <GoArrowRight />
                    )
                  }
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  {loading ? "Sending…" : cooldown > 0 ? `Please wait ${cooldown}s` : "Send message"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        </Reveal>
        {/* <Testimonials /> */}
      </Container>

      <SnackbarComp
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        alert={handleSnack.alert}
        message={handleSnack.message}
      />
    </Box>
  );
};
export default ContactUs;

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#fff",
    py: "4em",
  },
  container: {
    minHeight: "70vh",
  },
  flexBox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: "10px",
    overflow: "hidden",
  },
  contactInfo: {
    padding: { lg: "30px", md: "30px", sm: "30px", xs: "20px" },
    backgroundColor: "#121279",
    display: "flex",
    flexDirection: "column",
    gap: "70px",
    height: "100%",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: { lg: "10px", md: "10px", sm: "10px", xs: 0 },
    borderTopRightRadius: { lg: 0, md: 0, sm: 0, xs: "10px" },
  },
  cTitle: {
    fontSize: "28px",
    fontWeight: 600,
    color: "#FFFFFF",
  },
  cDesc: {
    fontSize: "18px",
    fontWeight: 400,
    color: "#C9C9C9",
    marginTop: "15px",
  },
  cForm: {
    position: "relative",
    backgroundColor: "#E7EBEF",
    px: { lg: "40px", md: "40px", sm: "40px", xs: "20px" },
    py: { lg: "30px", md: "30px", sm: "30px", xs: "20px" },
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "1rem",
    height: "100%",
    borderTopRightRadius: { lg: "10px", md: "10px", sm: "10px", xs: 0 },
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: { lg: 0, md: 0, sm: 0, xs: "10px" },
  },
  inlineFlex: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "15px",
  },
  inlineIcon: {
    width: "24px",
    height: "24px",
    color: "#FFFFFF",
  },
  inlineText: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#FFFFFF",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "18px",
  },
  socialIcon: {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: "25px",
  },
  socialSvg: {
    color: "#121279",
    width: "15px",
    height: "15px",
  },
  inputLabel: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#4A5E6D",
    mb: "10px",
  },
  input: {
    "& .MuiInputBase-root": {
      padding: 0,
      "& .MuiInputBase-inputMultiline": {
        padding: "14px",
      },
    },
    "& .MuiInputBase-input": {
      border: "1px solid #BEBEF6",
      borderRadius: "14px",
      backgroundColor: "#FFFFFF",
      "&::placeholder": { color: "#898989" },
      "&:focus": {
        border: "2px solid #121279",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  customLabel: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#4A5E6D",
  },
  subLabel: {
    color: "#2020DB",
    fontStyle: "italic",
    position: "relative",
    "&::after": {
      position: "absolute",
      content: '""',
      height: "1px",
      width: "100%",
      bottom: 0,
      right: 0,
      backgroundColor: "#2020DB",
    },
  },
  submitBtn: {
    backgroundColor: "#121279",
    border: "2px solid #121279",
    fontSize: "16px",
    color: "#FAFAFA",
    fontWeight: 700,
    transition: "all .3s ease-out",
    "&:hover": {
      backgroundColor: "#121279",
      opacity: 0.7,
      "& .MuiButton-icon": {
        transition: "all .3s ease-in-out",
        transform: "rotate(-30deg)",
      },
    },
  },
};
