"use client";

// All orb animations are pure CSS (compositor-only, no JS loop).
// Colors adapt via CSS variables so no JS is needed for theme changes.
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />

      {/* Orb 1 — top-left */}
      <div className="bg-orb bg-orb-1" />

      {/* Orb 2 — right-center */}
      <div className="bg-orb bg-orb-2" />

      {/* Orb 3 — bottom */}
      <div className="bg-orb bg-orb-3" />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-top-line" />
    </div>
  );
}
