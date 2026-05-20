"use client";

import { useState } from "react";
import type { LanguageCode, MenuCategory, MenuItem, Restaurant } from "@/types";
import { formatCurrency, getCategoryTranslation, getMenuItemTranslation } from "@/lib/languageUtils";

interface MenuEditorProps {
  restaurant: Restaurant;
  categories: MenuCategory[];
  items: MenuItem[];
}

export function MenuEditor({ restaurant, categories, items }: MenuEditorProps) {
  const [languageCode, setLanguageCode] = useState<LanguageCode>(restaurant.activeLanguages[0] ?? "tr");
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? "");
  const visibleItems = items.filter((item) => !selectedCategoryId || item.categoryId === selectedCategoryId);

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-black text-ink">Ürün yönetimi</h2>
          <p className="mt-1 text-sm text-graphite/64">Kategori, fiyat, etiket ve aktif dil açıklamalarını kontrol edin.</p>
        </div>
        <button type="button" className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-ember">
          Ürün ekle
        </button>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[220px_1fr]">
        <aside className="grid content-start gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategoryId(category.id)}
              className={`rounded-md px-3 py-3 text-left text-sm font-black transition ${
                selectedCategoryId === category.id
                  ? "bg-saffron text-ink"
                  : "bg-porcelain text-graphite hover:text-ember"
              }`}
            >
              {getCategoryTranslation(category, "tr").name}
            </button>
          ))}
        </aside>

        <div>
          <div className="mb-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {restaurant.activeLanguages.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setLanguageCode(language)}
                className={`shrink-0 rounded-md px-3 py-2 text-xs font-black ${
                  languageCode === language ? "bg-ink text-white" : "bg-porcelain text-graphite"
                }`}
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid gap-3">
            {visibleItems.map((item) => {
              const translation = getMenuItemTranslation(item, languageCode);
              const missing = !item.translations[languageCode];
              return (
                <article key={item.id} className="rounded-lg border border-ink/10 bg-porcelain p-4">
                  <div className="grid gap-4 md:grid-cols-[1fr_160px]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black text-ink">{item.name}</h3>
                        {missing && (
                          <span className="rounded-md bg-saffron/20 px-2 py-1 text-xs font-black text-ember">
                            Eksik çeviri
                          </span>
                        )}
                        {!item.isActive && (
                          <span className="rounded-md bg-graphite/10 px-2 py-1 text-xs font-black text-graphite">
                            Pasif
                          </span>
                        )}
                      </div>
                      <label className="mt-3 grid gap-2 text-xs font-bold text-graphite">
                        Ürün adı / çeviri
                        <input
                          value={translation.translatedName}
                          readOnly
                          className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink"
                        />
                      </label>
                      <label className="mt-3 grid gap-2 text-xs font-bold text-graphite">
                        Açıklama
                        <textarea
                          value={translation.description}
                          readOnly
                          rows={3}
                          className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm leading-6 text-ink"
                        />
                      </label>
                    </div>
                    <div className="grid content-start gap-3">
                      <label className="grid gap-2 text-xs font-bold text-graphite">
                        Fiyat
                        <input
                          value={formatCurrency(item.price, item.currency)}
                          readOnly
                          className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm font-black text-ember"
                        />
                      </label>
                      <label className="grid gap-2 text-xs font-bold text-graphite">
                        Etiket
                        <input
                          value={item.tag ?? ""}
                          readOnly
                          className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink"
                        />
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {item.isPopular && (
                          <span className="rounded-md bg-sage/12 px-2 py-1 text-xs font-black text-sage">Popüler</span>
                        )}
                        {item.dietary?.vegetarian && (
                          <span className="rounded-md bg-white px-2 py-1 text-xs font-black text-graphite">Vejetaryen</span>
                        )}
                        {item.dietary?.vegan && (
                          <span className="rounded-md bg-white px-2 py-1 text-xs font-black text-graphite">Vegan</span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
