// src/components/compare/ProviderCard.tsx
"use client";

import Link from "next/link";
import {
  formatUSD,
  formatDestCurrency,
  COUNTRY_BY_CODE,
  type Quote,
  type DeliveryMethod,
  type ProviderId,
} from "@/lib/providers";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

type CardCopy = {
  bestBadge: string;
  optionPrefix: string;
  transferLabel: (methodLabel: string, countryName: string) => string;

  youSend: string;
  fees: string;
  rateAfterSpread: string;
  youReceive: (currencyCode: string) => string;
  deliveryTime: string;
  extraVsSecondPrefix: (currencyCode: string) => string;

  openSite: string;
};

const CARD_COPY: Record<Language, CardCopy> = {
  en: {
    bestBadge: "Best match",
    optionPrefix: "Option #",
    transferLabel: (methodLabel, countryName) =>
      `${methodLabel}\n${countryName}`,
    youSend: "YOU SEND (USD)",
    fees: "ESTIMATED FEES",
    rateAfterSpread: "FX RATE AFTER SPREAD",
    youReceive: (ccy) => `YOU RECEIVE (EST., ${ccy})`,
    deliveryTime: "Delivery time",
    extraVsSecondPrefix: (ccy) => `Est. extra vs #2 (${ccy})`,
    openSite: "Open provider site",
  },
  pt: {
    bestBadge: "Melhor opção",
    optionPrefix: "Opção #",
    transferLabel: (methodLabel, countryName) =>
      `${methodLabel}\n${countryName}`,
    youSend: "VOCÊ ENVIA (USD)",
    fees: "TAXAS ESTIMADAS",
    rateAfterSpread: "CÂMBIO APÓS SPREAD",
    youReceive: (ccy) => `VOCÊ RECEBE (EST., ${ccy})`,
    deliveryTime: "Tempo de entrega",
    extraVsSecondPrefix: (ccy) => `Aprox. extra vs #2 (${ccy})`,
    openSite: "Abrir site do provedor",
  },
  es: {
    bestBadge: "Mejor opción",
    optionPrefix: "Opción #",
    transferLabel: (methodLabel, countryName) =>
      `${methodLabel}\n${countryName}`,
    youSend: "ENVÍAS (USD)",
    fees: "COMISIONES ESTIMADAS",
    rateAfterSpread: "TIPO DE CAMBIO TRAS EL SPREAD",
    youReceive: (ccy) => `RECIBES (EST., ${ccy})`,
    deliveryTime: "Tiempo de entrega",
    extraVsSecondPrefix: (ccy) => `Aprox. extra vs #2 (${ccy})`,
    openSite: "Abrir sitio del proveedor",
  },
};

// Provider taglines per language
const PROVIDER_TAGLINES: Record<
  ProviderId,
  Record<Language, string>
> = {
  wise: {
    en: "Usually great FX rates",
    pt: "Geralmente ótimo em câmbio",
    es: "Generalmente muy bueno en tipo de cambio",
  },
  remitly: {
    en: "Good speed and options",
    pt: "Boa velocidade e opções",
    es: "Buena velocidad y opciones",
  },
  xoom: {
    en: "PayPal network + cash pickup",
    pt: "Rede PayPal + retirada em espécie",
    es: "Red PayPal + retiro en efectivo",
  },
  paypal: {
    en: "Convenient (can cost more)",
    pt: "Conveniência (pode sair mais caro)",
    es: "Conveniente (puede costar más)",
  },
  western_union: {
    en: "Very strong for cash pickup",
    pt: "Muito forte em retirada em espécie",
    es: "Muy fuerte en retiro en efectivo",
  },
  moneygram: {
    en: "Popular alternative for cash",
    pt: "Alternativa popular para cash",
    es: "Alternativa popular para efectivo",
  },
};

function methodHeaderLabel(method: DeliveryMethod, lang: Language): string {
  if (lang === "en") {
    if (method === "bank") return "Bank transfer";
    if (method === "debit") return "Card transfer";
    if (method === "cash") return "Cash pickup";
  } else if (lang === "pt") {
    if (method === "bank") return "Transferência bancária";
    if (method === "debit") return "Transferência via cartão";
    if (method === "cash") return "Retirada em espécie";
  } else {
    // es
    if (method === "bank") return "Transferencia bancaria";
    if (method === "debit") return "Transferencia con tarjeta";
    if (method === "cash") return "Retiro en efectivo";
  }
  return "";
}

type Props = {
  quote: Quote;
  rank: number;
  bestSavings?: number;
  bestReason?: string;
};

export default function ProviderCard({
  quote,
  rank,
  bestSavings,
  bestReason,
}: Props) {
  const { lang } = useLanguage();
  const copy = CARD_COPY[lang];

  const country = COUNTRY_BY_CODE[quote.countryCode];
  const currencyCode = country.currencyCode;
  const countryName = country.label[lang];

  const providerId = quote.provider.id as ProviderId;
  const tagline =
    PROVIDER_TAGLINES[providerId]?.[lang] ?? quote.provider.tagline;

  const isBest = rank === 1;

  return (
    <section
      className={[
        "rounded-3xl border p-5 sm:p-6 bg-black/40",
        isBest
          ? "border-emerald-400/60 shadow-[0_0_0_1px_rgba(52,211,153,0.4)]"
          : "border-white/10",
      ].join(" ")}
    >
      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold",
                isBest
                  ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/40"
                  : "bg-white/10 text-white/70 border border-white/20",
              ].join(" ")}
            >
              {isBest
                ? copy.bestBadge
                : `${copy.optionPrefix}${rank.toString()}`}
            </span>
          </div>

          <h2 className="text-lg font-semibold">{quote.provider.name}</h2>
          <p className="text-sm text-white/70">{tagline}</p>
          {bestReason && (
            <p className="text-xs text-emerald-200 mt-1">{bestReason}</p>
          )}
        </div>

        <div className="text-right text-xs text-white/70 whitespace-pre-line">
          <div className="font-semibold text-sm text-white">
            {methodHeaderLabel(quote.method, lang)}
          </div>
          <div>{countryName}</div>
        </div>
      </div>

      {/* Main stats grid */}
      <div className="grid gap-4 sm:grid-cols-4 text-xs sm:text-sm">
        <StatBox
          label={copy.youSend}
          value={formatUSD(quote.usdAmount)}
        />

        <StatBox
          label={copy.fees}
          value={formatUSD(quote.feeUSD)}
        />

        <StatBox
          label={copy.rateAfterSpread}
          value={quote.customerRate.toFixed(4)}
        />

        <StatBox
          label={copy.youReceive(currencyCode)}
          value={formatDestCurrency(
            quote.receiveAmount,
            currencyCode
          )}
        />
      </div>

      {/* Bottom row: delivery + savings + button */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80">
            {copy.deliveryTime}{" "}
            <span className="font-semibold">
              {quote.etaLabel}
            </span>
          </span>

          {isBest && typeof bestSavings === "number" && bestSavings > 0 && (
            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-100">
              {copy.extraVsSecondPrefix(currencyCode)}{" "}
              <span className="font-semibold">
                {formatDestCurrency(bestSavings, currencyCode)}
              </span>
            </span>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            href={quote.provider.link}
            target="_blank"
            className="rounded-full bg-white text-black px-5 py-2 text-xs sm:text-sm font-semibold hover:bg-white/90 transition"
          >
            {copy.openSite}
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
      <div className="text-[10px] sm:text-xs text-white/60 mb-1">
        {label}
      </div>
      <div className="text-sm sm:text-base font-semibold">
        {value}
      </div>
    </div>
  );
}
