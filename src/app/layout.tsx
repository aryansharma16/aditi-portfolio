import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditi Sharma — Full-Stack Developer",
  description:
    "Portfolio of Aditi Sharma — Full-Stack Developer (MERN Stack), CS Engineering student at LPU. 120+ LeetCode problems solved.",
  keywords: ["Aditi Sharma", "Full-Stack Developer", "MERN Stack", "React", "Node.js", "Portfolio"],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Aditi Sharma — Full-Stack Developer",
    description: "Full-Stack Developer (MERN Stack) • CS Engineering at LPU",
    type: "website",
  },
};

// Anti-flicker: runs synchronously before React hydrates.
// Reads localStorage + system preference → sets .dark class immediately.
const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    var sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Default: dark mode unless user explicitly chose light
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})()
`.trim();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Runs before paint — prevents theme flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${plusJakarta.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <LoadingScreen />
          <CustomCursor />
          <AnimatedBackground />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
