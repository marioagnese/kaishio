// src/components/site/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

export default function SiteHeader() {
  const pathname = usePathname(); // kept in case you want later logic
  const { lang, setLang } = useLanguage();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:py-5">

        {/* Brand / big round logo */}
        <Link href="/" className="flex items-center gap-5">
          {/* Outer round badge so it matches your red circle idea */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full border border-white/25 bg-black/40 p-2 shadow-[0_0_45px_rgba(0,0,0,0.6)] flex items-center justify-center">
            <img
              src="/brand/kaishiologo.png"
              alt="Kaishio logo"
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight">
              Kaishio
            </span>
            <span className="text-[13px] text-white/65">
              Money without borders
            </span>
          </div>
        </Link>

        {/* Right side: ONLY language toggle now */}
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-1 py-0.5 text-xs sm:text-sm">
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
