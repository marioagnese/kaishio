export type DeliveryMethod = "bank" | "debit" | "cash";
export type SpeedPreference = "cheapest" | "fastest" | "balanced";

export type ProviderId =
  | "wise"
  | "remitly"
  | "xoom"
  | "paypal"
  | "western_union"
  | "moneygram";

export type Provider = {
  id: ProviderId;
  name: string;
  tagline: string;
  methods: DeliveryMethod[];
  // affiliate or standard link (you can update later)
  link: string;

  // Fee model: approximate / for MVP (you'll tweak these with real observed values)
  // fixed fee in USD + percent fee of amount
  feeUSD: {
    bank: { fixed: number; pct: number };
    debit: { fixed: number; pct: number };
    cash: { fixed: number; pct: number };
  };

  // FX spread assumption (percentage of mid-market rate)
  // Example: 0.008 = 0.8% spread
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
    feeUSD: {
      bank: { fixed: 0.6, pct: 0.004 },  // 0.4%
      debit: { fixed: 0.9, pct: 0.006 }, // 0.6%
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
    feeUSD: {
      bank: { fixed: 1.99, pct: 0.007 },
      debit: { fixed: 2.99, pct: 0.012 },
      cash: { fixed: 3.99, pct: 0.015 },
    },
    spread: { weekday: 0.010, weekend: 0.016 },
    etaHours: {
      bank: { min: 0.25, max: 24 },
      debit: { min: 0.10, max: 2 },
      cash: { min: 0.10, max: 1 },
    },
  },
  {
    id: "xoom",
    name: "Xoom",
    tagline: "Rede PayPal + cash pickup",
    methods: ["bank", "debit", "cash"],
    link: "https://www.xoom.com/",
    feeUSD: {
      bank: { fixed: 2.99, pct: 0.010 },
      debit: { fixed: 3.99, pct: 0.014 },
      cash: { fixed: 4.99, pct: 0.018 },
    },
    spread: { weekday: 0.016, weekend: 0.024 },
    etaHours: {
      bank: { min: 1, max: 48 },
      debit: { min: 0.25, max: 4 },
      cash: { min: 0.10, max: 1 },
    },
  },
  {
    id: "paypal",
    name: "PayPal",
    tagline: "Conveniência (pode custar mais)",
    methods: ["debit"],
    link: "https://www.paypal.com/",
    feeUSD: {
      bank: { fixed: 0, pct: 0 },
      debit: { fixed: 0.0, pct: 0.020 },
      cash: { fixed: 0, pct: 0 },
    },
    spread: { weekday: 0.030, weekend: 0.035 },
    etaHours: {
      bank: { min: 0, max: 0 },
      debit: { min: 0.10, max: 2 },
      cash: { min: 0, max: 0 },
    },
  },
  {
    id: "western_union",
    name: "Western Union",
    tagline: "Muito forte em cash pickup",
    methods: ["bank", "debit", "cash"],
    link: "https://www.westernunion.com/",
    feeUSD: {
      bank: { fixed: 4.99, pct: 0.012 },
      debit: { fixed: 5.99, pct: 0.018 },
      cash: { fixed: 6.99, pct: 0.020 },
    },
    spread: { weekday: 0.020, weekend: 0.030 },
    etaHours: {
      bank: { min: 2, max: 72 },
      debit: { min: 0.25, max: 6 },
      cash: { min: 0.10, max: 1 },
    },
  },
  {
    id: "moneygram",
    name: "MoneyGram",
    tagline: "Alternativa popular para cash",
    methods: ["bank", "debit", "cash"],
    link: "https://www.moneygram.com/",
    feeUSD: {
      bank: { fixed: 3.99, pct: 0.012 },
      debit: { fixed: 4.99, pct: 0.018 },
      cash: { fixed: 5.99, pct: 0.020 },
    },
    spread: { weekday: 0.020, weekend: 0.030 },
    etaHours: {
      bank: { min: 2, max: 72 },
      debit: { min: 0.25, max: 6 },
      cash: { min: 0.10, max: 1 },
    },
  },
];

// Helpers
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function formatBRL(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

// Use mid-market rate as a user input (default example).
// We apply provider spread to estimate customer rate.
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
  customerRate: number; // BRL per USD after spread
  brlEstimated: number;
  etaLabel: string;

  // For explaining
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

  // cost proxy: higher BRL received is better; speed proxy: lower ETA mid is better
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

  // balanced: normalize both (simple heuristic)
  const maxBrl = Math.max(...copy.map((q) => q.brlEstimated));
  const minBrl = Math.min(...copy.map((q) => q.brlEstimated));
  const maxEta = Math.max(...copy.map((q) => etaMidHours(q)));
  const minEta = Math.min(...copy.map((q) => etaMidHours(q)));

  const score = (q: Quote) => {
    const brlNorm = maxBrl === minBrl ? 1 : (q.brlEstimated - minBrl) / (maxBrl - minBrl);
    const etaNorm = maxEta === minEta ? 1 : 1 - (etaMidHours(q) - minEta) / (maxEta - minEta);
    return brlNorm * 0.65 + etaNorm * 0.35;
  };

  copy.sort((a, b) => score(b) - score(a));
  return copy;
}
