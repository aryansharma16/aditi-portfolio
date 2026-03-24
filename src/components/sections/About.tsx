"use client";

import { motion } from "framer-motion";
import { Code2, GraduationCap, Trophy, Layers, Zap, Brain, GitBranch } from "lucide-react";
import { slideLeft, staggerContainer, scaleIn } from "@/lib/animations";

const stats = [
  { icon: GraduationCap, value: "8.26", label: "CGPA",       sublabel: "B.Tech CSE · LPU",       color: "#7c3aed" },
  { icon: Code2,         value: "120+", label: "LeetCode",   sublabel: "DSA problems solved",     color: "#4f46e5" },
  { icon: Trophy,        value: "150+", label: "GFG Score",  sublabel: "GeeksforGeeks rating",    color: "#a78bfa" },
  { icon: Layers,        value: "3+",   label: "Projects",   sublabel: "Full-stack apps built",   color: "#818cf8" },
];

const highlights = [
  {
    icon: Zap,
    title: "MERN Stack",
    desc: "React, Node, Express & MongoDB — building real apps end-to-end.",
    color: "#7c3aed",
  },
  {
    icon: Brain,
    title: "DSA & Problem Solving",
    desc: "120+ problems solved. Strong foundation in algorithms and data structures.",
    color: "#4f46e5",
  },
  {
    icon: GitBranch,
    title: "Scalable Architecture",
    desc: "REST APIs, JWT auth, protected routes, and clean database design.",
    color: "#a78bfa",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block">
            Who I Am
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <p className="text-zinc-800 dark:text-zinc-200 text-xl font-medium leading-relaxed">
                I build things for the web — from the database to the UI.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I&apos;m{" "}
                <span className="text-violet-600 dark:text-violet-400 font-semibold">Aditi Sharma</span>,
                a Computer Science Engineering student at{" "}
                <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                  Lovely Professional University
                </span>
                . My focus is full-stack development with the{" "}
                <span className="text-zinc-800 dark:text-zinc-200 font-medium">MERN stack</span> —
                building applications that are fast, secure, and built to scale.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I care deeply about{" "}
                <span className="text-zinc-800 dark:text-zinc-200 font-medium">clean architecture</span>{" "}
                — thoughtful API design, well-structured databases, and responsive interfaces that
                feel good to use. On the algorithmic side, I actively solve DSA problems on{" "}
                <span className="text-zinc-800 dark:text-zinc-200 font-medium">LeetCode</span> and{" "}
                <span className="text-zinc-800 dark:text-zinc-200 font-medium">GeeksforGeeks</span>.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I&apos;ve built a quiz platform with JWT auth, an OS memory simulator, and a carbon
                tracker. I&apos;m actively looking for internship opportunities where I can contribute
                and grow.
              </p>
            </div>

            {/* Highlight pills */}
            <div className="space-y-3">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <motion.div
                    key={h.title}
                    className="flex items-start gap-4 p-4 glass rounded-xl group"
                    whileHover={{ x: 4, boxShadow: `0 0 20px ${h.color}1a` }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${h.color}18` }}
                    >
                      <Icon size={16} style={{ color: h.color }} />
                    </div>
                    <div>
                      <p className="text-zinc-800 dark:text-zinc-200 font-semibold text-sm">
                        {h.title}
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-0.5 leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  className="glass rounded-2xl p-6 group"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: `0 0 28px ${stat.color}2a`,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${stat.color}18` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-200 font-medium text-sm">
                    {stat.label}
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-0.5">
                    {stat.sublabel}
                  </p>
                </motion.div>
              );
            })}

            {/* Availability card */}
            <motion.div
              variants={scaleIn}
              className="col-span-2 glass rounded-2xl p-5"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-green-400/30"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative block w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div>
                  <p className="text-zinc-800 dark:text-zinc-200 font-semibold text-sm">
                    Open to Opportunities
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-0.5">
                    Actively looking for internships &amp; collaborations · 2026
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
