import { Clock3, QrCode } from "lucide-react";

export function SubscriptionExpiredNotice({ restaurantName }: { restaurantName: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#06101f] px-4 py-12 text-[#fff6e6]">
      <section className="w-full max-w-xl rounded-[1.4rem] border border-[#d4aa63]/35 bg-[#0a182b] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.38)] sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-md border border-[#f2cf87]/45 bg-[#f2cf87]/12 text-[#f4d89a]">
            <QrCode className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d4aa63]">QR Menu</p>
            <h1 className="font-display text-2xl font-bold sm:text-3xl">{restaurantName}</h1>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-[#f2cf87]/20 bg-white/[0.06] p-4">
          <div className="flex items-start gap-3">
            <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#f2cf87]" />
            <div>
              <p className="text-lg font-black">Bu isletmenin aboneligi sona ermistir.</p>
              <p className="mt-2 text-sm leading-6 text-[#fff6e6]/72">
                Menu erisimi abonelik yenilendiginde yeniden aktif olur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
