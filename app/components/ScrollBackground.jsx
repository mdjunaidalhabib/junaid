"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useTransform } from "framer-motion";

export default function ScrollBackground({ children }) {
  const { scrollYProgress } = useScroll();

  // Smooth animation effect
  const backgroundColor = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Correct way to interpolate colors
  const bgColor = useTransform(
    backgroundColor,
    [0, 0.33, 0.66, 1],
    [
      "linear-gradient(to right, #000428, #004e92)",
      "linear-gradient(to right, #ff4e50, #f9d423)",
      "linear-gradient(to right, #43cea2, #185a9d)",
      "linear-gradient(to right, #ff6a00, #ee0979)",
    ]
  );

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      style={{ background: bgColor }}
    >
      {children}
    </motion.div>
  );
}
