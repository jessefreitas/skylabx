import { VortexNavbar } from "@/components/navigation/vortex-navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkyLabX - DevOps Intelligence",
  description: "Plataforma de orquestração DevOps com IA avançada powered by OmniForge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[#0a0a0a] text-white overflow-x-hidden antialiased">
        <VortexNavbar />
        {children}
      </body>
    </html>
  );
}
