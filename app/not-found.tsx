import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-porcelain px-4 text-center">
      <div className="max-w-md">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-ember">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink">Sayfa bulunamadı</h1>
        <p className="mt-4 text-sm leading-6 text-graphite/70">
          Bu restoran slug’ı için aktif menü bulunamadı. Admin panelden restoran bilgilerini kontrol edebilirsiniz.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white">
            Ana sayfa
          </Link>
          <Link href="/admin/restaurants" className="rounded-md border border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink">
            Restoranlar
          </Link>
        </div>
      </div>
    </main>
  );
}
