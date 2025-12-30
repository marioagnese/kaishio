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
    es: "Opciones rápidas com muitas promoções.",
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

export type ProviderCardProps = {
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
    usdAmount,
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

  const hasSavings =
    isBest && typeof bestSavingsBRL === "number" && bestSavingsBRL > 0;

  const savingsText =
    hasSavings && bestSavingsBRL
      ? (() => {
          const formatted = formatDestCurrency(bestSavingsBRL, destCurrency);
          if (lang === "pt")
            return `≈ ${formatted} a mais em relação ao 2º lugar`;
          if (lang === "es")
            return `≈ ${formatted} más que la segunda mejor opción`;
          return `≈ ${formatted} more than the #2 option`;
        })()
      : null;

  const reasonText = bestReason ?? "";

  const bestLabel =
    lang === "pt"
      ? "Melhor custo–benefício"
      : lang === "es"
      ? "Mejor relación costo–beneficio"
      : "Best overall value";

  return (
    <article
      className={[
        "relative overflow-hidden rounded-3xl border bg-gradient-to-br from-white/8 via-white/3 to-white/[0.02]",
        "p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-stretch",
        "backdrop-blur-xl transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-emerald-300/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]",
        provider.color.border,
        provider.color.bg,
        provider.color.glow,
      ].join(" ")}
    >
      {/* Glow ring for #1 */}
      {isBest && (
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-emerald-400/40 shadow-[0_0_40px_rgba(16,185,129,0.35)]" />
      )}

      {/* LEFT: rank + provider identity */}
      <div className="relative z-10 flex flex-1 items-start gap-4 sm:items-center">
        <div className="flex flex-col items-center pt-1">
          <div className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center font-semibold text-sm shadow-sm">
            {rank}
          </div>
          <span className="mt-1 text-[10px] uppercase tracking-wide text-white/55">
            {lang === "pt" ? "Posição" : lang === "es" ? "Posición" : "Rank"}
          </span>
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2">
              {/* mini avatar with initials */}
              <div className="h-9 w-9 rounded-full bg-white/8 border border-white/20 flex items-center justify-center text-xs font-semibold text-white/90">
                {provider.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="text-base sm:text-lg font-semibold">
                {provider.name}
              </div>
            </div>

            {isBest && (
              <span className="inline-flex items-center rounded-full bg-emerald-400 text-black px-3 py-1 text-[11px] font-semibold shadow-sm">
                {bestLabel}
              </span>
            )}

            {hasSavings && savingsText && (
              <span className="inline-flex items-center rounded-full border border-emerald-300/70 bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-100">
                {savingsText}
              </span>
            )}
          </div>

          {tagline && (
            <div className="text-xs sm:text-sm text-white/70">{tagline}</div>
          )}

          <div className="mt-1 inline-flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-white/60">
            <span>{methodLabelText}</span>
            <span>•</span>
            <span>{country.label[lang]}</span>
            <span>•</span>
            <span>{effectiveRateLabel}</span>
          </div>

          {isBest && reasonText && (
            <p className="mt-2 text-xs text-emerald-100/90 max-w-md">
              {reasonText}
            </p>
          )}
        </div>
      </div>

      {/* MIDDLE: stat blocks */}
      <div className="relative z-10 grid w-full gap-3 sm:w-auto sm:min-w-[360px] sm:grid-cols-3">
        <StatCard
          label={
            lang === "pt"
              ? "Você envia"
              : lang === "es"
              ? "Envías"
              : "You send"
          }
          value={formatUSD(usdAmount)}
          helper={effectiveRateLabel}
        />

        <StatCard
          label={
            lang === "pt"
              ? "Eles recebem (estim.)"
              : lang === "es"
              ? "Reciben (estim.)"
              : "They receive (est.)"
          }
          value={destAmountFormatted}
          helper={
            lang === "pt"
              ? `Taxas estimadas: ${feeFormatted}`
              : lang === "es"
              ? `Comisiones estimadas: ${feeFormatted}`
              : `Estimated fees: ${feeFormatted}`
          }
        />

        <StatCard
          label={
            lang === "pt"
              ? "Velocidade estimada"
              : lang === "es"
              ? "Velocidad estimada"
              : "Estimated speed"
          }
          value={etaLabel}
          helper={methodLabelText}
        />
      </div>

      {/* RIGHT: CTA + microcopy */}
      <div className="relative z-10 sm:self-stretch sm:flex sm:flex-col sm:items-end sm:justify-between">
        <Link
          href={provider.link}
          target="_blank"
          rel="noreferrer"
          className="mt-2 sm:mt-0 inline-flex justify-center rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition shadow-sm"
        >
          {lang === "pt"
            ? "Ir para o provedor"
            : lang === "es"
            ? "Ir al proveedor"
            : "Go to provider"}
        </Link>

        <p className="mt-3 sm:mt-4 text-[10px] text-white/55 max-w-[220px] sm:text-right leading-snug">
          {lang === "pt"
            ? "Kaishio é informativo. O valor final é sempre confirmado pelo provedor, no app/site deles."
            : lang === "es"
            ? "Kaishio es informativo. El valor final siempre lo confirma el proveedor en su app/sitio."
            : "Kaishio is informational only. Final values are always confirmed by the provider on their own app/site."}
        </p>
      </div>
    </article>
  );
}

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="rounded-2xl bg-black/45 border border-white/12 px-4 py-3 shadow-[0_0_0_1px_rgba(15,23,42,0.3)]">
      <div className="text-[11px] uppercase tracking-wide text-white/60">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
      {helper && (
        <div className="mt-1 text-[11px] text-white/65 leading-snug">
          {helper}
        </div>
      )}
    </div>
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
