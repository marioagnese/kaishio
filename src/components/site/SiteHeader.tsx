import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#060812]/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        {/* BRAND */}
        <Link href="/" className="flex items-center gap-6">
          {/* BIG LOGO BADGE */}
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white flex items-center justify-center shadow-xl ring-1 ring-black/10">
            <Image
              src="/brand/kaishio-logo.png"
              alt="Kaishio"
              width={220}
              height={220}
              className="object-contain scale-[1.4]"
              priority
            />
          </div>

          {/* WORDMARK */}
          <div className="leading-tight">
            <div className="text-3xl sm:text-4xl font-bold tracking-wide">
              Kaishio
            </div>
            <div className="text-base sm:text-lg text-white/70">
              Dinheiro sem fronteiras
            </div>
          </div>
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-3">
          <Link
            href="/education"
            className="hidden sm:inline-flex rounded-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            Educação
          </Link>
          <Link
            href="/how-it-works"
            className="hidden sm:inline-flex rounded-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
          >
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
