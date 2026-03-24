"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronRight, Calendar, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/portfolio";
import { staggerContainer, fadeUp } from "@/lib/animations";

type Project = (typeof projects)[number];

/* ─── Tech badge colours ──────────────────────────────────────────────── */
const techColors: Record<string, { bg: string; text: string; border: string }> = {
  "React.js":   { bg: "rgba(97,218,251,0.1)",  text: "#0891b2", border: "rgba(97,218,251,0.25)"  },
  "Node.js":    { bg: "rgba(74,222,128,0.1)",  text: "#16a34a", border: "rgba(74,222,128,0.25)"  },
  "Express.js": { bg: "rgba(161,161,170,0.1)", text: "#52525b", border: "rgba(161,161,170,0.2)"  },
  "MongoDB":    { bg: "rgba(74,222,128,0.1)",  text: "#15803d", border: "rgba(74,222,128,0.2)"   },
  "Mongoose":   { bg: "rgba(74,222,128,0.08)", text: "#166534", border: "rgba(74,222,128,0.15)"  },
  "JWT":        { bg: "rgba(124,58,237,0.08)", text: "#7c3aed", border: "rgba(124,58,237,0.2)"   },
  "HTML":       { bg: "rgba(234,88,12,0.08)",  text: "#c2410c", border: "rgba(234,88,12,0.2)"    },
  "CSS":        { bg: "rgba(59,130,246,0.08)", text: "#1d4ed8", border: "rgba(59,130,246,0.2)"   },
  "JavaScript": { bg: "rgba(234,179,8,0.08)",  text: "#a16207", border: "rgba(234,179,8,0.2)"    },
};

const darkTechColors: Record<string, { bg: string; text: string; border: string }> = {
  "React.js":   { bg: "rgba(97,218,251,0.08)",  text: "#67e8f9", border: "rgba(97,218,251,0.2)"  },
  "Node.js":    { bg: "rgba(104,211,145,0.08)", text: "#86efac", border: "rgba(104,211,145,0.2)" },
  "Express.js": { bg: "rgba(253,224,71,0.08)",  text: "#fde047", border: "rgba(253,224,71,0.15)" },
  "MongoDB":    { bg: "rgba(74,222,128,0.08)",  text: "#4ade80", border: "rgba(74,222,128,0.2)"  },
  "Mongoose":   { bg: "rgba(74,222,128,0.06)",  text: "#86efac", border: "rgba(74,222,128,0.15)" },
  "JWT":        { bg: "rgba(167,139,250,0.08)", text: "#c4b5fd", border: "rgba(167,139,250,0.2)" },
  "HTML":       { bg: "rgba(251,146,60,0.08)",  text: "#fb923c", border: "rgba(251,146,60,0.2)"  },
  "CSS":        { bg: "rgba(96,165,250,0.08)",  text: "#93c5fd", border: "rgba(96,165,250,0.2)"  },
  "JavaScript": { bg: "rgba(250,204,21,0.08)",  text: "#fcd34d", border: "rgba(250,204,21,0.15)" },
};

const defaultLight = { bg: "rgba(124,58,237,0.07)", text: "#7c3aed", border: "rgba(124,58,237,0.18)" };
const defaultDark  = { bg: "rgba(99,102,241,0.08)", text: "#a5b4fc", border: "rgba(99,102,241,0.2)" };

function TechBadge({ tech }: { tech: string }) {
  const lc = techColors[tech] ?? defaultLight;
  const dc = darkTechColors[tech] ?? defaultDark;
  return (
    <>
      <span className="px-2.5 py-1 rounded-lg text-xs font-medium dark:hidden"
        style={{ background: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>
        {tech}
      </span>
      <span className="px-2.5 py-1 rounded-lg text-xs font-medium hidden dark:inline"
        style={{ background: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}>
        {tech}
      </span>
    </>
  );
}

/* ─── Modal (portal → body, AnimatePresence lives inside portal) ──────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [show, setShow] = useState(true);

  const close = useCallback(() => {
    setShow(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6"
          style={{ zIndex: 9980 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={close}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          />

          {/* Panel */}
          <motion.div
            className="relative w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl"
            style={{ zIndex: 9981, maxHeight: "90vh", display: "flex", flexDirection: "column" }}
            initial={{ y: 60, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 60, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl sm:rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5, #818cf8)" }}
            />

            {/* Mobile drag handle */}
            <div className="sm:hidden flex justify-center pt-3 pb-0 rounded-t-3xl"
              style={{ background: "var(--bg-card-solid)" }}>
              <div className="w-10 h-1 rounded-full bg-zinc-600" />
            </div>

            {/* Scrollable body */}
            <div
              className="overflow-y-auto rounded-t-3xl sm:rounded-2xl"
              style={{
                background: "var(--bg-card-solid)",
                border: "1px solid rgba(124,58,237,0.3)",
                boxShadow: "0 -8px 80px rgba(124,58,237,0.18), 0 40px 100px rgba(0,0,0,0.5)",
              }}
            >
              <div className="p-6 sm:p-8 pt-5 sm:pt-7 relative">

                {/* Close */}
                <button
                  onClick={close}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#a1a1aa" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "#7c3aed";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "#a1a1aa";
                  }}
                >
                  <X size={17} />
                </button>

                {/* Status + period */}
                <div className="flex flex-wrap items-center gap-2.5 mb-5 pr-10">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5"
                    style={{
                      background: project.status === "Active" ? "rgba(34,197,94,0.12)" : "rgba(124,58,237,0.1)",
                      color:      project.status === "Active" ? "#22c55e"              : "#a78bfa",
                      border: `1px solid ${project.status === "Active" ? "rgba(34,197,94,0.3)" : "rgba(124,58,237,0.3)"}`,
                    }}
                  >
                    {project.status === "Active" && (
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    {project.status}
                  </span>
                  <span className="text-zinc-500 text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)" }}>
                    <Calendar size={11} /> {project.period}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-violet-400 text-sm font-semibold tracking-wide mb-5">{project.subtitle}</p>

                {/* Description */}
                <p className="text-zinc-300 text-sm sm:text-[15px] leading-relaxed mb-6 pb-6"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {project.description}
                </p>

                {/* Key highlights */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
                    Key Highlights
                  </p>
                  <ul className="space-y-3">
                    {project.details.map((d, i) => (
                      <motion.li
                        key={i}
                        className="flex gap-3 text-zinc-300 text-sm leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.06 }}
                      >
                        <span
                          className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-violet-400"
                          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}
                        >
                          <ChevronRight size={11} />
                        </span>
                        {d}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div className="mb-7">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t) => <TechBadge key={t} tech={t} />)}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                  >
                    <GithubIcon size={16} /> View on GitHub
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-zinc-200 glass hover:opacity-90 active:scale-95 transition-all"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ─── Project card ────────────────────────────────────────────────────── */
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div variants={fadeUp} className="group relative">
      <motion.div
        className="glass rounded-2xl p-6 h-full flex flex-col relative cursor-pointer"
        whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(124,58,237,0.22)", borderColor: "rgba(124,58,237,0.45)" }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
      >
        {/* Hover glow overlay */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />

        {/* Status + period */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5"
            style={{
              background: project.status === "Active" ? "rgba(34,197,94,0.1)"  : "rgba(124,58,237,0.1)",
              color:      project.status === "Active" ? "#16a34a"              : "#7c3aed",
              border: `1px solid ${project.status === "Active" ? "rgba(34,197,94,0.25)" : "rgba(124,58,237,0.2)"}`,
            }}
          >
            {project.status === "Active" && (
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            {project.status}
          </span>
          <span className="text-zinc-400 dark:text-zinc-500 text-xs flex items-center gap-1">
            <Calendar size={11} /> {project.period}
          </span>
        </div>

        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-violet-600 dark:text-violet-400 text-xs font-medium mb-3">{project.subtitle}</p>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.slice(0, 5).map((t) => <TechBadge key={t} tech={t} />)}
          {project.techStack.length > 5 && (
            <span className="px-2 py-0.5 text-xs text-zinc-400 dark:text-zinc-600">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Buttons — plain HTML elements, no motion wrapper, to guarantee click events */}
        <div className="flex items-center gap-2 relative z-10">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
          >
            View Details <ArrowUpRight size={12} />
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-200 glass transition-all hover:opacity-90 active:scale-95"
          >
            <GithubIcon size={13} /> GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────── */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block">
            What I&apos;ve Built
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-md mx-auto">
            Full-stack applications built with real users and clean architecture in mind.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/aditisharma732006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 glass"
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(124,58,237,0.2)" }}
            whileTap={{ scale: 0.97 }}
          >
            <GithubIcon size={16} />
            View All on GitHub
            <ExternalLink size={14} className="text-zinc-400 dark:text-zinc-500" />
          </motion.a>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
