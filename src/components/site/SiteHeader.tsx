// src/components/site/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

const NAV_COPY: Record<
  Language,
  {
    education: string;
    howItWorks: string;
  }
> = {
  en: {
    education: "Education",
    howItWorks: "How it works",
  },
  pt: {
    education: "Educação",
    howItWorks: "Como funciona",
  },
  es: {
    education: "Educación",
    howItWorks: "Cómo funciona",
  },
};

export default function SiteHeader() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const t = NAV_COPY[lang];

  const isActive = (href: string) =>
    pathname === href
      ? "text-white"
      : "text-white/70 hover:text-white transition";

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">

        {/* Brand / logo */}
        <Link href="/" className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/kaishiologo.png"
            alt="Kaishio logo"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold">Kaishio</span>
            <span className="text-[12px] text-white/60">
              Money without borders
            </span>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <Link href="/education" className={isActive("/education")}>
              {t.education}
            </Link>

            <Link href="/how-it-works" className={isActive("/how-it-works")}>
              {t.howItWorks}
            </Link>
          </nav>

          {/* Language toggle */}
          <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-1 py-0.5 text-xs">
            {(["en", "pt", "es"] as Language[]).map((code) => {
              const isCurrent = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={
                    "rounded-full px-2 py-1 transition " +
                    (isCurrent
                      ? "bg-white text-black font-semibold"
                      : "text-white/70 hover:text-white")
                  }
                >
                  {code.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
