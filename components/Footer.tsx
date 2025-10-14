import React from "react";
import SocialSidebar from "./SocialSidebar";

export default function Footer() {
  return (
  <footer className="w-full py-6 px-4 bg-gray-50 text-center text-sm text-gray-500">
      <div className="block md:hidden mb-4">
        <SocialSidebar />
      </div>
      <div>© 2025 Scidyllics. All rights reserved.</div>
    </footer>
  );
}
