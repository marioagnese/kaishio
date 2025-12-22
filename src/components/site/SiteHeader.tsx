import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060812]/75 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          {/* Logo badge (forces visibility even with padded PNG) */}
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center overflow-hidden">
            <Image
              src="/brand/kaishio-logo.png"
              alt="Kaishio"
              width={72}
              height={72}
              className="object-cover scale-[1.45]"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-2xl sm:text-3xl font-semibold tracking-wide">
              Kaishio
            </div>
            <div className="text-xs sm:text-sm text-white/70">
              Dinheiro sem fronteiras
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
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
            className="inline-flex rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
          >
            Começar
          </Link>
        </nav>
      </div>
    </header>
  );
}
