"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Render a placeholder with the same dimensions to avoid layout shift
  if (!mounted) {
    return <div className="w-9 h-9 rounded-xl" aria-hidden />;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
      style={{
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(124,58,237,0.08)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(124,58,237,0.2)",
      }}
      whileHover={{
        scale: 1.12,
        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(124,58,237,0.15)",
      }}
      whileTap={{ scale: 0.88, rotate: isDark ? 30 : -30 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Sun size={15} className="text-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Moon size={15} className="text-violet-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
