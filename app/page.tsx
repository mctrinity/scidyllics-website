"use client";

function Services() {
  const services = [
    {
      title: "CI/CD Pipeline Optimization",
      desc: "Accelerate delivery and reduce incidents with automated, multi-platform CI/CD pipelines.",
      bullets: [
        "Azure DevOps, GitHub Actions, Jenkins",
        "Parallel job optimization",
        "Automated deployments",
  "Containerization (Docker)",
        "Kubernetes orchestration"
      ]
    },
    {
      title: "Infrastructure as Code",
      desc: "Modernize your infrastructure with Terraform and Ansible for repeatable, scalable environments.",
      bullets: [
        "Terraform, Ansible",
        "Multi-cloud (AWS, Azure, GCP)",
        "Automated provisioning",
        "Policy as code (Open Policy Agent, Azure Policy)",
        "Self-healing and auto-scaling"
      ]
    },
    {
      title: "Open Source Monitoring",
      desc: "Gain visibility and control with open source monitoring and alerting solutions.",
      bullets: ["Prometheus, Grafana", "Alert correlation", "Custom dashboards"]
    },
    {
      title: "AI Integration & Development",
      desc: "Build and deploy AI-powered applications for real business impact.",
      bullets: ["OpenAI APIs, custom LLMs", "Model deployment pipelines", "Recent projects: customer service, document processing"]
    }
  ];
  return (
    <section id="services" className="scroll-mt-24 py-20 focus:outline-none" tabIndex={-1}>
      <div className="container">
        <H2 subtitle="Our core offerings for DevOps and AI-driven teams">Services</H2>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map(s => {
            let icon = null;
            if (s.title === "CI/CD Pipeline Optimization") icon = <Rocket className="inline-block mr-2 text-indigo-500" size={20} />;
            if (s.title === "Infrastructure as Code") icon = <Layers className="inline-block mr-2 text-green-500" size={20} />;
            if (s.title === "Open Source Monitoring") icon = <LineChart className="inline-block mr-2 text-blue-500" size={20} />;
            if (s.title === "AI Integration & Development") icon = <Brain className="inline-block mr-2 text-purple-500" size={20} />;
            return (
              <Card key={s.title}>
                <h3 className="text-gray-900 font-semibold mb-2 flex items-center">{icon}{s.title}</h3>
                <p className="text-gray-700 mb-3">{s.desc}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {s.bullets.map(b => <li key={b}>• {b}</li>)}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import WeatherWidget from "../components/WeatherWidget";
import ForexWidget from "../components/ForexWidget";
import SocialSidebar from "../components/SocialSidebar";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Wrench, Zap, Terminal, Cpu, Brain, LineChart, Rocket, Mail, Linkedin, Github, Cloud, Layers } from "lucide-react";
import { Button, Card, H2 } from "@/components/ui";
import { Chatbot } from "@/components/chatbot";
import { useState } from "react";

const theme = {
  name: "Scidyllics",
  tagline: "DevOps Excellence + AI Integration. Faster Delivery. Smarter Solutions.",
};

function Nav() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Remove focus from any element
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove focus from any element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
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

function Hero() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Remove focus from any element
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };
  return (
    <header className="relative overflow-hidden mt-16">
      <div className="container pt-20 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 12 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700">
                DevOps + AI Development
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-gray-900">
                {theme.name}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">DevOps + AI Solutions</span>
              </h1>
              <p className="mt-5 text-gray-600 max-w-xl">{theme.tagline}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, 'contact')}
                  onFocus={(e) => e.target.blur()}
                  className="focus:outline-none"
                >
                  <Button className="focus:outline-none">Get a Free Assessment <ArrowRight className="h-5 w-5" /></Button>
                </a>
                <a 
                  href="#portfolio" 
                  onClick={(e) => handleNavClick(e, 'portfolio')} 
                  onFocus={(e) => e.target.blur()}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  View Case Studies
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Enterprise-ready</div>
                <div className="flex items-center gap-1"><Wrench className="h-4 w-4" /> Rapid pilots (4–6 weeks)</div>
                <div className="flex items-center gap-1"><Zap className="h-4 w-4" /> Measurable ROI</div>
              </div>
            </div>
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 140 }}
              whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
            >
              <img src="/hero.png" alt="Hero" className="max-w-full h-auto rounded-3xl shadow-xl mt-8 mb-8 p-2" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

const cases = [
  { title: "AI-Powered Customer Service Platform", impact: ["-60% response time", "+40% satisfaction"], summary: "Built and deployed a Next.js application with OpenAI integration for automated customer support, including CI/CD pipelines." },
  { title: "Multi-Cloud Infrastructure Migration", impact: ["0 downtime", "-40% monthly costs"], summary: "Migrated production workloads from AWS to Azure using Terraform, maintaining existing CI/CD workflows and monitoring." },
  { title: "LLM Integration for Document Processing", impact: ["+85% processing speed", "-70% manual work"], summary: "Developed AI application using OpenAI APIs for automated document analysis with scalable cloud infrastructure." },
];

function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-24 py-20 focus:outline-none" tabIndex={-1}>
      <div className="container">
        <H2 subtitle="Representative outcomes from recent engagements (anonymized)">Case Studies</H2>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map(c => (
            <Card key={c.title}>
              <h3 className="text-gray-900 font-semibold mb-2">{c.title}</h3>
              <p className="text-gray-700 text-sm mb-4">{c.summary}</p>
              <div className="flex flex-wrap gap-2">
                {c.impact.map(i => <span key={i} className="badge">{i}</span>)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 py-20 focus:outline-none" tabIndex={-1}>
      <div className="container">
        <H2 subtitle="Open source tools and multi-cloud DevOps expertise with modern AI integration">Tech Stack</H2>
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="badge"><Cloud className="h-4 w-4 mr-2" /> AWS / Azure / GCP</span>
          <span className="badge"><Layers className="h-4 w-4 mr-2" /> Terraform / Ansible</span>
          <span className="badge"><Wrench className="h-4 w-4 mr-2" /> PowerShell / Docker / Kubernetes</span>
          <span className="badge"><Brain className="h-4 w-4 mr-2" /> OpenAI / Open Source LLMs</span>
          <span className="badge"><Cpu className="h-4 w-4 mr-2" /> React / Next.js / Python</span>
          <span className="badge"><LineChart className="h-4 w-4 mr-2" /> Prometheus / Grafana / GitHub Actions</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 focus:outline-none" tabIndex={-1}>
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/3 flex justify-center items-start">
            <img src="/about.png" alt="About Scidyllics" className="rounded-2xl shadow-lg w-48 md:w-auto md:h-[75%] object-cover mt-2 mb-4 md:mb-0 max-h-[500px]" />
          </div>
          <div className="text-gray-700 flex-1">
            <H2 subtitle="We help DevOps teams deliver faster with less risk using proven automation, open source tools, and best practices.">About Scidyllics</H2>
            <div className="bg-white/80 border border-gray-200 rounded-xl shadow p-4 mt-2 mb-6 mx-auto max-w-xl">
              <ul className="space-y-2 text-sm text-gray-700 pl-4 pr-4 text-left">
                {["4–6 week engagements that prove ROI", "Open source and vendor-neutral approach", "Battle-tested playbooks for repeatable results"].map(b => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/80 border border-gray-200 rounded-xl shadow p-4 mb-2 mx-auto max-w-xl">
              <h3 className="text-gray-900 font-semibold mb-3 text-center">Signature Offers</h3>
              <ul className="space-y-2 text-sm text-gray-700 mx-auto max-w-xl pl-4 pr-4 text-left">
                <li>• AI Application Development & Deployment</li>
                <li>• Multi-Cloud DevOps Optimization</li>
                <li>• LLM Integration Consulting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = Object.fromEntries(fd.entries());
    
    // Basic client-side validation
    if (!body.name || !body.email) {
      setError("Name and email are required");
      setStatus("idle");
      return;
    }
    
    if (typeof body.email === 'string' && !body.email.includes('@')) {
      setError("Please enter a valid email address");
      setStatus("idle");
      return;
    }
    
    try {
      const res = await fetch("/api/contact", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(body) 
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to send message");
      }
      
      setStatus("sent");
      form.reset();
      
      // Auto-reset after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
      
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 focus:outline-none" tabIndex={-1}>
      <div className="container grid md:grid-cols-2 gap-8">
        <div>
          <H2 subtitle="Tell us about your environment and objectives. We'll respond within 1 business day.">Get a Free Assessment</H2>
          <Card>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    name="name" 
                    placeholder="Your name" 
                    required 
                    className="input transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20" 
                  />
                </div>
                <div className="relative">
                  <input 
                    name="email" 
                    type="email" 
                    placeholder="Work email" 
                    required 
                    className="input transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20" 
                  />
                </div>
                <div className="relative">
                  <input 
                    name="company" 
                    placeholder="Company" 
                    className="input transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20" 
                  />
                </div>
                <div className="relative">
                  <textarea 
                    name="message" 
                    rows={5} 
                    placeholder="What are you trying to achieve? (e.g., reduce MTTR, speed up CI/CD, lower alert noise)" 
                    className="textarea transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20" 
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">🔒 We respect your privacy. No spam.</div>
                <Button 
                  disabled={status!=='idle'}
                  className="transition-all duration-200 hover:scale-105 disabled:opacity-50"
                >
                  {status === "idle" ? <>Send <ArrowRight className="h-4 w-4" /></> : status === "sending" ? "Sending..." : "✓ Sent!"}
                </Button>
              </div>
              {error ? (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                    {error}
                  </div>
                </motion.div>
              ) : null}
              {status === "sent" ? (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-sm border border-green-600 rounded-lg p-3" style={{ color: '#16a34a' }}>
                    ✓ Thank you! Your request has been submitted and we've sent you a confirmation email. We'll get back to you within 1 business day.
                  </div>
                </motion.div>
              ) : null}
            </form>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="transition-all duration-200">
            <h3 className="text-white/90 dark:text-white/90 light:text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-indigo-400" />
              Contact Details
            </h3>
            <p className="text-zinc-300 dark:text-zinc-300 light:text-gray-700 mb-6">Prefer email? Reach us directly and we'll set up a discovery call.</p>
            
            <div className="space-y-4">
              <a 
                href="mailto:mdizon@scidyllics.com" 
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-400/30 hover:bg-gray-50 transition-all duration-200 group"
              >
                <Mail className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 group-hover:text-gray-900">mdizon@scidyllics.com</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/mary-ann-dizon-ba336436/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-400/30 hover:bg-gray-50 transition-all duration-200 group"
              >
                <Linkedin className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 group-hover:text-gray-900">Mary Ann Dizon on LinkedIn</span>
              </a>
              
              <a 
                href="https://github.com/mctrinity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-400/30 hover:bg-gray-50 transition-all duration-200 group"
              >
                <Github className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 group-hover:text-gray-900">mctrinity on GitHub</span>
              </a>
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                Timezone: Asia/Manila • Global clients welcome
              </div>
            </div>
          </Card>
          
          <Card className="text-center">
            <h3 className="text-white/90 dark:text-white/90 light:text-gray-900 font-semibold mb-2">Quick Response</h3>
            <p className="text-sm text-gray-600 mb-4">Typical response time</p>
            <div className="text-2xl font-bold text-indigo-400">&lt; 24 hours</div>
            <p className="text-xs text-gray-500 mt-2">Business days only</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Remove focus from any element
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-gray-900 font-medium">{theme.name}</span>
          <span>© {new Date().getFullYear()}&nbsp;All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} onFocus={(e) => e.target.blur()} className="focus:outline-none">Services</a>
          <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} onFocus={(e) => e.target.blur()} className="focus:outline-none">Case Studies</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} onFocus={(e) => e.target.blur()} className="focus:outline-none">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen pb-20">
      <Nav />
  <Hero />
  <Services />
  <Portfolio />
      <Stack />
      <About />
      <Contact />
      <div className="container grid md:grid-cols-2 gap-8 my-12">
        <WeatherWidget />
        <ForexWidget />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
}
