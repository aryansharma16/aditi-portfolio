"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const { theme } = useTheme();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const trailX = useSpring(cursorX, { damping: 40, stiffness: 150 });
  const trailY = useSpring(cursorY, { damping: 40, stiffness: 150 });

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    const bindHover = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    bindHover();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  const isDark = theme === "dark";
  const dotColor = isHovering
    ? "linear-gradient(135deg, #a78bfa, #818cf8)"
    : isDark
    ? "rgba(124, 58, 237, 0.9)"
    : "rgba(79, 70, 229, 0.85)";

  const ringBorder = isDark
    ? "rgba(124, 58, 237, 0.45)"
    : "rgba(79, 70, 229, 0.4)";

  return (
    <>
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 44 : 32,
          height: isHovering ? 44 : 32,
          border: `1.5px solid ${ringBorder}`,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, opacity 0.2s, border-color 0.3s",
        }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: isClicking ? 6 : 8,
          height: isClicking ? 6 : 8,
          background: dotColor,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.15s, height 0.15s, opacity 0.2s",
        }}
      />
    </>
  );
}
