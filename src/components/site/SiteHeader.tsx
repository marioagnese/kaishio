// src/components/site/SiteHeader.tsx
import Image from "next/image";
import Link from "next/link";

type Props = {
  active?: "home" | "education" | "how" | "compare";
};

function navClass(isActive: boolean) {
  return [
    "hidden sm:inline-flex rounded-full px-4 py-2 text-sm transition",
    isActive ? "bg-white/15 text-white" : "text-white/80 hover:text-white hover:bg-white/10",
  ].join(" ");
}

export default function SiteHeader({ active }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-[#060812]/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        {/* BRAND */}
        <Link href="/" className="flex items-center gap-6">
          {/* HUGE LOGO BADGE (edit sizes here ONCE) */}
          <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-white flex items-center justify-center shadow-xl ring-1 ring-black/10 overflow-hidden">
            <Image
              src="/brand/kaishio-logo.png"
              alt="Kaishio"
              width={420}
              height={420}
              className="object-cover scale-[1.35]"
              priority
            />
          </div>

          {/* WORDMARK */}
          <div className="leading-tight">
            <div className="text-3xl sm:text-4xl font-bold tracking-wide">Kaishio</div>
            <div className="text-base sm:text-lg text-white/70">Dinheiro sem fronteiras</div>
          </div>
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-3">
          <Link href="/education" className={navClass(active === "education")}>
            Educação
          </Link>
          <Link href="/how-it-works" className={navClass(active === "how")}>
            Como funciona
          </Link>
          <Link
            href="/compare"
            className="ml-2 inline-flex rounded-full bg-white text-black px-5 py-2 text-sm font-semibold hover:bg-white/90 transition"
          >
            Começar
          </Link>
        </nav>
      </div>
    </header>
  );
}
