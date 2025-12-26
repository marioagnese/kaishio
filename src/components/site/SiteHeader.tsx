"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

const LABELS: Record<
  Language,
  {
    tagline: string;
    education: string;
    how: string;
    compare: string;
    start: string;
  }
> = {
  en: {
    tagline: "Money without borders",
    education: "Education",
    how: "How it works",
    compare: "Compare",
    start: "Start",
  },
  pt: {
    tagline: "Dinheiro sem fronteiras",
    education: "Educação",
    how: "Como funciona",
    compare: "Comparar",
    start: "Começar",
  },
  es: {
    tagline: "Dinero sin fronteras",
    education: "Educación",
    how: "Cómo funciona",
    compare: "Comparar",
    start: "Empezar",
  },
};

const LANG_CHOICES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
];

export default function SiteHeader() {
  const { lang, setLang } = useLanguage();
  const t = LABELS[lang];

  return (
    <header className="sticky top-0 z-50 bg-[#060812]/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        {/* BRAND */}
        <Link href="/" className="flex items-center gap-6">
          {/* BIG LOGO BADGE (reads on mobile) */}
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white flex items-center justify-center shadow-xl ring-1 ring-black/10 overflow-hidden">
            <Image
              src="/brand/kaishiologo.png"
              alt="Kaishio"
              width={260}
              height={260}
              className="object-contain scale-[1.4]"
              priority
            />
          </div>

          {/* WORDMARK */}
          <div className="leading-tight">
            <div className="text-3xl sm:text-4xl font-bold tracking-wide">
              Kaishio
            </div>
            <div className="text-base sm:text-lg text-white/70">
              {t.tagline}
            </div>
          </div>
        </Link>

        {/* NAV + LANGUAGE TOGGLE */}
        <div className="flex flex-col items-end gap-2">
          {/* Language selector */}
          <div className="flex items-center gap-1">
            {LANG_CHOICES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLang(item.code)}
                className={[
                  "px-2 py-1 text-xs rounded-full border transition",
                  lang === item.code
                    ? "bg-white text-black border-white"
                    : "border-white/25 text-white/70 hover:bg-white/10",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/education"
              className="hidden sm:inline-flex rounded-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              {t.education}
            </Link>
            <Link
              href="/how-it-works"
              className="hidden sm:inline-flex rounded-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              {t.how}
            </Link>
            <Link
              href="/compare"
              className="ml-2 inline-flex rounded-full bg-white text-black px-5 py-2 text-sm font-semibold hover:bg-white/90 transition"
            >
              {t.start}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
