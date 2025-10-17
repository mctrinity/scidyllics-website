"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";


const theme = {
  name: "Scidyllics",
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (isHome) {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    } else {
      router.push(`/#${targetId}`);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } else {
      router.push("/");
    }
  };

  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/90 border-b border-gray-200">
      <div className="container h-16 flex items-center justify-between">
        <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="relative flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="h-14 w-14 object-contain" />
          </div>
          <span className="font-semibold text-gray-900">{theme.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} onFocus={(e) => e.target.blur()} className="focus:outline-none">Services</a>
          <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} onFocus={(e) => e.target.blur()} className="focus:outline-none">Portfolio</a>
          <a href="#stack" onClick={(e) => handleNavClick(e, 'stack')} onFocus={(e) => e.target.blur()} className="focus:outline-none">Stack</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} onFocus={(e) => e.target.blur()} className="focus:outline-none">About</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} onFocus={(e) => e.target.blur()} className="focus:outline-none">Contact</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} onFocus={(e) => e.target.blur()} className="focus:outline-none"><Button className="focus:outline-none">Get Assessment <ArrowRight className="h-4 w-4" /></Button></a>
        </nav>
      </div>
    </div>
  );
}
