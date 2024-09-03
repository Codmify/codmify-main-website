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
} from "@mui/material";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { IoMailSharp } from "react-icons/io5";
import Testimonials from "./Testimonials";

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
      <Typography sx={styles.subLabel} component={"span"}>
        terms and conditions
      </Typography>
    </Typography>
  );
};
const ContactUs = () => {
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
            <Box sx={styles.cForm}>
              <Box width={"100%"}>
                <Typography>Name</Typography>
                <TextField
                  size="medium"
                  sx={styles.input}
                  placeholder="E.g John Doe "
                  fullWidth
                />
              </Box>
              <Box width={"100%"}>
                <Typography>Email*</Typography>
                <TextField
                  size="medium"
                  sx={styles.input}
                  placeholder="E.g johndoe@gmail.com"
                  fullWidth
                />
              </Box>
              <Box width={"100%"}>
                <Typography>Message*</Typography>
                <TextField
                  size="medium"
                  sx={styles.input}
                  placeholder="Write a Message here..."
                  fullWidth
                  multiline
                  rows={5}
                />
              </Box>
              <Box width={"100%"}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={<CustomLabel />}
                />
              </Box>
              <Box width={"100%"}>
                <Button
                  endIcon={<GoArrowRight />}
                  sx={styles.submitBtn}
                  fullWidth
                >
                  {" "}
                  Submit
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Testimonials />
      </Container>
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
