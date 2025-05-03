
import React from "react";
import { Navbar } from "./Navbar";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBF7]">
      <Navbar />
      <main className="flex-1">
        {(title || subtitle) && (
          <div className="bg-white shadow-sm border-b mb-6">
            <div className="container mx-auto px-4 py-6">
              {title && <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h1>}
              {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 py-4">
          {children}
        </div>
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2025 YieldQuip. Plant Smarter. Earn More. Grow Together.</p>
        </div>
      </footer>
    </div>
  );
}
