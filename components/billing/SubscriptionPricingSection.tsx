import Link from "next/link";
import { BadgeCheck, Check, CreditCard, Crown, Sparkles } from "lucide-react";
import { startSubscriptionCheckout } from "@/app/actions/billing";
import { pricingPackages } from "@/data/packages";
import { hasStripePrice } from "@/lib/billing";
import { getLanguageLabel } from "@/lib/languageUtils";
import type { AppUserRole } from "@/types/next-auth";

type SubscriptionPricingSectionProps = {
  checkoutState?: "success" | "cancelled";
  tenant:
    | {
        name: string;
        packageType: string;
        subscriptionStatus: string;
        subscriptionEndsAt: Date | null;
      }
    | null;
  viewerRole: AppUserRole | null;
};

function formatSubscriptionEnd(date: Date | null) {
  return date
    ? new Intl.DateTimeFormat("tr-TR", {
        dateStyle: "long"
      }).format(date)
    : "Odeme sonrasi olusur";
}

function getStatusLabel(status: string | undefined) {
  switch (status) {
    case "ACTIVE":
      return "Aktif";
    case "PAST_DUE":
      return "Odeme bekliyor";
    case "PAUSED":
      return "Duraklatildi";
    case "CANCELED":
      return "Iptal edildi";
    default:
      return "Deneme";
  }
}

export function SubscriptionPricingSection({
  checkoutState,
  tenant,
  viewerRole
}: SubscriptionPricingSectionProps) {
  const canCheckout = Boolean(tenant && viewerRole && viewerRole !== "SUPER_ADMIN");

  return (
    <section className="bg-porcelain py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-ember">SaaS abonelik</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-6xl">
              Isletmen icin paketi sec, QR menuyu aktif tut.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-graphite/76">
              Odeme Stripe Checkout ile tamamlanir. Basarili abonelik webhook ile Tenant kaydina
              islenir ve menu erisimi abonelik durumuna gore korunur.
            </p>
          </div>

          <aside className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            {tenant ? (
              <>
                <div className="flex items-center gap-2 text-sm font-black text-ink">
                  <BadgeCheck className="h-4 w-4 text-sage" />
                  {tenant.name}
                </div>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-graphite/65">Durum</dt>
                    <dd className="rounded-md bg-linen px-2.5 py-1 font-black text-ember">
                      {getStatusLabel(tenant.subscriptionStatus)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-graphite/65">Paket</dt>
                    <dd className="font-black text-ink">{tenant.packageType}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-graphite/65">Donem sonu</dt>
                    <dd className="text-right font-bold text-ink">
                      {formatSubscriptionEnd(tenant.subscriptionEndsAt)}
                    </dd>
                  </div>
                </dl>
              </>
            ) : (
              <>
                <p className="text-sm font-black text-ink">Abonelik secimi icin giris gerekir.</p>
                <p className="mt-2 text-sm leading-6 text-graphite/68">
                  Giris yapan isletme kullanicisi kendi Tenant paketi icin odeme akisini baslatir.
                </p>
                <Link
                  href="/login?callbackUrl=/pricing"
                  className="mt-4 inline-flex rounded-md bg-ink px-4 py-2 text-sm font-black text-white transition hover:bg-ember"
                >
                  Giris yap
                </Link>
              </>
            )}
          </aside>
        </div>

        {checkoutState === "success" ? (
          <div className="mt-6 rounded-lg border border-sage/25 bg-sage/10 px-4 py-3 text-sm font-bold text-ink">
            Odeme tamamlandi. Stripe webhook abonelik durumunu isledikten sonra Tenant paketi
            aktif gorunecek.
          </div>
        ) : null}

        {checkoutState === "cancelled" ? (
          <div className="mt-6 rounded-lg border border-saffron/50 bg-saffron/15 px-4 py-3 text-sm font-bold text-ink">
            Odeme akisi iptal edildi. Paket secimini yeniden baslatabilirsin.
          </div>
        ) : null}

        {viewerRole === "SUPER_ADMIN" ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-ink/10 bg-white px-4 py-3 text-sm font-bold text-graphite shadow-soft">
            <Crown className="h-4 w-4 text-ember" />
            Super admin hesaplari Tenant abonelik checkout akisini baslatmaz.
          </div>
        ) : null}

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {pricingPackages.map((plan) => {
            const checkoutReady = hasStripePrice(plan.id);

            return (
              <article
                key={plan.id}
                className={`relative rounded-lg border p-6 shadow-soft ${
                  plan.highlight ? "border-saffron bg-ink text-white" : "border-ink/10 bg-white text-ink"
                }`}
              >
                {plan.highlight ? (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-saffron px-3 py-2 text-xs font-black text-ink">
                    <Sparkles className="h-4 w-4" />
                    En cok satilabilir
                  </div>
                ) : null}
                <h2 className="text-xl font-black">{plan.name}</h2>
                <p className={`mt-2 text-sm leading-6 ${plan.highlight ? "text-white/72" : "text-graphite/70"}`}>
                  {plan.description}
                </p>
                <p className="mt-6 text-3xl font-black">{plan.price}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {plan.activeLanguages.slice(0, 5).map((language) => (
                    <span
                      key={language}
                      className={`rounded-md px-2.5 py-1 text-xs font-bold ${
                        plan.highlight ? "bg-white/12 text-white" : "bg-porcelain text-graphite"
                      }`}
                    >
                      {getLanguageLabel(language)}
                    </span>
                  ))}
                  {plan.activeLanguages.length > 5 ? (
                    <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${plan.highlight ? "bg-white/12" : "bg-porcelain"}`}>
                      +{plan.activeLanguages.length - 5}
                    </span>
                  ) : null}
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? "text-saffron" : "text-sage"}`} />
                      <span className={plan.highlight ? "text-white/82" : "text-graphite/78"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {canCheckout && checkoutReady ? (
                    <form action={startSubscriptionCheckout}>
                      <input type="hidden" name="packageType" value={plan.id} />
                      <button
                        type="submit"
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-black transition ${
                          plan.highlight
                            ? "bg-saffron text-ink hover:bg-white"
                            : "bg-ink text-white hover:bg-ember"
                        }`}
                      >
                        <CreditCard className="h-4 w-4" />
                        Paketi sec
                      </button>
                    </form>
                  ) : (
                    <div
                      className={`rounded-md px-3 py-2 text-sm font-bold ${
                        plan.highlight ? "bg-white/12 text-white/74" : "bg-porcelain text-graphite/65"
                      }`}
                    >
                      {checkoutReady ? "Giris sonrasi odeme acilir." : "Stripe fiyat ID bekleniyor."}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
