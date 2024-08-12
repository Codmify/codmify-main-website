import { Box, Container, Stack, Typography, Grid, Button } from "@mui/material";
import { qualification, services } from "@/constants/data";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";

const Services = () => {
  return (
    <Box sx={styles.wrapper}>
      <Container>
        <Stack sx={styles.qWrap}>
          {qualification.map((item) => (
            <Box key={item.title} sx={styles.qItem}>
              <Box sx={styles.qIconBox}>
                <item.icon style={styles.qIcon} />
              </Box>
              <Box>
                <Typography sx={styles.qYear}>{item.years}</Typography>
                <Typography sx={styles.qTitle}>{item.title}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Box sx={styles.servicesBlock}>
          <Typography sx={styles.servicesBlockTitle}>Our Services</Typography>
          <Grid container spacing={2}>
            {services.map((item, index) => (
              <Grid item lg={6} md={6} sm={6} xs={12} key={item.title}>
                <Box sx={styles.sItem}>
                  <Box>
                    <Box
                      sx={{
                        ...styles.sIconBox,
                        backgroundColor:
                          index === 1 || index === 2 ? "#0A0A0B" : "#121279",
                      }}
                    >
                      <item.icon style={styles.sIcon} />
                    </Box>
                  </Box>
                  <Typography sx={styles.sTitle}>{item.title}</Typography>
                  <Typography sx={styles.sDesc}>{item.desc}</Typography>
                  <Box sx={{mt: 'auto', display: 'flex'}}>
                    <Typography
                      component={Link}
                      href={""}
                      sx={styles.learnMore}
                    >
                      Learn more
                       <GoArrowRight
                          className="arrowRight"
                          style={styles.learnMoreIcon}
                        />
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={styles.btnWrap}>
            <Button sx={styles.btn} endIcon={<GoArrowRight />}>
              See more{" "}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default Services;

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#fff",
    pt: "4em",
    pb: '5em'
  },
  qWrap: {
    backgroundColor: "#121279",
    borderRadius: "20px",
    flexDirection: "row",
    alignItems: {
      lg: "center",
      md: "center",
      sm: "flex-start",
      xs: "flex-start",
    },
    justifyContent: {
      lg: "space-around",
      md: "space-between",
      sm: "space-between",
      xs: "flex-start",
    },
    padding: "20px",
    gap: "40px",
    flexWrap: "wrap",
    mb: "60px",
  },
  qItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "18px",
  },
  qYear: {
    fontSize: "32px",
    fontWeight: 700,
    color: "#FAFAFA",
  },
  qTitle: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#FAFAFA",
    marginTop: "8px",
    lineHeight: "normal",
  },
  qIconBox: {
    backgroundColor: "#DFDFFA",
    borderRadius: "8px",
    width: "64px",
    height: "64px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  qIcon: {
    width: "30px",
    height: "30px",
    color: "#121279",
  },
  servicesBlock: {
    backgroundColor: "#121279",
    py: { lg: "25px", md: "25px", sm: "20px", xs: "20px" },
    px: { lg: "40px", md: "40px", sm: "20px", xs: "20px" },
    borderRadius: "25px",
  },
  servicesBlockTitle: {
    fontSize: "32px",
    fontWeight: 700,
    color: "#FFFFFF",
    mb: "30px",
    textAlign: "center",
  },
  sItem: {
    backgroundColor: "#F3F3F3",
    borderRadius: "20px",
    display: "flex",
    gap: "18px",
    justifyContent: "flex-start",
    padding: { lg: "20px 35px", md: "20px 35px", sm: "1em", xs: "1em" },
    flexDirection: "column",
    height: "100%",
  },
  sIconBox: {
    width: { lg: "60px", md: "60px", sm: "50px", xs: "40px" },
    height: { lg: "60px", md: "60px", sm: "50px", xs: "40px" },
    borderRadius: "10px",
    backgroundColor: "#121279",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px",
  },
  sTitle: {
    fontSize: { lg: "28px", md: "28px", sm: "25px", xs: "20px" },
    fontWeight: 700,
    color: "#0A0A0B",
  },
  sDesc: {
    fontSize: { lg: "18px", md: "18px", sm: "16px", xs: "15px" },
    fontWeight: 400,
    color: "#4D4D4D",
  },
  sIcon: {
    width: "25px",
    height: "25px",
    color: "#F8F8F8",
  },
  btnWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mt: "50px",
  },
  btn: {
    border: "2px solid #AAB9C5",
    backgroundColor: "#121279",
    borderRadius: "10px",
    px: "25px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#FAFAFA",
    transition: "all .3s linear",
    "&:hover": {
      "& .MuiButton-icon": {
        transition: "all .3s ease-in-out",
        transform: "rotate(-30deg)",
      },
    },
  },
  learnMore: {
    fontSize: "20px",
    fontWeight: 400,
    color: "#121279",
    display: "flex",
    alignItems: "center",
    gap: "7px",
    "&:hover": {
      textDecoration: "none",
      "& .arrowRight": {
        transform: "rotate(-30deg)",
      },
    },
  },
  learnMoreIcon: {
    width: "20px",
    height: "20px",
  color: "#121279",
    transition: "all .3s ease-out",
  },
};
