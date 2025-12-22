import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <div className="flex flex-col items-center text-center gap-6">
          <Image
            src="/brand/kaishio-logo.png"
            alt="Kaishio"
            width={220}
            height={220}
            priority
          />

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Kaishio
          </h1>

          <p className="text-slate-700 text-lg">
            Seu consultor independente para comparar opções de envio de dinheiro ao Brasil.
          </p>

          <div className="rounded-xl border border-slate-200 bg-white p-6 text-left w-full shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              O que é o Kaishio?
            </h2>

            <p className="mt-2 text-slate-700">
              O Kaishio é uma ferramenta de pesquisa e comparação. Nós analisamos diferentes
              provedores (ex.: Wise, Remitly, Xoom, PayPal, Western Union, MoneyGram) para
              ajudar você a encontrar a opção com melhor custo-benefício — considerando taxas,
              câmbio (spread) e velocidade.
            </p>

            <h3 className="mt-5 text-base font-semibold text-slate-900">
              Importante (Transparência e Segurança)
            </h3>

            <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-2">
              <li>
                <span className="font-semibold">Não somos uma plataforma de envio.</span> O Kaishio
                não transfere, não recebe e não guarda dinheiro.
              </li>
              <li>
                <span className="font-semibold">As transações acontecem fora do Kaishio</span>, diretamente
                no site/app do provedor escolhido por você.
              </li>
              <li>
                Mostramos <span className="font-semibold">estimativas</span> para facilitar sua decisão.
                O valor final é confirmado no checkout do provedor.
              </li>
              <li>
                Podemos usar <span className="font-semibold">links de afiliados</span>. Isso não muda nossa
                missão: ajudar você a economizar com comparações independentes e claras.
              </li>
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/compare"
                className="inline-flex justify-center rounded-lg bg-slate-900 px-5 py-3 text-white font-medium hover:bg-slate-800"
              >
                Começar a comparar
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex justify-center rounded-lg border border-slate-300 px-5 py-3 text-slate-800 font-medium hover:bg-slate-100"
              >
                Como funciona
              </Link>
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-xl">
            Aviso: O Kaishio é apenas informativo e não oferece aconselhamento financeiro, legal ou fiscal.
            Verifique sempre as condições do provedor e suas obrigações locais.
          </p>
        </div>
      </div>
    </main>
  );
}

