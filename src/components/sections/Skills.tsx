"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";

const categoryColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  violet: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", text: "#7c3aed", glow: "rgba(124,58,237,0.2)" },
  indigo: { bg: "rgba(79,70,229,0.08)",  border: "rgba(79,70,229,0.2)",  text: "#4f46e5", glow: "rgba(79,70,229,0.2)"  },
  purple: { bg: "rgba(124,58,237,0.06)", border: "rgba(124,58,237,0.18)",text: "#7c3aed", glow: "rgba(124,58,237,0.18)"},
  blue:   { bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", text: "#4f46e5", glow: "rgba(99,102,241,0.2)" },
};

const darkCategoryColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  violet: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", text: "#a78bfa", glow: "rgba(124,58,237,0.3)" },
  indigo: { bg: "rgba(79,70,229,0.08)",  border: "rgba(79,70,229,0.2)",  text: "#818cf8", glow: "rgba(79,70,229,0.3)"  },
  purple: { bg: "rgba(167,139,250,0.08)",border: "rgba(167,139,250,0.2)",text: "#c4b5fd", glow: "rgba(167,139,250,0.3)"},
  blue:   { bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", text: "#a5b4fc", glow: "rgba(99,102,241,0.3)" },
};

const skillIcons: Record<string, string> = {
  "Java": "☕", "C++": "⚡", "JavaScript": "🟨", "SQL": "🗄️",
  "HTML": "🌐", "CSS": "🎨", "React.js": "⚛️", "Node.js": "🟢",
  "Express.js": "🚀", "MongoDB": "🍃", "MySQL": "🐬", "Mongoose": "🔗",
  "Data Structures & Algorithms": "🧩", "Object-Oriented Programming": "🏗️",
  "RESTful APIs": "🔌", "JWT Authentication": "🔐",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
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
            What I Know
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-md mx-auto">
            Technologies and tools I work with to build full-stack applications.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {skills.map((group) => {
            const lightColors = categoryColors[group.color] || categoryColors.violet;
            const darkColors  = darkCategoryColors[group.color] || darkCategoryColors.violet;

            return (
              <motion.div
                key={group.category}
                variants={fadeUp}
                className="glass rounded-2xl p-6 group"
                whileHover={{ boxShadow: `0 0 28px ${lightColors.glow}` }}
                transition={{ duration: 0.2 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-1 h-6 rounded-full"
                    style={{
                      background: `linear-gradient(to bottom, ${lightColors.text}, ${darkColors.text})`,
                    }}
                  />
                  <h3
                    className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400"
                  >
                    {group.category}
                  </h3>
                </div>

                {/* Skills */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {group.items.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={scaleIn}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium cursor-default
                        text-zinc-700 dark:text-zinc-300
                        hover:text-violet-700 dark:hover:text-violet-300
                        transition-colors"
                      style={{
                        background: "var(--bg-badge)",
                        border: "1px solid var(--border)",
                      }}
                      whileHover={{
                        scale: 1.06,
                        boxShadow: `0 0 10px ${lightColors.glow}`,
                      }}
                    >
                      {skillIcons[skill] && (
                        <span className="text-sm">{skillIcons[skill]}</span>
                      )}
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="text-center text-zinc-400 dark:text-zinc-600 text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Always learning • Currently exploring TypeScript &amp; Next.js
        </motion.p>
      </div>
    </section>
  );
}
