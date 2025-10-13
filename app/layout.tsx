
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scidyllics — AI + DevOps Consulting",
  description: "AI-driven DevOps: faster delivery, fewer incidents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
