import { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const; // fast-out curve — snappy feel

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease } },
};

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.42, ease } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.45, ease } },
};

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.45, ease } },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1,  transition: { duration: 0.38, ease } },
};

export const scaleInSpring: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 320, damping: 24 } },
};

// Faster stagger — children start sooner, last child doesn't lag
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.03 } },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

export const characterReveal: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.04, ease: "easeOut" } },
};

export const timelineItem: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.42, ease } },
};

export const cardHover = {
  rest:  { scale: 1,    y: 0  },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.2, ease: "easeOut" } },
};

export const glowHover = {
  rest:  { boxShadow: "0 0 0px rgba(124,58,237,0)"   },
  hover: { boxShadow: "0 0 28px rgba(124,58,237,0.38)", transition: { duration: 0.2 } },
};

export const navbarVariants: Variants = {
  hidden:  { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.38, ease: "easeOut" } },
};

export const loadingVariants: Variants = {
  initial: { opacity: 1 },
  exit:    { opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

export const heroTextReveal: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease } },
};

export const floatAnimation = {
  y: [0, -14, 0],
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
};

export const pulseAnimation = {
  scale:   [1, 1.04, 1],
  opacity: [0.75, 1, 0.75],
  transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
};
