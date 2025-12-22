import Link from "next/link";

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-2xl font-semibold text-slate-900">Como funciona</h1>

        <ol className="mt-4 list-decimal pl-5 text-slate-700 space-y-2">
          <li>Você informa o valor em USD que deseja enviar.</li>
          <li>O Kaishio estima taxas e câmbio (spread) por provedor.</li>
          <li>Você escolhe a melhor opção e clica para ir ao provedor.</li>
          <li>A transação é concluída diretamente no site/app do provedor.</li>
        </ol>

        <p className="mt-6 text-sm text-slate-600">
          Observação: as taxas e o câmbio variam por método, promoções e horário (ex.: fim de semana).
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-slate-800 hover:bg-slate-100"
        >
          Voltar
        </Link>
      </div>
    </main>
  );
}
