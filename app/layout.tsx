
import "./globals.css";
import SocialSidebar from "../components/SocialSidebar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scidyllics — AI + DevOps Consulting",
  description: "AI-driven DevOps: faster delivery, fewer incidents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
        <head>
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon.svg" />
        </head>
  <body>
        {/* Sidebar for desktop */}
        <div className="hidden md:block">
          <SocialSidebar />
        </div>
        <main className="md:ml-16">
          {children}
        </main>
        {/* Footer always visible, socials only in phone mode */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
