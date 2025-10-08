
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Wrench, Zap, Terminal, Cpu, Brain, LineChart, Rocket, Mail, Linkedin, Github, Cloud, Layers } from "lucide-react";
import { Button, Card, H2 } from "@/components/ui";
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
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/50 border-b border-white/10">
      <div className="container h-16 flex items-center justify-between">
        <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r opacity-60 blur-lg from-indigo-500 to-fuchsia-500" />
            <div className="relative h-9 w-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <span className="font-semibold text-white/90">{theme.name}</span>
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
    <header className="relative overflow-hidden">
      <div className="container pt-20 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 12 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
              <Sparkles className="h-3.5 w-3.5" /> DevOps + AI Development
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-white">
              {theme.name}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400">DevOps + AI Solutions</span>
            </h1>
            <p className="mt-5 text-zinc-300 max-w-xl">{theme.tagline}</p>
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
                className="text-zinc-300 hover:text-white focus:outline-none"
              >
                View Case Studies
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Enterprise-ready</div>
              <div className="flex items-center gap-1"><Wrench className="h-4 w-4" /> Rapid pilots (4–6 weeks)</div>
              <div className="flex items-center gap-1"><Zap className="h-4 w-4" /> Measurable ROI</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl blur-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-40" />
            <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
              <div className="rounded-xl border border-white/10 bg-black px-4 py-3 font-mono text-xs text-zinc-300">
                <div className="flex items-center gap-2 text-zinc-400 mb-2"><Terminal className="h-4 w-4" /> demo@scidyllics:~</div>
                <pre className="whitespace-pre-wrap leading-relaxed">
{`$ scidyllics assess --target ci-cd
> Analyzing pipelines, tests, and deployment metrics...
> Detected flaky tests ↑, slow deploys →, alert noise ↑
> Recommending: test triage agent, canary w/ AI rollback, alert correlation
> Expected impact: -40% MTTR, +25% deploy velocity, -50% noisy alerts`}
                </pre>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

const services = [
  { icon: Cpu, title: "CI/CD Pipeline Optimization", desc: "Streamline your pipelines across Azure DevOps, GitHub Actions, or Jenkins for faster, reliable deployments.", bullets: ["Multi-platform automation", "Parallel job optimization", "Deployment strategies"] },
  { icon: Brain, title: "Infrastructure as Code", desc: "Transform manual processes with Terraform and ARM/Bicep for fast, reliable infrastructure deployments.", bullets: ["Terraform (multi-cloud)", "ARM/Bicep (Azure)", "Fast deployment cycles"] },
  { icon: LineChart, title: "Open Source Monitoring", desc: "Deploy comprehensive observability using proven open source tools like Prometheus, Grafana, and ELK stack.", bullets: ["Prometheus/Grafana setup", "ELK/EFK stack", "Custom dashboards & alerts"] },
  { icon: Rocket, title: "AI Integration & Development", desc: "Build and deploy AI-powered applications with modern frameworks and LLM API integrations.", bullets: ["OpenAI API integration", "AI web applications", "Model deployment pipelines"] },
];

function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 focus:outline-none" tabIndex={-1}>
      <div className="container">
        <H2 subtitle="Designed for measurable impact within 4–6 week pilots.">Services</H2>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map(s => (
            <Card key={s.title}>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-400/20">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="text-white/90 font-semibold">{s.title}</h3>
              </div>
              <p className="text-zinc-300 mb-3">{s.desc}</p>
              <ul className="space-y-2 text-sm text-zinc-300">
                {s.bullets.map(b => <li key={b}>• {b}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
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
              <h3 className="text-white/90 font-semibold mb-2">{c.title}</h3>
              <p className="text-zinc-300 text-sm mb-4">{c.summary}</p>
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
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div className="text-zinc-300">
          <H2 subtitle="We help DevOps teams deliver faster with less risk using proven automation, open source tools, and best practices.">About Scidyllics</H2>
          <ul className="space-y-2">
            {["4–6 week engagements that prove ROI", "Open source and vendor-neutral approach", "Battle-tested playbooks for repeatable results"].map(b => (
              <li key={b}>• {b}</li>
            ))}
          </ul>
        </div>
        <Card>
          <h3 className="text-white/90 font-semibold mb-2">Signature Offers</h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>• AI Application Development & Deployment</li>
            <li>• Multi-Cloud DevOps Optimization</li>
            <li>• LLM Integration Consulting</li>
          </ul>
        </Card>
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
                <div className="text-xs text-zinc-400">🔒 We respect your privacy. No spam.</div>
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
                  <div className="text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                    ✓ Thank you! Your request has been submitted and we've sent you a confirmation email. We'll get back to you within 1 business day.
                  </div>
                </motion.div>
              ) : null}
            </form>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="hover:bg-zinc-900/80 transition-all duration-200">
            <h3 className="text-white/90 font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-indigo-400" />
              Contact Details
            </h3>
            <p className="text-zinc-300 mb-6">Prefer email? Reach us directly and we'll set up a discovery call.</p>
            
            <div className="space-y-4">
              <a 
                href="mailto:mdizon@scidyllics.com" 
                className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:border-indigo-400/30 hover:bg-indigo-400/5 transition-all duration-200 group"
              >
                <Mail className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-300 group-hover:text-white">mdizon@scidyllics.com</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/mary-ann-dizon-ba336436/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:border-indigo-400/30 hover:bg-indigo-400/5 transition-all duration-200 group"
              >
                <Linkedin className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-300 group-hover:text-white">Mary Ann Dizon on LinkedIn</span>
              </a>
              
              <a 
                href="https://github.com/mctrinity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:border-indigo-400/30 hover:bg-indigo-400/5 transition-all duration-200 group"
              >
                <Github className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-300 group-hover:text-white">mctrinity on GitHub</span>
              </a>
            </div>
            
            <div className="pt-6 mt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                Timezone: Asia/Manila • Global clients welcome
              </div>
            </div>
          </Card>
          
          <Card className="text-center">
            <h3 className="text-white/90 font-semibold mb-2">Quick Response</h3>
            <p className="text-sm text-zinc-400 mb-4">Typical response time</p>
            <div className="text-2xl font-bold text-indigo-400">&lt; 24 hours</div>
            <p className="text-xs text-zinc-500 mt-2">Business days only</p>
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
    <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 py-4 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-white/80 font-medium">{theme.name}</span>
          <span>© {new Date().getFullYear()}</span>
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
      <Footer />
    </div>
  );
}
