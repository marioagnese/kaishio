export type DeliveryMethod = "bank" | "debit" | "cash";
export type SpeedPreference = "cheapest" | "fastest" | "balanced";

export type ProviderId =
  | "wise"
  | "remitly"
  | "xoom"
  | "paypal"
  | "western_union"
  | "moneygram"
  | "sendwave"
  | "revolut"
  | "ria"
  | "xe"
  | "sharemoney";

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

  feeUSD: {
    bank: { fixed: number; pct: number };
    debit: { fixed: number; pct: number };
    cash: { fixed: number; pct: number };
  };

  spread: {
    weekday: number;
    weekend: number;
  };

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

  // NEW PROVIDERS
  {
    id: "sendwave",
    name: "SendWave",
    tagline: "Remessas simples e rápidas",
    methods: ["bank"],
    link: "https://www.sendwave.com/en-us/countries/brazil",
    color: {
      border: "border-teal-400/35",
      bg: "bg-teal-400/5",
      glow: "shadow-[0_0_0_1px_rgba(45,212,191,0.18)]",
      badge: "bg-teal-400/15 text-teal-100",
    },
    feeUSD: {
      bank: { fixed: 2.99, pct: 0.01 },
      debit: { fixed: 0, pct: 0 },
      cash: { fixed: 0, pct: 0 },
    },
    spread: { weekday: 0.012, weekend: 0.018 },
    etaHours: {
      bank: { min: 0.5, max: 24 },
      debit: { min: 0, max: 0 },
      cash: { min: 0, max: 0 },
    },
  },
  {
    id: "revolut",
    name: "Revolut",
    tagline: "Bom câmbio + experiência moderna",
    methods: ["bank", "debit"],
    link: "https://www.revolut.com/en-US/money-transfer/send-money-to-brazil/",
    color: {
      border: "border-violet-400/35",
      bg: "bg-violet-400/5",
      glow: "shadow-[0_0_0_1px_rgba(167,139,250,0.18)]",
      badge: "bg-violet-400/15 text-violet-100",
    },
    feeUSD: {
      bank: { fixed: 0, pct: 0.007 },
      debit: { fixed: 1.49, pct: 0.01 },
      cash: { fixed: 0, pct: 0 },
    },
    spread: { weekday: 0.006, weekend: 0.01 },
    etaHours: {
      bank: { min: 1, max: 48 },
      debit: { min: 0.25, max: 4 },
      cash: { min: 0, max: 0 },
    },
  },
  {
    id: "ria",
    name: "RIA Money Transfer",
    tagline: "Forte em cash pickup e rede ampla",
    methods: ["bank", "debit", "cash"],
    link: "https://www.riamoneytransfer.com/en-us/send-money-to-brazil/",
    color: {
      border: "border-orange-400/35",
      bg: "bg-orange-400/5",
      glow: "shadow-[0_0_0_1px_rgba(251,146,60,0.18)]",
      badge: "bg-orange-400/15 text-orange-100",
    },
    feeUSD: {
      bank: { fixed: 3.99, pct: 0.012 },
      debit: { fixed: 4.99, pct: 0.016 },
      cash: { fixed: 5.99, pct: 0.02 },
    },
    spread: { weekday: 0.02, weekend: 0.03 },
    etaHours: {
      bank: { min: 2, max: 72 },
      debit: { min: 0.5, max: 6 },
      cash: { min: 0.1, max: 1 },
    },
  },
  {
    id: "xe",
    name: "XE",
    tagline: "Marca conhecida em câmbio",
    methods: ["bank"],
    link: "https://www.xe.com/",
    color: {
      border: "border-lime-400/35",
      bg: "bg-lime-400/5",
      glow: "shadow-[0_0_0_1px_rgba(163,230,53,0.18)]",
      badge: "bg-lime-400/15 text-lime-100",
    },
    feeUSD: {
      bank: { fixed: 2.99, pct: 0.01 },
      debit: { fixed: 0, pct: 0 },
      cash: { fixed: 0, pct: 0 },
    },
    spread: { weekday: 0.01, weekend: 0.016 },
    etaHours: {
      bank: { min: 1, max: 48 },
      debit: { min: 0, max: 0 },
      cash: { min: 0, max: 0 },
    },
  },
  {
    id: "sharemoney",
    name: "ShareMoney",
    tagline: "Opção alternativa com cash pickup",
    methods: ["bank", "cash"],
    link: "https://www.sharemoney.com/us/en/brazil",
    color: {
      border: "border-fuchsia-400/35",
      bg: "bg-fuchsia-400/5",
      glow: "shadow-[0_0_0_1px_rgba(232,121,249,0.18)]",
      badge: "bg-fuchsia-400/15 text-fuchsia-100",
    },
    feeUSD: {
      bank: { fixed: 2.99, pct: 0.01 },
      debit: { fixed: 0, pct: 0 },
      cash: { fixed: 4.99, pct: 0.018 },
    },
    spread: { weekday: 0.018, weekend: 0.026 },
    etaHours: {
      bank: { min: 1, max: 48 },
      debit: { min: 0, max: 0 },
      cash: { min: 0.25, max: 2 },
    },
  },
];

// Helpers
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

export function formatBRL(n: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}

export function applySpread(midRate: number, spreadPct: number) {
  const rate = midRate * (1 - spreadPct);
  return Math.max(0, rate);
}

export type Quote = {
  provider: Provider;
  method: DeliveryMethod;
  usdAmount: number;
  midRate: number;
  isWeekend: boolean;

  feeUSD: number;
  customerRate: number;
  brlEstimated: number;
  etaLabel: string;

  spreadPct: number;
};

export function buildQuote(args: {
  provider: Provider;
  method: DeliveryMethod;
  usdAmount: number;
  midRate: number;
  isWeekend: boolean;
}): Quote | null {
  const { provider, method, usdAmount, midRate, isWeekend } = args;
  if (!provider.methods.includes(method)) return null;

  const feeModel = provider.feeUSD[method];
  const feeUSD = feeModel.fixed + usdAmount * feeModel.pct;

  const spreadPct = isWeekend ? provider.spread.weekend : provider.spread.weekday;
  const customerRate = applySpread(midRate, spreadPct);

  const usdNet = Math.max(0, usdAmount - feeUSD);
  const brlEstimated = usdNet * customerRate;

  const eta = provider.etaHours[method];
  const etaLabel =
    eta.min === eta.max
      ? `${eta.min}h`
      : eta.min < 1
      ? `${Math.round(eta.min * 60)}–${Math.round(eta.max * 60)} min`
      : `${eta.min}–${eta.max}h`;

  return {
    provider,
    method,
    usdAmount,
    midRate,
    isWeekend,
    feeUSD,
    customerRate,
    brlEstimated,
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
    copy.sort((a, b) => b.brlEstimated - a.brlEstimated);
    return copy;
  }

  if (pref === "fastest") {
    copy.sort((a, b) => etaMidHours(a) - etaMidHours(b));
    return copy;
  }

  const maxBrl = Math.max(...copy.map((q) => q.brlEstimated));
  const minBrl = Math.min(...copy.map((q) => q.brlEstimated));
  const maxEta = Math.max(...copy.map((q) => etaMidHours(q)));
  const minEta = Math.min(...copy.map((q) => etaMidHours(q)));

  const score = (q: Quote) => {
    const brlNorm =
      maxBrl === minBrl ? 1 : (q.brlEstimated - minBrl) / (maxBrl - minBrl);
    const etaNorm =
      maxEta === minEta
        ? 1
        : 1 - (etaMidHours(q) - minEta) / (maxEta - minEta);
    return brlNorm * 0.65 + etaNorm * 0.35;
  };

  copy.sort((a, b) => score(b) - score(a));
  return copy;
}
