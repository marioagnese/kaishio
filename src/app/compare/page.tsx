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
import { useLanguage, type Language } from "@/contexts/LanguageContext";

type CompareCopy = {
  title: string;
  subtitle: string;
  usdLabel: string;
  usdHelper: (amount: number) => string;
  rateLabel: string;
  fxButton: string;
  fxButtonLoading: string;
  fxHintDefault: string;
  fxErrorFetch: string;
  fxErrorInvalid: string;
  fxErrorGeneric: string;
  methodLabel: string;
  methodBank: string;
  methodDebit: string;
  methodCash: string;
  prefLabel: string;
  prefBalanced: string;
  prefCheapest: string;
  prefFastest: string;
  weekendLabel: string;
  disclaimer: string;
  noProviders: string;
};

const COMPARE_COPY: Record<Language, CompareCopy> = {
  en: {
    title: "Compare providers (US → Brazil, beta for LatAm)",
    subtitle:
      "Enter the amount, choose the method, and see which option gives you more BRL (estimate).",
    usdLabel: "Amount in USD",
    usdHelper: (amount) => `You send: ${formatUSD(amount)}`,
    rateLabel: "FX (USD → BRL)",
    fxButton: "Auto FX",
    fxButtonLoading: "Fetching...",
    fxHintDefault: "Tip: use Auto FX to get today’s mid-market rate.",
    fxErrorFetch: "Failed to fetch FX rate.",
    fxErrorInvalid: "Invalid FX response.",
    fxErrorGeneric: "Error while fetching FX rate.",
    methodLabel: "Method",
    methodBank: "Bank account",
    methodDebit: "Card/Debit",
    methodCash: "Cash pickup",
    prefLabel: "Preference",
    prefBalanced: "Balanced",
    prefCheapest: "More money",
    prefFastest: "Faster",
    weekendLabel: "Consider weekend (higher spread)",
    disclaimer:
      "Notice: Kaishio is informational. Final values vary by promotions, user verification, timing, and payment method.",
    noProviders: "No provider available for the selected method.",
  },
  pt: {
    title: "Comparar provedores (EUA → Brasil, beta para AL)",
    subtitle:
      "Insira o valor, escolha o método e veja a melhor opção com estimativa em BRL.",
    usdLabel: "Valor em USD",
    usdHelper: (amount) => `Você envia: ${formatUSD(amount)}`,
    rateLabel: "Câmbio (USD → BRL)",
    fxButton: "Auto FX",
    fxButtonLoading: "Buscando...",
    fxHintDefault: "Dica: use Auto FX para pegar o câmbio do dia.",
    fxErrorFetch: "Falha ao buscar câmbio.",
    fxErrorInvalid: "Resposta inválida do câmbio.",
    fxErrorGeneric: "Erro ao buscar câmbio.",
    methodLabel: "Método",
    methodBank: "Conta bancária",
    methodDebit: "Cartão/Débito",
    methodCash: "Cash pickup",
    prefLabel: "Preferência",
    prefBalanced: "Equilíbrio",
    prefCheapest: "Mais dinheiro",
    prefFastest: "Mais rápido",
    weekendLabel: "Considerar fim de semana (spread maior)",
    disclaimer:
      "Aviso: Kaishio é informativo. Valores finais variam por promoções, verificação do usuário, horário e método.",
    noProviders: "Nenhum provedor disponível para o método selecionado.",
  },
  es: {
    title: "Comparar proveedores (EE. UU. → Brasil, beta para AL)",
    subtitle:
      "Ingresa el monto, elige el método y mira qué opción entrega más BRL (estimado).",
    usdLabel: "Monto en USD",
    usdHelper: (amount) => `Envías: ${formatUSD(amount)}`,
    rateLabel: "Tipo de cambio (USD → BRL)",
    fxButton: "Auto FX",
    fxButtonLoading: "Buscando...",
    fxHintDefault:
      "Tip: usa Auto FX para obtener el tipo de cambio medio del día.",
    fxErrorFetch: "Error al obtener el tipo de cambio.",
    fxErrorInvalid: "Respuesta de tipo de cambio inválida.",
    fxErrorGeneric: "Error al buscar el tipo de cambio.",
    methodLabel: "Método",
    methodBank: "Cuenta bancaria",
    methodDebit: "Tarjeta/Débito",
    methodCash: "Retiro en efectivo",
    prefLabel: "Preferencia",
    prefBalanced: "Equilibrado",
    prefCheapest: "Más dinero",
    prefFastest: "Más rápido",
    weekendLabel: "Considerar fin de semana (spread más alto)",
    disclaimer:
      "Aviso: Kaishio es informativo. Los valores finales varían según promociones, verificación del usuario, horario y método.",
    noProviders:
      "Ningún proveedor disponible para el método seleccionado.",
  },
};

const REASON_COPY = {
  en: {
    betterSpread: "Lower FX spread (better real cost).",
    betterFee: "Lower total fee (you lose less to fees).",
    faster: "Faster delivery with good cost–benefit.",
    combo: "Best combo of fee + FX spread today.",
    generic: "Best overall value based on the estimates.",
  },
  pt: {
    betterSpread: "Menor spread no câmbio (custo real menor).",
    betterFee: "Taxa total menor (você perde menos em fees).",
    faster: "Entrega mais rápida com bom custo-benefício.",
    combo: "Melhor combinação de taxa + câmbio hoje.",
    generic: "Melhor custo-benefício geral com base nas estimativas.",
  },
  es: {
    betterSpread: "Spread de cambio más bajo (costo real menor).",
    betterFee: "Comisión total más baja (pierdes menos en fees).",
    faster: "Entrega más rápida con buen costo-beneficio.",
    combo: "Mejor combinación de comisión + cambio hoy.",
    generic: "Mejor relación costo-beneficio según las estimaciones.",
  },
} as const;

export default function ComparePage() {
  const { lang } = useLanguage();
  const t = COMPARE_COPY[lang];

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
    return computeBestReason(lang, best, second);
  }, [best, second, lang]);

  async function handleAutoFx() {
    setFxLoading(true);
    setFxError(null);

    try {
      const res = await fetch("/api/fx?from=USD&to=BRL", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(t.fxErrorFetch);

      const data: { rate: number; date?: string; provider?: string } =
        await res.json();

      if (!data?.rate || Number.isNaN(data.rate)) {
        throw new Error(t.fxErrorInvalid);
      }

      setMidRate(data.rate);
      setFxStamp(`${data.provider ?? "FX"} • ${data.date ?? "today"}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : t.fxErrorGeneric;
      setFxError(message);
    } finally {
      setFxLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {t.title}
        </h1>
        <p className="mt-2 text-white/70">{t.subtitle}</p>

        {/* Controls */}
        <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="grid gap-4 md:grid-cols-4">
            <Control label={t.usdLabel}>
              <input
                type="number"
                min={1}
                value={usdAmount}
                onChange={(e) =>
                  setUsdAmount(Number(e.target.value || 0))
                }
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
              />
              <div className="mt-1 text-xs text-white/50">
                {t.usdHelper(usdAmount)}
              </div>
            </Control>

            <Control label={t.rateLabel}>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.0001"
                  value={midRate}
                  onChange={(e) =>
                    setMidRate(Number(e.target.value || 0))
                  }
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
                />
                <button
                  onClick={handleAutoFx}
                  disabled={fxLoading}
                  className="rounded-xl bg-white text-black px-4 py-3 text-sm font-semibold hover:bg-white/90 disabled:opacity-60"
                >
                  {fxLoading ? t.fxButtonLoading : t.fxButton}
                </button>
              </div>
              <div className="mt-1 text-xs text-white/55">
                {fxError ? (
                  <span className="text-red-200">{fxError}</span>
                ) : fxStamp ? (
                  fxStamp
                ) : (
                  t.fxHintDefault
                )}
              </div>
            </Control>

            <Control label={t.methodLabel}>
              <select
                value={method}
                onChange={(e) =>
                  setMethod(e.target.value as DeliveryMethod)
                }
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
              >
                <option value="bank">{t.methodBank}</option>
                <option value="debit">{t.methodDebit}</option>
                <option value="cash">{t.methodCash}</option>
              </select>
            </Control>

            <Control label={t.prefLabel}>
              <select
                value={pref}
                onChange={(e) =>
                  setPref(e.target.value as SpeedPreference)
                }
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
              >
                <option value="balanced">{t.prefBalanced}</option>
                <option value="cheapest">{t.prefCheapest}</option>
                <option value="fastest">{t.prefFastest}</option>
              </select>

              <label className="mt-3 flex items-center gap-2 text-sm text-white/70 select-none">
                <input
                  type="checkbox"
                  checked={isWeekend}
                  onChange={(e) => setIsWeekend(e.target.checked)}
                />
                {t.weekendLabel}
              </label>
            </Control>
          </div>

          <div className="text-xs text-white/55 leading-relaxed">
            {t.disclaimer}
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid gap-4">
          {quotes.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              {t.noProviders}
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

/**
 * Language-aware one-line "why best" logic comparing #1 vs #2.
 */
function computeBestReason(
  lang: Language,
  best: Quote,
  second: Quote
): string {
  const copy = REASON_COPY[lang];

  const spreadDiff = (second.spreadPct - best.spreadPct) * 100; // percentage points
  const feeDiff = second.feeUSD - best.feeUSD; // USD
  const bestEta = etaMidHours(best);
  const secondEta = etaMidHours(second);

  if (spreadDiff >= 0.3) return copy.betterSpread;
  if (feeDiff >= 1.0) return copy.betterFee;
  if (secondEta - bestEta >= 4) return copy.faster;
  if (spreadDiff > 0 && feeDiff > 0) return copy.combo;
  return copy.generic;
}

function etaMidHours(q: Quote) {
  const eta = q.provider.etaHours[q.method];
  return (eta.min + eta.max) / 2;
}
