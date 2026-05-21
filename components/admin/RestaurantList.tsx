import Link from "next/link";
import { ExternalLink, Pencil, QrCode, Send, Trash2 } from "lucide-react";
import { deleteBranch } from "@/app/actions/branch";
import { pricingPackages } from "@/data/packages";
import { menuItems, restaurants } from "@/data/restaurants";
import { getLanguageLabel } from "@/lib/languageUtils";
import { getMenuUrl } from "@/lib/menuUrl";
import { getMissingTranslationCount } from "@/lib/translationStatus";
import { CopyButton } from "@/components/ui/CopyButton";

interface ManagedBranch {
  id: string;
  name: string;
  slug: string;
  location: string | null;
  currency: string;
  isActive: boolean;
}

export function RestaurantList({ branches = [] }: { branches?: ManagedBranch[] }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">Restoranlar</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-5xl">Restoran listesi</h1>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-ink">Tenant subeleri</h2>
          <p className="mt-1 text-sm text-graphite/68">Server Actions ile kaydedilen veritabani subeleri.</p>
        </div>

        {branches.length ? (
          <div className="grid gap-4">
            {branches.map((branch) => (
              <article key={branch.id} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-black text-ink">{branch.name}</h3>
                      <span className={`rounded-md px-3 py-1.5 text-xs font-black ${branch.isActive ? "bg-sage/12 text-sage" : "bg-saffron/16 text-ember"}`}>
                        {branch.isActive ? "Aktif" : "Pasif"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-graphite/68">/{branch.slug}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-graphite/72">
                      <span>{branch.location || "Lokasyon girilmedi"}</span>
                      <span>{branch.currency}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap content-start gap-2 lg:justify-end">
                    <Link
                      href={`/admin/restaurants/${branch.slug}`}
                      className="inline-flex items-center gap-2 rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-saffron hover:text-ember"
                    >
                      <Pencil className="h-4 w-4" />
                      Duzenle
                    </Link>
                    <form action={deleteBranch}>
                      <input type="hidden" name="branchId" value={branch.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Sil
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-ink/15 bg-white px-5 py-6 text-sm text-graphite/68 shadow-soft">
            Bu tenant icin henuz kalici sube kaydi yok.
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-ink">Demo restoranlar</h2>
          <p className="mt-1 text-sm text-graphite/68">Mock menuler sunum ve teslim ornekleri icin korunur.</p>
        </div>

        <div className="grid gap-4">
          {restaurants.map((restaurant) => {
            const packageName = pricingPackages.find((plan) => plan.id === restaurant.packageType)?.name;
            const productCount = menuItems.filter((item) => item.restaurantSlug === restaurant.slug).length;
            const missingCount = getMissingTranslationCount(restaurant);
            const menuUrl = getMenuUrl(restaurant.slug);

            return (
              <article key={restaurant.id} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-black text-ink">{restaurant.name}</h3>
                      <span className="rounded-md bg-porcelain px-3 py-1.5 text-xs font-black text-graphite">
                        {packageName}
                      </span>
                      <span className={`rounded-md px-3 py-1.5 text-xs font-black ${restaurant.status === "active" ? "bg-sage/12 text-sage" : "bg-saffron/16 text-ember"}`}>
                        {restaurant.status === "active" ? "Aktif" : "Taslak"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-graphite/68">/{restaurant.slug}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {restaurant.activeLanguages.map((language) => (
                        <span key={language} className="rounded-md bg-linen px-2.5 py-1 text-xs font-black text-graphite">
                          {getLanguageLabel(language)}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-graphite/72 sm:grid-cols-3">
                      <span>{productCount} urun</span>
                      <span>{missingCount} eksik ceviri</span>
                      <span>{restaurant.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap content-start gap-2 lg:justify-end">
                    <CopyButton text={menuUrl} label="Menu linki" className="bg-ember hover:bg-saffron" />
                    <Link
                      href={menuUrl}
                      className="inline-flex items-center gap-2 rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-saffron hover:text-ember"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ac
                    </Link>
                    <Link
                      href={`/admin/restaurants/${restaurant.slug}#customer-delivery`}
                      className="inline-flex items-center gap-2 rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-saffron hover:text-ember"
                    >
                      <Pencil className="h-4 w-4" />
                      Duzenle
                    </Link>
                    <Link
                      href={`/admin/restaurants/${restaurant.slug}`}
                      className="inline-flex items-center gap-2 rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-saffron hover:text-ember"
                    >
                      <Send className="h-4 w-4" />
                      Musteriye gonder
                    </Link>
                    <Link
                      href={`/admin/restaurants/${restaurant.slug}#qr`}
                      className="inline-flex items-center gap-2 rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-saffron hover:text-ember"
                    >
                      <QrCode className="h-4 w-4" />
                      QR
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
