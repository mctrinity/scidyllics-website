
import { clsx } from "clsx";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className={clsx(
        "btn transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 transform-gpu",
        className
      )} 
      {...props} 
    />
  );
}
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div 
      className={clsx(
        "card p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 transform-gpu animate-in slide-in-from-bottom-4 fade-in",
        className
      )}
    >
      {children}
    </div>
  );
}
export function H2({ children, subtitle }: { children: ReactNode; subtitle?: ReactNode }) {
  return (
    <div className="text-center mb-12 animate-in slide-in-from-bottom-6 fade-in duration-700">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
        {children}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

// Enhanced AnimatedIcon component with pulse and glow effects
export function AnimatedIcon({ 
  children, 
  className, 
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) {
  return (
    <div 
      className={clsx(
        "animate-in zoom-in fade-in duration-500 hover:animate-pulse",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:drop-shadow-blue-500/50 transform-gpu">
        {children}
      </div>
    </div>
  );
}

// Floating animation component
export function FloatingElement({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("animate-bounce-slow hover:animate-none transition-all duration-300", className)}>
      {children}
    </div>
  );
}

// Staggered animation container
export function StaggeredContainer({ 
  children, 
  className,
  stagger = 100
}: { 
  children: ReactNode; 
  className?: string;
  stagger?: number;
}) {
  return (
    <div className={clsx("space-y-4", className)}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <div 
              key={index}
              className="animate-in slide-in-from-left fade-in duration-500"
              style={{ animationDelay: `${index * stagger}ms` }}
            >
              {child}
            </div>
          ))
        : children
      }
    </div>
  );
}

// Gradient text animation
export function AnimatedGradientText({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <span className={clsx(
      "bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-gradient-x bg-300% font-semibold",
      className
    )}>
      {children}
    </span>
  );
}
