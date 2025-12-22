import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070A12] text-white overflow-hidden relative">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-40 -left-24 h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-[520px] w-[520px] rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,rgba(255,255,255,0)_55%)]" />
      </div>

      {/* Hero (NO PAGE HEADER — layout owns header globally) */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Comparador independente • EUA → Brasil
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">
              Compare o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-blue-300 to-amber-200">
                custo real
              </span>{" "}
              antes de enviar dinheiro ao Brasil.
            </h1>

            <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-xl">
              Kaishio é um{" "}
              <span className="font-semibold text-white">assistente de pesquisa</span>. Nós comparamos
              provedores (taxas + câmbio/spread + velocidade) para você escolher com clareza — e economizar.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/compare"
                className="inline-flex justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
              >
                Comparar agora
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Entender em 30 segundos
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <TrustCard title="Sem pegadinhas" body="Mostramos estimativas e explicamos o spread." />
              <TrustCard title="Sem mover dinheiro" body="Você finaliza no app/site do provedor." />
              <TrustCard title="Independente" body="Comparação clara (com links afiliados quando houver)." />
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur">
              <div className="flex items-center gap-4">
                {/* Logo badge in card — keep it here IF you want, but it’s not the header */}
                <div className="h-20 w-20 rounded-full bg-white ring-1 ring-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] flex items-center justify-center overflow-hidden">
                  {/* NOTE: use <img> to avoid next/image config headaches in app router */}
                  <img
                    src="/brand/kaishio-logo.png"
                    alt="Kaishio"
                    className="h-[120px] w-[120px] object-cover scale-[1.55]"
                  />
                </div>

                <div>
                  <div className="text-lg font-semibold">Dinheiro sem fronteiras</div>
                  <div className="text-sm text-white/60">Compare • escolha • envie com confiança</div>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <MiniStep n="1" title="Digite o valor em USD" body="Você informa quanto quer enviar." />
                <MiniStep
                  n="2"
                  title="Veja custo total e BRL estimado"
                  body="Taxas + câmbio (spread) + velocidade."
                />
                <MiniStep
                  n="3"
                  title="Clique e finalize no provedor"
                  body="A transação acontece fora do Kaishio."
                />
              </div>

              <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-4">
                <div className="text-sm font-semibold">Provedores (fase inicial)</div>
                <div className="mt-2 text-sm text-white/70">
                  Wise • Remitly • Xoom • PayPal • Western Union • MoneyGram
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/education"
                  className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
                >
                  Aprender antes de enviar
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
                >
                  Ir para o comparador
                </Link>
              </div>
            </div>

            <p className="mt-4 text-xs text-white/50 leading-relaxed">
              Aviso: Kaishio é informativo e não oferece aconselhamento financeiro, legal ou fiscal. Valores
              finais podem variar por promoções, método e horário (ex.: fim de semana).
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-white/60 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>
            Kaishio não envia, não recebe e não armazena dinheiro. Transações ocorrem no provedor escolhido.
          </span>
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

function MiniStep({ n, title, body }: { n: string; title: string; body: string }) {
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
