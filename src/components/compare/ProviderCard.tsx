"use client";

import { useMemo, useState } from "react";
import { Quote, formatBRL, formatUSD } from "@/lib/providers";

export default function ProviderCard({
  quote,
  rank,
  bestSavingsBRL,
  bestReason,
}: {
  quote: Quote;
  rank: number;
  bestSavingsBRL?: number; // only shown on rank #1
  bestReason?: string;     // only shown on rank #1
}) {
  const { provider } = quote;
  const rec = recommendation(rank);

  const [open, setOpen] = useState(false);

  const usdNet = useMemo(() => Math.max(0, quote.usdAmount - quote.feeUSD), [quote]);
  const midBrl = useMemo(() => usdNet * quote.midRate, [usdNet, quote.midRate]);
  const spreadLossBrl = useMemo(() => Math.max(0, midBrl - quote.brlEstimated), [midBrl, quote.brlEstimated]);

  return (
    <div
      className={[
        "rounded-2xl border transition p-5",
        "hover:translate-y-[-1px] hover:bg-white/10",
        provider.color.border,
        provider.color.bg,
        provider.color.glow,
        rank === 1 ? "ring-2 ring-emerald-400/30" : "",
      ].join(" ")}
    >
      <a href={provider.link} target="_blank" rel="noreferrer" className="block">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div
                className={[
                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border",
                  rec.cls,
                ].join(" ")}
              >
                {rec.label}
              </div>
              <div className="text-xs text-white/55">#{rank}</div>
            </div>

            <div className="text-xl font-semibold mt-2">{provider.name}</div>
            <div className="text-sm text-white/70 mt-1">{provider.tagline}</div>

            {rank === 1 && (typeof bestSavingsBRL === "number" || bestReason) && (
              <div className="mt-3 space-y-1">
                {typeof bestSavingsBRL === "number" && bestSavingsBRL > 0 && (
                  <div className="inline-flex items-center rounded-xl bg-emerald-400/15 border border-emerald-400/25 px-3 py-2 text-sm text-emerald-100">
                    💰 Você recebe <span className="font-semibold mx-1">{formatBRL(bestSavingsBRL)}</span> a mais que a #2
                  </div>
                )}
                {bestReason && (
                  <div className="text-sm text-white/70">
                    ✅ Por quê: <span className="font-semibold text-white">{bestReason}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="text-xs text-white/60">BRL estimado</div>
            <div className="text-xl font-semibold">{formatBRL(quote.brlEstimated)}</div>
            <div className="text-xs text-white/60 mt-1">ETA: {quote.etaLabel}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Metric label="Taxa (USD)" value={formatUSD(quote.feeUSD)} />
          <Metric label="Câmbio estimado" value={`${quote.customerRate.toFixed(4)} BRL/USD`} />
          <Metric label="Spread assumido" value={`${(quote.spreadPct * 100).toFixed(1)}%`} />
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

      {/* Show calculation toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-4 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85 hover:bg-black/30 transition flex items-center justify-between"
        aria-expanded={open}
      >
        <span>{open ? "Ocultar cálculo" : "Mostrar cálculo"}</span>
        <span className="text-white/60">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="text-sm font-semibold mb-3">Como estimamos</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <CalcRow label="Você envia" value={formatUSD(quote.usdAmount)} />
            <CalcRow label="Taxa total" value={formatUSD(quote.feeUSD)} />
            <CalcRow label="USD após taxa" value={formatUSD(usdNet)} />
            <CalcRow label="Mid-market" value={`${quote.midRate.toFixed(4)} BRL/USD`} />
            <CalcRow label="Spread assumido" value={`${(quote.spreadPct * 100).toFixed(2)}%`} />
            <CalcRow label="Câmbio do provedor" value={`${quote.customerRate.toFixed(4)} BRL/USD`} />
            <CalcRow label="BRL no mid-market (sem spread)" value={formatBRL(midBrl)} />
            <CalcRow label="Perda estimada por spread" value={formatBRL(spreadLossBrl)} />
          </div>

          <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-between">
            <div className="text-sm text-white/70">BRL estimado final</div>
            <div className="text-lg font-semibold">{formatBRL(quote.brlEstimated)}</div>
          </div>

          <div className="mt-3 text-xs text-white/55 leading-relaxed">
            Nota: “Perda por spread” é uma estimativa comparando mid-market vs câmbio do provedor.
            O valor final pode variar por promoções, verificação e horário.
          </div>
        </div>
      )}
    </div>
  );
}

function recommendation(rank: number) {
  if (rank === 1) {
    return { label: "MELHOR OPÇÃO", cls: "bg-emerald-400/15 text-emerald-200 border-emerald-400/25" };
  }
  if (rank <= 3) {
    return { label: "BOA OPÇÃO", cls: "bg-amber-400/15 text-amber-200 border-amber-400/25" };
  }
  return { label: "OPÇÃO OK", cls: "bg-white/10 text-white/80 border-white/10" };
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="text-xs text-white/60">{label}</div>
      <div className="text-sm font-semibold mt-1">{value}</div>
    </div>
  );
}

function CalcRow({ label, value }: { label: string; value: string }) {
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
