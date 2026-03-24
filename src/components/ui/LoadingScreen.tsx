"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 18 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--bg)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          {/* Monogram */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-1 justify-center mb-2">
              <motion.span
                className="text-4xl font-bold gradient-text"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                A
              </motion.span>
              <span className="text-4xl font-bold text-zinc-400 dark:text-zinc-500">S</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-600 text-sm tracking-widest uppercase">
              Loading Portfolio
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
                width: `${Math.min(progress, 100)}%`,
              }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-4 text-zinc-400 dark:text-zinc-600 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>

          {/* Orbiting ring */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{ border: "1px solid rgba(124, 58, 237, 0.15)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute -top-1 left-1/2 w-2 h-2 rounded-full -translate-x-1/2"
              style={{ background: "#7c3aed" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
