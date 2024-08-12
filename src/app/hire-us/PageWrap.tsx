"use client";
import LandingSpecial from "@/components/LandingSpecial";
import { servicesTitles } from "@/constants/data";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import useHireUs from "./useHireUs";
import { IoCheckmarkCircle } from "react-icons/io5";

const PageWrap = () => {
  const { selected, setSelected, handleClick } = useHireUs();

  return (
    <LandingSpecial
      title="Hire Us"
      subtitle="Get in touch with us for collaborations, inquiries, or to learn more about our services. We're here to assist you!"
    >
      <Box>
        <Typography sx={styles.pTitle}>
          Let’s create amazing projects together{" "}
        </Typography>
        <Box sx={styles.headFlex}>
          <Typography sx={styles.subTitle}>Select Services:</Typography>
          <Button
            sx={styles.selectAllBtn}
            onClick={() => setSelected(servicesTitles)}
          >
            Select all
          </Button>
        </Box>
        <Box sx={styles.servicesWrap}>
          {servicesTitles.map((service) => (
            <Box
              key={service}
              sx={{
                ...styles.serviceBtn,
                borderColor: selected.includes(service) ? "#121279" : "#CED7DE",
              }}
              onClick={() => handleClick(service)}
            >
              <Box
                sx={{
                  ...styles.selectedIconWrap,
                  display: selected.includes(service) ? "block" : "none",
                }}
              >
                <IoCheckmarkCircle style={styles.selectedIcon} />
              </Box>
              <Typography
                sx={{
                  ...styles.serviceBtnText,
                  color: selected.includes(service) ? "#121279" : "#4A5E6D",
                }}
              >
                {service}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography sx={styles.subTitle} mt="60px">
          Your Details:
        </Typography>
        <Grid container spacing={3} mt="15px">
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Typography>Name</Typography>
              <TextField
                size="medium"
                sx={styles.input}
                placeholder="E.g John Doe "
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Typography>Email Address</Typography>
              <TextField
                size="medium"
                sx={styles.input}
                placeholder="E.g Johndeis@gmail.com"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Typography>Company name (optional)</Typography>
              <TextField
                size="medium"
                sx={styles.input}
                placeholder="E.g John Doe "
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Typography>Project Description</Typography>
              <TextField
                size="medium"
                sx={styles.input}
                placeholder="Describe your project here...."
                fullWidth
                multiline
                rows={5}
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Button sx={styles.selectAllBtn} size="large">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LandingSpecial>
  );
};
export default PageWrap;
const styles = {
  pTitle: {
    fontSize: { lg: "36px", md: "36px", sm: "30px", xs: "28px" },
    fontWeight: 700,
    color: "#0A0A0B",
    width: { lg: "470px", md: "470px", sm: "470px" },
  },
  headFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px",
  },
  subTitle: {
    fontSize: "22px",
    fontWeight: 400,
    color: "#323F49",
  },
  selectAllBtn: {
    backgroundColor: "#121279",
    border: "2px solid #AAB9C5",
    transition: "all 0.3s ease-in-out",
    color: "#FAFAFA",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#121279",
      opacity: 0.7,
    },
    px: "30px",
  },
  servicesWrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "15px",
    marginTop: "40px",
  },
  serviceBtn: {
    border: "2px solid #CED7DE",
    borderRadius: "7px",
    padding: "10px",
    cursor: "pointer",
    position: "relative",
  },
  serviceBtnText: {
    fontSize: "16px",
    color: "#4A5E6D",
    fontWeight: 400,
  },
  selectedIconWrap: {
    display: "none",
    position: "absolute",
    top: "-11px",
    right: "-11px",
  },
  selectedIcon: {
    color: "#121279",
    width: "25px",
    height: "25px",
  },
  input: {
    "& .MuiInputBase-root": {
      padding: 0,
      "& .MuiInputBase-inputMultiline": {
        padding: "14px",
      },
    },
    "& .MuiInputBase-input": {
      border: "1px solid #CCCBCB",
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
};
