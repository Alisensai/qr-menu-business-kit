import Image from "next/image";
import { Flame, Leaf, Sprout, WheatOff } from "lucide-react";
import type { LanguageCode, MenuItem } from "@/types";
import { formatCurrency, getMenuItemTranslation } from "@/lib/languageUtils";
import { getAllergenName, getMenuLabels, getMenuTag } from "@/lib/menuLabels";

interface MenuItemCardProps {
  item: MenuItem;
  languageCode: LanguageCode;
}

const dietIcons = [
  { key: "vegetarian", labelKey: "vegetarian", icon: Leaf },
  { key: "vegan", labelKey: "vegan", icon: Sprout },
  { key: "spicy", labelKey: "spicy", icon: Flame },
  { key: "glutenFree", labelKey: "glutenFree", icon: WheatOff }
] as const;

export function MenuItemCard({ item, languageCode }: MenuItemCardProps) {
  const translation = getMenuItemTranslation(item, languageCode);
  const labels = getMenuLabels(languageCode);

  return (
    <article className="rounded-lg border border-ink/10 bg-white p-3 shadow-soft">
      <div className="flex gap-3">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={translation.translatedName}
            width={128}
            height={112}
            className="h-24 w-24 shrink-0 rounded-md object-cover sm:h-28 sm:w-32"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-black leading-snug text-ink sm:text-lg">
                  {translation.translatedName}
                </h3>
                {item.isPopular && (
                  <span className="rounded-md bg-sage/12 px-2 py-1 text-[11px] font-black text-sage">
                    {labels.featuredBadge}
                  </span>
                )}
                {item.tag && (
                  <span className="rounded-md bg-saffron/16 px-2 py-1 text-[11px] font-black text-ember">
                    {getMenuTag(item.tag, languageCode)}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-6 text-graphite/74">{translation.description}</p>
            </div>
            <p className="shrink-0 text-lg font-black text-ember">
              {formatCurrency(item.price, item.currency)}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {dietIcons.map(({ key, labelKey, icon: Icon }) =>
              item.dietary?.[key] ? (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 rounded-md bg-porcelain px-2 py-1 text-[11px] font-bold text-graphite"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {labels[labelKey]}
                </span>
              ) : null
            )}
          </div>

          {item.allergens?.length ? (
            <p className="mt-3 text-xs leading-5 text-graphite/58">
              {labels.allergens}:{" "}
              {item.allergens.map((allergen) => getAllergenName(allergen, languageCode)).join(", ")}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
