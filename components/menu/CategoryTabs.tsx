"use client";

import clsx from "clsx";
import { CakeSlice, Coffee, GlassWater, Sparkles, UtensilsCrossed } from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import type { LanguageCode, MenuCategory } from "@/types";
import { getCategoryTranslation } from "@/lib/languageUtils";

interface CategoryTabsProps {
  categories: MenuCategory[];
  selectedCategoryId: string;
  languageCode: LanguageCode;
  onChange: (categoryId: string) => void;
}

function getCategoryIcon(categoryId: string): ComponentType<LucideProps> {
  if (categoryId.includes("breakfast")) {
    return Coffee;
  }

  if (categoryId.includes("starters")) {
    return Sparkles;
  }

  if (categoryId.includes("desserts")) {
    return CakeSlice;
  }

  if (categoryId.includes("drinks")) {
    return GlassWater;
  }

  return UtensilsCrossed;
}

export function CategoryTabs({
  categories,
  selectedCategoryId,
  languageCode,
  onChange
}: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="Menü kategorileri">
      {categories.map((category) => {
        const label = getCategoryTranslation(category, languageCode).name;
        const Icon = getCategoryIcon(category.id);
        const isActive = selectedCategoryId === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            aria-pressed={isActive}
            className={clsx(
              "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron",
              isActive
                ? "border-[#c99639] bg-[#fff1d3] text-[#07111f] shadow-[0_14px_36px_rgba(3,10,22,0.18)]"
                : "border-[#d8c7aa]/70 bg-white/[0.78] text-graphite hover:border-[#c99639] hover:bg-white/[0.92] hover:text-[#7f4b15]"
            )}
          >
            <span
              className={clsx(
                "grid h-7 w-7 place-items-center rounded-md",
                isActive ? "bg-[#07111f] text-[#f0c76b]" : "bg-[#efe3d1] text-[#7a5930]"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
