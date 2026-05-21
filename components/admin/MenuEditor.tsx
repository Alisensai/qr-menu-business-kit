"use client";

import { useState } from "react";
import {
  createMenuItem,
  deleteMenuItem,
  updateMenuItem
} from "@/app/actions/menu";
import type { LanguageCode, MenuCategory, MenuItem, Restaurant } from "@/types";
import {
  formatCurrency,
  getCategoryTranslation,
  getMenuItemTranslation
} from "@/lib/languageUtils";

export interface ManagedMenuEditorCategory {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ManagedMenuEditorItem {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  price: string;
  currency: string;
  imageUrl: string | null;
  tag: string | null;
  isPopular: boolean;
  isActive: boolean;
  allergens: string[];
  isVegan: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  isGlutenFree: boolean;
  sortOrder: number;
}

type MockMenuEditorProps = {
  restaurant: Restaurant;
  categories: MenuCategory[];
  items: MenuItem[];
};

type ManagedMenuEditorProps = {
  branchCurrency: string;
  categories: ManagedMenuEditorCategory[];
  items: ManagedMenuEditorItem[];
};

type MenuEditorProps = MockMenuEditorProps | ManagedMenuEditorProps;

function isManagedEditorProps(props: MenuEditorProps): props is ManagedMenuEditorProps {
  return "branchCurrency" in props;
}

function DietaryCheckbox({
  defaultChecked,
  label,
  name
}: {
  defaultChecked?: boolean;
  label: string;
  name: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-md bg-white px-2.5 py-2 text-xs font-bold text-graphite ring-1 ring-ink/10">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-saffron" />
      {label}
    </label>
  );
}

function ManagedMenuEditor({ branchCurrency, categories, items }: ManagedMenuEditorProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? "");
  const activeCategory =
    categories.find((category) => category.id === selectedCategoryId) ?? categories[0];
  const activeCategoryId = activeCategory?.id ?? "";
  const visibleItems = items.filter((item) => item.categoryId === activeCategoryId);

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div>
        <h2 className="text-lg font-black text-ink">Urun yonetimi</h2>
        <p className="mt-1 text-sm text-graphite/64">
          Kalici urun kayitlarini kategori, fiyat, uyarilar ve siralama ile yonetin.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="mt-5 rounded-lg border border-dashed border-ink/15 bg-porcelain px-4 py-5 text-sm text-graphite/68">
          Urun eklemek icin once bir kategori olusturun.
        </div>
      ) : (
        <div className="mt-5 grid gap-4 xl:grid-cols-[220px_1fr]">
          <aside className="grid content-start gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategoryId(category.id)}
                className={`rounded-md px-3 py-3 text-left text-sm font-black transition ${
                  activeCategoryId === category.id
                    ? "bg-saffron text-ink"
                    : "bg-porcelain text-graphite hover:text-ember"
                }`}
              >
                <span className="block">{category.name}</span>
                <span className="mt-1 block text-xs font-bold opacity-65">Sira {category.sortOrder}</span>
              </button>
            ))}
          </aside>

          <div className="grid gap-4">
            <form action={createMenuItem} className="grid gap-3 rounded-lg bg-porcelain p-4">
              <input type="hidden" name="categoryId" value={activeCategoryId} />
              <div className="grid gap-3 md:grid-cols-[1fr_150px_120px]">
                <label className="grid gap-2 text-xs font-bold text-graphite">
                  Yeni urun
                  <input name="name" required placeholder="Menemen" className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                </label>
                <label className="grid gap-2 text-xs font-bold text-graphite">
                  Fiyat
                  <input name="price" required type="number" min="0" step="0.01" placeholder="240" className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                </label>
                <label className="grid gap-2 text-xs font-bold text-graphite">
                  Para birimi
                  <select name="currency" defaultValue={branchCurrency} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron">
                    <option value="TRY">TRY</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-3 md:grid-cols-[1fr_180px_140px]">
                <label className="grid gap-2 text-xs font-bold text-graphite">
                  Aciklama
                  <textarea name="description" rows={2} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                </label>
                <label className="grid gap-2 text-xs font-bold text-graphite">
                  Etiket
                  <input name="tag" placeholder="Populer secim" className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                </label>
                <label className="grid gap-2 text-xs font-bold text-graphite">
                  Sira
                  <input name="sortOrder" type="number" min="0" placeholder="Otomatik" className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                </label>
              </div>
              <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                <label className="grid gap-2 text-xs font-bold text-graphite">
                  Gorsel URL
                  <input name="imageUrl" className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                </label>
                <label className="grid gap-2 text-xs font-bold text-graphite">
                  Alerjenler
                  <input name="allergens" placeholder="Sut, yumurta" className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                </label>
                <div className="grid content-end gap-2">
                  <label className="inline-flex items-center gap-2 text-xs font-bold text-graphite">
                    <input name="isPopular" type="checkbox" className="h-4 w-4 accent-saffron" />
                    Populer
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-bold text-graphite">
                    <input name="isActive" type="checkbox" defaultChecked className="h-4 w-4 accent-saffron" />
                    Aktif
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <DietaryCheckbox name="isVegetarian" label="Vejetaryen" />
                  <DietaryCheckbox name="isVegan" label="Vegan" />
                  <DietaryCheckbox name="isSpicy" label="Acili" />
                  <DietaryCheckbox name="isGlutenFree" label="Glutensiz" />
                </div>
                <button type="submit" className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-ember">
                  Urun ekle
                </button>
              </div>
            </form>

            <div className="grid gap-3">
              {visibleItems.map((item) => (
                <form
                  key={item.id}
                  action={updateMenuItem}
                  className="grid gap-3 rounded-lg border border-ink/10 bg-porcelain p-4"
                >
                  <input type="hidden" name="itemId" value={item.id} />
                  <div className="grid gap-3 lg:grid-cols-[1fr_220px_120px_120px]">
                    <label className="grid gap-2 text-xs font-bold text-graphite">
                      Urun adi
                      <input name="name" required defaultValue={item.name} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm font-bold text-ink outline-none focus:border-saffron" />
                    </label>
                    <label className="grid gap-2 text-xs font-bold text-graphite">
                      Kategori
                      <select name="categoryId" defaultValue={item.categoryId} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron">
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2 text-xs font-bold text-graphite">
                      Fiyat
                      <input name="price" required type="number" min="0" step="0.01" defaultValue={item.price} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm font-black text-ember outline-none focus:border-saffron" />
                    </label>
                    <label className="grid gap-2 text-xs font-bold text-graphite">
                      Sira
                      <input name="sortOrder" type="number" min="0" defaultValue={item.sortOrder} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                    </label>
                  </div>
                  <div className="grid gap-3 lg:grid-cols-[1fr_160px_120px]">
                    <label className="grid gap-2 text-xs font-bold text-graphite">
                      Aciklama
                      <textarea name="description" defaultValue={item.description ?? ""} rows={2} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                    </label>
                    <label className="grid gap-2 text-xs font-bold text-graphite">
                      Etiket
                      <input name="tag" defaultValue={item.tag ?? ""} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                    </label>
                    <label className="grid gap-2 text-xs font-bold text-graphite">
                      Para birimi
                      <select name="currency" defaultValue={item.currency} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron">
                        <option value="TRY">TRY</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                      </select>
                    </label>
                  </div>
                  <div className="grid gap-3 lg:grid-cols-2">
                    <label className="grid gap-2 text-xs font-bold text-graphite">
                      Gorsel URL
                      <input name="imageUrl" defaultValue={item.imageUrl ?? ""} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                    </label>
                    <label className="grid gap-2 text-xs font-bold text-graphite">
                      Alerjenler
                      <input name="allergens" defaultValue={item.allergens.join(", ")} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron" />
                    </label>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <DietaryCheckbox name="isPopular" label="Populer" defaultChecked={item.isPopular} />
                      <DietaryCheckbox name="isActive" label="Aktif" defaultChecked={item.isActive} />
                      <DietaryCheckbox name="isVegetarian" label="Vejetaryen" defaultChecked={item.isVegetarian} />
                      <DietaryCheckbox name="isVegan" label="Vegan" defaultChecked={item.isVegan} />
                      <DietaryCheckbox name="isSpicy" label="Acili" defaultChecked={item.isSpicy} />
                      <DietaryCheckbox name="isGlutenFree" label="Glutensiz" defaultChecked={item.isGlutenFree} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="submit" className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-ember">
                        Guncelle
                      </button>
                      <button type="submit" formAction={deleteMenuItem} formNoValidate className="rounded-md border border-red-200 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50">
                        Sil
                      </button>
                    </div>
                  </div>
                </form>
              ))}

              {visibleItems.length === 0 ? (
                <div className="rounded-lg border border-dashed border-ink/15 px-4 py-5 text-sm text-graphite/68">
                  Bu kategoride urun yok.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function MockMenuEditor({ restaurant, categories, items }: MockMenuEditorProps) {
  const [languageCode, setLanguageCode] = useState<LanguageCode>(restaurant.activeLanguages[0] ?? "tr");
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? "");
  const visibleItems = items.filter((item) => !selectedCategoryId || item.categoryId === selectedCategoryId);

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-black text-ink">Urun yonetimi</h2>
          <p className="mt-1 text-sm text-graphite/64">Demo menude fiyat, etiket ve ceviri durumunu kontrol edin.</p>
        </div>
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
                        {missing ? (
                          <span className="rounded-md bg-saffron/20 px-2 py-1 text-xs font-black text-ember">
                            Eksik ceviri
                          </span>
                        ) : null}
                        {!item.isActive ? (
                          <span className="rounded-md bg-graphite/10 px-2 py-1 text-xs font-black text-graphite">
                            Pasif
                          </span>
                        ) : null}
                      </div>
                      <label className="mt-3 grid gap-2 text-xs font-bold text-graphite">
                        Urun adi / ceviri
                        <input value={translation.translatedName} readOnly className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink" />
                      </label>
                      <label className="mt-3 grid gap-2 text-xs font-bold text-graphite">
                        Aciklama
                        <textarea value={translation.description} readOnly rows={3} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm leading-6 text-ink" />
                      </label>
                    </div>
                    <div className="grid content-start gap-3">
                      <label className="grid gap-2 text-xs font-bold text-graphite">
                        Fiyat
                        <input value={formatCurrency(item.price, item.currency)} readOnly className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm font-black text-ember" />
                      </label>
                      <label className="grid gap-2 text-xs font-bold text-graphite">
                        Etiket
                        <input value={item.tag ?? ""} readOnly className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink" />
                      </label>
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

export function MenuEditor(props: MenuEditorProps) {
  return isManagedEditorProps(props) ? (
    <ManagedMenuEditor {...props} />
  ) : (
    <MockMenuEditor {...props} />
  );
}
