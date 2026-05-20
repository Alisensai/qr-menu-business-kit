import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { getRestaurantBySlug } from "@/lib/getRestaurantBySlug";
import { formatCurrency, getCategoryTranslation, getMenuItemTranslation } from "@/lib/languageUtils";
import { getMenuUrl } from "@/lib/menuUrl";

export function DemoPreview() {
  const data = getRestaurantBySlug("mavi-kiyi-bistro");

  if (!data) {
    return null;
  }

  const { restaurant, categories, items } = data;
  const visibleItems = items.filter((item) => item.isPopular).slice(0, 3);
  const menuUrl = getMenuUrl(restaurant.slug);

  return (
    <section id="demo" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="flex items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-5xl">
              Demo QR Menü ön izlemesi
            </h2>
            <p className="mt-4 text-base leading-7 text-graphite/76">
              Restoran sahibi linki ve QR kodu görür; müşteriler ise masadan hızlı açılan mobil menüye ulaşır. Dil seçimi, fiyatlar ve açıklamalar ilk ekranda okunur.
            </p>
            <div className="mt-8 rounded-lg border border-ink/10 bg-porcelain p-5">
              <p className="text-sm font-semibold text-ember">Örnek menü linki</p>
              <p className="mt-2 break-all text-sm text-ink">{menuUrl}</p>
              <div className="mt-4 inline-flex rounded-md bg-white p-3">
                <QRCodeSVG value={menuUrl} size={118} fgColor="#1c2430" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm rounded-[2rem] border-[10px] border-ink bg-ink p-3 shadow-lift">
          <div className="overflow-hidden rounded-[1.4rem] bg-linen">
            <div className="relative h-36">
              <Image
                src={restaurant.coverImageUrl}
                alt=""
                fill
                sizes="360px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/78 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-bold">{restaurant.name}</h3>
                <p className="text-sm text-white/82">{restaurant.location}</p>
              </div>
            </div>
            <div className="space-y-4 p-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {restaurant.activeLanguages.map((language) => (
                  <span
                    key={language}
                    className="shrink-0 rounded-md bg-white px-3 py-2 text-xs font-bold text-ink shadow-sm"
                  >
                    {language.toUpperCase()}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {categories.slice(0, 4).map((category) => (
                  <span
                    key={category.id}
                    className="shrink-0 rounded-md border border-ink/10 bg-white px-3 py-2 text-xs font-semibold text-graphite"
                  >
                    {getCategoryTranslation(category, "tr").name}
                  </span>
                ))}
              </div>
              {visibleItems.map((item) => {
                const translation = getMenuItemTranslation(item, "en");
                return (
                  <article key={item.id} className="rounded-lg bg-white p-3 shadow-soft">
                    <div className="flex gap-3">
                      <Image
                        src={item.imageUrl ?? restaurant.coverImageUrl}
                        alt=""
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-sm font-bold text-ink">{translation.translatedName}</h4>
                          <p className="shrink-0 text-sm font-black text-ember">
                            {formatCurrency(item.price, item.currency)}
                          </p>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-graphite/70">
                          {translation.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
