// src/app/how-it-works/page.tsx
"use client";

import Link from "next/link";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

type StepCopy = {
  title: string;
  body: string;
};

type HowCopy = {
  title: string;
  subtitle: string;
  steps: StepCopy[];
  primaryCta: string;
  secondaryCta: string;
  transparencyTitle: string;
  bullets: string[];
};

const HOW_COPY: Record<Language, HowCopy> = {
  en: {
    title: "How it works",
    subtitle: "Simple: you compare on Kaishio and finish on the provider.",
    steps: [
      {
        title: "Enter the amount in USD",
        body: "You tell us how much you want to send and your goal.",
      },
      {
        title: "Compare the real cost",
        body: "Fees + FX spread + speed. No jargon, no confusion.",
      },
      {
        title: "Finish safely with the provider",
        body: "You click through and complete the transfer on the provider’s own app/site.",
      },
    ],
    primaryCta: "Go to comparer",
    secondaryCta: "See education (mini-lessons)",
    transparencyTitle: "Transparency",
    bullets: [
      "Kaishio does not send, receive, or store money.",
      "We show estimates; the final value is confirmed by the provider.",
      "We may use affiliate links (when available), but we always highlight what matters: real cost.",
    ],
  },
  pt: {
    title: "Como funciona",
    subtitle: "Simples: você compara no Kaishio e finaliza no provedor.",
    steps: [
      {
        title: "Digite o valor em USD",
        body: "Você informa quanto quer enviar e seu objetivo.",
      },
      {
        title: "Compare o custo real",
        body: "Taxas + spread + prazo. Sem confusão.",
      },
      {
        title: "Finalize com segurança",
        body: "Você clica e conclui no site/app do provedor.",
      },
    ],
    primaryCta: "Ir para o comparador",
    secondaryCta: "Ver educação (mini-lições)",
    transparencyTitle: "Transparência",
    bullets: [
      "Kaishio não envia, não recebe e não armazena dinheiro.",
      "Mostramos estimativas; o valor final é confirmado pelo provedor.",
      "Podemos usar links afiliados (quando houver), mas mostramos sempre o que importa: custo real.",
    ],
  },
  es: {
    title: "Cómo funciona",
    subtitle:
      "Sencillo: comparas en Kaishio y finalizas con el proveedor.",
    steps: [
      {
        title: "Ingresa el monto en USD",
        body: "Indicas cuánto quieres enviar y con qué objetivo.",
      },
      {
        title: "Compara el costo real",
        body: "Comisiones + spread + plazo. Sin confusión.",
      },
      {
        title: "Finaliza de forma segura",
        body: "Haces clic y terminas la operación en el sitio/app del proveedor.",
      },
    ],
    primaryCta: "Ir al comparador",
    secondaryCta: "Ver educación (mini-lecciones)",
    transparencyTitle: "Transparencia",
    bullets: [
      "Kaishio no envía, recibe ni almacena dinero.",
      "Mostramos estimaciones; el valor final lo confirma el proveedor.",
      "Podemos usar enlaces de afiliado (cuando existan), pero siempre destacamos lo que importa: el costo real.",
    ],
  },
};

export default function HowItWorksPage() {
  const { lang } = useLanguage();
  const t = HOW_COPY[lang];

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#050611] via-[#070A12] to-[#050611]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold">{t.title}</h1>
        <p className="mt-3 text-white/75 text-lg">{t.subtitle}</p>

        <div className="mt-10 grid gap-4">
          {t.steps.map((step, idx) => (
            <Step
              key={idx}
              n={(idx + 1).toString()}
              title={step.title}
              body={step.body}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/compare"
            className="inline-flex justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
          >
            {t.primaryCta}
          </Link>
          <Link
            href="/education"
            className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10 transition"
          >
            {t.secondaryCta}
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-white/12 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">{t.transparencyTitle}</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-white/75">
            {t.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/12 bg-white/5 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-bold">
        {n}
      </div>
      <div>
        <div className="text-base font-semibold">{title}</div>
        <div className="mt-1 text-white/70">{body}</div>
      </div>
    </div>
  );
}
