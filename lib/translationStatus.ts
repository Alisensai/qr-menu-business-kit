import { languageByCode } from "@/data/languages";
import { menuItems } from "@/data/restaurants";
import type { LanguageCode, Restaurant, TranslationLanguageStatus } from "@/types";

export function getMissingTranslationCount(restaurant: Restaurant) {
  return getTranslationStatus(restaurant).reduce(
    (total, language) => total + language.missingCount,
    0
  );
}

export function getTranslationStatus(restaurant: Restaurant): TranslationLanguageStatus[] {
  const restaurantItems = menuItems.filter(
    (item) => item.restaurantSlug === restaurant.slug && item.isActive
  );

  return restaurant.activeLanguages.map((languageCode) =>
    getSingleLanguageStatus(languageCode, restaurantItems.length, restaurant.slug)
  );
}

export function getSingleLanguageStatus(
  languageCode: LanguageCode,
  totalCount: number,
  restaurantSlug: string
): TranslationLanguageStatus {
  const restaurantItems = menuItems.filter(
    (item) => item.restaurantSlug === restaurantSlug && item.isActive
  );
  const missingCount = restaurantItems.filter((item) => {
    const translation = item.translations[languageCode];
    return !translation?.translatedName || !translation.description;
  }).length;

  return {
    languageCode,
    languageName: languageByCode[languageCode]?.nativeName ?? languageCode.toUpperCase(),
    missingCount,
    totalCount,
    status: missingCount === 0 ? "complete" : "missing"
  };
}
