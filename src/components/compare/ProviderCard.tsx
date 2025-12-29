// src/components/compare/ProviderCard.tsx
"use client";

import Link from "next/link";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import {
  type Quote,
  type ProviderId,
  type DeliveryMethod,
  COUNTRY_BY_CODE,
  formatUSD,
  formatDestCurrency,
} from "@/lib/providers";

// Provider taglines per language
const PROVIDER_TAGLINES: Record<ProviderId, Record<Language, string>> = {
  wise: {
    en: "Usually strong on FX and low fees.",
    pt: "Geralmente forte em câmbio e taxas baixas.",
    es: "Suele tener buen tipo de cambio y bajas comisiones.",
  },
  remitly: {
    en: "Fast delivery options with promo campaigns.",
    pt: "Opções rápidas com campanhas promocionais frequentes.",
    es: "Opciones rápidas con muchas promociones.",
  },
  xoom: {
    en: "Backed by PayPal with cash pickup network.",
    pt: "Rede PayPal com forte presença em cash pickup.",
    es: "Respaldado por PayPal con amplia red de retiro en efectivo.",
  },
  paypal: {
    en: "Convenient if you already use PayPal.",
    pt: "Conveniência, especialmente para quem já usa PayPal.",
    es: "Muy conveniente si ya usas PayPal.",
  },
  western_union: {
    en: "Very strong in global cash pickup locations.",
    pt: "Muito forte em pontos de cash pickup pelo mundo.",
    es: "Muy fuerte en puntos de retiro en efectivo.",
  },
  moneygram: {
    en: "Popular alternative for cash and bank transfers.",
    pt: "Alternativa popular para cash e conta bancária.",
    es: "Alternativa popular para retiro en efectivo y banco.",
  },
  taptapsend: {
    en: "Mobile-first remittances with low fees.",
    pt: "Remessas focadas em celular, com taxas baixas.",
    es: "Remesas móviles con comisiones bajas.",
  },
};

type ProviderCardProps = {
  quote: Quote;
  rank: number;
  bestSavingsBRL?: number;
  bestReason?: string;
};

export default function ProviderCard({
  quote,
  rank,
  bestSavingsBRL,
  bestReason,
}: ProviderCardProps) {
  const { lang } = useLanguage();

  const {
    provider,
    method,
    receiveAmount,
    feeUSD,
    customerRate,
    countryCode,
    etaLabel,
  } = quote;

  const country = COUNTRY_BY_CODE[countryCode];
  const destCurrency = country.currencyCode;
  const destAmountFormatted = formatDestCurrency(receiveAmount, destCurrency);

  const feeFormatted = formatUSD(feeUSD);
  const effectiveRateLabel = `1 USD ≈ ${formatDestCurrency(
    customerRate,
    destCurrency
  )}`;

  const tagline =
    PROVIDER_TAGLINES[provider.id]?.[lang] ?? provider.tagline ?? "";

  const methodLabelText = methodLabel(method, lang);

  const isBest = rank === 1;
  const hasSavings = isBest && bestSavingsBRL && bestSavingsBRL > 0;

  const savingsText = hasSavings
    ? (() => {
        const formatted = formatDestCurrency(bestSavingsBRL!, destCurrency);
        if (lang === "pt")
          return `≈ ${formatted} a mais em relação ao 2º lugar (estimativa)`;
        if (lang === "es")
          return `≈ ${formatted} más que la segunda mejor opción (estimado)`;
        return `≈ ${formatted} more than the #2 option (estimate)`;
      })()
    : null;

  const reasonText = bestReason ?? "";

  const bestLabel =
    lang === "pt"
      ? "Melhor custo–benefício"
      : lang === "es"
      ? "Mejor relación costo–beneficio"
      : "Best overall value";

  const countryLabel = country.label[lang];

  return (
    <article
      className={[
        "group rounded-3xl border bg-white/[0.03] backdrop-blur-xl",
        "border-white/12 shadow-[0_18px_55px_rgba(15,23,42,0.70)]",
        "px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6",
        "flex flex-col gap-4 sm:flex-row sm:items-center transition-transform duration-200",
        "hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(15,23,42,0.85)]",
        provider.color.border,
        provider.color.bg,
        provider.color.glow,
      ].join(" ")}
    >
      {/* Left: rank + provider */}
      <div className="flex items-start sm:items-center gap-4 flex-1">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center font-semibold text-sm shadow-sm shadow-black/30">
            {rank}
          </div>
          <span className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/55">
            {lang === "pt" ? "Posição" : lang === "es" ? "Posición" : "Rank"}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-base sm:text-lg font-semibold">
              {provider.name}
            </div>
            {isBest && (
              <span
                className={[
                  "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
                  "shadow-[0_0_0_1px_rgba(15,23,42,0.2)]",
                  provider.color.badge,
                ].join(" ")}
              >
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_0_1px_rgba(16,185,129,0.6)]" />
                {bestLabel}
              </span>
            )}
          </div>

          <div className="mt-1 text-xs sm:text-sm text-white/70">
            {tagline}
          </div>

          <div className="mt-2 inline-flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-white/60">
            <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5">
              {methodLabelText}
            </span>
            <span>•</span>
            <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5">
              {countryLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Right: numbers */}
      <div className="grid gap-3 sm:grid-cols-3 w-full sm:w-auto sm:min-w-[360px]">
        <div className="rounded-2xl bg-black/25 border border-white/12 px-4 py-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">
            {lang === "pt"
              ? "Você envia"
              : lang === "es"
              ? "Envías"
              : "You send"}
          </div>
          <div className="mt-1 text-sm font-semibold">
            {formatUSD(quote.usdAmount)}
          </div>
          <div className="mt-1 text-[11px] text-white/60">
            {effectiveRateLabel}
          </div>
        </div>

        <div className="rounded-2xl bg-black/25 border border-white/12 px-4 py-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">
            {lang === "pt"
              ? "Destinatário recebe (estim.)"
              : lang === "es"
              ? "Recibe (estim.)"
              : "They receive (est.)"}
          </div>
          <div className="mt-1 text-sm font-semibold">{destAmountFormatted}</div>
          <div className="mt-1 text-[11px] text-white/60">
            {lang === "pt"
              ? `Taxas estimadas: ${feeFormatted}`
              : lang === "es"
              ? `Comisiones estimadas: ${feeFormatted}`
              : `Estimated fees: ${feeFormatted}`}
          </div>
        </div>

        <div className="rounded-2xl bg-black/25 border border-white/12 px-4 py-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">
            {lang === "pt"
              ? "Velocidade estimada"
              : lang === "es"
              ? "Velocidad estimada"
              : "Estimated speed"}
          </div>
          <div className="mt-1 text-sm font-semibold">{etaLabel}</div>

          {hasSavings && savingsText && (
            <div className="mt-1 text-[11px] text-emerald-200">
              {savingsText}
            </div>
          )}

          {isBest && reasonText && (
            <div className="mt-1 text-[11px] text-white/70">
              {reasonText}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="sm:self-stretch sm:flex sm:items-center">
        <Link
          href={provider.link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 sm:mt-0 inline-flex justify-center rounded-full bg-white text-black px-4 py-2 text-xs sm:text-sm font-semibold hover:bg-white/90 transition shadow-sm shadow-black/30"
        >
          {lang === "pt"
            ? "Ir para o provedor"
            : lang === "es"
            ? "Ir al proveedor"
            : "Go to provider"}
        </Link>
      </div>
    </article>
  );
}

function methodLabel(m: DeliveryMethod, lang: Language): string {
  if (lang === "en") {
    if (m === "bank") return "Bank account";
    if (m === "debit") return "Card / debit";
    if (m === "cash") return "Cash pickup";
  } else if (lang === "pt") {
    if (m === "bank") return "Conta bancária";
    if (m === "debit") return "Cartão / débito";
    if (m === "cash") return "Retirada em dinheiro";
  } else {
    // es
    if (m === "bank") return "Cuenta bancaria";
    if (m === "debit") return "Tarjeta / débito";
    if (m === "cash") return "Retiro en efectivo";
  }
  return m;
}
