
import { clsx } from "clsx";
import { ReactNode } from "react";

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx("btn", className)} {...props} />;
}
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("card p-6", className)}>{children}</div>;
}
export function H2({ children, subtitle }: { children: ReactNode; subtitle?: ReactNode }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{children}</h2>
      {subtitle ? <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">{subtitle}</p> : null}
    </div>
  );
}
