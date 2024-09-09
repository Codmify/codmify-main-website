import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <Box sx={styles.wrapper}>
      <Container maxWidth="lg" sx={styles.container}>
        <Box sx={styles.tagWrap}>
          <Box sx={styles.iconWrap}>
            <Image
              src={"/web-dev.svg"}
              alt="web-dev"
              objectFit="contain"
              fill
            />
          </Box>
          <Typography sx={styles.tagText}>Web development</Typography>
        </Box>
        <Box sx={styles.tagWrap}>
          <Box sx={styles.iconWrap}>
            <Image src={"/UI.svg"} alt="web-dev" objectFit="contain" fill />
          </Box>
          <Typography sx={styles.tagText}>UI/UX Design</Typography>
        </Box>
        <Stack sx={styles.stackWrap}>
          <Box>
            <Typography sx={styles.title}>
              Elevate Your Business with Expert IT Solutions
            </Typography>
            <Typography sx={styles.desc}>
              Delivering innovative and reliable IT services tailored to your
              needs, all at a reasonable cost
            </Typography>
          </Box>
          <Box sx={styles.btnWrap}>
            <Link href={"/hire-us"}>
              <Button sx={styles.startBtn} size="large">
                Get Started
              </Button>
            </Link>
          </Box>
        </Stack>
        <Box sx={styles.tagWrap}>
          <Box sx={styles.iconWrap}>
            <Image
              src={"/marketing.svg"}
              alt="web-dev"
              objectFit="contain"
              fill
            />
          </Box>
          <Typography sx={styles.tagText}>Marketing</Typography>
        </Box>
        <Box sx={styles.tagWrap}>
          <Box sx={styles.iconWrap}>
            <Image src={"/PM.svg"} alt="web-dev" objectFit="contain" fill />
          </Box>
          <Typography sx={styles.tagText}>Project Management</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;

const styles = {
  wrapper: {
    backgroundColor: "#121279",
    paddingTop: { lg: "130px", md: "120px", sm: "80px" },
  },
  container: {
    minHeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: {
      lg: "flex-start",
      md: "flex-start",
      sm: "flex-start",
      xs: "center",
    },
    position: "relative",
    paddingTop: "8em",
    backgroundImage: "url('/grid.png')",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  title: {
    textAlign: "center",
    fontSize: { lg: "56px", md: "56px", sm: "45px", xs: "32px" },
    fontWeight: 700,
    color: "#FAFAFA",
  },
  desc: {
    color: "#FAFAFA",
    fontSize: "18px",
    fontWeight: 400,
    textAlign: "center",
    marginTop: "15px",
  },
  stackWrap: {
    width: { lg: "760px", md: "760px", sm: "100%", xs: "100%" },
    gap: "30px",
  },
  btnWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  startBtn: {
    color: "#FAFAFA",
    border: "2px solid #AAB9C5",
    backgroundColor: "#121279",
    borderRadius: "10px",
    px: "30px",
    fontSize: "18px",
    fontWeight: 700,
  },
  tagWrap: {
    border: "2px solid #FFFFFF36",
    display: { lg: "flex", md: "flex", xs: "none" },
    justifyContent: "flex-start",
    alignItems: "center",
    width: "auto",
    padding: "10px",
    backgroundColor: "#FAFAFA",
    gap: "5px",
    borderTopLeftRadius: "25px",
    borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
    position: "absolute",
    top: { lg: "100px", md: "35px", sm: "30px", xs: "30px" },
    left: "30px",
    transform: "rotate(21deg)",
    "&:nth-of-type(2)": {
      top: "auto",
      bottom: { lg: "20%", md: "210px", sm: "200px", xs: "200px" },
      transform: "rotate(342deg)",
      left: "40px",
    },
    "&:nth-of-type(4)": {
      top: { lg: "100px", md: "45px", sm: "40px", xs: "40px" },
      transform: "rotate(342deg)",
      right: "35px",
      left: "auto",
    },
    "&:nth-of-type(5)": {
      top: "auto",
      transform: "rotate(23deg)",
      right: "35px",
      left: "auto",
      bottom: { lg: "20%", md: "200px", sm: "200px", xs: "200px" },
    },
  },
  iconWrap: {
    width: "17px",
    height: "17px",
    position: "relative",
  },
  tagText: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#323F49",
    textWrap: "nowrap",
  },
};
