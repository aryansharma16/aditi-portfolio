"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personalInfo } from "@/data/portfolio";
import { fadeUp, slideLeft, slideRight } from "@/lib/animations";

const contactLinks = [
  { icon: Mail,       label: "Email",    value: personalInfo.email,            href: `mailto:${personalInfo.email}`,  color: "#7c3aed" },
  { icon: GithubIcon, label: "GitHub",   value: `@${personalInfo.githubUsername}`,  href: personalInfo.github,             color: "#4f46e5" },
  { icon: LinkedinIcon,label: "LinkedIn",value: `in/${personalInfo.linkedinUsername}`, href: personalInfo.linkedin,        color: "#7c3aed" },
  { icon: Phone,      label: "Phone",    value: personalInfo.phone,            href: `tel:${personalInfo.phone}`,     color: "#4f46e5" },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  const inputStyle = (field: string) => ({
    background: "var(--bg-input)",
    border: focused === field ? "1px solid var(--border-focus)" : "1px solid var(--border-input)",
    boxShadow: focused === field ? "var(--shadow-focus)" : "none",
    color: "var(--t-primary)",
  });

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest uppercase mb-3 block">
            Let&apos;s Talk
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-md mx-auto">
            Open to internships, collaborations, and interesting opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Say Hello</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Whether you have a project idea, want to collaborate, or just want to say hi — my inbox is always open.
              </p>
            </div>

            <div className="space-y-3">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.label !== "Phone" && link.label !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass rounded-xl group"
                    whileHover={{ scale: 1.02, boxShadow: `0 0 18px ${link.color}22`, x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${link.color}18` }}
                    >
                      <Icon size={18} style={{ color: link.color }} />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                        {link.label}
                      </p>
                      <p className="text-zinc-700 dark:text-zinc-200 text-sm font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors break-all sm:break-words">
                        {link.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-600 text-sm mt-4">
              <MapPin size={14} className="text-violet-600 dark:text-violet-500" />
              <span>Phagwara, Punjab, India</span>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={fadeUp}>
                <label className="block text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder="Aditi Sharma"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                  style={inputStyle("name")}
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                  style={inputStyle("email")}
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  required
                  rows={5}
                  placeholder="Hi Aditi, I'd love to..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                  style={inputStyle("message")}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={sending || sent}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: sent
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  opacity: sending ? 0.8 : 1,
                }}
                whileHover={!sending && !sent ? { scale: 1.02, boxShadow: "0 0 28px rgba(124,58,237,0.45)" } : {}}
                whileTap={!sending && !sent ? { scale: 0.98 } : {}}
              >
                {sent ? (
                  <><CheckCircle size={18} /> Message Sent!</>
                ) : sending ? (
                  <>
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
