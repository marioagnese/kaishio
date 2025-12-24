"use client";

import { useMemo, useState } from "react";
import ProviderCard from "@/components/compare/ProviderCard";
import {
  PROVIDERS,
  buildQuote,
  rankQuotes,
  type DeliveryMethod,
  type SpeedPreference,
  type Quote,
  formatUSD,
} from "@/lib/providers";

export default function ComparePage() {
  const [usdAmount, setUsdAmount] = useState<number>(500);
  const [midRate, setMidRate] = useState<number>(5.3);
  const [isWeekend, setIsWeekend] = useState<boolean>(false);
  const [method, setMethod] = useState<DeliveryMethod>("bank");
  const [pref, setPref] = useState<SpeedPreference>("balanced");

  const [fxLoading, setFxLoading] = useState(false);
  const [fxError, setFxError] = useState<string | null>(null);
  const [fxStamp, setFxStamp] = useState<string | null>(null);

  const quotes = useMemo(() => {
    const built: Quote[] = [];
    for (const p of PROVIDERS) {
      const q = buildQuote({
        provider: p,
        method,
        usdAmount,
        midRate,
        isWeekend,
      });
      if (q) built.push(q);
    }
    return rankQuotes(built, pref);
  }, [method, usdAmount, midRate, isWeekend, pref]);

  const best = quotes[0];
  const second = quotes[1];

  const bestSavingsBRL = useMemo(() => {
    if (!best || !second) return undefined;
    const diff = best.brlEstimated - second.brlEstimated;
    return diff > 0 ? diff : 0;
  }, [best, second]);

  const bestReason = useMemo(() => {
    if (!best || !second) return undefined;
    return computeBestReason(best, second);
  }, [best, second]);

  async function handleAutoFx() {
    setFxLoading(true);
    setFxError(null);

    try {
      const res = await fetch("/api/fx?from=USD&to=BRL", { cache: "no-store" });
      if (!res.ok) throw new Error("Falha ao buscar câmbio.");

      const data: { rate: number; date?: string; provider?: string } =
        await res.json();

      if (!data?.rate || Number.isNaN(data.rate)) {
        throw new Error("Resposta inválida do câmbio.");
      }

      setMidRate(data.rate);
      setFxStamp(`${data.provider ?? "FX"} • ${data.date ?? "hoje"}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao buscar câmbio.";
      setFxError(message);
    } finally {
      setFxLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Comparar provedores (EUA → Brasil)
        </h1>
        <p className="mt-2 text-white/70">
          Insira o valor, escolha o método e veja a melhor opção com estimativa de
          BRL.
        </p>

        {/* Controls */}
        <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="grid gap-4 md:grid-cols-4">
            <Control label="Valor em USD">
              <input
                type="number"
                min={1}
                value={usdAmount}
                onChange={(e) => setUsdAmount(Number(e.target.value || 0))}
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
              />
              <div className="mt-1 text-xs text-white/50">
                Você envia: {formatUSD(usdAmount)}
              </div>
            </Control>

            <Control label="Câmbio (USD → BRL)">
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.0001"
                  value={midRate}
                  onChange={(e) => setMidRate(Number(e.target.value || 0))}
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
                />
                <button
                  onClick={handleAutoFx}
                  disabled={fxLoading}
                  className="rounded-xl bg-white text-black px-4 py-3 text-sm font-semibold hover:bg-white/90 disabled:opacity-60"
                >
                  {fxLoading ? "Buscando..." : "Auto FX"}
                </button>
              </div>
              <div className="mt-1 text-xs text-white/55">
                {fxError ? (
                  <span className="text-red-200">{fxError}</span>
                ) : fxStamp ? (
                  fxStamp
                ) : (
                  "Dica: use Auto FX para pegar o câmbio do dia."
                )}
              </div>
            </Control>

            <Control label="Método">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as DeliveryMethod)}
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
              >
                <option value="bank">Conta bancária</option>
                <option value="debit">Cartão/Débito</option>
                <option value="cash">Cash pickup</option>
              </select>
            </Control>

            <Control label="Preferência">
              <select
                value={pref}
                onChange={(e) => setPref(e.target.value as SpeedPreference)}
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
              >
                <option value="balanced">Equilíbrio</option>
                <option value="cheapest">Mais dinheiro</option>
                <option value="fastest">Mais rápido</option>
              </select>

              <label className="mt-3 flex items-center gap-2 text-sm text-white/70 select-none">
                <input
                  type="checkbox"
                  checked={isWeekend}
                  onChange={(e) => setIsWeekend(e.target.checked)}
                />
                Considerar fim de semana (spread maior)
              </label>
            </Control>
          </div>

          <div className="text-xs text-white/55 leading-relaxed">
            Aviso: Kaishio é informativo. Valores finais variam por promoções,
            verificação do usuário, horário e método.
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid gap-4">
          {quotes.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              Nenhum provedor disponível para o método selecionado.
            </div>
          ) : (
            quotes.map((q, idx) => (
              <ProviderCard
                key={`${q.provider.id}-${q.method}`}
                quote={q}
                rank={idx + 1}
                bestSavingsBRL={idx === 0 ? bestSavingsBRL : undefined}
                bestReason={idx === 0 ? bestReason : undefined}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function Control({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs text-white/60 mb-2">{label}</div>
      {children}
    </div>
  );
}

function computeBestReason(best: Quote, second: Quote) {
  const spreadDiff = (second.spreadPct - best.spreadPct) * 100;
  const feeDiff = second.feeUSD - best.feeUSD;
  const bestEta = etaMidHours(best);
  const secondEta = etaMidHours(second);

  if (spreadDiff >= 0.3) return "Menor spread no câmbio (custo real menor).";
  if (feeDiff >= 1.0) return "Taxa total menor (você perde menos em fees).";
  if (secondEta - bestEta >= 4)
    return "Entrega m
