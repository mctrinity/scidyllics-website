"use client";
import Header from "./Header";
import Footer from "./Footer";
import SocialSidebar from "./SocialSidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <SocialSidebar />
      </div>
      <main className="md:ml-16 flex-1">
        {children}
      </main>
      {/* Footer always visible, socials only in phone mode */}
      <Footer />
    </div>
  );
}
