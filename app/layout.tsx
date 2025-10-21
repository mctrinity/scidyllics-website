
import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import AdminToolbar from "@/components/AdminToolbar";
import { isAdminServer } from "@/lib/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scidyllics — AI + DevOps Consulting",
  description: "AI-driven DevOps: faster delivery, fewer incidents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const admin = isAdminServer();
  return (
      <html lang="en">
        <head>
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon.svg" />
        </head>
  <body>
        <ClientLayout>
          {children}
          {admin && <AdminToolbar />}
        </ClientLayout>
      </body>
    </html>
  );
}
