import dns from "node:dns";
dns.setServers(["8.8.8.8","8.8.4.4"]);

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "QurbaniHat",
  description: "Livestock Booking Platform for Qurbani",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="emerald">
      <body className="bg-gray-50 text-gray-800">
        <Toaster position="top-center" reverseOrder={false} />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}