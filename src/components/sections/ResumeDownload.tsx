"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, CheckCircle } from "lucide-react";

export default function ResumeDownload() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 1200);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow — lighter in light mode */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(124,58,237,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Divider lines */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.3), transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.22)",
            }}
            animate={{
              boxShadow: [
                "0 0 16px rgba(124,58,237,0.15)",
                "0 0 32px rgba(124,58,237,0.3)",
                "0 0 16px rgba(124,58,237,0.15)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <FileText size={28} className="text-violet-600 dark:text-violet-400" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Grab My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-10 max-w-md mx-auto">
            A full overview of my skills, projects, education, and achievements — all in one document.
          </p>

          {/* Shimmer button */}
          <motion.a
            href="/aditiCV.pdf"
            download="Aditi_Sharma_Resume.pdf"
            onClick={handleDownload}
            className="relative inline-flex w-full max-w-sm mx-auto items-center justify-center gap-3 px-6 sm:px-10 py-4 rounded-2xl text-white font-semibold text-base overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5, #7c3aed)",
              backgroundSize: "200% auto",
            }}
            whileHover={{
              scale: 1.05,
              backgroundPosition: "right center",
              boxShadow: "0 0 50px rgba(124,58,237,0.55), 0 20px 40px rgba(124,58,237,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            animate={
              !downloading && !downloaded
                ? { backgroundPosition: ["0% center", "200% center", "0% center"] }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            {/* Shimmer sweep */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s linear infinite",
              }}
            />

            {downloaded ? (
              <>
                <CheckCircle size={20} className="relative z-10" />
                <span className="relative z-10">Downloaded!</span>
              </>
            ) : downloading ? (
              <>
                <motion.div
                  className="relative z-10 w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10">Downloading...</span>
              </>
            ) : (
              <>
                <Download
                  size={20}
                  className="relative z-10 group-hover:-translate-y-0.5 transition-transform"
                />
                <span className="relative z-10">Download Resume</span>
              </>
            )}
          </motion.a>

          <motion.p
            className="text-zinc-400 dark:text-zinc-600 text-xs mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            PDF • Aditi Sharma • Updated 2026
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
