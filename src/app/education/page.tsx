// src/app/education/page.tsx
"use client";

import { useLanguage, type Language } from "@/contexts/LanguageContext";
import ProviderTransparency from "@/components/education/ProviderTransparency";

type Section = {
  title: string;
  body: string;
  bullets?: string[];
};

type EducationCopy = {
  pageTitle: string;
  intro: string;
  sections: Section[];
  noteTitle: string;
  noteBody: string;
};

const EDUCATION_COPY: Record<Language, EducationCopy> = {
  en: {
    pageTitle: "How to think about sending money abroad (US → Latin America)",
    intro:
      "Kaishio is not a bank and doesn’t move your money. Our goal is to help you see the real cost of different providers before you hit “Send”. Below is a quick guide to how international transfers really work, and how to read what providers show you.",
    sections: [
      {
        title: "1. The real price is not just the fee",
        body:
          "Most people look only at the “fee” line, but the most expensive part is often hidden inside the exchange rate (FX). A provider can show a low fee and still be expensive if the FX rate is bad.",
        bullets: [
          "You pay: USD. Your family receives: local currency (BRL, MXN, COP, etc.).",
          "There is a mid-market rate (what banks trade at) and the provider’s rate.",
          "The difference between those rates is called the FX spread — that is part of the cost.",
        ],
      },
      {
        title: "2. Why some local / regional players are cheaper",
        body:
          "Global brands are convenient and trusted, but they are not always the cheapest for a specific corridor. In many Latin American countries, local fintechs or regional remittance companies can offer better FX and lower overall cost, especially for typical amounts like 200–800 USD.",
        bullets: [
          "Local providers may connect directly to local banks or wallets and reduce intermediaries.",
          "They sometimes focus on a single corridor (for example US → Mexico) and win on price.",
          "Downside: some are new or less known, so safety and clarity matter a lot.",
        ],
      },
      {
        title: "3. Speed vs. cost: what “instant” really means",
        body:
          "Faster is not always better if it means you lose a lot in FX. Many providers offer a slower “economy” option and a faster “express” option with different spreads. Kaishio lets you choose what you care about most: more money delivered, speed, or a balance of both.",
        bullets: [
          "Instant or “minutes” transfers often use card rails and can have higher spreads.",
          "Bank transfers may take hours or a day but can be cheaper overall.",
          "Weekends and holidays can change FX costs and delivery estimates.",
        ],
      },
      {
        title: "4. How to read a provider’s screen without getting lost",
        body:
          "Every app phrases things differently, but the core questions are always the same. If you can answer these, you understand the offer:",
        bullets: [
          "How much do I send in USD? How much does my family receive in local currency?",
          "What FX rate are they using? (Compare to the mid-market rate on Google, Wise, etc.)",
          "Is the fee separate, or already baked into the rate?",
          "How long will it take if everything goes well? What are the limits or extra checks?",
        ],
      },
      {
        title: "5. What Kaishio tries to do differently",
        body:
          "We don’t want to be just another list of the usual names. The idea is to act like a research assistant: compare a mix of global brands and strong regional players, show an estimate of how much your family would receive, and be explicit about why a given option is ranked first.",
        bullets: [
          "We model: fees, FX spread, delivery time and an internal trust score.",
          "We plan to gradually add high-quality local providers per country, not just the big five.",
          "Affiliate links (when they exist) will not decide the ranking order.",
        ],
      },
    ],
    noteTitle: "This page is not financial advice",
    noteBody:
      "Kaishio is an informational tool. It does not provide financial, legal, or tax advice. Always double-check the final numbers on the provider’s own website or app before sending money, and choose the option that best matches your risk tolerance, urgency, and the needs of the person receiving the funds.",
  },
  pt: {
    pageTitle: "Como pensar em enviar dinheiro para fora (EUA → América Latina)",
    intro:
      "O Kaishio não é banco e não movimenta o seu dinheiro. Nosso objetivo é ajudar você a enxergar o custo real dos provedores antes de tocar em “Enviar”. Abaixo está um guia rápido de como as remessas funcionam na prática e como interpretar o que cada app mostra.",
    sections: [
      {
        title: "1. O preço real não é só a taxa",
        body:
          "Muita gente olha apenas a linha da “tarifa”, mas a parte mais cara costuma ficar escondida dentro do câmbio. Um provedor pode mostrar taxa baixa e, mesmo assim, ser caro se o câmbio for ruim.",
        bullets: [
          "Você paga em USD. Quem recebe ganha na moeda local (BRL, MXN, COP etc.).",
          "Existe a taxa média de mercado (câmbio comercial) e a taxa do provedor.",
          "A diferença entre essas taxas é o spread do câmbio — isso também é custo.",
        ],
      },
      {
        title: "2. Por que alguns players locais / regionais são mais baratos",
        body:
          "Marcas globais são convenientes e confiáveis, mas nem sempre são as mais baratas em um corredor específico. Em muitos países da América Latina, fintechs locais ou empresas regionais de remessas conseguem oferecer câmbio melhor e custo total menor, especialmente para valores típicos de 200–800 USD.",
        bullets: [
          "Provedores locais podem se conectar direto a bancos ou carteiras locais, reduzindo intermediários.",
          "Muitas vezes focam em um único corredor (por exemplo EUA → México) e ganham no preço.",
          "Por outro lado, alguns são novos ou pouco conhecidos — segurança e clareza importam muito.",
        ],
      },
      {
        title: "3. Velocidade vs. custo: o que significa “instantâneo”",
        body:
          "Ser mais rápido nem sempre é melhor se isso significar perder muito no câmbio. Muitos provedores oferecem uma opção “econômica”, mais lenta, e outra “express”, mais rápida, com spreads diferentes. O Kaishio deixa você escolher o que pesa mais: mais dinheiro entregue, velocidade ou um equilíbrio dos dois.",
        bullets: [
          "Transferências instantâneas ou “em minutos” costumam usar cartão e podem ter spreads maiores.",
          "Transferências bancárias podem levar horas ou um dia, mas sair mais baratas no total.",
          "Fins de semana e feriados mudam o custo de câmbio e o prazo de entrega.",
        ],
      },
      {
        title: "4. Como ler a tela de um provedor sem se perder",
        body:
          "Cada app escreve de um jeito, mas as perguntas principais são sempre as mesmas. Se você consegue responder a isso, você entendeu a oferta:",
        bullets: [
          "Quanto eu envio em USD? Quanto a pessoa recebe na moeda local?",
          "Qual taxa de câmbio está sendo usada? (Compare com a taxa média no Google, Wise etc.)",
          "A taxa está separada ou já embutida no câmbio?",
          "Quanto tempo leva se tudo der certo? Quais são os limites ou checagens extras?",
        ],
      },
      {
        title: "5. O que o Kaishio tenta fazer de diferente",
        body:
          "Não queremos ser só mais uma lista com os mesmos nomes de sempre. A ideia é funcionar como um assistente de pesquisa: comparar uma mistura de marcas globais e bons players regionais, mostrar uma estimativa do quanto chega para quem recebe e ser claro sobre por que uma opção aparece em primeiro lugar.",
        bullets: [
          "Modelamos: taxas, spread de câmbio, tempo de entrega e uma pontuação interna de confiança.",
          "A ideia é, aos poucos, incluir bons provedores locais por país, não só os cinco maiores.",
          "Links de afiliado (quando existirem) não vão decidir a ordem do ranking.",
        ],
      },
    ],
    noteTitle: "Este conteúdo não é aconselhamento financeiro",
    noteBody:
      "O Kaishio é uma ferramenta informativa. Não oferece aconselhamento financeiro, jurídico ou fiscal. Sempre confira os valores finais no próprio site ou app do provedor antes de enviar dinheiro e escolha a opção que melhor combina com o seu perfil de risco, a urgência e a necessidade de quem vai receber.",
  },
  es: {
    pageTitle: "Cómo pensar en enviar dinero al extranjero (EE. UU. → América Latina)",
    intro:
      "Kaishio no es un banco y no mueve tu dinero. Nuestro objetivo es ayudarte a ver el costo real de los proveedores antes de tocar “Enviar”. A continuación tienes una guía rápida de cómo funcionan realmente las remesas y cómo leer lo que muestra cada app.",
    sections: [
      {
        title: "1. El precio real no es solo la comisión",
        body:
          "Mucha gente mira solamente la línea de “fee”, pero la parte más cara suele estar escondida en el tipo de cambio. Un proveedor puede mostrar una comisión baja y aun así ser caro si la tasa de cambio es mala.",
        bullets: [
          "Tú pagas en USD. Tu familia recibe en moneda local (BRL, MXN, COP, etc.).",
          "Existe una tasa media de mercado (mid-market) y la tasa que usa el proveedor.",
          "La diferencia entre esas tasas se llama spread del tipo de cambio — y también es costo.",
        ],
      },
      {
        title: "2. Por qué algunos proveedores locales / regionales son más baratos",
        body:
          "Las marcas globales son convenientes y confiables, pero no siempre son las más baratas para un corredor específico. En muchos países de América Latina, las fintech locales o empresas regionales de remesas pueden ofrecer mejor tipo de cambio y menor costo total, sobre todo para montos típicos de 200–800 USD.",
        bullets: [
          "Los proveedores locales pueden conectarse directamente con bancos o billeteras locales.",
          "A veces se especializan en un solo corredor (por ejemplo EE. UU. → México) y ganan en precio.",
          "La desventaja es que algunos son nuevos o poco conocidos, así que la seguridad importa mucho.",
        ],
      },
      {
        title: "3. Velocidad vs. costo: qué significa “instantáneo”",
        body:
          "Más rápido no siempre es mejor si implica perder mucho en el tipo de cambio. Muchos proveedores ofrecen una opción “económica”, más lenta, y otra “exprés”, más rápida, con spreads diferentes. Kaishio te deja elegir qué te importa más: más dinero entregado, velocidad o un equilibrio de ambas cosas.",
        bullets: [
          "Las transferencias instantáneas o “en minutos” suelen usar tarjetas y pueden tener spreads más altos.",
          "Las transferencias bancarias pueden tardar horas o un día, pero ser más baratas en total.",
          "Los fines de semana y feriados pueden cambiar el costo del cambio y los plazos de entrega.",
        ],
      },
      {
        title: "4. Cómo leer la pantalla de un proveedor sin perderse",
        body:
          "Cada app lo presenta de forma distinta, pero las preguntas clave son siempre las mismas. Si puedes responder a esto, entendiste la oferta:",
        bullets: [
          "¿Cuánto envío en USD? ¿Cuánto recibe la otra persona en moneda local?",
          "¿Qué tipo de cambio está usando el proveedor? (Compáralo con la tasa media en Google, Wise, etc.)",
          "¿La comisión está separada o ya va incluida en la tasa de cambio?",
          "¿Cuánto tiempo tardará si todo sale bien? ¿Qué límites o verificaciones extra existen?",
        ],
      },
      {
        title: "5. Qué intenta hacer Kaishio de forma diferente",
        body:
          "No queremos ser solo otra lista con los mismos nombres de siempre. La idea es actuar como un asistente de investigación: comparar una mezcla de marcas globales y buenos actores regionales, mostrar una estimación de cuánto recibirá tu familia y explicar por qué una opción aparece como la primera.",
        bullets: [
          "Modelamos: comisiones, spread de cambio, tiempo de entrega y una puntuación interna de confianza.",
          "La idea es ir añadiendo proveedores locales de calidad por país, no solo los cinco más grandes.",
          "Los enlaces de afiliado (cuando existan) no definirán el orden del ranking.",
        ],
      },
    ],
    noteTitle: "Esta página no es asesoría financiera",
    noteBody:
      "Kaishio es una herramienta informativa. No ofrece asesoría financiera, legal ni fiscal. Siempre verifica los valores finales en la web o app del proveedor antes de enviar dinero y elige la opción que mejor se ajuste a tu tolerancia al riesgo, urgencia y a las necesidades de la persona que recibe.",
  },
};

export default function EducationPage() {
  const { lang } = useLanguage();
  const t = EDUCATION_COPY[lang];

  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {t.pageTitle}
        </h1>
        <p className="mt-3 text-white/75 text-base sm:text-lg leading-relaxed">
          {t.intro}
        </p>

        <div className="mt-8 space-y-6">
          {t.sections.map((section, idx) => (
            <section
              key={idx}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                {section.title}
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                {section.body}
              </p>
              {section.bullets && (
                <ul className="mt-3 list-disc list-inside text-sm text-white/75 space-y-1.5">
                  {section.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Transparency block */}
        <ProviderTransparency />

        {/* Note */}
        <section className="mt-8 rounded-3xl border border-white/15 bg-black/30 p-5 text-xs sm:text-sm text-white/75 leading-relaxed">
          <h2 className="font-semibold mb-1">{t.noteTitle}</h2>
          <p>{t.noteBody}</p>
        </section>
      </div>
    </main>
  );
}
