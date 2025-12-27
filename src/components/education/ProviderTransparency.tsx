"use client";

import { useLanguage, type Language } from "@/contexts/LanguageContext";

type TransparencyCopy = {
  title: string;
  intro: string;
  bulletsTitle: string;
  bullets: string[];
  labelsTitle: string;
  labelsBody: string;
  roadmapTitle: string;
  roadmapBody: string;
};

const COPY: Record<Language, TransparencyCopy> = {
  en: {
    title: "How we pick providers (Phase 2)",
    intro:
      "Kaishio is not a bank or a money transfer company. We are a research assistant. Our goal is to help you see the real cost of sending money from the US to Latin America, in a way that is honest and understandable.",
    bulletsTitle: "In Phase 2, we include providers that:",
    bullets: [
      "are regulated or licensed in the countries where they operate (when required);",
      "publish fees and FX rates clearly enough that we can model them for comparison;",
      "have a usable digital experience (web or app) for US-based senders;",
      "are actually used for US → LatAm corridors (not just generic “international” products).",
    ],
    labelsTitle: "Why you won’t see every local brand",
    labelsBody:
      "For each country we mix global players (like Wise / Remitly / Xoom) with a small number of serious local providers. Some local apps don’t publish transparent fees or FX, or they only support domestic payments. Those may still be good for you, but we won’t rank them until we can model them fairly.",
    roadmapTitle: "Roadmap: more providers, still independent",
    roadmapBody:
      "Over time we plan to add more corridors and more providers. If we ever add affiliate links, they will be labeled. Providers will not be able to pay to rank higher. Rankings will always be based on fees, FX spread, and speed for the amount you enter.",
  },
  pt: {
    title: "Como escolhemos os provedores (Fase 2)",
    intro:
      "Kaishio não é banco nem remessa. Somos um assistente de pesquisa. Nosso objetivo é ajudar você a enxergar o custo real de enviar dinheiro dos EUA para a América Latina, de forma honesta e simples.",
    bulletsTitle: "Na Fase 2, incluímos provedores que:",
    bullets: [
      "sejam regulados ou licenciados nos países onde operam (quando exigido);",
      "divulguem taxas e câmbio de forma clara o suficiente para modelarmos a comparação;",
      "tenham experiência digital minimamente boa (site ou app) para quem envia dos EUA;",
      "sejam realmente usados em corredores EUA → América Latina (não só “internacional” genérico).",
    ],
    labelsTitle: "Por que você não verá todas as marcas locais",
    labelsBody:
      "Para cada país misturamos players globais (como Wise / Remitly / Xoom) com um pequeno grupo de provedores locais sérios. Alguns apps locais não divulgam taxas/câmbio com transparência ou só fazem pagamentos domésticos. Eles podem até ser bons para você, mas não vamos ranqueá-los enquanto não pudermos modelá-los de forma justa.",
    roadmapTitle: "Roteiro: mais provedores, ainda independentes",
    roadmapBody:
      "Com o tempo vamos adicionar mais corredores e mais provedores. Se algum dia tivermos links de afiliado, eles serão identificados. Provedor nenhum poderá pagar para subir no ranking. A ordem sempre será baseada em taxas, spread de câmbio e velocidade para o valor que você informar.",
  },
  es: {
    title: "Cómo elegimos los proveedores (Fase 2)",
    intro:
      "Kaishio no es un banco ni una remesadora. Somos un asistente de investigación. Nuestra meta es ayudarte a ver el costo real de enviar dinero desde EE. UU. a América Latina, de forma honesta y fácil de entender.",
    bulletsTitle: "En la Fase 2 incluimos proveedores que:",
    bullets: [
      "estén regulados o licenciados en los países donde operan (cuando se exige);",
      "publiquen comisiones y tipo de cambio con suficiente claridad para poder modelarlos;",
      "ofrezcan una experiencia digital razonable (web o app) para envíos desde EE. UU.;",
      "realmente se usen en los corredores EE. UU. → América Latina (no solo productos “internacionales” genéricos).",
    ],
    labelsTitle: "Por qué no ves todas las marcas locales",
    labelsBody:
      "En cada país mezclamos jugadores globales (Wise / Remitly / Xoom, etc.) con un pequeño grupo de proveedores locales serios. Algunos apps locales no publican comisiones/tipo de cambio con transparencia o solo sirven para pagos domésticos. Pueden ser buenos para ti, pero no los vamos a clasificar hasta poder modelarlos de forma justa.",
    roadmapTitle: "Hoja de ruta: más proveedores, siempre independientes",
    roadmapBody:
      "Con el tiempo queremos añadir más corredores y más proveedores. Si en algún momento usamos enlaces de afiliado, estarán marcados. Ningún proveedor podrá pagar para aparecer más arriba. El ranking siempre se basará en comisiones, spread de tipo de cambio y velocidad para el importe que ingreses.",
  },
};

export default function ProviderTransparency() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
        {t.title}
      </h2>

      <p className="mt-3 text-sm md:text-base text-white/75 leading-relaxed">
        {t.intro}
      </p>

      <h3 className="mt-5 text-sm md:text-base font-semibold">
        {t.bulletsTitle}
      </h3>
      <ul className="mt-2 space-y-1 text-sm text-white/75 list-disc list-inside">
        {t.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <h3 className="mt-5 text-sm md:text-base font-semibold">
        {t.labelsTitle}
      </h3>
      <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed">
        {t.labelsBody}
      </p>

      <h3 className="mt-5 text-sm md:text-base font-semibold">
        {t.roadmapTitle}
      </h3>
      <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed">
        {t.roadmapBody}
      </p>
    </section>
  );
}
