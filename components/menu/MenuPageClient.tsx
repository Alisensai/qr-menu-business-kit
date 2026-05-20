"use client";

import { useMemo, useState } from "react";
import type { LanguageCode, MenuCategory, MenuItem, Restaurant } from "@/types";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { LanguageSelector } from "@/components/menu/LanguageSelector";
import { MenuHeader } from "@/components/menu/MenuHeader";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { getCategoryTranslation, isRtlLanguage } from "@/lib/languageUtils";
import { getMenuLabels } from "@/lib/menuLabels";

interface MenuPageClientProps {
  restaurant: Restaurant;
  categories: MenuCategory[];
  items: MenuItem[];
  initialLanguage?: LanguageCode;
}

export function MenuPageClient({
  restaurant,
  categories,
  items,
  initialLanguage
}: MenuPageClientProps) {
  const [languageCode, setLanguageCode] = useState<LanguageCode>(
    initialLanguage ??
      (restaurant.activeLanguages.includes("tr") ? "tr" : restaurant.activeLanguages[0])
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? "");

  const isRtl = isRtlLanguage(languageCode);
  const labels = getMenuLabels(languageCode);
  const activeCategories = categories.filter((category) => category.isActive);
  const popularItems = items.filter((item) => item.isPopular && item.isActive);
  const visibleItems = useMemo(
    () =>
      items.filter(
        (item) => item.isActive && (!selectedCategoryId || item.categoryId === selectedCategoryId)
      ),
    [items, selectedCategoryId]
  );

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "text-right" : "text-left"}>
      <MenuHeader restaurant={restaurant} />
      <section className="mx-auto max-w-3xl px-4 py-5 menu-safe-bottom">
        <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-ember">
            {labels.language}
          </p>
          <div className="mt-3">
            <LanguageSelector
              activeLanguages={restaurant.activeLanguages}
              selectedLanguage={languageCode}
              onChange={setLanguageCode}
            />
          </div>
        </div>

        {popularItems.length > 0 && (
          <section className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-black text-ink">{labels.featured}</h2>
              <span className="text-xs font-bold text-graphite/58" dir="ltr">
                {popularItems.length} {labels.items}
              </span>
            </div>
            <div className="grid gap-3">
              {popularItems.slice(0, 3).map((item) => (
                <MenuItemCard key={item.id} item={item} languageCode={languageCode} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-6">
          <CategoryTabs
            categories={activeCategories}
            selectedCategoryId={selectedCategoryId}
            languageCode={languageCode}
            onChange={setSelectedCategoryId}
          />
        </div>

        <section className="mt-5">
          <h2 className="mb-3 text-xl font-black text-ink">
            {getCategoryTranslation(
              activeCategories.find((category) => category.id === selectedCategoryId) ??
                activeCategories[0],
              languageCode
            ).name}
          </h2>
          <div className="grid gap-3">
            {visibleItems.map((item) => (
              <MenuItemCard key={item.id} item={item} languageCode={languageCode} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
