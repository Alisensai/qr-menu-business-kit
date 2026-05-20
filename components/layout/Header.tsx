import Link from "next/link";
import { MessageCircle, QrCode } from "lucide-react";

const navItems = [
  { href: "/#services", label: "Hizmetler" },
  { href: "/#demo", label: "Demo" },
  { href: "/pricing", label: "Paketler" }
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/78 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-saffron text-ink">
            <QrCode className="h-5 w-5" />
          </span>
          <span className="text-sm sm:text-base">QR Menu Business Kit</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-white/78 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://wa.me/905320001020?text=QR%20Menu%20Business%20Kit%20i%C3%A7in%20teklif%20almak%20istiyorum."
          className="inline-flex items-center gap-2 rounded-md bg-saffron px-3 py-2 text-sm font-bold text-ink transition hover:bg-white"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Teklif Al</span>
        </a>
      </div>
    </header>
  );
}
