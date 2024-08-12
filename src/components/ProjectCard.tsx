import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { GoArrowRight } from "react-icons/go";

type direction = "row-reverse" | "row" 
interface Prop {
  title: string;
  desc: string;
  additionDesc: string;
  img: string;
  reverse: direction;
}
const ProjectCard = ({ title, desc, additionDesc, img, reverse }: Prop) => {
  return (
    <Grid container spacing={4}   direction={reverse }>
      <Grid item lg={7} md={7} sm={7} xs={12}>
        <Box sx={styles.cardImg}>
          <Image src={img} alt={title} fill />
        </Box>
      </Grid>
      <Grid item lg={5} md={5} sm={5} xs={12}>
        <Box sx={styles.cardContent}>
          <Typography style={styles.cardTitle}>{title}</Typography>
          <Typography style={styles.cardDesc}>{desc}</Typography>
          <Typography style={styles.cardDesc}>{additionDesc}</Typography>
          <Box sx={styles.cardBtnFlex}>
            <Button sx={styles.btnFilled} endIcon={<GoArrowRight />}>
              Hire Us
            </Button>
            <Button sx={styles.btnOutlined} endIcon={<GoArrowRight />}>
              Learn more
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProjectCard;
const styles = {
  card: {
    display: "flex",
    justifyContent: {
      lg: "space-between",
      md: "space-between",
      sm: "space-between",
      xs: "flex-start",
    },
    alignItems: "flex-start",
    flexDirection: { lg: "row", md: "row", sm: "row", xs: "column" },
    gap: "25px",
  },
  cardImg: {
    width: "100%",
    height: {lg: "100%", md: "100%", sm: "100%", xs: "370px"},
    position: "relative",
    borderRadius: '10px',
    overflow: "hidden"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cardTitle: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#0A0A0B",
  },
  cardDesc: {
    fontSize: "18px",
    fontWeight: 400,
    color: "#4D4D4D",
  },
  cardBtnFlex: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "18px",
  },
  btnFilled: {
    backgroundColor: "#121279",
    border: "2px solid #AAB9C5",
    transition: "all 0.3s ease-in-out",
    color: "#FAFAFA",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#121279",
      opacity: 0.7,
      "& .MuiButton-icon": {
        transition: "all .3s ease-in-out",
        transform: "rotate(-30deg)",
      },
    },
    px: "20px",
  },
  btnOutlined: {
    backgroundColor: "#DFDFFA",
    border: "2px solid #AAB9C5",
    borderRadius: "10px",
    transition: "all .3s ease-in-out",
    color: "#121279",
    "&:hover": {
      backgroundColor: "#DFDFFA",
      opacity: 0.7,
      "& .MuiButton-icon": {
        transition: "all .3s ease-in-out",
        transform: "rotate(-30deg)",
      },
    },
    px: "20px",
  },
};
