"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Checkbox,
  TextField,
  Stack,
  FormControlLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { IoMailSharp } from "react-icons/io5";
import Testimonials from "./Testimonials";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import SnackbarComp, { useToast } from "./Toast";

const socials = [
  { icon: FaInstagram },
  { icon: FaXTwitter },
  { icon: FaFacebookF },
  { icon: FaLinkedinIn },
];
const CustomLabel = () => {
  return (
    <Typography sx={styles.customLabel}>
      I agree to Codmify’s{" "}
      <Link href={"/t-and-c"}>
        <Typography sx={styles.subLabel} component={"span"}>
          terms and conditions
        </Typography>
      </Link>
    </Typography>
  );
};

// Define types for form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
      name: "",
      email: "",
      message: "",
    }),
    [loading, setLoading] = useState(false);
  const { handleMessage, handleSnack, snackBarOpen, setSnackBarOpen } =
    useToast();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        handleMessage("success", result.message);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        handleMessage("error", `Error: ${result.message}`);
      }
    } catch (error) {
      handleMessage("error", "Failed to send email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <Container sx={styles.container}>
        <Grid container>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <Box sx={styles.contactInfo}>
              <Box>
                <Typography sx={styles.cTitle}>Contact Us</Typography>
                <Typography sx={styles.cDesc}>
                  Feel free to send a message to us!
                </Typography>
              </Box>
              <Stack gap="20px">
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
              <Box sx={styles.socialIcons}>
                {socials.map((item, index) => (
                  <Box key={index} sx={styles.socialIcon}>
                    <item.icon style={styles.socialSvg} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={8} md={8} sm={6} xs={12}>
            <Box sx={styles.cForm} component={"form"} onSubmit={handleSubmit}>
              <Box width={"100%"}>
                <Typography>Name</Typography>
                <TextField
                  disabled={loading}
                  name="name"
                  size="medium"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="E.g John Doe"
                  fullWidth
                  required
                />
              </Box>
              <Box width={"100%"}>
                <Typography>Email*</Typography>
                <TextField
                  disabled={loading}
                  name="email"
                  size="medium"
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="E.g johndoe@gmail.com"
                  fullWidth
                  required
                />
              </Box>
              <Box width={"100%"}>
                <Typography>Message*</Typography>
                <TextField
                  disabled={loading}
                  name="message"
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
              <Box width={"100%"}>
                <FormControlLabel
                  required
                  control={<Checkbox disabled={loading} required />}
                  label={<CustomLabel />}
                />
              </Box>
              <Box width={"100%"}>
                <Button
                  disabled={loading}
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
                  Submit
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Testimonials />
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
    backgroundColor: "#E7EBEF",
    px: { lg: "40px", md: "40px", sm: "40px", xs: "20px" },
    py: { lg: "30px", md: "30px", sm: "30px", xs: "20px" },
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "30px",
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
