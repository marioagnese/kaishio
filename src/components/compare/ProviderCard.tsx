"use client";

import { useLanguage, type Language } from "@/contexts/LanguageContext";
import type { Quote, DeliveryMethod } from "@/lib/providers";
import {
  formatUSD,
  formatDestCurrency,
  COUNTRY_BY_CODE,
} from "@/lib/providers";

type CardCopy = {
  topBadge: string;
  altBadge: string;
  youSend: string;
  fees: string;
  rateApplied: string;
  youReceive: (currencyCode: string) => string;
  eta: string;
  savingsLabel: (currencyCode: string) => string;
  seeProvider: string;
};

const CARD_COPY: Record<Language, CardCopy> = {
  en: {
    topBadge: "Best match",
    altBadge: "Option",
    youSend: "You send (USD)",
    fees: "Estimated fees",
    rateApplied: "FX rate after spread",
    youReceive: (cc) => `You receive (est., ${cc})`,
    eta: "Delivery time",
    savingsLabel: (cc) => `Est. extra vs #2 (${cc})`,
    seeProvider: "Open provider site",
  },
  pt: {
    topBadge: "Melhor opção",
    altBadge: "Opção",
    youSend: "Você envia (USD)",
    fees: "Taxas estimadas",
    rateApplied: "Câmbio após spread",
    youReceive: (cc) => `Você recebe (est., ${cc})`,
    eta: "Prazo estimado",
    savingsLabel: (cc) => `Estimativa a mais vs #2 (${cc})`,
    seeProvider: "Abrir site do provedor",
  },
  es: {
    topBadge: "Mejor opción",
    altBadge: "Opción",
    youSend: "Envías (USD)",
    fees: "Comisiones estimadas",
    rateApplied: "Tipo de cambio tras el spread",
    youReceive: (cc) => `Recibes (est., ${cc})`,
    eta: "Tiempo de entrega",
    savingsLabel: (cc) => `Aprox. extra vs #2 (${cc})`,
    seeProvider: "Abrir sitio del proveedor",
  },
};

type Props = {
  quote: Quote;
  rank: number;
  bestSavings?: number;
  // Backwards compatibility in case ComparePage is still using this name
  bestSavingsBRL?: number;
  bestReason?: string;
};

export default function ProviderCard({
  quote,
  rank,
  bestSavings,
  bestSavingsBRL,
  bestReason,
}: Props) {
  const { lang } = useLanguage();
  const t = CARD_COPY[lang];

  const savings = bestSavings ?? bestSavingsBRL;

  const country = COUNTRY_BY_CODE[quote.countryCode];
  const currencyCode = country.currencyCode;

  const badgeLabel = rank === 1 ? t.topBadge : `${t.altBadge} #${rank}`;
  const isTop = rank === 1;

  return (
    <div
      className={[
        "rounded-3xl border bg-white/5 p-5 md:p-6",
        "flex flex-col gap-4 md:gap-5",
        quote.provider.color.border,
        quote.provider.color.bg,
        quote.provider.color.glow,
      ].join(" ")}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {badgeLabel}
          </div>
          <div className="mt-3 text-lg font-semibold flex items-center gap-2">
            {quote.provider.name}
          </div>
          <div className="text-sm text-white/70">{quote.provider.tagline}</div>

          {isTop && bestReason && (
            <div className="mt-2 text-xs text-emerald-200/90">
              {bestReason}
            </div>
          )}
        </div>

        <div className="text-right text-xs text-white/60">
          <div className="font-semibold uppercase tracking-wide text-white/75">
            {methodLabel(quote.method, lang)}
          </div>
          <div className="mt-1">{country.label[lang]}</div>
        </div>
      </div>

      {/* Numbers grid */}
      <div className="grid gap-4 sm:grid-cols-4 text-sm">
        <InfoBlock
          label={t.youSend}
          value={formatUSD(quote.usdAmount)}
        />
        <InfoBlock
          label={t.fees}
          value={formatUSD(quote.feeUSD)}
        />
        <InfoBlock
          label={t.rateApplied}
          value={quote.customerRate.toFixed(4)}
        />
        <InfoBlock
          label={t.youReceive(currencyCode)}
          value={formatDestCurrency(quote.receiveAmount, currencyCode)}
        />
      </div>

      {/* Bottom row: ETA, savings, CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap gap-3">
          <Pill label={t.eta} value={quote.etaLabel} />
          {typeof savings === "number" && savings > 0 && (
            <Pill
              label={t.savingsLabel(currencyCode)}
              value={formatDestCurrency(savings, currencyCode)}
              variant="positive"
            />
          )}
        </div>

        <div className="flex justify-end">
          <a
            href={quote.provider.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-2 font-semibold text-xs hover:bg-white/90 transition"
          >
            {t.seeProvider}
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/30 border border-white/10 p-3">
      <div className="text-[0.7rem] uppercase tracking-wide text-white/55 mb-1">
        {label}
      </div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function Pill({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "positive";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 border text-[0.7rem]";
  const styles =
    variant === "positive"
      ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100"
      : "border-white/20 bg-black/30 text-white/75";

  return (
    <div className={`${base} ${styles}`}>
      <span className="opacity-70">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function methodLabel(m: DeliveryMethod, lang: Language): string {
  if (lang === "en") {
    if (m === "bank") return "Bank transfer";
    if (m === "debit") return "Card / debit";
    if (m === "cash") return "Cash pickup";
  } else if (lang === "pt") {
    if (m === "bank") return "Transferência bancária";
    if (m === "debit") return "Cartão / débito";
    if (m === "cash") return "Retirada em dinheiro";
  } else {
    // es
    if (m === "bank") return "Transferencia bancaria";
    if (m === "debit") return "Tarjeta / débito";
    if (m === "cash") return "Retiro en efectivo";
  }
  return m;
}
