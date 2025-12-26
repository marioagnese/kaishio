// src/lib/providers.ts

export type DeliveryMethod = "bank" | "debit" | "cash";
export type SpeedPreference = "cheapest" | "fastest" | "balanced";

export type ProviderId =
  | "wise"
  | "remitly"
  | "xoom"
  | "paypal"
  | "western_union"
  | "moneygram";

export type ProviderColor = {
  border: string;
  bg: string;
  glow: string;
  badge: string;
};

export type Provider = {
  id: ProviderId;
  name: string;
  tagline: string;
  methods: DeliveryMethod[];
  link: string;

  // Visual identity for cards (Tailwind classes)
  color: ProviderColor;

  // Fee model: approximate, per method
  feeUSD: {
    bank: { fixed: number; pct: number };
    debit: { fixed: number; pct: number };
    cash: { fixed: number; pct: number };
  };

  // FX spread assumption (percentage of mid-market rate)
  spread: {
    weekday: number;
    weekend: number;
  };

  // Delivery estimate (rough) for display + ranking
  etaHours: {
    bank: { min: number; max: number };
    debit: { min: number; max: number };
    cash: { min: number; max: number };
  };
};

export const PROVIDERS: Provider[] = [
  {
    id: "wise",
    name: "Wise",
    tagline: "Geralmente ótimo em câmbio",
    methods: ["bank", "debit"],
    link: "https://wise.com/",
    color: {
      border: "border-emerald-400/35",
      bg: "bg-emerald-400/5",
      glow: "shadow-[0_0_0_1px_rgba(52,211,153,0.18)]",
      badge: "bg-emerald-400/15 text-emerald-200",
    },
    feeUSD: {
      bank: { fixed: 0.6, pct: 0.004 },
      debit: { fixed: 0.9, pct: 0.006 },
      cash: { fixed: 0, pct: 0 },
    },
    spread: { weekday: 0.004, weekend: 0.007 },
    etaHours: {
      bank: { min: 2, max: 24 },
      debit: { min: 0.25, max: 2 },
      cash: { min: 0, max: 0 },
    },
  },
  {
    id: "remitly",
    name: "Remitly",
    tagline: "Boa velocidade e opções",
    methods: ["bank", "debit", "cash"],
    link: "https://www.remitly.com/",
    color: {
      border: "border-sky-400/35",
      bg: "bg-sky-400/5",
      glow: "shadow-[0_0_0_1px_rgba(56,189,248,0.18)]",
      badge: "bg-sky-400/15 text-sky-200",
    },
    feeUSD: {
      bank: { fixed: 1.99, pct: 0.007 },
      debit: { fixed: 2.99, pct: 0.012 },
      cash: { fixed: 3.99, pct: 0.015 },
    },
    spread: { weekday: 0.01, weekend: 0.016 },
    etaHours: {
      bank: { min: 0.25, max: 24 },
      debit: { min: 0.1, max: 2 },
      cash: { min: 0.1, max: 1 },
    },
  },
  {
    id: "xoom",
    name: "Xoom",
    tagline: "Rede PayPal + cash pickup",
    methods: ["bank", "debit", "cash"],
    link: "https://www.xoom.com/",
    color: {
      border: "border-indigo-400/35",
      bg: "bg-indigo-400/5",
      glow: "shadow-[0_0_0_1px_rgba(129,140,248,0.18)]",
      badge: "bg-indigo-400/15 text-indigo-200",
    },
    feeUSD: {
      bank: { fixed: 2.99, pct: 0.01 },
      debit: { fixed: 3.99, pct: 0.014 },
      cash: { fixed: 4.99, pct: 0.018 },
    },
    spread: { weekday: 0.016, weekend: 0.024 },
    etaHours: {
      bank: { min: 1, max: 48 },
      debit: { min: 0.25, max: 4 },
      cash: { min: 0.1, max: 1 },
    },
  },
  {
    id: "paypal",
    name: "PayPal",
    tagline: "Conveniência (pode custar mais)",
    methods: ["debit"],
    link: "https://www.paypal.com/",
    color: {
      border: "border-blue-400/35",
      bg: "bg-blue-400/5",
      glow: "shadow-[0_0_0_1px_rgba(96,165,250,0.18)]",
      badge: "bg-blue-400/15 text-blue-200",
    },
    feeUSD: {
      bank: { fixed: 0, pct: 0 },
      debit: { fixed: 0, pct: 0.02 },
      cash: { fixed: 0, pct: 0 },
    },
    spread: { weekday: 0.03, weekend: 0.035 },
    etaHours: {
      bank: { min: 0, max: 0 },
      debit: { min: 0.1, max: 2 },
      cash: { min: 0, max: 0 },
    },
  },
  {
    id: "western_union",
    name: "Western Union",
    tagline: "Muito forte em cash pickup",
    methods: ["bank", "debit", "cash"],
    link: "https://www.westernunion.com/",
    color: {
      border: "border-amber-400/35",
      bg: "bg-amber-400/5",
      glow: "shadow-[0_0_0_1px_rgba(251,191,36,0.18)]",
      badge: "bg-amber-400/15 text-amber-200",
    },
    feeUSD: {
      bank: { fixed: 4.99, pct: 0.012 },
      debit: { fixed: 5.99, pct: 0.018 },
      cash: { fixed: 6.99, pct: 0.02 },
    },
    spread: { weekday: 0.02, weekend: 0.03 },
    etaHours: {
      bank: { min: 2, max: 72 },
      debit: { min: 0.25, max: 6 },
      cash: { min: 0.1, max: 1 },
    },
  },
  {
    id: "moneygram",
    name: "MoneyGram",
    tagline: "Alternativa popular para cash",
    methods: ["bank", "debit", "cash"],
    link: "https://www.moneygram.com/",
    color: {
      border: "border-rose-400/35",
      bg: "bg-rose-400/5",
      glow: "shadow-[0_0_0_1px_rgba(251,113,133,0.18)]",
      badge: "bg-rose-400/15 text-rose-200",
    },
    feeUSD: {
      bank: { fixed: 3.99, pct: 0.012 },
      debit: { fixed: 4.99, pct: 0.018 },
      cash: { fixed: 5.99, pct: 0.02 },
    },
    spread: { weekday: 0.02, weekend: 0.03 },
    etaHours: {
      bank: { min: 2, max: 72 },
      debit: { min: 0.25, max: 6 },
      cash: { min: 0.1, max: 1 },
    },
  },
];

// ---------- COUNTRY MATRIX (LATAM) ----------

export type CountryCode = "BR" | "MX" | "AR" | "CL" | "CO" | "VE" | "PE" | "EC";

export type CountryConfig = {
  code: CountryCode;
  label: {
    en: string;
    pt: string;
    es: string;
  };
  currencyCode: string;
  currencySymbol: string;
  // Just a hint / default for mid-market; user can override or use Auto FX
  defaultMidRate: number;
  // Which providers we include for that corridor (MVP assumptions)
  providers: ProviderId[];
};

export const COUNTRIES: CountryConfig[] = [
  {
    code: "BR",
    label: {
      en: "Brazil",
      pt: "Brasil",
      es: "Brasil",
    },
    currencyCode: "BRL",
    currencySymbol: "R$",
    defaultMidRate: 5.3,
    providers: ["wise", "remitly", "xoom", "paypal", "western_union", "moneygram"],
  },
  {
    code: "MX",
    label: {
      en: "Mexico",
      pt: "México",
      es: "México",
    },
    currencyCode: "MXN",
    currencySymbol: "$",
    defaultMidRate: 17.0,
    providers: ["wise", "remitly", "xoom", "western_union", "moneygram"],
  },
  {
    code: "AR",
    label: {
      en: "Argentina",
      pt: "Argentina",
      es: "Argentina",
    },
    currencyCode: "ARS",
    currencySymbol: "$",
    defaultMidRate: 1000, // placeholder, user should Auto FX
    providers: ["wise", "xoom", "western_union", "moneygram"],
  },
  {
    code: "CL",
    label: {
      en: "Chile",
      pt: "Chile",
      es: "Chile",
    },
    currencyCode: "CLP",
    currencySymbol: "$",
    defaultMidRate: 900,
    providers: ["wise", "remitly", "xoom", "western_union", "moneygram"],
  },
  {
    code: "CO",
    label: {
      en: "Colombia",
      pt: "Colômbia",
      es: "Colombia",
    },
    currencyCode: "COP",
    currencySymbol: "$",
    defaultMidRate: 4000,
    providers: ["wise", "remitly", "xoom", "western_union", "moneygram"],
  },
  {
    code: "VE",
    label: {
      en: "Venezuela",
      pt: "Venezuela",
      es: "Venezuela",
    },
    currencyCode: "VES",
    currencySymbol: "Bs",
    defaultMidRate: 40,
    providers: ["western_union", "moneygram"],
  },
  {
    code: "PE",
    label: {
      en: "Peru",
      pt: "Peru",
      es: "Perú",
    },
    currencyCode: "PEN",
    currencySymbol: "S/",
    defaultMidRate: 3.7,
    providers: ["wise", "remitly", "xoom", "western_union", "moneygram"],
  },
  {
    code: "EC",
    label: {
      en: "Ecuador",
      pt: "Equador",
      es: "Ecuador",
    },
    currencyCode: "USD",
    currencySymbol: "$",
    defaultMidRate: 1,
    providers: ["wise", "remitly", "xoom", "western_union", "moneygram"],
  },
];

export const COUNTRY_BY_CODE: Record<CountryCode, CountryConfig> = COUNTRIES.reduce(
  (acc, c) => {
    acc[c.code] = c;
    return acc;
  },
  {} as Record<CountryCode, CountryConfig>
);

// ---------- HELPERS ----------

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

// Generic formatter for destination currency
export function formatDestCurrency(n: number, currencyCode: string) {
  const locale = currencyCode === "BRL" ? "pt-BR" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(n);
}

// Legacy helper in case anything still uses it
export const formatBRL = (n: number) => formatDestCurrency(n, "BRL");

// Apply spread to mid-market rate
export function applySpread(midRate: number, spreadPct: number) {
  const rate = midRate * (1 - spreadPct);
  return Math.max(0, rate);
}

// ---------- QUOTES / RANKING ----------

export type Quote = {
  provider: Provider;
  countryCode: CountryCode;
  method: DeliveryMethod;
  usdAmount: number;
  midRate: number;
  isWeekend: boolean;

  feeUSD: number;
  customerRate: number;   // dest currency per USD after spread
  receiveAmount: number;  // amount in destination currency
  brlEstimated: number;   // legacy alias for receiveAmount (used by existing UI)
  etaLabel: string;

  spreadPct: number;
};

export function buildQuote(args: {
  provider: Provider;
  countryCode: CountryCode;
  method: DeliveryMethod;
  usdAmount: number;
  midRate: number;
  isWeekend: boolean;
}): Quote | null {
  const { provider, countryCode, method, usdAmount, midRate, isWeekend } = args;

  // Check if provider is available for this corridor
  const countryConfig = COUNTRY_BY_CODE[countryCode];
  if (!countryConfig.providers.includes(provider.id)) return null;

  if (!provider.methods.includes(method)) return null;

  const feeModel = provider.feeUSD[method];
  const feeUSD = feeModel.fixed + usdAmount * feeModel.pct;

  const spreadPct = isWeekend ? provider.spread.weekend : provider.spread.weekday;
  const customerRate = applySpread(midRate, spreadPct);

  const usdNet = Math.max(0, usdAmount - feeUSD);
  const receiveAmount = usdNet * customerRate;

  const eta = provider.etaHours[method];
  const etaLabel =
    eta.min === eta.max
      ? `${eta.min}h`
      : eta.min < 1
      ? `${Math.round(eta.min * 60)}–${Math.round(eta.max * 60)} min`
      : `${eta.min}–${eta.max}h`;

  return {
    provider,
    countryCode,
    method,
    usdAmount,
    midRate,
    isWeekend,
    feeUSD,
    customerRate,
    receiveAmount,
    brlEstimated: receiveAmount, // keep old field for existing components
    etaLabel,
    spreadPct,
  };
}

export function rankQuotes(quotes: Quote[], pref: SpeedPreference) {
  const copy = [...quotes];

  const etaMidHours = (q: Quote) => {
    const eta = q.provider.etaHours[q.method];
    return (eta.min + eta.max) / 2;
  };

  if (pref === "cheapest") {
    copy.sort((a, b) => b.receiveAmount - a.receiveAmount);
    return copy;
  }

  if (pref === "fastest") {
    copy.sort((a, b) => etaMidHours(a) - etaMidHours(b));
    return copy;
  }

  // balanced: normalize cost and speed
  const maxAmt = Math.max(...copy.map((q) => q.receiveAmount));
  const minAmt = Math.min(...copy.map((q) => q.receiveAmount));
  const maxEta = Math.max(...copy.map((q) => etaMidHours(q)));
  const minEta = Math.min(...copy.map((q) => etaMidHours(q)));

  const score = (q: Quote) => {
    const amtNorm = maxAmt === minAmt ? 1 : (q.receiveAmount - minAmt) / (maxAmt - minAmt);
    const etaNorm = maxEta === minEta ? 1 : 1 - (etaMidHours(q) - minEta) / (maxEta - minEta);
    return amtNorm * 0.65 + etaNorm * 0.35;
  };

  copy.sort((a, b) => score(b) - score(a));
  return copy;
}
