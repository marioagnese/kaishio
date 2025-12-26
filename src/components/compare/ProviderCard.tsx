"use client";

import { useState } from "react";
import { Quote, formatBRL, formatUSD } from "@/lib/providers";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

type CardCopy = {
  brlEstimatedLabel: string;
  etaLabel: string;
  feeLabel: string;
  rateLabel: string;
  spreadLabel: string;
  methodLabel: string;
  disclaimer: string;
  bestBadge: string;
  savePrefix: string;
  saveSuffix: string;
  showCalc: string;
  hideCalc: string;
  cta: (name: string) => string;
};

const CARD_COPY: Record<Language, CardCopy> = {
  en: {
    brlEstimatedLabel: "Estimated BRL you receive",
    etaLabel: "ETA",
    feeLabel: "Fee (USD)",
    rateLabel: "Estimated rate",
    spreadLabel: "Assumed spread",
    methodLabel: "Method",
    disclaimer:
      "*Estimate: fee + assumed spread over mid-market. Final value can change due to promos, time, method, and KYC.",
    bestBadge: "Best option",
    savePrefix: "You save",
    saveSuffix: "vs next option",
    showCalc: "Show calculation",
    hideCalc: "Hide calculation",
    cta: (name) => `Go to ${name}`,
  },
  pt: {
    brlEstimatedLabel: "BRL estimado que chega",
    etaLabel: "Prazo",
    feeLabel: "Taxa (USD)",
    rateLabel: "Câmbio estimado",
    spreadLabel: "Spread assumido",
    methodLabel: "Método",
    disclaimer:
      "*Estimativa: taxa + spread assumido sobre o câmbio “mid-market”. O valor final pode mudar por promoções, horário, método e verificação.",
    bestBadge: "Melhor opção",
    savePrefix: "Você economiza",
    saveSuffix: "vs próxima opção",
    showCalc: "Mostrar cálculo",
    hideCalc: "Esconder cálculo",
    cta: (name) => `Ir para ${name}`,
  },
  es: {
    brlEstimatedLabel: "BRL estimado que recibes",
    etaLabel: "Tiempo",
    feeLabel: "Comisión (USD)",
    rateLabel: "Cambio estimado",
    spreadLabel: "Spread asumido",
    methodLabel: "Método",
    disclaimer:
      "*Estimación: comisión + spread asumido sobre el tipo “mid-market”. El valor final puede cambiar por promociones, horario, método y verificación.",
    bestBadge: "Mejor opción",
    savePrefix: "Ahorras",
    saveSuffix: "vs siguiente opción",
    showCalc: "Mostrar cálculo",
    hideCalc: "Ocultar cálculo",
    cta: (name) => `Ir a ${name}`,
  },
};

export default function ProviderCard({
  quote,
  rank,
  bestSavingsBRL,
  bestReason,
}: {
  quote: Quote;
  rank: number;
  bestSavingsBRL?: number;
  bestReason?: string;
}) {
  const { provider } = quote;
  const { lang } = useLanguage();
  const t = CARD_COPY[lang];

  const [showCalc, setShowCalc] = useState(false);

  const isBest = rank === 1 && bestSavingsBRL && bestSavingsBRL > 0;

  return (
    <a
      href={provider.link}
      target="_blank"
      rel="noreferrer"
      className={[
        "block rounded-2xl border transition p-5",
        "hover:translate-y-[-1px]",
        provider.color.border,
        provider.color.bg,
        provider.color.glow,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div
              className={[
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                provider.color.badge,
              ].join(" ")}
            >
              #{rank}
            </div>
            {isBest && (
              <span className="inline-flex items-center rounded-full bg-emerald-400/15 text-emerald-100 px-2 py-0.5 text-xs font-semibold">
                {t.bestBadge}
              </span>
            )}
          </div>

          <div className="text-xl font-semibold mt-2">
            {provider.name}
          </div>
          <div className="text-sm text-white/70 mt-1">
            {provider.tagline}
          </div>

          {isBest && bestSavingsBRL && (
            <div className="mt-2 text-xs text-emerald-100/90">
              {t.savePrefix} {formatBRL(bestSavingsBRL)} {t.saveSuffix}.
              {bestReason ? ` ${bestReason}` : null}
            </div>
          )}
        </div>

        <div className="text-right">
          <div className="text-xs text-white/60">
            {t.brlEstimatedLabel}
          </div>
          <div className="text-xl font-semibold">
            {formatBRL(quote.brlEstimated)}
          </div>
          <div className="text-xs text-white/60 mt-1">
            {t.etaLabel}: {quote.etaLabel}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Metric label={t.feeLabel} value={formatUSD(quote.feeUSD)} />
        <Metric
          label={t.rateLabel}
          value={`${quote.customerRate.toFixed(4)} BRL/USD`}
        />
        <Metric
          label={t.spreadLabel}
          value={`${(quote.spreadPct * 100).toFixed(1)}%`}
        />
        <Metric
          label={t.methodLabel}
          value={methodLabel(quote.method, lang)}
        />
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setShowCalc((prev) => !prev);
        }}
        className="mt-4 text-xs underline text-white/70 hover:text-white"
      >
        {showCalc ? t.hideCalc : t.showCalc}
      </button>

      {showCalc && (
        <div className="mt-2 text-xs text-white/70 leading-relaxed">
          {/* Simple explanation of the math */}
          <p>
            1) Mid-market rate: {quote.midRate.toFixed(4)} BRL/USD.
          </p>
          <p>
            2) Spread assumed: {(quote.spreadPct * 100).toFixed(2)}% →{" "}
            {quote.customerRate.toFixed(4)} BRL/USD for you.
          </p>
          <p>
            3) Fees: {formatUSD(quote.feeUSD)} → net{" "}
            {formatUSD(quote.usdAmount - quote.feeUSD)} sent.
          </p>
          <p>
            4) Net USD × customer rate = {formatBRL(quote.brlEstimated)}.
          </p>
        </div>
      )}

      <div className="mt-4 text-xs text-white/55 leading-relaxed">
        {t.disclaimer}
      </div>

      <div className="mt-4 inline-flex rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold">
        {t.cta(provider.name)}
      </div>
    </a>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="text-xs text-white/60">{label}</div>
      <div className="text-sm font-semibold mt-1">{value}</div>
    </div>
  );
}

function methodLabel(m: string, lang: Language): string {
  if (lang === "en") {
    if (m === "bank") return "Bank account";
    if (m === "debit") return "Card/Debit";
    if (m === "cash") return "Cash pickup";
    return m;
  }
  if (lang === "es") {
    if (m === "bank") return "Cuenta bancaria";
    if (m === "debit") return "Tarjeta/Débito";
    if (m === "cash") return "Retiro en efectivo";
    return m;
  }
  // pt (default)
  if (m === "bank") return "Conta bancária";
  if (m === "debit") return "Cartão/Débito";
  if (m === "cash") return "Cash pickup";
  return m;
}
