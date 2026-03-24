"use client";

import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-black/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500"
        >
          <span>Crafted with</span>
          <Heart size={14} className="text-violet-500" />
          <span>by</span>
          <span className="gradient-text font-semibold">{personalInfo.name}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4"
        >
          {[
            { href: personalInfo.github, icon: GithubIcon, label: "GitHub" },
            { href: personalInfo.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
            { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex items-center justify-center min-w-11 min-h-11 rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 dark:text-zinc-600 text-xs"
        >
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
