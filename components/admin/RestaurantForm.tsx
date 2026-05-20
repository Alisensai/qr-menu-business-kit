"use client";

import { useMemo, useState } from "react";
import { languages } from "@/data/languages";
import { pricingPackages } from "@/data/packages";
import type { LanguageCode, PackageType, Restaurant } from "@/types";
import { slugify } from "@/lib/slugify";

interface RestaurantFormProps {
  restaurant?: Restaurant;
}

const emptyRestaurant: Restaurant = {
  id: "draft",
  name: "",
  slug: "",
  description: "",
  location: "",
  phone: "",
  instagramUrl: "",
  googleMapsUrl: "",
  coverImageUrl: "",
  logoUrl: "",
  packageType: "starter",
  activeLanguages: ["tr", "en"],
  openingHours: "",
  currency: "TRY",
  status: "draft",
  createdAt: ""
};

export function RestaurantForm({ restaurant = emptyRestaurant }: RestaurantFormProps) {
  const [form, setForm] = useState(restaurant);
  const [saved, setSaved] = useState(false);
  const selectedPackage = useMemo(
    () => pricingPackages.find((item) => item.id === form.packageType),
    [form.packageType]
  );

  function setField<K extends keyof Restaurant>(key: K, value: Restaurant[K]) {
    setSaved(false);
    setForm((current) => ({ ...current, [key]: value }));
  }

  function selectPackage(packageType: PackageType) {
    const packageLanguages =
      pricingPackages.find((item) => item.id === packageType)?.activeLanguages ?? form.activeLanguages;
    setForm((current) => ({
      ...current,
      packageType,
      activeLanguages: packageLanguages.length ? packageLanguages : current.activeLanguages
    }));
    setSaved(false);
  }

  function toggleLanguage(languageCode: LanguageCode) {
    setForm((current) => {
      const activeLanguages = current.activeLanguages.includes(languageCode)
        ? current.activeLanguages.filter((item) => item !== languageCode)
        : [...current.activeLanguages, languageCode];
      return { ...current, activeLanguages };
    });
    setSaved(false);
  }

  return (
    <form
      className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-black text-ink">Restoran oluştur / düzenle</h2>
          <p className="mt-1 text-sm text-graphite/64">MVP’de bilgiler lokal form state içinde düzenlenir.</p>
        </div>
        <button type="submit" className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-ember">
          Kaydet
        </button>
      </div>

      {saved && (
        <div className="mt-4 rounded-md bg-sage/12 px-4 py-3 text-sm font-bold text-sage">
          Form güncellendi. Kalıcı kayıt için Supabase/Firebase entegrasyonu hazır yapıya eklenebilir.
        </div>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Restoran adı
          <input
            value={form.name}
            onChange={(event) => {
              const name = event.target.value;
              setForm((current) => ({ ...current, name, slug: current.slug || slugify(name) }));
            }}
            className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Slug
          <input
            value={form.slug}
            onChange={(event) => setField("slug", slugify(event.target.value))}
            className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-graphite md:col-span-2">
          Açıklama
          <textarea
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
            rows={3}
            className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Lokasyon
          <input value={form.location} onChange={(event) => setField("location", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Telefon
          <input value={form.phone} onChange={(event) => setField("phone", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Instagram
          <input value={form.instagramUrl} onChange={(event) => setField("instagramUrl", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Google Maps linki
          <input value={form.googleMapsUrl} onChange={(event) => setField("googleMapsUrl", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Kapak görseli URL
          <input value={form.coverImageUrl} onChange={(event) => setField("coverImageUrl", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Logo alanı
          <input value={form.logoUrl} onChange={(event) => setField("logoUrl", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Çalışma saatleri
          <input value={form.openingHours} onChange={(event) => setField("openingHours", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Para birimi
          <select value={form.currency} onChange={(event) => setField("currency", event.target.value as Restaurant["currency"])} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron">
            <option value="TRY">TRY</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-lg bg-porcelain p-4">
          <h3 className="text-sm font-black text-ink">Paket seçimi</h3>
          <div className="mt-3 grid gap-2">
            {pricingPackages
              .filter((plan) => plan.id !== "maintenance")
              .map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => selectPackage(plan.id)}
                  className={`rounded-md border px-3 py-3 text-left text-sm font-bold transition ${
                    form.packageType === plan.id
                      ? "border-saffron bg-white text-ember"
                      : "border-ink/10 bg-white text-graphite hover:border-saffron"
                  }`}
                >
                  {plan.name} · {plan.price}
                </button>
              ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-graphite/64">
            Seçili paket: {selectedPackage?.name}. Paket değiştiğinde varsayılan aktif diller otomatik gelir.
          </p>
        </section>

        <section className="rounded-lg bg-porcelain p-4">
          <h3 className="text-sm font-black text-ink">Aktif diller</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => toggleLanguage(language.code)}
                className={`rounded-md px-3 py-2 text-sm font-black transition ${
                  form.activeLanguages.includes(language.code)
                    ? "bg-ink text-white"
                    : "bg-white text-graphite ring-1 ring-ink/10"
                }`}
              >
                {language.nativeName}
              </button>
            ))}
          </div>
        </section>
      </div>
    </form>
  );
}
