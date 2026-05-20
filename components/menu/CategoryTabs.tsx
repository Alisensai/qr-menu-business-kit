"use client";

import clsx from "clsx";
import type { LanguageCode, MenuCategory } from "@/types";
import { getCategoryTranslation } from "@/lib/languageUtils";

interface CategoryTabsProps {
  categories: MenuCategory[];
  selectedCategoryId: string;
  languageCode: LanguageCode;
  onChange: (categoryId: string) => void;
}

export function CategoryTabs({
  categories,
  selectedCategoryId,
  languageCode,
  onChange
}: CategoryTabsProps) {
  return (
    <div className="sticky top-0 z-20 -mx-4 border-y border-ink/10 bg-porcelain/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-lg sm:border">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide" aria-label="Menü kategorileri">
        {categories.map((category) => {
          const label = getCategoryTranslation(category, languageCode).name;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={clsx(
                "shrink-0 rounded-md px-4 py-2 text-sm font-black transition",
                selectedCategoryId === category.id
                  ? "bg-saffron text-ink shadow-soft"
                  : "bg-white text-graphite ring-1 ring-ink/10 hover:text-ember"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
