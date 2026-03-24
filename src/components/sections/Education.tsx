"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";
import { education } from "@/data/portfolio";
import { staggerContainerSlow } from "@/lib/animations";

const degreeColors = [
  { text: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.22)", glow: "rgba(124,58,237,0.2)" },
  { text: "#4f46e5", bg: "rgba(79,70,229,0.08)",  border: "rgba(79,70,229,0.18)",  glow: "rgba(79,70,229,0.18)"  },
  { text: "#7c3aed", bg: "rgba(124,58,237,0.06)", border: "rgba(124,58,237,0.15)", glow: "rgba(124,58,237,0.15)" },
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block">
            My Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-5 sm:left-8 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #7c3aed, #4f46e5, transparent)" }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <motion.div
            className="space-y-10 pl-14 sm:pl-20"
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {education.map((edu, i) => {
              const colors = degreeColors[i] || degreeColors[2];
              return (
                <motion.div
                  key={edu.id}
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
                  }}
                  className="relative"
                >
                  {/* Node */}
                  <div
                    className="absolute -left-[38px] sm:-left-[52px] top-6 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{
                      background: colors.bg,
                      borderColor: colors.text,
                      boxShadow: `0 0 10px ${colors.glow}`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: colors.text }} />
                  </div>

                  {/* Card */}
                  <motion.div
                    className="glass rounded-2xl p-6 group"
                    whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${colors.glow}`, borderColor: colors.border }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: colors.bg }}
                        >
                          <GraduationCap size={18} style={{ color: colors.text }} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-200 transition-colors break-words">
                            {edu.institution}
                          </h3>
                          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 text-xs mt-1">
                            <MapPin size={11} />
                            {edu.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 text-xs shrink-0 sm:mt-1">
                        <Calendar size={11} />
                        {edu.period}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1">
                        <p className="text-zinc-700 dark:text-zinc-200 font-medium text-sm">{edu.degree}</p>
                        {edu.field !== "General" && (
                          <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-0.5 flex items-center gap-1">
                            <BookOpen size={11} /> {edu.field}
                          </p>
                        )}
                      </div>
                      {edu.current ? (
                        <motion.span
                          className="self-start sm:self-center px-3 py-1.5 rounded-xl text-sm font-bold"
                          style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                          animate={{ boxShadow: [`0 0 8px ${colors.glow}`, `0 0 18px ${colors.glow}`, `0 0 8px ${colors.glow}`] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {edu.grade}
                        </motion.span>
                      ) : (
                        <span
                          className="self-start sm:self-center px-3 py-1.5 rounded-xl text-sm font-bold"
                          style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                        >
                          {edu.grade}
                        </span>
                      )}
                    </div>

                    {edu.current && (
                      <div className="mt-3 flex items-center gap-1.5">
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-green-500"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-green-600 dark:text-green-400 text-xs font-medium">Currently Enrolled</span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
