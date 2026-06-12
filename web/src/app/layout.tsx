import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "VaultMind — AI Agent-Managed DeFi Vaults on Sui",
  description: "AI-powered DeFi vault management platform built on Sui blockchain with Walrus decentralized storage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-navy text-text-primary antialiased">
        <Sidebar />
        {/* Main Content */}
        <main className="lg:ml-[280px] min-h-screen pb-20 lg:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}