import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Kaishio — Dinheiro sem fronteiras",
  description: "Compare o custo real antes de enviar dinheiro ao Brasil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[#070A12] text-white">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
