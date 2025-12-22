import Link from "next/link";

export default function ComparePlaceholder() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-2xl font-semibold text-slate-900">Comparar</h1>
        <p className="mt-2 text-slate-700">
          Em seguida vamos construir aqui o comparador (USD → BRL) com ranking por menor custo total.
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
