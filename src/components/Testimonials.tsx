"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { testimonials } from "@/constants/data";
import Image from "next/image";

const Testimonials = () => {
  return (
    <Box mt="4em">
      <Swiper
        spaceBetween={"30px"}
        slidesPerView={"auto"}
        navigation={true}
        loop={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.name}>
            <Box sx={styles.card}>
              <Box sx={styles.cardImgWrap}>
                <Box sx={styles.cardImg}>
                  <Image src={testimonial.img} alt="testimonial" fill />
                </Box>
              </Box>
              <Typography sx={styles.desc}>
                <Box component={"span"} sx={styles.quote} />
                {testimonial.desc}
              </Typography>
              <Box mt="auto">
                <Typography sx={styles.name}>{testimonial.name}</Typography>
                <Typography sx={styles.role}>{testimonial.position}</Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Testimonials;

const styles = {
  wrapper: {
    marginTop: "3em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    border: "2.51px solid #0A0A0B",
    position: "relative",
    borderRadius: "25px",
    minHeight: "311px",
    width: "366px",
    py: "20px",
    px: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    textAlign: "center",
  },
  cardImgWrap: {
    width: "70px",
    height: "70px",
    backgroundColor: "#DFDFFA",
    border: "3px solid #121279",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50px",
    marginTop: "-4em",
  },
  cardImg: {
    width: "47px",
    height: "48px",
    position: "relative",
  },
  desc: {
    position: "relative",
    fontSize: "16px",
    fontWeight: 400,
    color: "#0A0A0B",
    textAlign: "center",
  },
  quote: {
    display: "block",
    backgroundImage: "url('/quote.svg')",
    width: "29px",
    height: "23px",
  },
  name: {
    fontSize: "23px",
    fontWeight: 700,
    color: "#121279",
  },
  role: {
    fontWeight: 400,
    fontSize: "13px",
    color: "#0A0A0B",
  },
};
