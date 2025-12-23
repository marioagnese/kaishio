"use client";

import { Quote, formatBRL, formatUSD } from "@/lib/providers";

export default function ProviderCard({
  quote,
  rank,
}: {
  quote: Quote;
  rank: number;
}) {
  const { provider } = quote;

  return (
    <a
      href={provider.link}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-white/60">#{rank}</div>
          <div className="text-xl font-semibold">{provider.name}</div>
          <div className="text-sm text-white/70 mt-1">{provider.tagline}</div>
        </div>

        <div className="text-right">
          <div className="text-xs text-white/60">BRL estimado</div>
          <div className="text-xl font-semibold">{formatBRL(quote.brlEstimated)}</div>
          <div className="text-xs text-white/60 mt-1">ETA: {quote.etaLabel}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Metric label="Taxa (USD)" value={formatUSD(quote.feeUSD)} />
        <Metric
          label="Câmbio estimado"
          value={`${quote.customerRate.toFixed(4)} BRL/USD`}
        />
        <Metric
          label="Spread assumido"
          value={`${(quote.spreadPct * 100).toFixed(1)}%`}
        />
        <Metric label="Método" value={methodLabel(quote.method)} />
      </div>

      <div className="mt-4 text-xs text-white/55 leading-relaxed">
        *Estimativa: taxa + spread assumido sobre “mid-market”. O valor final pode mudar por promoções,
        horário (fim de semana), método e verificação do usuário.
      </div>

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
