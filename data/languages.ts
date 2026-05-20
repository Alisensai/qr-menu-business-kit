import type { Language, LanguageCode } from "@/types";

export const languages: Language[] = [
  { code: "tr", name: "Turkish", nativeName: "Türkçe", direction: "ltr", isDefault: true, isPopular: true },
  { code: "en", name: "English", nativeName: "English", direction: "ltr", isPopular: true },
  { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl", isPopular: true },
  { code: "ru", name: "Russian", nativeName: "Русский", direction: "ltr", isPopular: true },
  { code: "de", name: "German", nativeName: "Deutsch", direction: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  { code: "it", name: "Italian", nativeName: "Italiano", direction: "ltr" },
  { code: "fa", name: "Persian", nativeName: "فارسی", direction: "rtl" },
  { code: "zh", name: "Chinese", nativeName: "中文", direction: "ltr" }
];

export const languageByCode = languages.reduce(
  (acc, language) => {
    acc[language.code] = language;
    return acc;
  },
  {} as Record<LanguageCode, Language>
);

export const defaultLanguage: LanguageCode = "tr";
