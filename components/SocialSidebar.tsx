"use client";
import React from "react";
import { Linkedin, Github, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import BlueskyFAIcon from "./BlueskyFAIcon";

function BlueskyIcon(props: React.SVGProps<SVGSVGElement>) {
  // No longer used, replaced by FontAwesome icon
  return null;
}

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mary-ann-dizon-ba336436/",
    icon: <Linkedin size={24} />,
  },
  {
    name: "GitHub",
    href: "https://github.com/mctrinity",
    icon: <Github size={24} />,
  },
  {
    name: "Twitter",
    href: "https://x.com/goodbyegirl924",
    icon: <Twitter size={24} />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/makio143/",
    icon: <Instagram size={24} />,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/mako143.bsky.social",
    icon: <BlueskyFAIcon size="lg" />,
  },
];

export default function SocialSidebar() {
  return (
    <aside
      className="w-full flex flex-row items-center justify-center gap-6 px-4 py-6 md:py-1 md:bg-transparent md:shadow-lg md:z-50 md:fixed md:left-0 md:top-16 md:h-[calc(100vh-4rem)] md:w-16 md:flex-col md:items-center md:justify-center"
    >
      <nav className="flex flex-row md:flex-col gap-6 justify-center items-center w-full md:w-auto">
        {socials.map((social, idx) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.2, rotate: -5, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.95, rotate: 0 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </nav>
    </aside>
  );
}