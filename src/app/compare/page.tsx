// src/app/compare/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProviderCard from "@/components/compare/ProviderCard";
import FxTicker from "@/components/compare/FxTicker";
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
  },
  pt: {
    title: "Comparar provedores (EUA → América Latina)",
    subtitle:
      "Escolha o país, insira o valor, escolha o método e veja qual opção entrega mais dinheiro em moeda local (estimativa) — incluindo taxas, spread e velocidade.",
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
  },
  es: {
    title: "Comparar proveedores (EE. UU. → América Latina)",
    subtitle:
      "Elige el país, ingresa el monto y el método y ve quién entrega más dinero en moneda local (estimado), incluyendo comisiones, spread y velocidad.",
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

  // “Thinking” overlay when user changes inputs
  const [isComputing, setIsComputing] = useState(false);
  const computeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Copy-summary status
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  function triggerCompute() {
    if (computeTimeoutRef.current) clearTimeout(computeTimeoutRef.current);
    setIsComputing(true);
    computeTimeoutRef.current = setTimeout(() => {
      setIsComputing(false);
    }, 750); // sweet spot: feels real, not annoying
  }

  useEffect(() => {
    return () => {
      if (computeTimeoutRef.current) clearTimeout(computeTimeoutRef.current);
    };
  }, []);

  const country = COUNTRY_BY_CODE[countryCode];
  const destCurrencyCode = country.currencyCode;

  // When country changes, reset FX rate to that corridor's default hint
  useEffect(() => {
    const cfg = COUNTRY_BY_CODE[countryCode];
    setMidRate(cfg.defaultMidRate);
    setFxStamp(null);
    setFxError(null);
  }, [countryCode]);

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
  const bestSavingsBRL = useMemo(() => {
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

      triggerCompute();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao buscar câmbio.";
      setFxError(message);
    } finally {
      setFxLoading(false);
    }
  }

  async function handleCopySummary() {
    if (!best) return;

    try {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        throw new Error("Clipboard not available");
      }

      const providerName = best.provider.name;
      const countryLabel = country.label[lang];
      const destCur = destCurrencyCode;
      const sendStr = formatUSD(best.usdAmount);
      const receiveStr = formatDestCurrency(best.receiveAmount, destCur);
      const feeStr = formatUSD(best.feeUSD);
      const methodStr = methodLabel(best.method, lang);
      const speedStr = best.etaLabel;

      const savingsPart =
        typeof bestSavingsBRL === "number" && bestSavingsBRL > 0
          ? (() => {
              const s = formatDestCurrency(bestSavingsBRL, destCur);
              if (lang === "pt")
                return ` Isso é cerca de ${s} a mais do que a 2ª melhor opção.`;
              if (lang === "es")
                return ` Eso es aproximadamente ${s} más que la 2ª mejor opción.`;
              return ` That's about ${s} more than the #2 option.`;
            })()
          : "";

      let text: string;

      if (lang === "pt") {
        text = [
          `Resumo Kaishio (remessas EUA → ${countryLabel}):`,
          `Melhor opção agora (estimativa): ${providerName}, usando ${methodStr}.`,
          `Você envia: ${sendStr}. Destinatário recebe (estimado): ${receiveStr}.`,
          `Taxas estimadas: ${feeStr}. Velocidade estimada: ${speedStr}.`,
          `Valores baseados em estimativas de taxas + spread de câmbio + velocidade no Kaishio.com.`,
          savingsPart,
        ].join(" ");
      } else if (lang === "es") {
        text = [
          `Resumen Kaishio (envíos EE. UU. → ${countryLabel}):`,
          `Mejor opción ahora (estimada): ${providerName}, usando ${methodStr}.`,
          `Tú envías: ${sendStr}. Destinatario recibe (estimado): ${receiveStr}.`,
          `Comisiones estimadas: ${feeStr}. Velocidad estimada: ${speedStr}.`,
          `Valores basados en comisiones + spread del tipo de cambio + velocidad según Kaishio.com.`,
          savingsPart,
        ].join(" ");
      } else {
        text = [
          `Kaishio summary (US → ${countryLabel}):`,
          `Best option right now (estimate): ${providerName} via ${methodStr}.`,
          `You send: ${sendStr}. They receive (est.): ${receiveStr}.`,
          `Estimated fees: ${feeStr}. Estimated speed: ${speedStr}.`,
          `Values are estimates based on fees + FX spread + speed from Kaishio.com.`,
          savingsPart,
        ].join(" ");
      }

      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 3000);
    }
  }

  const copyButtonLabel =
    lang === "pt"
      ? "Copiar resumo"
      : lang === "es"
      ? "Copiar resumen"
      : "Copy summary";

  const copiedLabel =
    lang === "pt"
      ? "Copiado!"
      : lang === "es"
      ? "¡Copiado!"
      : "Copied!";

  const copyErrorLabel =
    lang === "pt"
      ? "Erro ao copiar."
      : lang === "es"
      ? "Error al copiar."
      : "Error copying.";

  return (
    <main className="min-h-screen bg-[#050814] text-white overflow-hidden relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/18 blur-3xl" />
        <div className="absolute top-52 -left-40 h-[420px] w-[420px] rounded-full bg-sky-500/14 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-amber-400/14 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,rgba(255,255,255,0)_55%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        {/* Header pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 mb-5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {lang === "pt"
            ? "Ferramenta independente de comparação"
            : lang === "es"
            ? "Herramienta independiente de comparación"
            : "Independent comparison tool"}
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {t.title}
        </h1>
        <p className="mt-2 text-white/70 max-w-3xl">{t.subtitle}</p>

        {/* Controls */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-sm p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-5">
            <Control label={t.countryLabel}>
              <select
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value as CountryCode);
                  triggerCompute();
                }}
                className="w-full rounded-xl bg-black/40 border border-white/12 px-4 py-3 text-white outline-none"
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
                onChange={(e) => {
                  setUsdAmount(Number(e.target.value || 0));
                  triggerCompute();
                }}
                className="w-full rounded-xl bg-black/40 border border-white/12 px-4 py-3 text-white outline-none"
              />
              <div className="mt-1 text-xs text-white/50">
                {t.amountHintPrefix} {formatUSD(usdAmount)}
              </div>
            </Control>

            <Control label={t.rateLabel}>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.0001"
                  value={midRate}
                  onChange={(e) => {
                    setMidRate(Number(e.target.value || 0));
                    triggerCompute();
                  }}
                  className="w-full rounded-xl bg-black/40 border border-white/12 px-4 py-3 text-white outline-none"
                />
                <button
                  onClick={handleAutoFx}
                  disabled={fxLoading}
                  className="rounded-xl bg-white text-black px-4 py-3 text-sm font-semibold hover:bg-white/90 disabled:opacity-60"
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
                onChange={(e) => {
                  setMethod(e.target.value as DeliveryMethod);
                  triggerCompute();
                }}
                className="w-full rounded-xl bg-black/40 border border-white/12 px-4 py-3 text-white outline-none"
              >
                <option value="bank">{methodLabel("bank", lang)}</option>
                <option value="debit">{methodLabel("debit", lang)}</option>
                <option value="cash">{methodLabel("cash", lang)}</option>
              </select>
            </Control>

            <Control label={t.prefLabel}>
              <select
                value={pref}
                onChange={(e) => {
                  setPref(e.target.value as SpeedPreference);
                  triggerCompute();
                }}
                className="w-full rounded-xl bg-black/40 border border-white/12 px-4 py-3 text-white outline-none"
              >
                <option value="balanced">{t.prefBalanced}</option>
                <option value="cheapest">{t.prefCheapest}</option>
                <option value="fastest">{t.prefFastest}</option>
              </select>

              <label className="mt-3 flex items-center gap-2 text-sm text-white/70 select-none">
                <input
                  type="checkbox"
                  checked={isWeekend}
                  onChange={(e) => {
                    setIsWeekend(e.target.checked);
                    triggerCompute();
                  }}
                />
                {t.weekendCheckbox}
              </label>
            </Control>
          </div>

          <div className="mt-4 text-xs text-white/55 leading-relaxed">
            {t.disclaimer}
          </div>
        </div>

        {/* FX ticker strip */}
        <FxTicker activeCountry={countryCode} activeMidRate={midRate} />

        {/* Best option summary strip */}
        {best && (
          <section className="mt-8 rounded-3xl border border-emerald-400/25 bg-gradient-to-r from-emerald-500/12 via-emerald-400/8 to-teal-400/10 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-emerald-200/80">
                  {lang === "pt"
                    ? "Melhor opção agora (estimativa)"
                    : lang === "es"
                    ? "Mejor opción ahora (estimada)"
                    : "Best option right now (estimate)"}
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {best.provider.name}
                </div>
                <p className="mt-1 text-sm text-white/75 max-w-md">
                  {bestReason ||
                    (lang === "pt"
                      ? "Com base em valor recebido, taxas, câmbio (spread) e velocidade."
                      : lang === "es"
                      ? "Basado en monto recibido, comisiones, tipo de cambio (spread) y velocidad."
                      : "Based on amount received, fees, FX spread and speed.")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full sm:w-auto">
                <QuickStat
                  label={
                    lang === "pt"
                      ? "Você envia"
                      : lang === "es"
                      ? "Envías"
                      : "You send"
                  }
                  value={formatUSD(best.usdAmount)}
                  helper={`USD → ${destCurrencyCode}`}
                />
                <QuickStat
                  label={
                    lang === "pt"
                      ? "Eles recebem (estim.)"
                      : lang === "es"
                      ? "Reciben (estim.)"
                      : "They receive (est.)"
                  }
                  value={formatDestCurrency(
                    best.receiveAmount,
                    destCurrencyCode
                  )}
                  helper={
                    bestSavingsBRL && bestSavingsBRL > 0
                      ? (() => {
                          const s = formatDestCurrency(
                            bestSavingsBRL,
                            destCurrencyCode
                          );
                          if (lang === "pt")
                            return `≈ ${s} a mais que o 2º lugar`;
                          if (lang === "es")
                            return `≈ ${s} más que la 2ª mejor opción`;
                          return `≈ ${s} more than the #2 option`;
                        })()
                      : undefined
                  }
                />
                <QuickStat
                  label={
                    lang === "pt"
                      ? "Velocidade estimada"
                      : lang === "es"
                      ? "Velocidad estimada"
                      : "Estimated speed"
                  }
                  value={best.etaLabel}
                  helper={methodLabel(best.method, lang)}
                />
              </div>
            </div>

            {/* Copy summary CTA row */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-emerald-300/30 pt-4">
              <p className="text-xs text-emerald-50/90 max-w-md">
                {lang === "pt"
                  ? "Quer compartilhar essa comparação com alguém? Copie um resumo pronto para colar no WhatsApp, e-mail ou mensagem."
                  : lang === "es"
                  ? "¿Quieres compartir esta comparación con alguien? Copia un resumen listo para pegar en WhatsApp, correo o mensaje."
                  : "Want to share this comparison with someone? Copy a short summary ready to paste into WhatsApp, email, or a message."}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-2 text-xs font-semibold hover:bg-white/90 transition shadow-sm"
                >
                  {copyButtonLabel}
                </button>
                {copyStatus === "copied" && (
                  <span className="text-[11px] text-emerald-100">
                    {copiedLabel}
                  </span>
                )}
                {copyStatus === "error" && (
                  <span className="text-[11px] text-red-200">
                    {copyErrorLabel}
                  </span>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Results + animated overlay */}
        <div className="mt-8 relative">
          {(isComputing || fxLoading) && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl border border-white/10 bg-black/60 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 text-center px-6">
                <div className="h-10 w-10 rounded-full border-2 border-white/25 border-t-white animate-spin" />
                <p className="text-sm text-white/85">
                  {lang === "pt"
                    ? "Calculando as melhores opções…"
                    : lang === "es"
                    ? "Calculando las mejores opciones…"
                    : "Calculating best options…"}
                </p>
                <p className="text-xs text-white/65 max-w-sm">
                  {lang === "pt"
                    ? "Levamos em conta valor recebido, taxas, câmbio (spread) e velocidade para ordenar os provedores."
                    : lang === "es"
                    ? "Ordenamos los proveedores según monto recibido, comisiones, tipo de cambio (spread) y velocidad."
                    : "We rank providers by amount received, fees, FX spread and speed to give you a balanced view."}
                </p>
              </div>
            </div>
          )}

          <div
            className={`grid gap-4 ${
              isComputing || fxLoading ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            {quotes.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
                {t.emptyState}
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

function QuickStat({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="rounded-2xl bg-black/35 border border-white/15 px-4 py-3">
      <div className="text-[11px] uppercase tracking-wide text-white/60">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
      {helper && (
        <div className="mt-1 text-[11px] text-white/65">{helper}</div>
      )}
    </div>
  );
}
