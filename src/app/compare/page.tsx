"use client";

import { useMemo, useState } from "react";
import ProviderCard from "@/components/compare/ProviderCard";
import {
  DeliveryMethod,
  PROVIDERS,
  SpeedPreference,
  buildQuote,
  rankQuotes,
} from "@/lib/providers";

export default function ComparePage() {
  const [usd, setUsd] = useState<string>("500");
  const [midRate, setMidRate] = useState<string>("5.20"); // user can adjust
  const [method, setMethod] = useState<DeliveryMethod>("bank");
  const [pref, setPref] = useState<SpeedPreference>("balanced");
  const [isWeekend, setIsWeekend] = useState<boolean>(false);

  const usdAmount = useMemo(() => {
    const n = Number(usd.replace(",", "."));
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  }, [usd]);

  const mid = useMemo(() => {
    const n = Number(midRate.replace(",", "."));
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  }, [midRate]);

  const quotes = useMemo(() => {
    if (usdAmount <= 0 || mid <= 0) return [];
    const raw = PROVIDERS.map((p) =>
      buildQuote({ provider: p, method, usdAmount, midRate: mid, isWeekend })
    ).filter(Boolean) as NonNullable<ReturnType<typeof buildQuote>>[];
    return rankQuotes(raw, pref);
  }, [usdAmount, mid, method, isWeekend, pref]);

  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="text-sm text-white/60">Comparador</div>
            <h1 className="text-3xl sm:text-4xl font-semibold mt-1">
              Encontre a melhor opção para enviar EUA → Brasil
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              Kaishio não envia dinheiro. Nós comparamos provedores e te direcionamos para finalizar no
              site/app do provedor escolhido.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 w-full lg:w-[520px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Quanto você quer enviar (USD)">
                <input
                  value={usd}
                  onChange={(e) => setUsd(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                  placeholder="ex: 500"
                />
              </Field>

              <Field label="Mid-market (BRL por USD)">
                <input
                  value={midRate}
                  onChange={(e) => setMidRate(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                  placeholder="ex: 5.20"
                />
              </Field>

              <Field label="Método">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as DeliveryMethod)}
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                >
                  <option value="bank">Conta bancária</option>
                  <option value="debit">Cartão/Débito</option>
                  <option value="cash">Cash pickup</option>
                </select>
              </Field>

              <Field label="Preferência">
                <select
                  value={pref}
                  onChange={(e) => setPref(e.target.value as SpeedPreference)}
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                >
                  <option value="balanced">Equilibrado</option>
                  <option value="cheapest">Mais barato</option>
                  <option value="fastest">Mais rápido</option>
                </select>
              </Field>
            </div>

            <label className="mt-3 flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={isWeekend}
                onChange={(e) => setIsWeekend(e.target.checked)}
              />
              Considerar fim de semana (spread maior)
            </label>

            <div className="mt-3 text-xs text-white/55">
              Dica: no v1, você ajusta o “mid-market” manualmente. Depois automatizamos.
            </div>
          </div>
        </div>

        <div className="mt-8">
          {quotes.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              Preencha um valor em USD e um câmbio (mid-market) para ver a comparação.
            </div>
          ) : (
            <div className="grid gap-4">
              {quotes.map((q, idx) => (
                <ProviderCard key={q.provider.id} quote={q} rank={idx + 1} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-xs text-white/50 leading-relaxed">
          Aviso: Kaishio é informativo e não oferece aconselhamento financeiro, legal ou fiscal.
          Estimativas podem variar por promoções, método, verificação do usuário e horário.
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-white/60 mb-1">{label}</div>
      {children}
    </div>
  );
}
