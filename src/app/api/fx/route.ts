import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = (searchParams.get("from") || "USD").toUpperCase();
  const to = (searchParams.get("to") || "BRL").toUpperCase();

  try {
    // Frankfurter: latest daily rates
    const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(from)}&symbols=${encodeURIComponent(to)}`;
    const r = await fetch(url, { cache: "no-store" });

    if (!r.ok) {
      return NextResponse.json({ error: "FX provider error" }, { status: 502 });
    }

    const data = await r.json();
    const rate = data?.rates?.[to];

    if (!rate || Number.isNaN(rate)) {
      return NextResponse.json({ error: "Invalid FX response" }, { status: 502 });
    }

    return NextResponse.json({
      rate,
      date: data?.date,
      provider: "Frankfurter",
    });
  } catch {
    return NextResponse.json({ error: "FX fetch failed" }, { status: 500 });
  }
}
