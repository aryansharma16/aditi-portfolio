"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, X, ChevronRight, Calendar, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/portfolio";
import { staggerContainer, fadeUp } from "@/lib/animations";

type Project = (typeof projects)[number];

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
  // Use CSS class-based approach rather than JS theme detection to avoid hydration issues
  const lc = techColors[tech] ?? defaultLight;
  const dc = darkTechColors[tech] ?? defaultDark;
  return (
    <>
      <span
        className="px-2.5 py-1 rounded-lg text-xs font-medium dark:hidden"
        style={{ background: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}
      >
        {tech}
      </span>
      <span
        className="px-2.5 py-1 rounded-lg text-xs font-medium hidden dark:inline"
        style={{ background: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}
      >
        {tech}
      </span>
    </>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      />

      <motion.div
        className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl"
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-card-solid)",
          border: "1px solid rgba(124,58,237,0.25)",
          boxShadow: "0 -4px 60px rgba(124,58,237,0.12), 0 40px 100px rgba(0,0,0,0.4)",
        }}
      >
        {/* Gradient header band */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl sm:rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5, #818cf8)" }}
        />

        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </div>

        <div className="p-5 sm:p-8 pt-4 sm:pt-7">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 min-w-10 min-h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/8 transition-all"
          >
            <X size={18} />
          </button>

          {/* Status row */}
          <div className="flex items-center gap-2.5 mb-5">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5"
              style={{
                background: project.status === "Active" ? "rgba(34,197,94,0.12)" : "rgba(124,58,237,0.1)",
                color:      project.status === "Active" ? "#16a34a"               : "#7c3aed",
                border: `1px solid ${project.status === "Active" ? "rgba(34,197,94,0.3)" : "rgba(124,58,237,0.25)"}`,
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
            <span className="text-zinc-400 dark:text-zinc-500 text-xs flex items-center gap-1.5 bg-zinc-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
              <Calendar size={11} /> {project.period}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1"
            style={{ fontFamily: "var(--font-display, inherit)" }}
          >
            {project.title}
          </h3>
          <p className="text-violet-500 dark:text-violet-400 text-sm font-semibold tracking-wide mb-4">
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 pb-6 border-b border-zinc-100 dark:border-white/6">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="mb-6">
            <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
              Key Highlights
            </p>
            <ul className="space-y-3">
              {project.details.map((d, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <span
                    className="mt-1 w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-violet-600 dark:text-violet-400"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
                  >
                    <ChevronRight size={11} />
                  </span>
                  {d}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-7">
            <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => <TechBadge key={t} tech={t} />)}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(124,58,237,0.55)" }}
              whileTap={{ scale: 0.97 }}
            >
              <GithubIcon size={16} />
              View on GitHub
            </motion.a>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-zinc-700 dark:text-zinc-200 glass"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={15} /> Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      className="relative group"
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      <motion.div
        className="glass rounded-2xl p-6 h-full flex flex-col relative overflow-hidden cursor-pointer"
        style={{ rotateX, rotateY }}
        whileHover={{ boxShadow: "0 24px 60px rgba(124,58,237,0.18)", borderColor: "rgba(124,58,237,0.4)" }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
      >
        {/* Cursor glow */}
        <motion.div
          className="absolute w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
            left: glowX,
            top: glowY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

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
          <span className="text-zinc-400 dark:text-zinc-600 text-xs flex items-center gap-1">
            <Calendar size={11} /> {project.period}
          </span>
        </div>

        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-violet-700 dark:group-hover:text-violet-200 transition-colors">
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

        <div className="flex items-center gap-2">
          <motion.button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 min-h-11 rounded-xl text-xs font-semibold text-violet-700 dark:text-violet-300"
            style={{ background: "var(--bg-badge)", border: "1px solid rgba(124,58,237,0.2)" }}
            whileHover={{ background: "rgba(124,58,237,0.15)", scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            View Details <ArrowUpRight size={12} />
          </motion.button>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 px-4 py-3 min-h-11 rounded-xl text-xs font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 18px rgba(124,58,237,0.45)" }}
            whileTap={{ scale: 0.97 }}
          >
            <GithubIcon size={13} /> GitHub
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
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

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
