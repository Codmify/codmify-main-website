"use client";

import React from "react";
import { Modal, Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Confetti from "./Confetti";

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({ isOpen, onClose }) => (
  <Modal open={isOpen} onClose={onClose}>
    <Box
      component={motion.div}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "100%", sm: 400, md: 600 },
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 12,
        p: 2,
        ":focus-visible": {
          outline: "none !important",
        },
      }}
      initial={{ opacity: 0, scale: 0.8, transform: "translate(-50%, -50%)" }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transform: "translate(-50%, -50%)" }}
      transition={{ duration: 1 }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" textAlign={"center"}>
          Codmify Hub is Live🎉
        </Typography>
        <Box
          component={"img"}
          borderRadius={"8px"}
          src="/welcome.png"
          width={"100%"}
        />
      </Stack>

      <Confetti />
    </Box>
  </Modal>
);

export default AnimatedModal;
