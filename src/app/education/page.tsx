"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";

type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

export default function EducationPage() {
  const lessons = useMemo<Lesson[]>(
    () => [
      {
        id: "basics",
        title: "Comece por aqui",
        subtitle: "O que é enviar dinheiro ao Brasil, na prática",
        bullets: [
          "Kaishio não envia dinheiro — a transferência acontece no provedor.",
          "Seu objetivo aqui é escolher com clareza: custo total + tempo + método.",
          "O 'barato' às vezes esconde spread no câmbio. Veja o custo real.",
        ],
      },
      {
        id: "fees",
        title: "Custo real (sem surpresa)",
        subtitle: "Taxas + câmbio (spread) + tempo",
        bullets: [
          "Taxas: fixas e/ou percentuais (dependem do método).",
          "Câmbio/spread: a diferença entre câmbio “do mercado” e o aplicado.",
          "Tempo: prazos e janelas bancárias podem impactar o valor final.",
        ],
      },
      {
        id: "pix",
        title: "PIX internacional existe?",
        subtitle: "Entenda antes de cair em confusão",
        bullets: [
          "PIX é entre contas brasileiras.",
          "Algumas plataformas aceitam PIX como pagamento da operação, mas isso não é “PIX internacional”.",
          "Para o destinatário, geralmente vira PIX/conta no Brasil dependendo do provedor.",
        ],
      },
      {
        id: "limits",
        title: "Limites e documentos",
        subtitle: "Quando pedem comprovação e por quê",
        bullets: [
          "Pode existir limite sem documentação adicional (depende do provedor).",
          "Valores maiores podem exigir origem/finalidade e documentos.",
          "Regras variam por empresa e perfil. Confirme sempre no checkout.",
        ],
      },
      {
        id: "tax",
        title: "Imposto de Renda (Brasil)",
        subtitle: "O básico para não ter dor de cabeça",
        bullets: [
          "Quem declara IR pode precisar informar valores recebidos do exterior, quando aplicável.",
          "Para valores recorrentes/altos, procure orientação contábil se necessário.",
          "Kaishio é educativo — não substitui consultoria fiscal.",
        ],
      },
      {
        id: "checklist",
        title: "Checklist Kaishio",
        subtitle: "5 perguntas antes de enviar",
        bullets: [
          "Quanto em USD e qual o objetivo (ajuda familiar, salário etc.)?",
          "Quanto o destinatário precisa receber em BRL?",
          "Qual custo total (taxas + spread) e prazo real?",
          "Recebimento via PIX/conta? Existem limites?",
          "Para valores altos: quais documentos podem ser solicitados?",
        ],
      },
    ],
    []
  );

  const [openId, setOpenId] = useState<string | null>(null);
  const openLesson = lessons.find((l) => l.id === openId);

  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#050611] via-[#070A12] to-[#050611]">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-semibold">Educação</h1>
          <p className="mt-3 text-white/75 text-lg">
            Mini-lições rápidas (clique em um cartão). Simples, direto e feito para quem mora nos EUA e manda dinheiro ao Brasil.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/compare"
              className="inline-flex justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
            >
              Ir para o comparador
            </Link>
            <a
              href="https://www.remessaonline.com.br/blog/remessa-de-dinheiro-do-exterior-para-o-brasil/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10 transition"
            >
              Ler fonte original
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((l) => (
            <button
              key={l.id}
              onClick={() => setOpenId(l.id)}
              className="text-left rounded-2xl border border-white/12 bg-white/5 p-5 hover:bg-white/10 hover:border-white/20 transition focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <div className="text-base font-semibold">{l.title}</div>
              <div className="mt-2 text-sm text-white/70">{l.subtitle}</div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Abrir <span className="text-white/60">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom helper */}
        <div className="mt-10 rounded-2xl border border-white/12 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Ainda confuso?</h2>
          <p className="mt-2 text-white/75">
            Comece pelo cartão <span className="font-semibold text-white">“Comece por aqui”</span> e depois vá para
            <span className="font-semibold text-white"> “Custo real”</span>.
          </p>
        </div>

        <p className="mt-6 text-xs text-white/50">
          Aviso: Kaishio é informativo e não oferece aconselhamento financeiro, legal ou fiscal.
        </p>
      </div>

      {/* Modal */}
      {openLesson && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setOpenId(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-white/15 bg-[#0B0F1E] p-6 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl font-semibold">{openLesson.title}</div>
                <div className="mt-1 text-white/70">{openLesson.subtitle}</div>
              </div>
              <button
                onClick={() => setOpenId(null)}
                className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                Fechar
              </button>
            </div>

            <ul className="mt-6 space-y-3 text-white/80">
              {openLesson.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/compare"
                className="inline-flex justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
              >
                Comparar agora
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10 transition"
              >
                Ver “Como funciona”
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
