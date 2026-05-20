import { Languages, PackageCheck, Store, Utensils, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { pricingPackages } from "@/data/packages";
import { menuItems, restaurants } from "@/data/restaurants";
import { getMissingTranslationCount } from "@/lib/translationStatus";

const stats = [
  {
    label: "Toplam restoran",
    value: restaurants.length,
    icon: Store
  },
  {
    label: "Aktif restoran",
    value: restaurants.filter((item) => item.status === "active").length,
    icon: PackageCheck
  },
  {
    label: "Toplam ürün",
    value: menuItems.length,
    icon: Utensils
  },
  {
    label: "Eksik çeviri",
    value: restaurants.reduce((total, restaurant) => total + getMissingTranslationCount(restaurant), 0),
    icon: AlertTriangle
  }
];

export function AdminDashboard() {
  const activeLanguages = Array.from(new Set(restaurants.flatMap((restaurant) => restaurant.activeLanguages)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">Dashboard</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-5xl">İşletme paket merkezi</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite/70">
            Restoranları, aktif dilleri, paket dağılımını, QR linklerini ve çeviri eksiklerini tek yerden takip edin.
          </p>
        </div>
        <Link href="/admin/restaurants" className="inline-flex w-fit rounded-md bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-ember">
          Restoranları yönet
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <stat.icon className="h-5 w-5 text-ember" />
            <p className="mt-5 text-3xl font-black text-ink">{stat.value}</p>
            <p className="mt-1 text-sm font-semibold text-graphite/65">{stat.label}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-ember" />
            <h2 className="text-lg font-black text-ink">Aktif diller</h2>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeLanguages.map((language) => (
              <span key={language} className="rounded-md bg-porcelain px-3 py-2 text-sm font-black text-graphite">
                {language.toUpperCase()}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-black text-ink">Paket dağılımı</h2>
          <div className="mt-4 grid gap-3">
            {pricingPackages
              .filter((plan) => plan.id !== "maintenance")
              .map((plan) => {
                const count = restaurants.filter((restaurant) => restaurant.packageType === plan.id).length;
                return (
                  <div key={plan.id} className="flex items-center justify-between rounded-md bg-porcelain px-3 py-3">
                    <span className="text-sm font-bold text-graphite">{plan.name}</span>
                    <span className="text-sm font-black text-ember">{count}</span>
                  </div>
                );
              })}
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-black text-ink">Son eklenen restoranlar</h2>
        <div className="mt-4 grid gap-3">
          {[...restaurants]
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/admin/restaurants/${restaurant.slug}`}
                className="grid gap-2 rounded-md bg-porcelain px-4 py-3 transition hover:bg-linen sm:grid-cols-[1fr_auto_auto]"
              >
                <span className="font-bold text-ink">{restaurant.name}</span>
                <span className="text-sm font-semibold text-graphite/68">{restaurant.location}</span>
                <span className="text-sm font-black text-ember">{restaurant.packageType}</span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
