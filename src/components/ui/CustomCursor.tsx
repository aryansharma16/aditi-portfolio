"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);

  // Dot is near-instant (high stiffness, tiny mass)
  const dotX  = useSpring(cx, { stiffness: 1800, damping: 55, mass: 0.08 });
  const dotY  = useSpring(cy, { stiffness: 1800, damping: 55, mass: 0.08 });

  // Ring trails behind smoothly
  const ringX = useSpring(cx, { stiffness: 160, damping: 36, mass: 0.5 });
  const ringY = useSpring(cy, { stiffness: 160, damping: 36, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const show = () => { dot.style.opacity = "1";  ring.style.opacity = "1"; };
    const hide = () => { dot.style.opacity = "0";  ring.style.opacity = "0"; };

    const hoverIn = () => {
      dot.style.width  = dot.style.height = "14px";
      dot.style.background = "linear-gradient(135deg,#a78bfa,#818cf8)";
      ring.style.width = ring.style.height = "50px";
      ring.style.borderColor = "rgba(167,139,250,0.75)";
      ring.style.boxShadow   = "0 0 14px rgba(167,139,250,0.5)";
    };
    const hoverOut = () => {
      dot.style.width  = dot.style.height = "10px";
      dot.style.background = "linear-gradient(135deg,#7c3aed,#4f46e5)";
      ring.style.width = ring.style.height = "36px";
      ring.style.borderColor = "rgba(124,58,237,0.7)";
      ring.style.boxShadow   = "0 0 8px rgba(124,58,237,0.45)";
    };

    // Event delegation — one listener for the whole document, no per-element binding
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("a, button, [data-cursor-hover]")) hoverIn();
      else hoverOut();
    };

    const onMove  = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); show(); };
    const onDown  = () => { dot.style.width = dot.style.height = "7px"; };
    const onUp    = () => { dot.style.width = dot.style.height = "10px"; };
    const onLeave = () => hide();
    const onEnter = () => show();

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseover",  onOver,  { passive: true });
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [cx, cy]);

  return (
    <>
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          width: 36, height: 36,
          border: "2px solid rgba(124,58,237,0.7)",
          boxShadow: "0 0 8px rgba(124,58,237,0.45)",
          opacity: 0,
          transition: "width .15s ease, height .15s ease, border-color .18s, box-shadow .18s, opacity .18s",
        }}
      />
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          width: 10, height: 10,
          background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
          boxShadow: "0 0 10px rgba(124,58,237,0.8)",
          opacity: 0,
          transition: "width .1s ease, height .1s ease, opacity .18s",
        }}
      />
    </>
  );
}
