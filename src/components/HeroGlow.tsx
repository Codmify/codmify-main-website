"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroGlow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <motion.div
        style={{ position: "absolute", top: "10%", right: "-10%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(81,196,255,.35), transparent 70%)", filter: "blur(20px)" }}
        animate={shouldReduceMotion ? undefined : { x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ position: "absolute", bottom: "5%", left: "-10%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,141,229,.3), transparent 70%)", filter: "blur(20px)" }}
        animate={shouldReduceMotion ? undefined : { x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
