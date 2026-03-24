"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Trophy, GraduationCap, Award, Star, ExternalLink, ArrowUpRight } from "lucide-react";
import { achievements, certificates, training } from "@/data/portfolio";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";

const iconMap = { code: Code2, trophy: Trophy, graduation: GraduationCap, certificate: Award };

const colorMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  violet: { text: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", glow: "rgba(124,58,237,0.25)" },
  indigo: { text: "#4f46e5", bg: "rgba(79,70,229,0.08)",  border: "rgba(79,70,229,0.2)",  glow: "rgba(79,70,229,0.25)"  },
  purple: { text: "#7c3aed", bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.18)",glow: "rgba(124,58,237,0.18)" },
  blue:   { text: "#4f46e5", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", glow: "rgba(99,102,241,0.2)"  },
};


function CountUp({ target, decimals = 0, started }: { target: number; decimals?: number; started: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 1800 / steps);
    return () => clearInterval(timer);
  }, [started, target]);
  return <>{count.toFixed(decimals)}</>;
}

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block">
            My Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Achievements <span className="gradient-text">&amp; Stats</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {achievements.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Star;
            const lc = colorMap[item.color] || colorMap.violet;
            const Wrapper = item.link ? motion.a : motion.div;
            const wrapperProps = item.link
              ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Wrapper
                key={item.id}
                {...(wrapperProps as object)}
                variants={scaleIn}
                className="glass rounded-2xl p-6 text-center group relative overflow-hidden"
                style={{ cursor: item.link ? "pointer" : "default" }}
                whileHover={{
                  scale: 1.05,
                  y: -6,
                  boxShadow: `0 20px 40px ${lc.glow}`,
                  borderColor: lc.border,
                }}
                transition={{ duration: 0.25 }}
              >
                {item.link && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={14} className="text-violet-600 dark:text-violet-400" />
                  </div>
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: lc.bg }}
                >
                  <Icon size={22} className="text-violet-700 dark:hidden" />
                  <Icon size={22} className="text-violet-400 hidden dark:block" />
                </div>
                <p className="text-3xl sm:text-4xl font-black mb-1 text-violet-700 dark:text-violet-400">
                  <CountUp target={item.value} decimals={"decimals" in item ? item.decimals : 0} started={isInView} />
                  {item.suffix}
                </p>
                <p className="text-zinc-700 dark:text-zinc-200 font-semibold text-sm">{item.label}</p>
                <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-1">{item.sublabel}</p>
                {item.link && (
                  <p className="text-xs mt-2.5 font-medium opacity-0 group-hover:opacity-100 transition-opacity text-violet-600 dark:text-violet-400">
                    {item.linkLabel} →
                  </p>
                )}
              </Wrapper>
            );
          })}
        </motion.div>

        {/* Training */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(124,58,237,0.1)" }}>
              <Trophy size={14} className="text-violet-600 dark:text-violet-400" />
            </div>
            Training
          </h3>
          {training.map((t, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6 group"
              whileHover={{ scale: 1.01, boxShadow: "0 0 28px rgba(124,58,237,0.12)", borderColor: "rgba(124,58,237,0.25)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-zinc-800 dark:text-zinc-100 font-semibold">{t.title}</h4>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium text-violet-600 dark:text-violet-300"
                      style={{ background: "var(--bg-badge)", border: "1px solid rgba(124,58,237,0.2)" }}
                    >
                      {t.org}
                    </span>
                  </div>
                  <p className="text-zinc-400 dark:text-zinc-500 text-xs mb-3">{t.period}</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{t.description}</p>
                </div>
                {t.certificate && t.certificateLink && (
                  <motion.a
                    href={t.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-violet-600 dark:text-violet-300 shrink-0"
                    style={{ background: "var(--bg-badge)", border: "1px solid rgba(124,58,237,0.2)" }}
                    whileHover={{ scale: 1.04, boxShadow: "0 0 14px rgba(124,58,237,0.25)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Award size={13} /> View Certificate <ExternalLink size={11} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(124,58,237,0.1)" }}>
              <Award size={14} className="text-violet-600 dark:text-violet-400" />
            </div>
            Certifications
          </h3>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certificates.map((cert, i) => {
              const lc = colorMap[cert.color] || colorMap.violet;
              return (
                <motion.a
                  key={i}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  className="glass rounded-xl p-5 group relative overflow-hidden"
                  whileHover={{ scale: 1.03, y: -4, boxShadow: `0 16px 40px ${lc.glow}`, borderColor: lc.border }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${lc.bg}, transparent)` }}
                  />
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: lc.bg }}
                      >
                        <Award size={15} className="text-violet-600 dark:text-violet-400" />
                      </div>
                      <div>
                        <p className="text-zinc-700 dark:text-zinc-200 text-sm font-semibold leading-snug group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                          {cert.title}
                        </p>
                        <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-1">{cert.issuer}</p>
                        <p className="text-xs mt-1.5 font-medium text-violet-600 dark:text-violet-400">{cert.period}</p>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-violet-600 dark:text-violet-400"
                    />
                  </div>
                  <div
                    className="relative mt-3 pt-3 flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity text-violet-600 dark:text-violet-400"
                    style={{ borderTop: `1px solid ${lc.border}` }}
                  >
                    <ExternalLink size={11} /> View Certificate
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
