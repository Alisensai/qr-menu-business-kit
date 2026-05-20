import Link from "next/link";
import { ExternalLink, Pencil, QrCode, Send } from "lucide-react";
import { pricingPackages } from "@/data/packages";
import { menuItems, restaurants } from "@/data/restaurants";
import { getMissingTranslationCount } from "@/lib/translationStatus";
import { getLanguageLabel } from "@/lib/languageUtils";
import { getMenuUrl } from "@/lib/menuUrl";
import { CopyButton } from "@/components/ui/CopyButton";

export function RestaurantList() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">Restoranlar</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-5xl">Restoran listesi</h1>
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
                    <h2 className="text-xl font-black text-ink">{restaurant.name}</h2>
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
                    <span>{productCount} ürün</span>
                    <span>{missingCount} eksik çeviri</span>
                    <span>{restaurant.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap content-start gap-2 lg:justify-end">
                  <CopyButton text={menuUrl} label="Menü linki" className="bg-ember hover:bg-saffron" />
                  <Link
                    href={menuUrl}
                    className="inline-flex items-center gap-2 rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-saffron hover:text-ember"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Aç
                  </Link>
                  <Link
                    href={`/admin/restaurants/${restaurant.slug}#customer-delivery`}
                    className="inline-flex items-center gap-2 rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-saffron hover:text-ember"
                  >
                    <Pencil className="h-4 w-4" />
                    Düzenle
                  </Link>
                  <Link
                    href={`/admin/restaurants/${restaurant.slug}`}
                    className="inline-flex items-center gap-2 rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-saffron hover:text-ember"
                  >
                    <Send className="h-4 w-4" />
                    Müşteriye gönder
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
    </div>
  );
}
