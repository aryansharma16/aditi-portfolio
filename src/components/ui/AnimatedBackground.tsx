"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function AnimatedBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Orb intensities — subtle in light mode, richer in dark
  const orb1 = isDark
    ? "radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(124, 58, 237, 0.07) 0%, transparent 65%)";

  const orb2 = isDark
    ? "radial-gradient(circle, rgba(79, 70, 229, 0.14) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(79, 70, 229, 0.06) 0%, transparent 65%)";

  const orb3 = isDark
    ? "radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(167, 139, 250, 0.06) 0%, transparent 65%)";

  const lineColor = isDark
    ? "rgba(124, 58, 237, 0.35)"
    : "rgba(124, 58, 237, 0.18)";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100" />

      {/* Orb 1 — top left */}
      <motion.div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
        style={{ background: orb1, filter: "blur(60px)" }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — right center */}
      <motion.div
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full"
        style={{ background: orb2, filter: "blur(60px)" }}
        animate={{ x: [0, -40, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Orb 3 — bottom */}
      <motion.div
        className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full"
        style={{ background: orb3, filter: "blur(60px)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${lineColor}, transparent)`,
        }}
      />
    </div>
  );
}
