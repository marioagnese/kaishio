import Link from "next/link";

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Educação</h1>
            <p className="mt-2 text-white/70">
              Entenda como funciona enviar dinheiro do exterior para o Brasil — e como evitar custos invisíveis.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
            >
              Voltar
            </Link>
            <Link
              href="/compare"
              className="rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90"
            >
              Comparar
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card title="1) Principais formas de envio">
            <ul className="list-disc pl-5 space-y-2 text-white/75">
              <li>
                <span className="font-semibold text-white">Bancos tradicionais</span>: geralmente têm
                custos adicionais (por exemplo: taxas, câmbio, SWIFT e possíveis intermediários) e podem ser
                mais lentos/burocráticos.
              </li>
              <li>
                <span className="font-semibold text-white">Plataformas digitais</span>: costumam ser mais
                práticas, com melhor experiência e foco em transparência de tarifas (varia por empresa).
              </li>
            </ul>
          </Card>

          <Card title="2) O que realmente encarece (custo real)">
            <ul className="list-disc pl-5 space-y-2 text-white/75">
              <li><span className="font-semibold text-white">Taxas</span> (fixas e/ou percentuais).</li>
              <li>
                <span className="font-semibold text-white">Câmbio / spread</span> (a diferença entre o
                câmbio “do mercado” e o câmbio aplicado).
              </li>
              <li><span className="font-semibold text-white">Tempo</span> (prazo e janelas bancárias).</li>
            </ul>
          </Card>

          <Card title="3) PIX internacional? (atenção)">
            <p className="text-white/75">
              Em geral, o PIX funciona entre contas brasileiras. Existem casos em que plataformas permitem
              usar PIX como forma de pagamento de uma transferência, mas isso não significa “PIX internacional”.
            </p>
          </Card>

          <Card title="4) Limites e documentação">
            <p className="text-white/75">
              Há limites para transferências sem documentação adicional (ex.: até cerca de USD 10 mil) e,
              acima disso, pode ser necessário comprovar origem/finalidade e fornecer documentos (por exemplo,
              declaração de IR), dependendo do provedor e do caso.
            </p>
          </Card>

          <Card title="5) Imposto de Renda (no Brasil)">
            <p className="text-white/75">
              Quem declara IR normalmente deve informar valores recebidos do exterior, quando aplicável, seguindo
              as regras da Receita para rendimentos/entradas do exterior.
            </p>
          </Card>

          <Card title="Checklist Kaishio antes de enviar">
            <ul className="list-disc pl-5 space-y-2 text-white/75">
              <li>Qual valor em USD e objetivo (ajuda familiar, salário, etc.)?</li>
              <li>Quanto o destinatário precisa receber em BRL?</li>
              <li>Qual o custo total (taxas + spread) e prazo real?</li>
              <li>Recebimento via PIX/conta? Há limites?</li>
              <li>Para valores altos: quais documentos podem ser solicitados?</li>
            </ul>
          </Card>
        </div>

        <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Fonte e transparência</h2>
          <p className="mt-2 text-white/70">
            Este conteúdo é um resumo educativo baseado em um guia público sobre enviar dinheiro do exterior
            para o Brasil. Leia o material completo na fonte original.
          </p>

          <a
            className="mt-4 inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10"
            href="https://www.remessaonline.com.br/blog/remessa-de-dinheiro-do-exterior-para-o-brasil/"
            target="_blank"
            rel="noreferrer"
          >
            Abrir artigo original
          </a>
        </div>

        <p className="mt-6 text-xs text-white/50">
          Aviso: Kaishio é informativo e não oferece aconselhamento financeiro, legal ou fiscal.
        </p>
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-2 text-white/70">{children}</div>
    </div>
  );
}
