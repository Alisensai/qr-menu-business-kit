import type { LanguageCode } from "@/types";

const labels: Record<
  LanguageCode,
  {
    language: string;
    featured: string;
    featuredBadge: string;
    items: string;
    allergens: string;
    vegetarian: string;
    vegan: string;
    spicy: string;
    glutenFree: string;
  }
> = {
  tr: {
    language: "Dil",
    featured: "Öne Çıkanlar",
    featuredBadge: "Öne çıkan",
    items: "ürün",
    allergens: "Alerjen",
    vegetarian: "Vejetaryen",
    vegan: "Vegan",
    spicy: "Acı",
    glutenFree: "Glutensiz"
  },
  en: {
    language: "Language",
    featured: "Featured",
    featuredBadge: "Featured",
    items: "items",
    allergens: "Allergens",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    spicy: "Spicy",
    glutenFree: "Gluten-free"
  },
  ar: {
    language: "اللغة",
    featured: "الأطباق المميزة",
    featuredBadge: "مميز",
    items: "عنصر",
    allergens: "مسببات الحساسية",
    vegetarian: "نباتي",
    vegan: "نباتي بالكامل",
    spicy: "حار",
    glutenFree: "خال من الغلوتين"
  },
  ru: {
    language: "Язык",
    featured: "Рекомендуемое",
    featuredBadge: "Популярное",
    items: "блюд",
    allergens: "Аллергены",
    vegetarian: "Вегетарианское",
    vegan: "Веганское",
    spicy: "Острое",
    glutenFree: "Без глютена"
  },
  de: {
    language: "Sprache",
    featured: "Empfohlen",
    featuredBadge: "Empfohlen",
    items: "Produkte",
    allergens: "Allergene",
    vegetarian: "Vegetarisch",
    vegan: "Vegan",
    spicy: "Scharf",
    glutenFree: "Glutenfrei"
  },
  fr: {
    language: "Langue",
    featured: "Sélection",
    featuredBadge: "Sélection",
    items: "articles",
    allergens: "Allergènes",
    vegetarian: "Végétarien",
    vegan: "Végan",
    spicy: "Épicé",
    glutenFree: "Sans gluten"
  },
  es: {
    language: "Idioma",
    featured: "Destacados",
    featuredBadge: "Destacado",
    items: "productos",
    allergens: "Alérgenos",
    vegetarian: "Vegetariano",
    vegan: "Vegano",
    spicy: "Picante",
    glutenFree: "Sin gluten"
  },
  it: {
    language: "Lingua",
    featured: "In evidenza",
    featuredBadge: "In evidenza",
    items: "prodotti",
    allergens: "Allergeni",
    vegetarian: "Vegetariano",
    vegan: "Vegano",
    spicy: "Piccante",
    glutenFree: "Senza glutine"
  },
  fa: {
    language: "زبان",
    featured: "پیشنهادها",
    featuredBadge: "ویژه",
    items: "مورد",
    allergens: "آلرژن‌ها",
    vegetarian: "گیاهی",
    vegan: "وگان",
    spicy: "تند",
    glutenFree: "بدون گلوتن"
  },
  zh: {
    language: "语言",
    featured: "推荐",
    featuredBadge: "推荐",
    items: "项",
    allergens: "过敏原",
    vegetarian: "素食",
    vegan: "纯素",
    spicy: "辣",
    glutenFree: "无麸质"
  }
};

export function getMenuLabels(languageCode: LanguageCode) {
  return labels[languageCode] ?? labels.tr;
}

const tagTranslations: Record<string, Partial<Record<LanguageCode, string>>> = {
  "2 kişilik": { en: "For 2", ar: "لشخصين", ru: "На двоих" },
  Sıcak: { en: "Warm", ar: "ساخن", ru: "Горячее" },
  Soğuk: { en: "Cold", ar: "بارد", ru: "Холодное" },
  Vejetaryen: { en: "Vegetarian", ar: "نباتي", ru: "Вегетарианское" },
  Popüler: { en: "Popular", ar: "شائع", ru: "Популярное" },
  Protein: { en: "Protein", ar: "بروتين", ru: "Белок" },
  Acılı: { en: "Spicy", ar: "حار", ru: "Острое" },
  Fırın: { en: "Oven-baked", ar: "مخبوز", ru: "Из печи" }
};

const allergenTranslations: Record<string, Partial<Record<LanguageCode, string>>> = {
  "Süt ürünleri": { en: "Dairy", ar: "منتجات الألبان", ru: "Молочные продукты" },
  Yumurta: { en: "Egg", ar: "بيض", ru: "Яйцо" },
  Gluten: { en: "Gluten", ar: "غلوتين", ru: "Глютен" }
};

export function getMenuTag(tag: string, languageCode: LanguageCode) {
  return tagTranslations[tag]?.[languageCode] ?? tag;
}

export function getAllergenName(allergen: string, languageCode: LanguageCode) {
  return allergenTranslations[allergen]?.[languageCode] ?? allergen;
}
