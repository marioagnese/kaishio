// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

type WhyPoint = { title: string; body: string };

type HomeCopy = {
  tagPill: string;
  heroPrefix: string;
  heroHighlight: string;
  heroSuffix: string;
  heroParagraphStart: string;
  heroParagraphBold: string;
  heroParagraphEnd: string;

  primaryCta: string;
  secondaryInfoLink: string;
  startHelper: string;

  stripLabel: string;

  fxTickerLabel: string;
  fxTickerLoading: string;
  fxTickerError: string;

  trust: { title: string; body: string }[];

  cardTitle: string;
  cardSubtitle: string;
  cardImageCaption: string;
  miniSteps: { title: string; body: string }[];

  providersTitle: string;
  providersBody: string;

  learnCta: string;
  disclaimer: string;
  footerLine: string;

  whyTitle: string;
  whyPoints: WhyPoint[];

  infoTitle: string;
  infoIntro: string;
  infoClose: string;
};

const HOME_COPY: Record<Language, HomeCopy> = {
  en: {
    tagPill: "Independent comparer • US → Latin America",
    heroPrefix: "Compare the",
    heroHighlight: "real cost",
    heroSuffix: "before sending money to Latin America.",
    heroParagraphStart: "Kaishio is a",
    heroParagraphBold: "research assistant",
    heroParagraphEnd:
      "We compare providers (fees + FX spread + speed) so you can choose clearly — and save.",

    primaryCta: "Start",
    secondaryInfoLink: "How does this work?",
    startHelper:
      "No signup, no spam — just see who gives more in local currency.",

    stripLabel: "We currently compare",

    fxTickerLabel: "Sample FX today (estimate only):",
    fxTickerLoading: "Loading FX samples…",
    fxTickerError: "Couldn’t load FX right now.",

    trust: [
      {
        title: "No tricks",
        body: "We show estimates and explain the FX spread.",
      },
      {
        title: "We never move your money",
        body: "You complete the transfer on the provider’s own app/site.",
      },
      {
        title: "Independent",
        body: "Clear comparison (with affiliate links when available).",
      },
    ],

    cardTitle: "Money without borders",
    cardSubtitle: "Compare • choose • send with confidence",
    cardImageCaption:
      "Real people, real transfers — we help you find the clearer option.",
    miniSteps: [
      {
        title: "Enter the amount in USD",
        body: "You tell us how much you want to send.",
      },
      {
        title: "See total cost and estimate",
        body: "Fees + FX (spread) + speed.",
      },
      {
        title: "Click through and finish with the provider",
        body: "The transfer happens outside Kaishio.",
      },
    ],

    providersTitle: "Providers (initial phase)",
    providersBody: "Wise • Remitly • Xoom • PayPal • Western Union • MoneyGram",

    learnCta: "Learn before sending",
    disclaimer:
      "Notice: Kaishio is informational only and does not provide financial, legal, or tax advice. Final values may change due to promotions, payment method, and time (e.g. weekends).",
    footerLine:
      "Kaishio doesn’t send, receive, or hold money. Transfers happen with the provider you choose.",

    whyTitle: "Why trust this tool?",
    whyPoints: [
      {
        title: "Transparent math",
        body: "We separate provider fees from FX spread so you can see the real cost.",
      },
      {
        title: "Provider-agnostic",
        body: "We don’t handle your money and you always finish on the provider’s own app.",
      },
      {
        title: "Regional focus",
        body: "Built specifically for US → Latin America transfers, not generic ‘global’ marketing.",
      },
    ],

    infoTitle: "How Kaishio works",
    infoIntro:
      "Kaishio is a small research assistant for US → Latin America remittances. We don’t send money — we help you see who gives more in local currency, after fees and FX spread.",
    infoClose: "Close",
  },

  pt: {
    tagPill: "Comparador independente • EUA → América Latina",
    heroPrefix: "Compare o",
    heroHighlight: "custo real",
    heroSuffix: "antes de enviar dinheiro para a América Latina.",
    heroParagraphStart: "Kaishio é um",
    heroParagraphBold: "assistente de pesquisa",
    heroParagraphEnd:
      "Comparamos provedores (taxas + câmbio/spread + velocidade) para você escolher com clareza — e economizar.",

    primaryCta: "Começar",
    secondaryInfoLink: "Como isso funciona?",
    startHelper:
      "Sem cadastro, sem spam — só ver quem entrega mais em moeda local.",

    stripLabel: "Hoje comparamos",

    fxTickerLabel: "Exemplo de câmbio hoje (apenas ilustrativo):",
    fxTickerLoading: "Carregando exemplos de câmbio…",
    fxTickerError: "Não foi possível carregar o câmbio agora.",

    trust: [
      {
        title: "Sem pegadinhas",
        body: "Mostramos estimativas e explicamos o spread do câmbio.",
      },
      {
        title: "Sem mover o seu dinheiro",
        body: "Você finaliza no próprio app/site do provedor.",
      },
      {
        title: "Independente",
        body: "Comparação clara (com links afiliados quando houver).",
      },
    ],

    cardTitle: "Dinheiro sem fronteiras",
    cardSubtitle: "Compare • escolha • envie com confiança",
    cardImageCaption:
      "Pessoas reais, remessas reais — ajudamos você a enxergar o custo com clareza.",
    miniSteps: [
      {
        title: "Digite o valor em USD",
        body: "Você informa quanto quer enviar.",
      },
      {
        title: "Veja custo total e estimativa",
        body: "Taxas + câmbio (spread) + velocidade.",
      },
      {
        title: "Clique e finalize no provedor",
        body: "A transferência acontece fora do Kaishio.",
      },
    ],

    providersTitle: "Provedores (fase inicial)",
    providersBody: "Wise • Remitly • Xoom • PayPal • Western Union • MoneyGram",

    learnCta: "Aprender antes de enviar",
    disclaimer:
      "Aviso: Kaishio é informativo e não oferece aconselhamento financeiro, legal ou fiscal. Valores finais podem variar por promoções, método de pagamento e horário (por exemplo, fim de semana).",
    footerLine:
      "Kaishio não envia, não recebe e não armazena dinheiro. As transações ocorrem no provedor escolhido.",

    whyTitle: "Por que confiar nesta ferramenta?",
    whyPoints: [
      {
        title: "Cálculo transparente",
        body: "Separamos taxas do provedor e spread do câmbio para mostrar o custo real.",
      },
      {
        title: "Sem conflito de interesse",
        body: "Não tocamos no seu dinheiro; você sempre finaliza no app/site do provedor.",
      },
      {
        title: "Foco regional",
        body: "Feito especificamente para remessas EUA → América Latina, não um site genérico.",
      },
    ],

    infoTitle: "Como o Kaishio funciona",
    infoIntro:
      "O Kaishio é um assistente de pesquisa para remessas EUA → América Latina. Não enviamos dinheiro — ajudamos você a ver quem entrega mais em moeda local, depois de taxas e spread.",
    infoClose: "Fechar",
  },

  es: {
    tagPill: "Comparador independiente • EE. UU. → América Latina",
    heroPrefix: "Compara el",
    heroHighlight: "costo real",
    heroSuffix: "antes de enviar dinero a América Latina.",
    heroParagraphStart: "Kaishio es un",
    heroParagraphBold: "asistente de investigación",
    heroParagraphEnd:
      "Comparamos proveedores (comisiones + tipo de cambio/spread + velocidad) para que elijas con claridad y puedas ahorrar.",

    primaryCta: "Comenzar",
    secondaryInfoLink: "¿Cómo funciona?",
    startHelper:
      "Sin registro, sin spam: solo ver quién entrega más en moneda local.",

    stripLabel: "Hoy comparamos",

    fxTickerLabel: "Ejemplo de cambio de hoy (solo ilustrativo):",
    fxTickerLoading: "Cargando ejemplos de cambio…",
    fxTickerError: "No se pudo cargar el tipo de cambio ahora.",

    trust: [
      {
        title: "Sin trucos",
        body: "Mostramos estimaciones y explicamos el spread del tipo de cambio.",
      },
      {
        title: "Nunca tocamos tu dinero",
        body: "Finalizas en la propia app/sitio del proveedor.",
      },
      {
        title: "Independiente",
        body: "Comparación clara (con enlaces de afiliado cuando existan).",
      },
    ],

    cardTitle: "Dinero sin fronteras",
    cardSubtitle: "Compara • elige • envía con confianza",
    cardImageCaption:
      "Personas reales, envíos reales — te ayudamos a ver el costo con claridad.",
    miniSteps: [
      {
        title: "Ingresa el monto en USD",
        body: "Indicas cuánto quieres enviar.",
      },
      {
        title: "Ve el costo total y la estimación",
        body: "Comisiones + tipo de cambio (spread) + velocidad.",
      },
      {
        title: "Haz clic y termina con el proveedor",
        body: "La transferencia ocurre fuera de Kaishio.",
      },
    ],

    providersTitle: "Proveedores (fase inicial)",
    providersBody: "Wise • Remitly • Xoom • PayPal • Western Union • MoneyGram",

    learnCta: "Aprender antes de enviar",
    disclaimer:
      "Aviso: Kaishio es solo informativo y no ofrece asesoría financiera, legal o fiscal. Los valores finales pueden variar según promociones, método de pago y horario (por ejemplo, fines de semana).",
    footerLine:
      "Kaishio no envía, recibe ni almacena dinero. Las transferencias se realizan con el proveedor que elijas.",

    whyTitle: "¿Por qué confiar en esta herramienta?",
    whyPoints: [
      {
        title: "Cálculo transparente",
        body: "Separamos comisiones del proveedor y spread del tipo de cambio para mostrar el costo real.",
      },
      {
        title: "Sin conflicto de interés",
        body: "No manejamos tu dinero; siempre terminas en la app/sitio del proveedor.",
      },
      {
        title: "Enfoque regional",
        body: "Diseñado específicamente para envíos EE. UU. → América Latina, no un sitio genérico.",
      },
    ],

    infoTitle: "Cómo funciona Kaishio",
    infoIntro:
      "Kaishio es un asistente de investigación para remesas EE. UU. → América Latina. No enviamos dinero: te ayudamos a ver quién entrega más en moneda local tras comisiones y spread.",
    infoClose: "Cerrar",
  },
};

const PROVIDER_CHIPS = [
  "Wise",
  "Remitly",
  "Xoom",
  "PayPal",
  "Western Union",
  "MoneyGram",
];

type FxSample = { pair: string; rate: number };

export default function HomePage() {
  const { lang } = useLanguage();
  const t = HOME_COPY[lang];

  const [fxSamples, setFxSamples] = useState<FxSample[] | null>(null);
  const [fxLoading, setFxLoading] = useState<boolean>(false);
  const [fxError, setFxError] = useState<string | null>(null);

  const [showInfo, setShowInfo] = useState(false);

  // Load illustrative FX samples on mount
  useEffect(() => {
    async function loadFx() {
      try {
        setFxLoading(true);
        setFxError(null);

        const targets = ["BRL", "MXN", "COP"];
        const results: FxSample[] = [];

        await Promise.all(
          targets.map(async (code) => {
            const res = await fetch(
              `/api/fx?from=USD&to=${encodeURIComponent(code)}`,
              { cache: "no-store" },
            );
            if (!res.ok) return;

            const data: { rate?: number } = await res.json();
            if (!data.rate || Number.isNaN(data.rate)) return;

            results.push({
              pair: `USD → ${code}`,
              rate: data.rate,
            });
          }),
        );

        if (results.length === 0) {
          setFxError("no-data");
          setFxSamples(null);
        } else {
          setFxSamples(results);
        }
      } catch {
        setFxError("request-failed");
        setFxSamples(null);
      } finally {
        setFxLoading(false);
      }
    }

    loadFx();
  }, []);

  return (
    <main className="min-h-screen bg-[#070A12] text-white overflow-hidden relative">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-40 -left-24 h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-[520px] w-[520px] rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,rgba(255,255,255,0)_55%)]" />
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-14 pb-10">
        {/* Big hero logo watermark to fill the empty top-left area */}
        <div className="pointer-events-none absolute -top-6 -left-6 opacity-40 sm:opacity-50 lg:opacity-60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/kaishiologo.png"
            alt="Kaishio logo large"
            className="w-[220px] sm:w-[280px] lg:w-[340px] rounded-full object-contain"
          />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* LEFT COLUMN */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {t.tagPill}
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">
              {t.heroPrefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-blue-300 to-amber-200">
                {t.heroHighlight}
              </span>{" "}
              {t.heroSuffix}
            </h1>

            <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-xl">
              {t.heroParagraphStart}{" "}
              <span className="font-semibold text-white">
                {t.heroParagraphBold}
              </span>
              . {t.heroParagraphEnd}
            </p>

            {/* MAIN CTA: single Start button */}
            <div className="mt-8 flex flex-col gap-2 max-w-xs">
              <Link
                href="/compare"
                className="inline-flex justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
              >
                {t.primaryCta}
              </Link>

              <button
                type="button"
                onClick={() => setShowInfo(true)}
                className="text-xs text-white/80 underline-offset-4 hover:underline self-start"
              >
                {t.secondaryInfoLink}
              </button>

              <p className="text-xs text-white/60">{t.startHelper}</p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur">
              {/* IMAGE COLLAGE */}
              <div className="relative mb-6">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/10 via-sky-400/10 to-amber-300/5 pointer-events-none" />
                  <div className="relative flex gap-4 items-end">
                    {/* Main image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/illustrations/remit-family-1.png"
                      alt="Family receiving money"
                      className="h-32 w-40 sm:h-40 sm:w-52 rounded-2xl object-cover border border-white/15"
                    />
                    {/* Secondary image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/illustrations/remit-phone-1.png"
                      alt="Person sending money on the phone"
                      className="h-20 w-28 sm:h-24 sm:w-32 rounded-2xl object-cover border border-white/15 translate-y-3"
                    />
                    <div className="ml-auto max-w-[170px] text-xs text-white/80 leading-relaxed">
                      {t.cardImageCaption}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-lg font-semibold">{t.cardTitle}</div>
                <div className="text-sm text-white/60">{t.cardSubtitle}</div>
              </div>

              {/* Mini steps kept here */}
              <div className="mt-6 grid gap-3">
                {t.miniSteps.map((step, idx) => (
                  <MiniStep
                    key={idx}
                    n={(idx + 1).toString()}
                    title={step.title}
                    body={step.body}
                  />
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-4">
                <div className="text-sm font-semibold">
                  {t.providersTitle}
                </div>
                <div className="mt-2 text-sm text-white/70">
                  {t.providersBody}
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/education"
                  className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
                >
                  {t.learnCta}
                </Link>
              </div>
            </div>

            <p className="mt-4 text-xs text-white/50 leading-relaxed">
              {t.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-white/60 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>{t.footerLine}</span>
          <span>© {new Date().getFullYear()} Kaishio</span>
        </div>
      </footer>

      {/* INFO OVERLAY – bundles all “busy” information into one place */}
      {showInfo && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 px-4">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-[#050814] p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="absolute right-4 top-4 text-xs text-white/60 hover:text-white"
            >
              {t.infoClose} ✕
            </button>

            <h2 className="text-xl sm:text-2xl font-semibold">
              {t.infoTitle}
            </h2>
            <p className="mt-3 text-sm text-white/75">
              {t.infoIntro}
            </p>

            {/* FX ticker inside overlay */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm">
              <div className="text-[11px] uppercase tracking-wide text-white/55">
                {t.fxTickerLabel}
              </div>
              {fxError ? (
                <span className="text-xs text-red-200">{t.fxTickerError}</span>
              ) : fxLoading || !fxSamples ? (
                <span className="text-xs text-white/60">
                  {t.fxTickerLoading}
                </span>
              ) : (
                <div className="flex flex-wrap gap-2 text-xs mt-1">
                  {fxSamples.map((item) => (
                    <span
                      key={item.pair}
                      className="rounded-full bg-white/10 px-3 py-1 text-white/85"
                    >
                      {item.pair}{" "}
                      <span className="font-semibold">
                        {item.rate.toFixed(2)}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Trust row */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {t.trust.map((item, idx) => (
                <TrustCard key={idx} title={item.title} body={item.body} />
              ))}
            </div>

            {/* Why trust section */}
            <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-500/8 px-4 py-4 text-xs sm:text-sm text-white/80">
              <div className="font-semibold mb-2 text-emerald-100">
                {t.whyTitle}
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {t.whyPoints.map((p, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="font-semibold text-white">
                      {p.title}
                    </div>
                    <div className="text-white/75">{p.body}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Providers + steps again for clarity (more compact) */}
            <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5">
              <div className="text-sm font-semibold">
                {t.providersTitle}
              </div>
              <div className="mt-1 text-sm text-white/70">
                {t.providersBody}
              </div>

              <div className="mt-4 grid gap-3">
                {t.miniSteps.map((step, idx) => (
                  <MiniStep
                    key={idx}
                    n={(idx + 1).toString()}
                    title={step.title}
                    body={step.body}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function TrustCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/5 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/70">{body}</div>
    </div>
  );
}

function MiniStep({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/12 bg-white/5 p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black font-bold">
        {n}
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-white/70">{body}</div>
      </div>
    </div>
  );
}
