"use client";

import Link from "next/link";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

type HomeCopy = {
  tagPill: string;
  heroPrefix: string;
  heroHighlight: string;
  heroSuffix: string;
  heroParagraphStart: string;
  heroParagraphBold: string;
  heroParagraphEnd: string;
  primaryCta: string;
  secondaryCta: string;
  trust: { title: string; body: string }[];
  cardTitle: string;
  cardSubtitle: string;
  miniSteps: { title: string; body: string }[];
  providersTitle: string;
  providersBody: string;
  learnCta: string;
  compareCta: string;
  disclaimer: string;
  footerLine: string;
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
    primaryCta: "Compare now",
    secondaryCta: "Understand in 30 seconds",
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
    miniSteps: [
      {
        title: "Enter the amount in USD",
        body: "You tell us how much you want to send.",
      },
      {
        title: "See total cost and BRL estimate",
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
    compareCta: "Go to comparer",
    disclaimer:
      "Notice: Kaishio is informational only and does not provide financial, legal, or tax advice. Final values may change due to promotions, payment method, and time (e.g. weekends).",
    footerLine:
      "Kaishio doesn’t send, receive, or hold money. Transfers happen with the provider you choose.",
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
    primaryCta: "Comparar agora",
    secondaryCta: "Entender em 30 segundos",
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
    miniSteps: [
      {
        title: "Digite o valor em USD",
        body: "Você informa quanto quer enviar.",
      },
      {
        title: "Veja custo total e BRL estimado",
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
    compareCta: "Ir para o comparador",
    disclaimer:
      "Aviso: Kaishio é informativo e não oferece aconselhamento financeiro, legal ou fiscal. Valores finais podem variar por promoções, método de pagamento e horário (por exemplo, fim de semana).",
    footerLine:
      "Kaishio não envia, não recebe e não armazena dinheiro. As transações ocorrem no provedor escolhido.",
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
    primaryCta: "Comparar ahora",
    secondaryCta: "Entender en 30 segundos",
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
    miniSteps: [
      {
        title: "Ingresa el monto en USD",
        body: "Indicas cuánto quieres enviar.",
      },
      {
        title: "Ve el costo total y el BRL estimado",
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
    compareCta: "Ir al comparador",
    disclaimer:
      "Aviso: Kaishio es solo informativo y no ofrece asesoría financiera, legal o fiscal. Los valores finales pueden variar según promociones, método de pago y horario (por ejemplo, fines de semana).",
    footerLine:
      "Kaishio no envía, recibe ni almacena dinero. Las transferencias se realizan con el proveedor que elijas.",
  },
};

export default function HomePage() {
  const { lang } = useLanguage();
  const t = HOME_COPY[lang];

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
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left */}
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

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/compare"
                className="inline-flex justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
              >
                {t.primaryCta}
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                {t.secondaryCta}
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {t.trust.map((item, idx) => (
                <TrustCard
                  key={idx}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur">
              <div className="flex items-center gap-4">
                {/* Logo badge inside card */}
                <div className="h-20 w-20 rounded-full bg-white ring-1 ring-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] flex items-center justify-center overflow-hidden">
                  {/* Keeping <img> here as before to avoid next/image config headaches */}
                  <img
                    src="/brand/kaishio-logo.png"
                    alt="Kaishio"
                    className="h-[120px] w-[120px] object-cover scale-[1.55]"
                  />
                </div>

                <div>
                  <div className="text-lg font-semibold">{t.cardTitle}</div>
                  <div className="text-sm text-white/60">
                    {t.cardSubtitle}
                  </div>
                </div>
              </div>

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
                <Link
                  href="/compare"
                  className="inline-flex justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
                >
                  {t.compareCta}
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
