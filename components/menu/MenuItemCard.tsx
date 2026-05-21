import Image from "next/image";
import clsx from "clsx";
import { Flame, Leaf, Sparkles, Sprout, UtensilsCrossed, WheatOff } from "lucide-react";
import type { LanguageCode, MenuItem } from "@/types";
import { formatCurrency, getMenuItemTranslation } from "@/lib/languageUtils";
import { getAllergenName, getMenuLabels, getMenuTag } from "@/lib/menuLabels";

interface MenuItemCardProps {
  item: MenuItem;
  languageCode: LanguageCode;
  featured?: boolean;
}

const dietIcons = [
  { key: "vegetarian", labelKey: "vegetarian", icon: Leaf },
  { key: "vegan", labelKey: "vegan", icon: Sprout },
  { key: "spicy", labelKey: "spicy", icon: Flame },
  { key: "glutenFree", labelKey: "glutenFree", icon: WheatOff }
] as const;

function MenuImagePlaceholder() {
  return (
    <div className="grid h-full w-full place-items-center bg-[linear-gradient(145deg,#15243a,#07111f_55%,#42301b)] text-[#f4d69a]">
      <div className="grid h-16 w-16 place-items-center rounded-full border border-[#f4d69a]/30 bg-white/[0.08]">
        <UtensilsCrossed className="h-7 w-7" />
      </div>
    </div>
  );
}

export function MenuItemCard({ item, languageCode, featured = false }: MenuItemCardProps) {
  const translation = getMenuItemTranslation(item, languageCode);
  const labels = getMenuLabels(languageCode);
  const description = translation.shortDescription ?? translation.description;

  return (
    <article
      tabIndex={0}
      className={clsx(
        "group relative overflow-hidden rounded-[1.4rem] border border-[#dfcfb7] bg-[#fffaf1] shadow-[0_18px_54px_rgba(13,19,31,0.1)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron hover:-translate-y-0.5 hover:border-[#c99639]/70 hover:shadow-[0_24px_70px_rgba(13,19,31,0.16)]",
        featured ? "flex h-full flex-col" : "flex gap-3 p-3 md:flex-col md:gap-0 md:p-0"
      )}
    >
      <div
        className={clsx(
          "relative overflow-hidden bg-[#0b1729]",
          featured
            ? "aspect-[16/10] w-full"
            : "h-[7.4rem] w-[7.4rem] shrink-0 rounded-[1rem] md:h-auto md:w-full md:rounded-none md:aspect-[4/3]"
        )}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={translation.translatedName}
            fill
            sizes={featured ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 768px) 50vw, 132px"}
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <MenuImagePlaceholder />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/[0.34] via-transparent to-transparent" />
        {item.isPopular ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md border border-[#f0c76b]/[0.55] bg-[#081527]/[0.86] px-2 py-1 text-[11px] font-black text-[#f8dfaa] shadow-lg backdrop-blur">
            <Sparkles className="h-3 w-3" />
            {labels.featuredBadge}
          </span>
        ) : null}
      </div>

      <div
        className={clsx(
          "min-w-0 flex-1",
          featured ? "flex flex-1 flex-col p-4" : "flex flex-col md:p-4"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-black leading-snug text-[#07111f] sm:text-lg">
              {translation.translatedName}
            </h3>
            {item.tag ? (
              <span className="mt-2 inline-flex rounded-md bg-[#efe2cb] px-2 py-1 text-[11px] font-black uppercase text-[#89561f]">
                {getMenuTag(item.tag, languageCode)}
              </span>
            ) : null}
          </div>
          <p
            dir="ltr"
            className="shrink-0 rounded-md border border-[#e6bd61] bg-[#f4d28a] px-2.5 py-1.5 text-sm font-black text-[#07111f] shadow-[0_10px_25px_rgba(185,121,27,0.18)] sm:text-base"
          >
            {formatCurrency(item.price, item.currency)}
          </p>
        </div>

        <p
          className={clsx(
            "mt-2 text-sm leading-6 text-[#4e535a]",
            featured ? "line-clamp-3" : "line-clamp-2"
          )}
        >
          {description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {dietIcons.map(({ key, labelKey, icon: Icon }) =>
            item.dietary?.[key] ? (
              <span
                key={key}
                className="inline-flex items-center gap-1 rounded-md border border-[#d7ddc4] bg-[#eef2df] px-2 py-1 text-[11px] font-bold text-[#42562f]"
              >
                <Icon className="h-3.5 w-3.5" />
                {labels[labelKey]}
              </span>
            ) : null
          )}
        </div>

        {item.allergens?.length ? (
          <p className="mt-auto pt-3 text-xs leading-5 text-[#6d665d]">
            <span className="font-black text-[#07111f]">{labels.allergens}:</span>{" "}
            {item.allergens.map((allergen) => getAllergenName(allergen, languageCode)).join(", ")}
          </p>
        ) : null}
      </div>
    </article>
  );
}
