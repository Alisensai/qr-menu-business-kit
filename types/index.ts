export type LanguageDirection = "ltr" | "rtl";

export type LanguageCode =
  | "tr"
  | "en"
  | "ar"
  | "ru"
  | "de"
  | "fr"
  | "es"
  | "it"
  | "fa"
  | "zh";

export type PackageType = "starter" | "tourist" | "global" | "maintenance";

export type CurrencyCode = "TRY" | "EUR" | "USD";

export type RestaurantStatus = "active" | "draft" | "paused";

export type DietKey = "vegan" | "vegetarian" | "spicy" | "glutenFree";

export type OrderStatus = "PENDING" | "PREPARING" | "COMPLETED";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  direction: LanguageDirection;
  isDefault?: boolean;
  isPopular?: boolean;
}

export interface PricingPackage {
  id: PackageType;
  name: string;
  price: string;
  description: string;
  activeLanguages: LanguageCode[];
  features: string[];
  highlight?: boolean;
  monthly?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  phone: string;
  instagramUrl: string;
  googleMapsUrl: string;
  coverImageUrl: string;
  logoUrl?: string;
  packageType: PackageType;
  activeLanguages: LanguageCode[];
  openingHours: string;
  currency: CurrencyCode;
  status: RestaurantStatus;
  createdAt: string;
}

export interface CategoryTranslation {
  name: string;
}

export interface MenuCategory {
  id: string;
  restaurantSlug: string;
  translations: Partial<Record<LanguageCode, CategoryTranslation>>;
  isActive: boolean;
  sortOrder: number;
}

export interface MenuItemTranslation {
  translatedName: string;
  description: string;
  shortDescription?: string;
}

export interface MenuItem {
  id: string;
  restaurantSlug: string;
  categoryId: string;
  name: string;
  translations: Partial<Record<LanguageCode, MenuItemTranslation>>;
  price: number;
  currency: CurrencyCode;
  imageUrl?: string;
  tag?: string;
  isPopular: boolean;
  isActive: boolean;
  allergens?: string[];
  dietary?: Partial<Record<DietKey, boolean>>;
  sortOrder: number;
}

export interface TranslationLanguageStatus {
  languageCode: LanguageCode;
  languageName: string;
  missingCount: number;
  totalCount: number;
  status: "complete" | "missing" | "optional";
}

export interface ReviewReplyTemplate {
  id: string;
  type:
    | "positive"
    | "negative"
    | "slow-service"
    | "taste-praise"
    | "price-complaint"
    | "tourist"
    | "english"
    | "arabic"
    | "russian";
  label: string;
  languageCode: LanguageCode;
  template: string;
}
