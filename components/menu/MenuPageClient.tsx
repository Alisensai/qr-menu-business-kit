"use client";

import clsx from "clsx";
import {
  Flame,
  Heart,
  Info,
  Languages,
  Leaf,
  Milk,
  Search,
  ShoppingBag,
  Sparkles,
  WheatOff
} from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import type { LanguageCode, MenuCategory, MenuItem, Restaurant } from "@/types";
import { CartDrawer } from "@/components/menu/CartDrawer";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { LanguageSelector } from "@/components/menu/LanguageSelector";
import { MenuHeader } from "@/components/menu/MenuHeader";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import {
  formatCurrency,
  getCategoryTranslation,
  getMenuItemTranslation,
  isRtlLanguage
} from "@/lib/languageUtils";
import { getMenuLabels } from "@/lib/menuLabels";
import { useCartStore } from "@/store/useCartStore";

interface MenuPageClientProps {
  restaurant: Restaurant;
  categories: MenuCategory[];
  items: MenuItem[];
  initialLanguage?: LanguageCode;
  orderSource?: {
    tableCode?: string;
    qrCode?: string;
  };
}

type MenuFilterKey = "popular" | "vegetarian" | "spicy" | "glutenFree" | "dairy";

interface MenuFilterOption {
  key: MenuFilterKey;
  label: string;
  icon: ComponentType<LucideProps>;
}

const menuFilters: MenuFilterOption[] = [
  { key: "popular", label: "Popüler", icon: Sparkles },
  { key: "vegetarian", label: "Vejetaryen", icon: Leaf },
  { key: "spicy", label: "Acılı", icon: Flame },
  { key: "glutenFree", label: "Glutensiz", icon: WheatOff },
  { key: "dairy", label: "Süt Ürünleri İçerir", icon: Milk }
];

const trustSignals = [
  {
    title: "Çok Dilli Destek",
    description: "Menü açıklamaları turist dostu bir dille sunulur.",
    icon: Languages
  },
  {
    title: "Taze & Kaliteli",
    description: "Görsel ve içerik ritmi sofrayı iştah açıcı taşır.",
    icon: Leaf
  },
  {
    title: "Alerjen Bilgisi",
    description: "Önemli uyarılar ürün kartında açıkça görünür.",
    icon: Info
  },
  {
    title: "Mutluluğun Adresi",
    description: "QR deneyimi masada hızlı ve rafine kalır.",
    icon: Heart
  }
] as const;

function isDairyAllergen(allergen: string) {
  const normalizedAllergen = allergen.toLocaleLowerCase("tr-TR");
  return normalizedAllergen.includes("süt") || normalizedAllergen.includes("dairy");
}

function itemMatchesFilters(item: MenuItem, activeFilters: MenuFilterKey[]) {
  return activeFilters.every((filter) => {
    if (filter === "popular") {
      return item.isPopular;
    }

    if (filter === "vegetarian") {
      return Boolean(item.dietary?.vegetarian);
    }

    if (filter === "spicy") {
      return Boolean(item.dietary?.spicy);
    }

    if (filter === "glutenFree") {
      return Boolean(item.dietary?.glutenFree);
    }

    return Boolean(item.allergens?.some(isDairyAllergen));
  });
}

export function MenuPageClient({
  restaurant,
  categories,
  items,
  initialLanguage,
  orderSource
}: MenuPageClientProps) {
  const activeCategories = categories.filter((category) => category.isActive);
  const [languageCode, setLanguageCode] = useState<LanguageCode>(
    initialLanguage ??
      (restaurant.activeLanguages.includes("tr") ? "tr" : restaurant.activeLanguages[0])
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(activeCategories[0]?.id ?? "");
  const [searchText, setSearchText] = useState("");
  const [activeFilters, setActiveFilters] = useState<MenuFilterKey[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const deferredSearchText = useDeferredValue(searchText);
  const labels = getMenuLabels(languageCode);
  const isRtl = isRtlLanguage(languageCode);
  const normalizedSearch = deferredSearchText.trim().toLocaleLowerCase();

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        if (!item.isActive || !itemMatchesFilters(item, activeFilters)) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        const translation = getMenuItemTranslation(item, languageCode);
        const searchIndex = [
          item.name,
          item.tag,
          translation.translatedName,
          translation.shortDescription,
          translation.description
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase();

        return searchIndex.includes(normalizedSearch);
      }),
    [activeFilters, items, languageCode, normalizedSearch]
  );

  const categorySections = useMemo(
    () =>
      activeCategories.map((category) => ({
        category,
        items: filteredItems.filter((item) => item.categoryId === category.id)
      })),
    [activeCategories, filteredItems]
  );

  const popularItems = filteredItems.filter((item) => item.isPopular);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCurrency = cartItems[0]?.currency ?? restaurant.currency;

  function toggleFilter(filter: MenuFilterKey) {
    setActiveFilters((currentFilters) =>
      currentFilters.includes(filter)
        ? currentFilters.filter((currentFilter) => currentFilter !== filter)
        : [...currentFilters, filter]
    );
  }

  function selectCategory(categoryId: string) {
    setSelectedCategoryId(categoryId);

    requestAnimationFrame(() => {
      document
        .getElementById(`menu-category-${categoryId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function addMenuItemToCart(item: MenuItem) {
    const translation = getMenuItemTranslation(item, languageCode);

    addItem({
      menuItemId: item.id,
      name: translation.translatedName,
      price: item.price,
      currency: item.currency,
      imageUrl: item.imageUrl
    });
  }

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={clsx(
        "min-h-screen overflow-x-clip bg-[#f3eadb] text-[#07111f]",
        isRtl ? "text-right" : "text-left"
      )}
    >
      <MenuHeader restaurant={restaurant} />

      <section className="sticky top-0 z-30 border-b border-[#dcc8a8] bg-[#07111f]/95 shadow-[0_24px_70px_rgba(4,10,20,0.25)] backdrop-blur-xl">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-3 sm:px-6 lg:px-8">
          <LanguageSelector
            activeLanguages={restaurant.activeLanguages}
            selectedLanguage={languageCode}
            onChange={setLanguageCode}
          />

          <CategoryTabs
            categories={activeCategories}
            selectedCategoryId={selectedCategoryId}
            languageCode={languageCode}
            onChange={selectCategory}
          />

          <div className="grid gap-2 lg:grid-cols-[minmax(16rem,22rem)_1fr] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Menüde ara</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a7640]" />
              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Menüde ürün veya açıklama ara"
                className="h-12 w-full rounded-md border border-[#d9c5a5] bg-[#fff7e7] pl-10 pr-4 text-sm font-semibold text-[#07111f] shadow-inner outline-none transition placeholder:text-[#7a6b59] focus:border-[#f0c76b] focus:ring-2 focus:ring-[#f0c76b]/30"
              />
            </label>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="Menü filtreleri">
              {menuFilters.map(({ key, label, icon: Icon }) => {
                const isActive = activeFilters.includes(key);

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleFilter(key)}
                    aria-pressed={isActive}
                    className={clsx(
                      "inline-flex h-11 shrink-0 items-center gap-2 rounded-md border px-3.5 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron",
                      isActive
                        ? "border-[#8ea069] bg-[#28371f] text-[#e7efce]"
                        : "border-white/[0.14] bg-white/10 text-[#fff1db] hover:border-[#f0c76b]/60 hover:bg-white/[0.16]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-32 pt-5 sm:px-6 sm:pt-7 md:pb-12 lg:px-8">
        {popularItems.length > 0 ? (
          <section className="rounded-[1.8rem] border border-[#dbc8a8] bg-[#fcf5e9] p-4 shadow-[0_24px_80px_rgba(20,17,15,0.08)] sm:p-6">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8a5d22]">
                  {restaurant.name}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#07111f] sm:text-4xl">
                  {labels.featured}
                </h2>
              </div>
              <span
                dir="ltr"
                className="whitespace-nowrap rounded-md border border-[#dfc38c] bg-[#fff2d8] px-3 py-2 text-xs font-black text-[#7a4e16]"
              >
                {popularItems.length} {labels.items}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {popularItems.map((item) => (
                <MenuItemCard
                  key={`featured-${item.id}`}
                  item={item}
                  languageCode={languageCode}
                  featured
                  onAddToCart={() => addMenuItemToCart(item)}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-6 space-y-6">
          <div className="flex flex-col gap-2 border-b border-[#d8c3a5] pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#07111f]">Menü</h2>
              <p className="mt-1 text-sm leading-6 text-[#5d5b58]">
                Ürünleri kategori, açıklama ve tercihlerinize göre keşfedin.
              </p>
            </div>
            <p className="text-sm font-black text-[#8a5d22]" dir="ltr">
              {filteredItems.length} {labels.items}
            </p>
          </div>

          {filteredItems.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-[#c8ab79] bg-[#fff6e6] px-5 py-10 text-center shadow-[0_18px_50px_rgba(20,17,15,0.06)]">
              <h3 className="font-display text-2xl font-bold text-[#07111f]">
                Aramanızla eşleşen ürün bulunamadı.
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#62584b]">
                Arama metnini sadeleştirin veya aktif filtrelerden birini kapatıp menüyü yeniden inceleyin.
              </p>
            </div>
          ) : (
            categorySections.map(({ category, items: sectionItems }) => (
              <section
                id={`menu-category-${category.id}`}
                key={category.id}
                className="scroll-mt-[17rem]"
              >
                <div className="mb-3 flex items-end justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold text-[#07111f] sm:text-3xl">
                    {getCategoryTranslation(category, languageCode).name}
                  </h3>
                  <span
                    dir="ltr"
                    className="whitespace-nowrap rounded-md bg-[#e7d7bd] px-2.5 py-1 text-xs font-black text-[#735329]"
                  >
                    {sectionItems.length} {labels.items}
                  </span>
                </div>
                {sectionItems.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2 xl:gap-4">
                    {sectionItems.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        languageCode={languageCode}
                        onAddToCart={() => addMenuItemToCart(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-[1.2rem] border border-dashed border-[#d7c09c] bg-[#f9eedc] px-4 py-5 text-sm font-semibold text-[#6b6257]">
                    Bu kategoride seçili arama veya filtrelerle eşleşen ürün yok.
                  </p>
                )}
              </section>
            ))
          )}
        </section>
      </div>

      <section className="bg-[#07111f] text-[#fff3df]">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustSignals.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="flex gap-3 border border-white/10 bg-white/[0.06] p-4 shadow-[0_20px_55px_rgba(0,0,0,0.18)]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#d9b56a] text-[#07111f]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-sm font-black">{title}</h2>
                <p className="mt-1 text-xs leading-5 text-white/[0.68]">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#f0c76b]/[0.35] bg-[#07111f]/[0.96] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-[#fff3df] shadow-[0_-18px_55px_rgba(4,10,20,0.32)] backdrop-blur md:bottom-5 md:left-1/2 md:right-auto md:w-[min(38rem,calc(100vw-2rem))] md:-translate-x-1/2 md:rounded-[1.2rem] md:border">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold leading-5 text-white/[0.76]">
              {cartItemCount > 0 ? `${cartItemCount} urun secildi` : "Siparis icin urun secin"}
            </p>
            <p className="truncate text-sm font-black text-[#f0c76b]" dir="ltr">
              {formatCurrency(cartTotal, cartCurrency)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-[#f0c76b] px-3.5 text-sm font-black text-[#07111f] shadow-[0_12px_30px_rgba(217,155,43,0.28)] transition hover:bg-[#f5d892] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Sepeti Goruntule
          </button>
        </div>
      </div>

      <CartDrawer
        branchId={restaurant.id}
        restaurantName={restaurant.name}
        tableCode={orderSource?.tableCode}
        qrCode={orderSource?.qrCode}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </main>
  );
}
