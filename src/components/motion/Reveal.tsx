"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export default function Reveal({ children, delay = 0, y = 32 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = shouldReduceMotion ? 0 : y;

  return (
    <motion.div
      style={{ width: "100%", height: "100%" }}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1], delay: shouldReduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
