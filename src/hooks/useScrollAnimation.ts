"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation(margin?: string) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: (margin ?? "-100px") as "-100px" });
  return { ref, isInView };
}
