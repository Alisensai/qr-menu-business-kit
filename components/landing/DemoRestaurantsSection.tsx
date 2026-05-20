import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import { pricingPackages } from "@/data/packages";
import { getLanguageLabel } from "@/lib/languageUtils";

export function DemoRestaurantsSection() {
  return (
    <section id="demo-restaurants" className="bg-porcelain py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-5xl">
              Demo restoranları gör
            </h2>
            <p className="mt-4 text-base leading-7 text-graphite/76">
              Farklı paket seviyelerindeki örnek işletmeleri müşteri menüsü olarak inceleyin.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {restaurants.map((restaurant) => {
            const packageInfo = pricingPackages.find((item) => item.id === restaurant.packageType);

            return (
              <article key={restaurant.id} className="overflow-hidden rounded-lg border border-ink/10 bg-white shadow-soft">
                <div className="relative h-48">
                  <Image
                    src={restaurant.coverImageUrl}
                    alt={`${restaurant.name} demo restoran görseli`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/78 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-black">{restaurant.name}</h3>
                    <p className="mt-1 text-sm text-white/78">{restaurant.location}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-md bg-saffron/16 px-3 py-1.5 text-xs font-black text-ember">
                      {packageInfo?.name}
                    </span>
                    <span className="text-sm font-black text-ink">{packageInfo?.price}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {restaurant.activeLanguages.slice(0, 5).map((language) => (
                      <span key={language} className="rounded-md bg-porcelain px-2.5 py-1 text-xs font-black text-graphite">
                        {getLanguageLabel(language)}
                      </span>
                    ))}
                    {restaurant.activeLanguages.length > 5 && (
                      <span className="rounded-md bg-porcelain px-2.5 py-1 text-xs font-black text-graphite">
                        +{restaurant.activeLanguages.length - 5}
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      href={`/menu/${restaurant.slug}`}
                      className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-ember"
                    >
                      Menüyü Aç
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
