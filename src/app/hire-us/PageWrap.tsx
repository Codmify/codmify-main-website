"use client";
import LandingSpecial from "@/components/LandingSpecial";
import { servicesTitles } from "@/constants/data";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useHireUs from "./useHireUs";
import { IoCheckmarkCircle } from "react-icons/io5";
import SnackbarComp, { useToast } from "@/components/Toast";

const PageWrap = () => {
  const { selected, setSelected, handleClick } = useHireUs();

  // State for form inputs
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      companyName: "",
      projectDescription: "",
    }),
    [loading, setLoading] = useState(false);

  const { handleMessage, handleSnack, snackBarOpen, setSnackBarOpen } =
    useToast();

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least one service is selected
    if (selected.length === 0) {
      handleMessage("info", "Please select at least one service.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/hire-us-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, category: selected.join(", ") }),
      });

      const result = await response.json();
      if (response.ok) {
        handleMessage(
          "success",
          "Your service request has been sent successfully!"
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          companyName: "",
          projectDescription: "",
        });
        setSelected([]); // Clear selected services
      } else {
        handleMessage(
          "error",
          "Failed to send your request. Please try again."
        );
      }
    } catch (error) {
      handleMessage("error", "Failed to send your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LandingSpecial
      title="Hire Us"
      subtitle="Get in touch with us for collaborations, inquiries, or to learn more about our services. We're here to assist you!"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Typography sx={styles.pTitle}>
          Let’s create amazing projects together{" "}
        </Typography>
        <Box sx={styles.headFlex}>
          <Typography sx={styles.subTitle}>Select Services:</Typography>
          <Button
            disabled={loading}
            sx={styles.selectAllBtn}
            onClick={() =>
              setSelected(
                selected.length === servicesTitles.length ? [] : servicesTitles
              )
            }
          >
            {selected.length === servicesTitles.length
              ? "Unselect all"
              : "Select all"}
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
                disabled={loading}
                size="medium"
                sx={styles.input}
                placeholder="E.g John Doe "
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Typography>Email Address</Typography>
              <TextField
                disabled={loading}
                type="email"
                size="medium"
                sx={styles.input}
                placeholder="E.g Johndeis@gmail.com"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Typography>Phone Number</Typography>
              <TextField
                type="tel"
                disabled={loading}
                size="medium"
                sx={styles.input}
                placeholder="E.g 090xxx5667xxx"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Typography>Company name (optional)</Typography>
              <TextField
                disabled={loading}
                size="medium"
                sx={styles.input}
                placeholder="E.g John Doe "
                fullWidth
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box>
              <Typography>Project Description</Typography>
              <TextField
                disabled={loading}
                size="medium"
                sx={styles.input}
                placeholder="Describe your project here...."
                fullWidth
                multiline
                rows={5}
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Grid>
        </Grid>
        <Stack pt={4} alignItems={"center"}>
          <Button
            disabled={loading}
            sx={{ ...styles.selectAllBtn, width: 200 }}
            size="large"
            type="submit"
            endIcon={
              loading ? <CircularProgress color="info" size={20} /> : <></>
            }
          >
            Submit
          </Button>
        </Stack>
      </Box>

      <SnackbarComp
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        alert={handleSnack.alert}
        message={handleSnack.message}
      />
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
