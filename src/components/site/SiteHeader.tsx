// src/components/site/SiteHeader.tsx
"use client";

import { useLanguage, type Language } from "@/contexts/LanguageContext";

export default function SiteHeader() {
  const { lang, setLang } = useLanguage();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-3">
        {/* Language toggle only */}
        <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-1 py-0.5 text-[11px] sm:text-xs">
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
    </header>
  );
}
