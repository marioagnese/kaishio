// src/components/compare/ProviderCard.tsx
"use client";

import { useState } from "react";
import {
  Quote,
  formatUSD,
  formatDestCurrency,
  COUNTRY_BY_CODE,
} from "@/lib/providers";

export default function ProviderCard({
  quote,
  rank,
  bestSavings,
  bestReason,
}: {
  quote: Quote;
  rank: number;
  bestSavings?: number;
  bestReason?: string;
}) {
  const { provider } = quote;
  const country = COUNTRY_BY_CODE[quote.countryCode];
  const [showCalc, setShowCalc] = useState(false);

  const usdNet = Math.max(0, quote.usdAmount - quote.feeUSD);

  return (
    <a
      href={provider.link}
      target="_blank"
      rel="noreferrer"
      className={[
        "block rounded-2xl border transition p-5",
        "hover:translate-y-[-1px] hover:bg-white/10",
        provider.color.border,
        provider.color.bg,
        provider.color.glow,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className={[
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
              provider.color.badge,
            ].join(" ")}
          >
            #{rank}
          </div>

          <div className="text-xl font-semibold mt-2">{provider.name}</div>
          <div className="text-sm text-white/70 mt-1">{provider.tagline}</div>

          {rank === 1 && bestSavings && bestSavings > 0 && (
            <div className="mt-2 text-xs text-emerald-200 bg-emerald-500/10 inline-flex rounded-full px-3 py-1">
              Você economiza{" "}
              <span className="font-semibold ml-1">
                {formatDestCurrency(bestSavings, country.currencyCode)}
              </span>{" "}
              vs. próxima opção.
            </div>
          )}

          {rank === 1 && bestReason && (
            <div className="mt-2 text-xs text-white/70">
              Motivo: <span className="text-white">{bestReason}</span>
            </div>
          )}
        </div>

        <div className="text-right">
          <div className="text-xs text-white/60">
            {country.currencyCode} estimado
          </div>
          <div className="text-xl font-semibold">
            {formatDestCurrency(quote.receiveAmount, country.currencyCode)}
          </div>
          <div className="text-xs text-white/60 mt-1">
            ETA: {quote.etaLabel}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Metric label="Taxa (USD)" value={formatUSD(quote.feeUSD)} />
        <Metric
          label="Câmbio estimado"
          value={`${quote.customerRate.toFixed(4)} ${country.currencyCode}/USD`}
        />
        <Metric
          label="Spread assumido"
          value={`${(quote.spreadPct * 100).toFixed(1)}%`}
        />
        <Metric label="Método" value={methodLabel(quote.method)} />
      </div>

      {/* Show calculation toggle */}
      <button
        type="button"
        onClick={() => setShowCalc((v) => !v)}
        className="mt-4 text-xs text-white/70 underline underline-offset-4"
      >
        {showCalc ? "Esconder cálculo" : "Mostrar cálculo"}
      </button>

      {showCalc && (
        <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/70 space-y-1">
          <div>
            Valor enviado:{" "}
            <span className="font-semibold">
              {formatUSD(quote.usdAmount)}
            </span>
          </div>
          <div>
            Taxas totais:{" "}
            <span className="font-semibold">
              {formatUSD(quote.feeUSD)}
            </span>
          </div>
          <div>
            USD líquido convertido:{" "}
            <span className="font-semibold">
              {formatUSD(usdNet)}
            </span>
          </div>
          <div>
            Câmbio aplicado:{" "}
            <span className="font-semibold">
              {quote.customerRate.toFixed(4)} {country.currencyCode}/USD
            </span>
          </div>
          <div>
            Valor estimado recebido:{" "}
            <span className="font-semibold">
              {formatDestCurrency(quote.receiveAmount, country.currencyCode)}
            </span>
          </div>
        </div>
      )}

      <div className="mt-4 inline-flex rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold">
        Ir para {provider.name}
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

function methodLabel(m: string) {
  if (m === "bank") return "Conta bancária";
  if (m === "debit") return "Cartão/Débito";
  if (m === "cash") return "Cash pickup";
  return m;
}
