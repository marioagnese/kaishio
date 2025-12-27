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
      "Choose the country, enter the amount, pick a method and see which option gives you more in local currency (estimate).",
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
      "Escolha o país, insira o valor, escolha o método e veja qual opção entrega mais dinheiro em moeda local (estimativa).",
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
      "Elige el país, ingresa el monto, selecciona el método y ve qué opción entrega más dinero en moneda local (estimado).",
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

  const country = COUNTRY_BY_CODE[countryCode];

  // When country changes, reset FX rate to that corridor's default hint
  useEffect(() => {
    setMidRate(country.defaultMidRate);
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
          {t.title}
        </h1>
        <p className="mt-2 text-white/70">{t.subtitle}</p>

        {/* Controls */}
        <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="grid gap-4 md:grid-cols-5">
            <Control label={t.countryLabel}>
              <select
                value={countryCode}
                onChange={(e) =>
                  setCountryCode(e.target.value as CountryCode)
                }
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
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
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
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
                  onChange={(e) => setMidRate(Number(e.target.value || 0))}
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
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
                onChange={(e) =>
                  setMethod(e.target.value as DeliveryMethod)
                }
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
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
                {t.weekendCheckbox}
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
