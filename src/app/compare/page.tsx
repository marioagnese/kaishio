// src/app/compare/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import ProviderCard from "@/components/compare/ProviderCard";
import {
  PROVIDERS,
  COUNTRIES,
  COUNTRY_BY_CODE,
  buildQuote,
  rankQuotes,
  type DeliveryMethod,
  type SpeedPreference,
  type Quote,
  type CountryCode,
  formatUSD,
  formatDestCurrency,
} from "@/lib/providers";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

type CompareCopy = {
  title: string;
  subtitle: string;
  countryLabel: string;
  amountLabel: string;
  amountHintPrefix: string;
  rateLabel: string;
  autoFxIdle: string;
  autoFxLoading: string;
  autoFxHintDefault: string;
  methodLabel: string;
  prefLabel: string;
  prefBalanced: string;
  prefCheapest: string;
  prefFastest: string;
  weekendCheckbox: string;
  disclaimer: string;
  emptyState: string;
  bestPanelTitle: string;
  bestPanelSub: string;
};

const COMPARE_COPY: Record<Language, CompareCopy> = {
  en: {
    title: "Compare providers (US → Latin America)",
    subtitle:
      "Choose the country, amount and method to see who delivers more in local currency (estimate) — including fees, FX spread and speed.",
    countryLabel: "Destination country",
    amountLabel: "Amount in USD",
    amountHintPrefix: "You send:",
    rateLabel: "FX rate (USD → local currency)",
    autoFxIdle: "Auto FX",
    autoFxLoading: "Fetching...",
    autoFxHintDefault: "Tip: use Auto FX to grab today’s rate.",
    methodLabel: "Method",
    prefLabel: "Preference",
    prefBalanced: "Balanced",
    prefCheapest: "More money",
    prefFastest: "Faster",
    weekendCheckbox: "Consider weekend (higher spread)",
    disclaimer:
      "Notice: Kaishio is informational only. Final values can change based on promotions, user verification, timing, and method.",
    emptyState: "No providers available for the selected method.",
    bestPanelTitle: "Best option right now (estimate)",
    bestPanelSub: "Based on amount received, fees, FX spread and speed.",
  },
  pt: {
    title: "Comparar provedores (EUA → América Latina)",
    subtitle:
      "Escolha o país, o valor e o método para ver quem entrega mais em moeda local (estimativa) — incluindo taxas, spread e velocidade.",
    countryLabel: "País de destino",
    amountLabel: "Valor em USD",
    amountHintPrefix: "Você envia:",
    rateLabel: "Câmbio (USD → moeda local)",
    autoFxIdle: "Auto FX",
    autoFxLoading: "Buscando...",
    autoFxHintDefault: "Dica: use Auto FX para pegar o câmbio do dia.",
    methodLabel: "Método",
    prefLabel: "Preferência",
    prefBalanced: "Equilíbrio",
    prefCheapest: "Mais dinheiro",
    prefFastest: "Mais rápido",
    weekendCheckbox: "Considerar fim de semana (spread maior)",
    disclaimer:
      "Aviso: Kaishio é informativo. Valores finais variam por promoções, verificação do usuário, horário e método.",
    emptyState: "Nenhum provedor disponível para o método selecionado.",
    bestPanelTitle: "Melhor opção agora (estimativa)",
    bestPanelSub:
      "Com base em valor recebido, taxas, spread de câmbio e velocidade.",
  },
  es: {
    title: "Comparar proveedores (EE. UU. → América Latina)",
    subtitle:
      "Elige país, monto y método para ver quién entrega más en moneda local (estimado) — incluyendo comisiones, spread y velocidad.",
    countryLabel: "País de destino",
    amountLabel: "Monto en USD",
    amountHintPrefix: "Envías:",
    rateLabel: "Tipo de cambio (USD → moneda local)",
    autoFxIdle: "Auto FX",
    autoFxLoading: "Buscando...",
    autoFxHintDefault:
      "Tip: usa Auto FX para tomar el tipo de cambio del día.",
    methodLabel: "Método",
    prefLabel: "Preferencia",
    prefBalanced: "Equilibrado",
    prefCheapest: "Más dinero",
    prefFastest: "Más rápido",
    weekendCheckbox: "Considerar fin de semana (spread mayor)",
    disclaimer:
      "Aviso: Kaishio es solo informativo. Los valores finales cambian según promociones, verificación del usuario, horario y método.",
    emptyState: "No hay proveedores para el método seleccionado.",
    bestPanelTitle: "Mejor opción ahora (estimado)",
    bestPanelSub:
      "Basado en monto recibido, comisiones, spread del tipo de cambio y velocidad.",
  },
};

const BEST_REASON_COPY: Record<
  Language,
  {
    spread: string;
    fee: string;
    speed: string;
    combo: string;
    generic: string;
  }
> = {
  en: {
    spread: "Lower FX spread (better exchange rate).",
    fee: "Lower total fees (you lose less in fees).",
    speed: "Faster delivery with good overall cost.",
    combo: "Best combination of fee + FX right now.",
    generic: "Best overall cost–benefit based on estimates.",
  },
  pt: {
    spread: "Menor spread no câmbio (custo real menor).",
    fee: "Taxa total menor (você perde menos em fees).",
    speed: "Entrega mais rápida com bom custo-benefício.",
    combo: "Melhor combinação de taxa + câmbio hoje.",
    generic: "Melhor custo-benefício geral com base nas estimativas.",
  },
  es: {
    spread: "Menor spread en el tipo de cambio (mejor tasa).",
    fee: "Comisiones totales más bajas (pierdes menos en fees).",
    speed: "Entrega más rápida con buen costo–beneficio.",
    combo: "Mejor combinación de comisión + tipo de cambio hoy.",
    generic:
      "Mejor relación costo–beneficio general según las estimaciones.",
  },
};

export default function ComparePage() {
  const { lang } = useLanguage();
  const t = COMPARE_COPY[lang];

  const [countryCode, setCountryCode] = useState<CountryCode>("BR");
  const [usdAmount, setUsdAmount] = useState<number>(500);
  const [midRate, setMidRate] = useState<number>(
    COUNTRY_BY_CODE["BR"].defaultMidRate
  );
  const [isWeekend, setIsWeekend] = useState<boolean>(false);
  const [method, setMethod] = useState<DeliveryMethod>("bank");
  const [pref, setPref] = useState<SpeedPreference>("balanced");

  const [fxLoading, setFxLoading] = useState(false);
  const [fxError, setFxError] = useState<string | null>(null);
  const [fxStamp, setFxStamp] = useState<string | null>(null);

  const country = COUNTRY_BY_CODE[countryCode];

  // When country changes, reset FX rate to that corridor's default hint
  useEffect(() => {
    setMidRate(country.defaultMidRate);
    setFxStamp(null);
    setFxError(null);
  }, [countryCode, country.defaultMidRate]);

  const quotes = useMemo(() => {
    const built: Quote[] = [];
    for (const p of PROVIDERS) {
      const q = buildQuote({
        provider: p,
        countryCode,
        method,
        usdAmount,
        midRate,
        isWeekend,
      });
      if (q) built.push(q);
    }
    return rankQuotes(built, pref);
  }, [countryCode, method, usdAmount, midRate, isWeekend, pref]);

  const best = quotes[0];
  const second = quotes[1];

  // Savings in destination currency (receiveAmount)
  const bestSavings = useMemo(() => {
    if (!best || !second) return undefined;
    const diff = best.receiveAmount - second.receiveAmount;
    return diff > 0 ? diff : 0;
  }, [best, second]);

  const bestReason = useMemo(() => {
    if (!best || !second) return undefined;
    return computeBestReason(best, second, lang);
  }, [best, second, lang]);

  async function handleAutoFx() {
    setFxLoading(true);
    setFxError(null);

    try {
      const targetCurrency = country.currencyCode;
      const res = await fetch(
        `/api/fx?from=USD&to=${encodeURIComponent(targetCurrency)}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Falha ao buscar câmbio.");

      const data: { rate: number; date?: string; provider?: string } =
        await res.json();

      if (!data?.rate || Number.isNaN(data.rate)) {
        throw new Error("Resposta inválida do câmbio.");
      }

      setMidRate(data.rate);

      const labelByLang: Record<Language, string> = {
        en: "today",
        pt: "hoje",
        es: "hoy",
      };

      setFxStamp(
        `${data.provider ?? "FX"} • ${data.date ?? labelByLang[lang]}`
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao buscar câmbio.";
      setFxError(message);
    } finally {
      setFxLoading(false);
    }
  }

  // Nice label for "You send / They receive" in the highlight panel
  const bestPanel = (() => {
    if (!best) return null;

    const destCurrency = country.currencyCode;
    const youSend = formatUSD(best.usdAmount);
    const theyReceive = formatDestCurrency(best.receiveAmount, destCurrency);
    const savingsFormatted =
      bestSavings && bestSavings > 0
        ? formatDestCurrency(bestSavings, destCurrency)
        : null;

    let savingsLine: string | null = null;
    if (savingsFormatted) {
      if (lang === "pt") {
        savingsLine = `≈ ${savingsFormatted} a mais que a segunda melhor opção (estimativa).`;
      } else if (lang === "es") {
        savingsLine = `≈ ${savingsFormatted} más que la segunda mejor opción (estimado).`;
      } else {
        savingsLine = `≈ ${savingsFormatted} more than the #2 option (estimate).`;
      }
    }

    const providerLine =
      lang === "pt"
        ? `Melhor estimativa: ${best.provider.name}`
        : lang === "es"
        ? `Mejor estimación: ${best.provider.name}`
        : `Best estimate: ${best.provider.name}`;

    return {
      youSend,
      theyReceive,
      savingsLine,
      providerLine,
      etaLabel: best.etaLabel,
    };
  })();

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      {/* Elegant background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute top-40 -left-32 h-[440px] w-[440px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[520px] w-[520px] rounded-full bg-amber-400/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04)_0,transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 lg:py-16">
        {/* Header */}
        <header className="mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>
              {lang === "pt"
                ? "Ferramenta independente de comparação"
                : lang === "es"
                ? "Herramienta independiente de comparación"
                : "Independent comparison tool"}
            </span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            {t.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
            {t.subtitle}
          </p>
        </header>

        {/* Controls panel */}
        <section className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 sm:p-6 lg:p-7 shadow-[0_24px_80px_rgba(15,23,42,0.65)]">
          <div className="grid gap-4 lg:grid-cols-5">
            <Control label={t.countryLabel}>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value as CountryCode)}
                className="w-full rounded-xl bg-black/30 border border-white/12 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-300/60"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label[lang]} ({c.currencyCode})
                  </option>
                ))}
              </select>
            </Control>

            <Control label={t.amountLabel}>
              <input
                type="number"
                min={1}
                value={usdAmount}
                onChange={(e) => setUsdAmount(Number(e.target.value || 0))}
                className="w-full rounded-xl bg-black/30 border border-white/12 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-300/60"
              />
              <div className="mt-1 text-xs text-white/55">
                {t.amountHintPrefix} {formatUSD(usdAmount)}
              </div>
            </Control>

            <Control label={t.rateLabel}>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.0001"
                  value={midRate}
                  onChange={(e) => setMidRate(Number(e.target.value || 0))}
                  className="w-full rounded-xl bg-black/30 border border-white/12 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-300/60"
                />
                <button
                  onClick={handleAutoFx}
                  disabled={fxLoading}
                  className="rounded-xl bg-white text-black px-4 py-3 text-xs sm:text-sm font-semibold hover:bg-white/90 disabled:opacity-60 transition"
                >
                  {fxLoading ? t.autoFxLoading : t.autoFxIdle}
                </button>
              </div>
              <div className="mt-1 text-xs text-white/55">
                {fxError ? (
                  <span className="text-red-200">{fxError}</span>
                ) : fxStamp ? (
                  fxStamp
                ) : (
                  t.autoFxHintDefault
                )}
              </div>
            </Control>

            <Control label={t.methodLabel}>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as DeliveryMethod)}
                className="w-full rounded-xl bg-black/30 border border-white/12 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-300/60"
              >
                <option value="bank">{methodLabel("bank", lang)}</option>
                <option value="debit">{methodLabel("debit", lang)}</option>
                <option value="cash">{methodLabel("cash", lang)}</option>
              </select>
            </Control>

            <Control label={t.prefLabel}>
              <select
                value={pref}
                onChange={(e) =>
                  setPref(e.target.value as SpeedPreference)
                }
                className="w-full rounded-xl bg-black/30 border border-white/12 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-300/60"
              >
                <option value="balanced">{t.prefBalanced}</option>
                <option value="cheapest">{t.prefCheapest}</option>
                <option value="fastest">{t.prefFastest}</option>
              </select>

              <label className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-white/70 select-none">
                <input
                  type="checkbox"
                  checked={isWeekend}
                  onChange={(e) => setIsWeekend(e.target.checked)}
                  className="h-4 w-4 rounded border-white/30 bg-black/40"
                />
                {t.weekendCheckbox}
              </label>
            </Control>
          </div>

          <div className="mt-4 text-xs text-white/55 leading-relaxed">
            {t.disclaimer}
          </div>
        </section>

        {/* Best option summary panel */}
        {best && bestPanel && (
          <section className="mt-8">
            <div className="rounded-3xl border border-emerald-300/25 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-transparent px-5 py-4 sm:px-6 sm:py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-emerald-200/90">
                  {t.bestPanelTitle}
                </div>
                <div className="mt-1 text-sm text-white/80">
                  {t.bestPanelSub}
                </div>
                <div className="mt-2 text-xs text-emerald-100/90">
                  {bestPanel.providerLine}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                <div className="rounded-2xl bg-black/35 border border-white/10 px-4 py-2 min-w-[150px]">
                  <div className="text-[10px] uppercase tracking-wide text-white/55">
                    {lang === "pt"
                      ? "Você envia"
                      : lang === "es"
                      ? "Envías"
                      : "You send"}
                  </div>
                  <div className="mt-1 font-semibold">
                    {bestPanel.youSend}
                  </div>
                </div>
                <div className="rounded-2xl bg-black/35 border border-white/10 px-4 py-2 min-w-[150px]">
                  <div className="text-[10px] uppercase tracking-wide text-white/55">
                    {lang === "pt"
                      ? "Recebe (estim.)"
                      : lang === "es"
                      ? "Recibe (estim.)"
                      : "They receive (est.)"}
                  </div>
                  <div className="mt-1 font-semibold">
                    {bestPanel.theyReceive}
                  </div>
                  {bestPanel.savingsLine && (
                    <div className="mt-1 text-[11px] text-emerald-200">
                      {bestPanel.savingsLine}
                    </div>
                  )}
                </div>
                <div className="rounded-2xl bg-black/35 border border-white/10 px-4 py-2 min-w-[140px]">
                  <div className="text-[10px] uppercase tracking-wide text-white/55">
                    {lang === "pt"
                      ? "Velocidade estimada"
                      : lang === "es"
                      ? "Velocidad estimada"
                      : "Estimated speed"}
                  </div>
                  <div className="mt-1 font-semibold">{bestPanel.etaLabel}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        <section className="mt-8 lg:mt-10 grid gap-4">
          {quotes.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/70">
              {t.emptyState}
            </div>
          ) : (
            quotes.map((q, idx) => (
              <ProviderCard
                key={`${q.provider.id}-${q.method}`}
                quote={q}
                rank={idx + 1}
                bestSavingsBRL={idx === 0 ? bestSavings : undefined}
                bestReason={idx === 0 ? bestReason : undefined}
              />
            ))
          )}
        </section>
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
      <div className="mb-2 text-[11px] uppercase tracking-[0.14em] text-white/55">
        {label}
      </div>
      {children}
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
    if (m === "debit") return "Cartão/Débito";
    if (m === "cash") return "Cash pickup";
  } else {
    // es
    if (m === "bank") return "Cuenta bancaria";
    if (m === "debit") return "Tarjeta/Débito";
    if (m === "cash") return "Retiro en efectivo";
  }
  return m;
}

function computeBestReason(best: Quote, second: Quote, lang: Language): string {
  const spreadDiff = (second.spreadPct - best.spreadPct) * 100;
  const feeDiff = second.feeUSD - best.feeUSD;
  const bestEta = etaMidHours(best);
  const secondEta = etaMidHours(second);

  const labels = BEST_REASON_COPY[lang];

  if (spreadDiff >= 0.3) return labels.spread;
  if (feeDiff >= 1.0) return labels.fee;
  if (secondEta - bestEta >= 4) return labels.speed;
  if (spreadDiff > 0 && feeDiff > 0) return labels.combo;
  return labels.generic;
}

function etaMidHours(q: Quote) {
  const eta = q.provider.etaHours[q.method];
  return (eta.min + eta.max) / 2;
}
