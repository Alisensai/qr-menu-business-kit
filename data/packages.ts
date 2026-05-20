import type { PricingPackage } from "@/types";

export const pricingPackages: PricingPackage[] = [
  {
    id: "starter",
    name: "Başlangıç Paket",
    price: "₺999",
    description: "Küçük restoran ve kafeler için hızlı QR menü başlangıcı.",
    activeLanguages: ["tr", "en"],
    features: [
      "QR menü sayfası",
      "Türkçe menü düzenleme",
      "İngilizce açıklamalı menü",
      "10 Google yorum cevap taslağı",
      "QR kod görseli",
      "Menü linki"
    ]
  },
  {
    id: "tourist",
    name: "Turist Paket",
    price: "₺1.999",
    description: "Yabancı müşterisi olan sahil, merkez ve turistik işletmeler için.",
    activeLanguages: ["tr", "en", "ar", "ru"],
    highlight: true,
    features: [
      "QR menü sayfası",
      "Türkçe menü düzenleme",
      "İngilizce açıklamalı menü",
      "Arapça menü",
      "Rusça menü",
      "30 Google yorum cevap taslağı",
      "Masa QR kart tasarımı",
      "Instagram bio menü linki",
      "Menü açıklama optimizasyonu"
    ]
  },
  {
    id: "global",
    name: "Global Paket",
    price: "₺3.999+",
    description: "Butik otel, yoğun turist alanı ve premium restoranlar için.",
    activeLanguages: ["tr", "en", "ar", "ru", "de", "fr", "es", "it", "fa", "zh"],
    features: [
      "QR menü sayfası",
      "10+ dil seçeneği",
      "Otomatik dil seçimi için altyapı",
      "Çok dilli ürün açıklamaları",
      "Çok dilli Google yorum cevapları",
      "Menü SEO açıklaması",
      "Masa QR kart tasarımı",
      "Aylık bakım önerisi",
      "Özel dil ekleme desteği"
    ]
  },
  {
    id: "maintenance",
    name: "Aylık Bakım Paketi",
    price: "₺499 - ₺999/ay",
    description: "Menü, kampanya ve yorum cevaplarını güncel tutmak için.",
    activeLanguages: [],
    monthly: true,
    features: [
      "Menü fiyat güncelleme",
      "Yeni ürün ekleme",
      "Yeni dil ekleme",
      "Google yorum cevapları",
      "Kampanya metni",
      "Öne çıkan ürün güncelleme",
      "Sezonluk menü değişikliği"
    ]
  }
];

export const extraLanguagePricing = [
  "1 ek dil: ₺300 - ₺500",
  "3 ek dil: ₺999",
  "10+ dil: özel fiyat"
];
