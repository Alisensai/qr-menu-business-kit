import { defaultLanguage, languageByCode, languages } from "@/data/languages";
import { pricingPackages } from "@/data/packages";
import type {
  CategoryTranslation,
  LanguageCode,
  MenuCategory,
  MenuItem,
  MenuItemTranslation,
  PackageType
} from "@/types";

export function getPackageLanguages(packageType: PackageType) {
  return pricingPackages.find((item) => item.id === packageType)?.activeLanguages ?? [];
}

export function isRtlLanguage(languageCode: LanguageCode) {
  return languageByCode[languageCode]?.direction === "rtl";
}

export function getLanguageLabel(languageCode: LanguageCode) {
  return languageByCode[languageCode]?.nativeName ?? languageCode.toUpperCase();
}

export function getLanguages(languageCodes: LanguageCode[]) {
  return languages.filter((language) => languageCodes.includes(language.code));
}

export function getCategoryTranslation(
  category: MenuCategory,
  languageCode: LanguageCode
): CategoryTranslation {
  return (
    category.translations[languageCode] ??
    category.translations[defaultLanguage] ??
    category.translations.en ?? { name: category.id }
  );
}

export function getMenuItemTranslation(
  item: MenuItem,
  languageCode: LanguageCode
): MenuItemTranslation & { usedFallback: boolean } {
  const translation =
    item.translations[languageCode] ?? item.translations.en ?? item.translations[defaultLanguage];

  return {
    translatedName: translation?.translatedName ?? item.name,
    description: translation?.description ?? "Açıklama hazırlanıyor.",
    shortDescription: translation?.shortDescription,
    usedFallback: !item.translations[languageCode]
  };
}

export function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}
