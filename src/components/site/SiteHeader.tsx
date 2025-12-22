import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060812]/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14">
            <Image
              src="/brand/kaishio-logo.png"
              alt="Kaishio"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="text-xl sm:text-2xl font-semibold tracking-wide">Kaishio</div>
            <div className="text-xs sm:text-sm text-white/65 -mt-0.5">Dinheiro sem fronteiras</div>
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
