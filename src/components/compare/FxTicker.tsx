// src/components/compare/FxTicker.tsx
"use client";

import { useLanguage, type Language } from "@/contexts/LanguageContext";
import {
  COUNTRIES,
  type CountryCode,
  formatDestCurrency,
} from "@/lib/providers";

type FxTickerProps = {
  activeCountry: CountryCode;
  activeMidRate: number;
};

export default function FxTicker({
  activeCountry,
  activeMidRate,
}: FxTickerProps) {
  const { lang } = useLanguage();

  const labelByLang: Record<Language, string> = {
    en: "Approx. mid-market spot rates (for context only)",
    pt: "Cotações spot aproximadas (somente para contexto)",
    es: "Tipos spot aproximados (solo como referencia)",
  };

  const items = COUNTRIES.map((c) => {
    const rate =
      c.code === activeCountry && activeMidRate
        ? activeMidRate
        : c.defaultMidRate;

    const formatted = formatDestCurrency(rate, c.currencyCode);

    return {
      key: c.code,
      text: `USD → ${c.currencyCode} • ${formatted}`,
      isActive: c.code === activeCountry,
    };
  });

  // Duplicate list to allow smooth looping animation
  const loopItems = [...items, ...items];

  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 px-4 py-3 overflow-hidden">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-white/55 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>{labelByLang[lang]}</span>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#050814] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#050814] to-transparent" />

        <div className="flex gap-3 min-w-max ticker-track">
          {loopItems.map((item, idx) => (
            <span
              key={`${item.key}-${idx}`}
              className={[
                "inline-flex items-center rounded-full border px-3 py-1 text-xs whitespace-nowrap backdrop-blur-sm",
                item.isActive
                  ? "border-emerald-400/80 bg-emerald-400/20 text-emerald-50"
                  : "border-white/18 bg-white/5 text-white/75",
              ].join(" ")}
            >
              {item.text}
            </span>
          ))}
        </div>

        {/* Local CSS animation */}
        <style jsx>{`
          .ticker-track {
            animation: fx-marquee 26s linear infinite;
          }

          @keyframes fx-marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
