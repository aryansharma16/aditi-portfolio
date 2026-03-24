"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, ChevronRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personalInfo } from "@/data/portfolio";
import { staggerContainer } from "@/lib/animations";
import { useTheme } from "@/contexts/ThemeContext";

const TYPING_SPEED = 80;
const ERASING_SPEED = 45;
const PAUSE_BEFORE_ERASE = 2000;
const PAUSE_BEFORE_TYPE = 400;

function Typewriter({ words }: { words: string[] }) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const currentWord = words[wordIndex];
    if (isTyping) {
      if (displayText.length < currentWord.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayText(currentWord.slice(0, displayText.length + 1)),
          TYPING_SPEED
        );
      } else {
        timeoutRef.current = setTimeout(() => setIsTyping(false), PAUSE_BEFORE_ERASE);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayText(displayText.slice(0, -1)),
          ERASING_SPEED
        );
      } else {
        timeoutRef.current = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
          setIsTyping(true);
        }, PAUSE_BEFORE_TYPE);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayText, isTyping, wordIndex, words]);

  return (
    <span className="gradient-text">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-8 ml-1 align-middle"
        style={{ background: "linear-gradient(135deg, var(--grad-a), var(--grad-b))" }}
      />
    </span>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const letters = personalInfo.name.split("");

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero-specific orbs */}
      <motion.div
        className="absolute top-20 right-[10%] w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: theme === "dark"
            ? "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-[5%] w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: theme === "dark"
            ? "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-medium text-violet-600 dark:text-violet-300"
              style={{
                background: "var(--bg-badge)",
                border: "1px solid rgba(124,58,237,0.22)",
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Available for opportunities
            </motion.div>

            {/* Animated name */}
            <motion.div
              className="overflow-hidden mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-zinc-900 dark:text-white leading-tight break-words"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.4,
                          delay: 1.8 + i * 0.04,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      },
                    }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              className="text-3xl sm:text-4xl font-bold mb-6 min-h-[48px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <Typewriter words={personalInfo.roles} />
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.6 }}
            >
              B.Tech CSE student at{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">LPU</span> building
              scalable full-stack apps with the{" "}
              <span className="text-violet-600 dark:text-violet-400 font-medium">MERN stack</span>.
              120+ LeetCode problems solved. Turning complex ideas into clean, interactive experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.9, duration: 0.6 }}
            >
              <motion.button
                onClick={scrollToProjects}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>

              <motion.a
                href="/aditiCV.pdf"
                download
                className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 glass"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download
                  size={16}
                  className="group-hover:-translate-y-0.5 transition-transform"
                />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.1 }}
            >
              <span className="text-zinc-400 dark:text-zinc-600 text-xs uppercase tracking-widest">
                Connect
              </span>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              {[
                { href: personalInfo.github, icon: GithubIcon, label: "GitHub" },
                { href: personalInfo.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 min-w-11 min-h-11 flex items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-400/10 transition-all"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — code card */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-2xl opacity-20 dark:opacity-30 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(79,70,229,0.3))",
                }}
              />

              <motion.div
                className="relative glass rounded-2xl p-6 font-mono text-sm"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  <span className="ml-2 text-zinc-400 dark:text-zinc-600 text-xs">portfolio.ts</span>
                </div>

                <div className="space-y-1 text-xs leading-6">
                  <p>
                    <span className="text-violet-600 dark:text-violet-400">const</span>{" "}
                    <span className="text-indigo-600 dark:text-indigo-300">developer</span>{" "}
                    <span className="text-zinc-500">=</span>{" "}
                    <span className="text-zinc-500">{"{"}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500 dark:text-zinc-400">name</span>
                    <span className="text-zinc-400">:</span>{" "}
                    <span className="text-green-600 dark:text-green-400">&apos;Aditi Sharma&apos;</span>
                    <span className="text-zinc-400">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500 dark:text-zinc-400">role</span>
                    <span className="text-zinc-400">:</span>{" "}
                    <span className="text-green-600 dark:text-green-400">&apos;Full-Stack Dev&apos;</span>
                    <span className="text-zinc-400">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500 dark:text-zinc-400">stack</span>
                    <span className="text-zinc-400">:</span>{" "}
                    <span className="text-amber-600 dark:text-yellow-400">[&quot;MERN&quot;, &quot;DSA&quot;]</span>
                    <span className="text-zinc-400">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500 dark:text-zinc-400">cgpa</span>
                    <span className="text-zinc-400">:</span>{" "}
                    <span className="text-orange-600 dark:text-orange-400">8.26</span>
                    <span className="text-zinc-400">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500 dark:text-zinc-400">leetcode</span>
                    <span className="text-zinc-400">:</span>{" "}
                    <span className="text-orange-600 dark:text-orange-400">120</span>
                    <span className="text-zinc-400">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500 dark:text-zinc-400">openToWork</span>
                    <span className="text-zinc-400">:</span>{" "}
                    <span className="text-violet-600 dark:text-violet-400">true</span>
                  </p>
                  <p>
                    <span className="text-zinc-500">{"}"}</span>
                  </p>
                  <p className="mt-3 text-zinc-400 dark:text-zinc-600">{`// Let's build something great!`}</p>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full text-xs font-medium text-green-600 dark:text-green-400"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
                animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                120+ LeetCode
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full text-xs font-medium text-violet-600 dark:text-violet-300"
                style={{
                  background: "var(--bg-badge)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                animate={{ y: [0, 5, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                MERN Stack
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <span className="text-zinc-400 dark:text-zinc-600 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-zinc-400 dark:text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
