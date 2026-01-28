"use client";

import { Box, Button, Stack, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { MdArrowUpward } from "react-icons/md";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Tooltip title="Scroll to top">
          <Stack
            component={Button}
            onClick={scrollToTop}
            position={"fixed"}
            bottom={"calc(2% + 70px)"}
            right={"2%"}
            bgcolor={"#121279"}
            p={1}
            minWidth={30}
            width={45}
            height={45}
            sx={{
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 99,
              transition: "all 0.3s ease-in-out",
              animation: "scroll-down 4s infinite ease-out",
              ":hover": {
                bgcolor: "#0F0E5F",
                transform: "scale(1.1)",
              },
            }}
          >
            <MdArrowUpward
              style={{
                fontSize: "24px",
                color: "white",
              }}
            />
          </Stack>
        </Tooltip>
      )}
    </>
  );
}
