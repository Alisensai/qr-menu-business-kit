import Link from "next/link";
import { BarChart3, Home, MessageSquareReply, Store, Tags } from "lucide-react";
import type { ReactNode } from "react";
import { MockDataNotice } from "@/components/admin/MockDataNotice";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/restaurants", label: "Restoranlar", icon: Store },
  { href: "/admin/reviews", label: "Yorum Cevapları", icon: MessageSquareReply },
  { href: "/pricing", label: "Paketler", icon: Tags },
  { href: "/", label: "Site", icon: Home }
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-porcelain">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-ink/10 bg-white p-5 lg:block">
        <Link href="/admin" className="block">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">Admin</p>
          <h1 className="mt-2 text-xl font-black text-ink">QR Menu Kit</h1>
        </Link>
        <nav className="mt-8 grid gap-2">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-3 rounded-md px-3 py-3 text-sm font-bold text-graphite transition hover:bg-porcelain hover:text-ember"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <header className="sticky top-0 z-20 border-b border-ink/10 bg-white/92 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-porcelain px-3 py-2 text-sm font-bold text-graphite"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <MockDataNotice />
          {children}
        </div>
      </main>
    </div>
  );
}
