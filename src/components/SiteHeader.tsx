import Image from "next/image";
import Link from "next/link";

type Props = {
  active?: "home" | "education" | "how" | "compare";
};

export default function SiteHeader({ active }: Props) {
  return (
    <header className="relative z-10 mx-auto max-w-6xl px-6 pt-8">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          {/* Bigger logo badge (edit sizes here once) */}
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white ring-1 ring-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] flex items-center justify-center overflow-hidden">
            <Image
              src="/brand/kaishio-logo.png"
              alt="Kaishio"
              width={180}
              height={180}
              className="object-cover scale-[1.55]"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-2xl sm:text-3xl font-semibold tracking-wide group-hover:opacity-95">
              Kaishio
            </div>
            <div className="text-sm sm:text-base text-white/70 -mt-0.5">
              Dinheiro sem fronteiras
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink href="/education" label="Educação" active={active === "education"} />
          <NavLink href="/how-it-works" label="Como funciona" active={active === "how"} />
          <Link
            href="/compare"
            className="inline-flex rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
          >
            Começar
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "hidden sm:inline-flex rounded-full px-4 py-2 text-sm transition",
        active ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
