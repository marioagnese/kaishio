import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#050611] via-[#070A12] to-[#050611]">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold">Como funciona</h1>
        <p className="mt-3 text-white/75 text-lg">
          Simples: você compara no Kaishio e finaliza no provedor.
        </p>

        <div className="mt-10 grid gap-4">
          <Step n="1" title="Digite o valor em USD" body="Você informa quanto quer enviar e seu objetivo." />
          <Step n="2" title="Compare custo real" body="Taxas + spread + prazo. Sem confusão." />
          <Step n="3" title="Finalize com segurança" body="Você clica e conclui no site/app do provedor." />
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/compare"
            className="inline-flex justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
          >
            Ir para o comparador
          </Link>
          <Link
            href="/education"
            className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10 transition"
          >
            Ver educação (mini-lições)
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-white/12 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Transparência</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-white/75">
            <li>Kaishio não envia, não recebe e não armazena dinheiro.</li>
            <li>Mostramos estimativas; o valor final é confirmado pelo provedor.</li>
            <li>Podemos usar links afiliados (quando houver), mas mostramos sempre o que importa: custo real.</li>
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
