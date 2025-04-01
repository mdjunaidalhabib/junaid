"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import DarkModeToggleButton from "./DarkModeToggleButton";

export default function ScrollBackground({ children }) {
  const { scrollYProgress } = useScroll();

  // Smooth animation effect
  const backgroundColor = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Light Mode Background (Changes with Scroll)
  const lightBgColor = useTransform(
    backgroundColor,
    [0, 0.33, 0.66, 1],
    [
      "linear-gradient(to right, #ff6a00, #ee0979)",
      "linear-gradient(to right, #ff4e50, #f9d423)",
      "linear-gradient(to right, #43cea2, #185a9d)",
      "linear-gradient(to right, #000428, #004e92)",
    ]
  );

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(null);

  // Load Dark Mode from LocalStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    setIsDarkMode(storedTheme === "true");
  }, []);

  // Dark Mode Toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  // Prevent UI Flashing before loading state
  if (isDarkMode === null) return <div className="min-h-screen bg-black"></div>;

  return (
    <div className="relative min-h-screen flex flex-col transition-all duration-1000">
      {/* Dark Mode Background */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: "linear-gradient(to right, #030712, #030712)",
          opacity: isDarkMode ? 1 : 0,
        }}
      />

      {/* Light Mode Background (with Scroll Effect) */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: lightBgColor,
          opacity: isDarkMode ? 0 : 1,
        }}
      />

      {/* Content Layer */}
      <div
        className="relative z-10 text-center"
        style={{ color: isDarkMode ? "white" : "black" }}
      >
        <DarkModeToggleButton
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        {children}
      </div>
    </div>
  );
}
