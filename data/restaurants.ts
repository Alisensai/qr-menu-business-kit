import type { MenuCategory, MenuItem, Restaurant } from "@/types";

export const restaurants: Restaurant[] = [
  {
    id: "r-mavi",
    name: "Mavi Kıyı Bistro",
    slug: "mavi-kiyi-bistro",
    description:
      "Arsuz sahilinde kahvaltı, Akdeniz tabakları, tatlı ve nitelikli kahve sunan modern bistro.",
    location: "Arsuz / İskenderun",
    phone: "+90 532 000 10 20",
    instagramUrl: "https://instagram.com/mavikiyibistro",
    googleMapsUrl: "https://maps.google.com/?q=Mavi+Kiyi+Bistro",
    coverImageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    logoUrl: "MK",
    packageType: "tourist",
    activeLanguages: ["tr", "en", "ar", "ru"],
    openingHours: "Her gün 08:30 - 23:30",
    currency: "TRY",
    status: "active",
    createdAt: "2026-04-18"
  },
  {
    id: "r-cave",
    name: "Kapadokya Cave Cafe",
    slug: "kapadokya-cave-cafe",
    description:
      "Kapadokya manzarasında yöresel kahvaltı, taş fırın lezzetleri ve dünya kahveleri.",
    location: "Kapadokya",
    phone: "+90 384 000 44 55",
    instagramUrl: "https://instagram.com/cappadociacavecafe",
    googleMapsUrl: "https://maps.google.com/?q=Kapadokya+Cave+Cafe",
    coverImageUrl:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80",
    logoUrl: "KC",
    packageType: "global",
    activeLanguages: ["tr", "en", "ar", "ru", "de", "fr", "es", "it", "fa", "zh"],
    openingHours: "Her gün 07:00 - 22:00",
    currency: "TRY",
    status: "active",
    createdAt: "2026-05-02"
  },
  {
    id: "r-marina",
    name: "İstanbul Marina Restaurant",
    slug: "istanbul-marina-restaurant",
    description:
      "Marina hattında deniz ürünleri, kebap ve tatlı menüsüyle şehir restoranı.",
    location: "İstanbul",
    phone: "+90 212 000 34 34",
    instagramUrl: "https://instagram.com/istanbulmarinarestaurant",
    googleMapsUrl: "https://maps.google.com/?q=Istanbul+Marina+Restaurant",
    coverImageUrl:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
    logoUrl: "IM",
    packageType: "starter",
    activeLanguages: ["tr", "en"],
    openingHours: "Hafta içi 10:00 - 23:00, hafta sonu 09:00 - 00:00",
    currency: "TRY",
    status: "draft",
    createdAt: "2026-05-10"
  }
];

const sharedCategories = {
  breakfast: {
    tr: { name: "Kahvaltı" },
    en: { name: "Breakfast" },
    ar: { name: "الإفطار" },
    ru: { name: "Завтрак" },
    de: { name: "Frühstück" },
    fr: { name: "Petit-déjeuner" },
    es: { name: "Desayuno" },
    it: { name: "Colazione" }
  },
  starters: {
    tr: { name: "Başlangıçlar" },
    en: { name: "Starters" },
    ar: { name: "المقبلات" },
    ru: { name: "Закуски" },
    de: { name: "Vorspeisen" },
    fr: { name: "Entrées" },
    es: { name: "Entrantes" },
    it: { name: "Antipasti" }
  },
  mains: {
    tr: { name: "Ana Yemekler" },
    en: { name: "Main Dishes" },
    ar: { name: "الأطباق الرئيسية" },
    ru: { name: "Основные блюда" },
    de: { name: "Hauptgerichte" },
    fr: { name: "Plats principaux" },
    es: { name: "Platos principales" },
    it: { name: "Piatti principali" }
  },
  desserts: {
    tr: { name: "Tatlılar" },
    en: { name: "Desserts" },
    ar: { name: "الحلويات" },
    ru: { name: "Десерты" },
    de: { name: "Desserts" },
    fr: { name: "Desserts" },
    es: { name: "Postres" },
    it: { name: "Dolci" }
  },
  drinks: {
    tr: { name: "İçecekler" },
    en: { name: "Drinks" },
    ar: { name: "المشروبات" },
    ru: { name: "Напитки" },
    de: { name: "Getränke" },
    fr: { name: "Boissons" },
    es: { name: "Bebidas" },
    it: { name: "Bevande" }
  }
} satisfies Record<string, MenuCategory["translations"]>;

export const menuCategories: MenuCategory[] = [
  ...["mavi-kiyi-bistro", "kapadokya-cave-cafe", "istanbul-marina-restaurant"].flatMap(
    (restaurantSlug) => [
      {
        id: `${restaurantSlug}-breakfast`,
        restaurantSlug,
        translations: sharedCategories.breakfast,
        isActive: true,
        sortOrder: 10
      },
      {
        id: `${restaurantSlug}-starters`,
        restaurantSlug,
        translations: sharedCategories.starters,
        isActive: true,
        sortOrder: 20
      },
      {
        id: `${restaurantSlug}-mains`,
        restaurantSlug,
        translations: sharedCategories.mains,
        isActive: true,
        sortOrder: 30
      },
      {
        id: `${restaurantSlug}-desserts`,
        restaurantSlug,
        translations: sharedCategories.desserts,
        isActive: true,
        sortOrder: 40
      },
      {
        id: `${restaurantSlug}-drinks`,
        restaurantSlug,
        translations: sharedCategories.drinks,
        isActive: true,
        sortOrder: 50
      }
    ]
  )
];

const img = {
  breakfast:
    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80",
  eggs: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
  salad: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
  pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
  cheesecake:
    "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
  lemonade:
    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
  kebab: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80",
  kunefe:
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
  coffee:
    "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80"
};

export const menuItems: MenuItem[] = [
  {
    id: "mavi-serpme",
    restaurantSlug: "mavi-kiyi-bistro",
    categoryId: "mavi-kiyi-bistro-breakfast",
    name: "Serpme Kahvaltı",
    translations: {
      tr: {
        translatedName: "Serpme Kahvaltı",
        description:
          "Peynir çeşitleri, zeytin, yumurta, bal, reçel, domates, salatalık ve taze ekmekle hazırlanan geleneksel kahvaltı tabağı.",
        shortDescription: "İki kişilik zengin Türk kahvaltısı."
      },
      en: {
        translatedName: "Traditional Turkish Breakfast Platter",
        description:
          "Traditional Turkish breakfast platter with cheese, olives, eggs, honey, jam and fresh bread.",
        shortDescription: "A generous Turkish breakfast for two."
      },
      ar: {
        translatedName: "فطور تركي تقليدي",
        description:
          "طبق فطور تركي تقليدي مع الجبن والزيتون والبيض والعسل والمربى والخبز الطازج."
      },
      ru: {
        translatedName: "Турецкий завтрак",
        description:
          "Традиционный турецкий завтрак с сыром, оливками, яйцами, медом, джемом и свежим хлебом."
      }
    },
    price: 520,
    currency: "TRY",
    imageUrl: img.breakfast,
    tag: "2 kişilik",
    isPopular: true,
    isActive: true,
    allergens: ["Süt ürünleri", "Yumurta", "Gluten"],
    dietary: { vegetarian: true },
    sortOrder: 10
  },
  {
    id: "mavi-menemen",
    restaurantSlug: "mavi-kiyi-bistro",
    categoryId: "mavi-kiyi-bistro-breakfast",
    name: "Menemen",
    translations: {
      tr: {
        translatedName: "Menemen",
        description:
          "Domates, biber ve isteğe bağlı peynirle tavada pişirilen Türk usulü yumurta."
      },
      en: {
        translatedName: "Menemen",
        description:
          "Turkish-style scrambled eggs cooked with tomato, pepper and optional cheese."
      },
      ar: {
        translatedName: "مينيمن",
        description: "بيض تركي مطهو مع الطماطم والفلفل ويمكن إضافة الجبن حسب الرغبة."
      }
    },
    price: 180,
    currency: "TRY",
    imageUrl: img.eggs,
    tag: "Sıcak",
    isPopular: true,
    isActive: true,
    allergens: ["Yumurta"],
    dietary: { vegetarian: true },
    sortOrder: 20
  },
  {
    id: "mavi-soup",
    restaurantSlug: "mavi-kiyi-bistro",
    categoryId: "mavi-kiyi-bistro-starters",
    name: "Mercimek Çorbası",
    translations: {
      tr: {
        translatedName: "Mercimek Çorbası",
        description: "Kırmızı mercimek, soğan ve baharatlarla hazırlanan klasik ev çorbası."
      },
      en: {
        translatedName: "Red Lentil Soup",
        description:
          "Classic Turkish soup made with red lentils, onion, mild spices and a lemon wedge."
      },
      ru: {
        translatedName: "Суп из чечевицы",
        description: "Классический турецкий суп из красной чечевицы с мягкими специями."
      }
    },
    price: 110,
    currency: "TRY",
    imageUrl: img.soup,
    isPopular: false,
    isActive: true,
    dietary: { vegan: true, vegetarian: true },
    sortOrder: 10
  },
  {
    id: "mavi-bowl",
    restaurantSlug: "mavi-kiyi-bistro",
    categoryId: "mavi-kiyi-bistro-mains",
    name: "Izgara Tavuk Bowl",
    translations: {
      tr: {
        translatedName: "Izgara Tavuk Bowl",
        description:
          "Izgara tavuk, mevsim yeşillikleri, bulgur, yoğurt sos ve köz biberle servis edilir."
      },
      en: {
        translatedName: "Grilled Chicken Bowl",
        description:
          "Grilled chicken served with seasonal greens, bulgur, yogurt sauce and roasted pepper."
      },
      ar: {
        translatedName: "طبق الدجاج المشوي",
        description: "دجاج مشوي مع خضار موسمية وبرغل وصلصة زبادي وفلفل مشوي."
      },
      ru: {
        translatedName: "Боул с курицей гриль",
        description: "Курица гриль с зеленью, булгуром, йогуртовым соусом и печеным перцем."
      }
    },
    price: 340,
    currency: "TRY",
    imageUrl: img.salad,
    tag: "Protein",
    isPopular: true,
    isActive: true,
    allergens: ["Süt ürünleri", "Gluten"],
    sortOrder: 10
  },
  {
    id: "mavi-pasta",
    restaurantSlug: "mavi-kiyi-bistro",
    categoryId: "mavi-kiyi-bistro-mains",
    name: "Ege Otlu Makarna",
    translations: {
      tr: {
        translatedName: "Ege Otlu Makarna",
        description:
          "Ege otları, zeytinyağı, sarımsak ve parmesanla hazırlanan hafif makarna."
      },
      en: {
        translatedName: "Aegean Herb Pasta",
        description:
          "Light pasta prepared with Aegean herbs, olive oil, garlic and parmesan cheese."
      }
    },
    price: 295,
    currency: "TRY",
    imageUrl: img.pasta,
    tag: "Vejetaryen",
    isPopular: false,
    isActive: true,
    allergens: ["Gluten", "Süt ürünleri"],
    dietary: { vegetarian: true },
    sortOrder: 20
  },
  {
    id: "mavi-cheesecake",
    restaurantSlug: "mavi-kiyi-bistro",
    categoryId: "mavi-kiyi-bistro-desserts",
    name: "San Sebastian Cheesecake",
    translations: {
      tr: {
        translatedName: "San Sebastian Cheesecake",
        description: "Yanık yüzeyli, kremsi dokulu cheesecake; isteğe göre çikolata sos ile."
      },
      en: {
        translatedName: "San Sebastian Cheesecake",
        description:
          "Creamy Basque-style cheesecake with a caramelized top, served plain or with chocolate sauce."
      }
    },
    price: 210,
    currency: "TRY",
    imageUrl: img.cheesecake,
    tag: "Popüler",
    isPopular: true,
    isActive: true,
    allergens: ["Süt ürünleri", "Yumurta", "Gluten"],
    sortOrder: 10
  },
  {
    id: "mavi-lemonade",
    restaurantSlug: "mavi-kiyi-bistro",
    categoryId: "mavi-kiyi-bistro-drinks",
    name: "Ev Yapımı Limonata",
    translations: {
      tr: {
        translatedName: "Ev Yapımı Limonata",
        description: "Taze limon, nane ve az şekerle günlük hazırlanan ferah içecek."
      },
      en: {
        translatedName: "Homemade Lemonade",
        description: "Refreshing drink prepared daily with fresh lemon, mint and light sugar."
      },
      ar: {
        translatedName: "ليموناضة منزلية",
        description: "مشروب منعش محضر يومياً من الليمون الطازج والنعناع وقليل من السكر."
      },
      ru: {
        translatedName: "Домашний лимонад",
        description: "Освежающий напиток из свежего лимона, мяты и небольшого количества сахара."
      }
    },
    price: 125,
    currency: "TRY",
    imageUrl: img.lemonade,
    isPopular: false,
    isActive: true,
    dietary: { vegan: true, vegetarian: true, glutenFree: true },
    sortOrder: 10
  },
  {
    id: "mavi-coldbrew",
    restaurantSlug: "mavi-kiyi-bistro",
    categoryId: "mavi-kiyi-bistro-drinks",
    name: "Cold Brew",
    translations: {
      tr: {
        translatedName: "Cold Brew",
        description: "12 saat soğuk demleme yöntemiyle hazırlanan yumuşak içimli kahve."
      },
      en: {
        translatedName: "Cold Brew",
        description: "Smooth coffee brewed cold for 12 hours and served over ice."
      }
    },
    price: 145,
    currency: "TRY",
    imageUrl: img.coffee,
    tag: "Soğuk",
    isPopular: false,
    isActive: true,
    dietary: { vegan: true, vegetarian: true, glutenFree: true },
    sortOrder: 20
  },
  ...createRestaurantItems("kapadokya-cave-cafe", 1.12, true),
  ...createRestaurantItems("istanbul-marina-restaurant", 1.2, false)
];

function createRestaurantItems(
  restaurantSlug: "kapadokya-cave-cafe" | "istanbul-marina-restaurant",
  priceRatio: number,
  global: boolean
): MenuItem[] {
  const category = (key: string) => `${restaurantSlug}-${key}`;
  const fullTranslations = global
    ? {
        de: {
          translatedName: "Traditionelles türkisches Frühstück",
          description: "Türkisches Frühstück mit Käse, Oliven, Eiern, Honig, Marmelade und frischem Brot."
        },
        fr: {
          translatedName: "Petit-déjeuner turc traditionnel",
          description: "Plateau avec fromage, olives, oeufs, miel, confiture et pain frais."
        },
        es: {
          translatedName: "Desayuno turco tradicional",
          description: "Tabla con queso, aceitunas, huevos, miel, mermelada y pan fresco."
        }
      }
    : {};

  return [
    {
      id: `${restaurantSlug}-serpme`,
      restaurantSlug,
      categoryId: category("breakfast"),
      name: "Serpme Kahvaltı",
      translations: {
        tr: {
          translatedName: "Serpme Kahvaltı",
          description:
            "Peynir çeşitleri, zeytin, yumurta, bal, reçel ve taze ekmekle hazırlanan geleneksel kahvaltı."
        },
        en: {
          translatedName: "Traditional Turkish Breakfast Platter",
          description:
            "Traditional Turkish breakfast platter with cheese, olives, eggs, honey, jam and fresh bread."
        },
        ar: global
          ? {
              translatedName: "فطور تركي تقليدي",
              description: "طبق فطور تركي مع الجبن والزيتون والبيض والعسل والمربى والخبز الطازج."
            }
          : undefined,
        ru: global
          ? {
              translatedName: "Турецкий завтрак",
              description: "Традиционный завтрак с сыром, оливками, яйцами, медом и хлебом."
            }
          : undefined,
        ...fullTranslations
      },
      price: Math.round(480 * priceRatio),
      currency: "TRY",
      imageUrl: img.breakfast,
      tag: "2 kişilik",
      isPopular: true,
      isActive: true,
      allergens: ["Süt ürünleri", "Yumurta", "Gluten"],
      dietary: { vegetarian: true },
      sortOrder: 10
    },
    {
      id: `${restaurantSlug}-menemen`,
      restaurantSlug,
      categoryId: category("breakfast"),
      name: "Menemen",
      translations: {
        tr: {
          translatedName: "Menemen",
          description:
            "Domates, biber ve isteğe bağlı peynirle tavada pişirilen Türk usulü yumurta."
        },
        en: {
          translatedName: "Menemen",
          description:
            "Turkish-style scrambled eggs cooked with tomato, pepper and optional cheese."
        }
      },
      price: Math.round(165 * priceRatio),
      currency: "TRY",
      imageUrl: img.eggs,
      isPopular: false,
      isActive: true,
      allergens: ["Yumurta"],
      dietary: { vegetarian: true },
      sortOrder: 20
    },
    {
      id: `${restaurantSlug}-soup`,
      restaurantSlug,
      categoryId: category("starters"),
      name: "Mercimek Çorbası",
      translations: {
        tr: {
          translatedName: "Mercimek Çorbası",
          description: "Kırmızı mercimek, soğan ve baharatlarla hazırlanan klasik çorba."
        },
        en: {
          translatedName: "Red Lentil Soup",
          description:
            "Classic Turkish soup made with red lentils, onion, mild spices and lemon."
        },
        de: global
          ? {
              translatedName: "Rote Linsensuppe",
              description: "Klassische türkische Suppe aus roten Linsen und milden Gewürzen."
            }
          : undefined
      },
      price: Math.round(105 * priceRatio),
      currency: "TRY",
      imageUrl: img.soup,
      isPopular: false,
      isActive: true,
      dietary: { vegan: true, vegetarian: true },
      sortOrder: 10
    },
    {
      id: `${restaurantSlug}-lahmacun`,
      restaurantSlug,
      categoryId: category("starters"),
      name: "Lahmacun",
      translations: {
        tr: {
          translatedName: "Lahmacun",
          description:
            "İnce hamur üzerinde baharatlı kıyma, domates, biber ve yeşillikle servis edilir."
        },
        en: {
          translatedName: "Lahmacun",
          description:
            "Thin Turkish flatbread topped with spiced minced meat, tomato and pepper, served with greens."
        }
      },
      price: Math.round(130 * priceRatio),
      currency: "TRY",
      imageUrl: img.kebab,
      tag: "Fırın",
      isPopular: true,
      isActive: true,
      allergens: ["Gluten"],
      sortOrder: 20
    },
    {
      id: `${restaurantSlug}-adana`,
      restaurantSlug,
      categoryId: category("mains"),
      name: "Adana Kebap",
      translations: {
        tr: {
          translatedName: "Adana Kebap",
          description:
            "Zırh kıymasıyla hazırlanan acılı kebap; köz biber, domates ve lavaşla servis edilir."
        },
        en: {
          translatedName: "Adana Kebab",
          description:
            "Spicy Turkish minced meat kebab served with roasted pepper, tomato and lavash bread."
        },
        ru: global
          ? {
              translatedName: "Адана кебаб",
              description: "Острый турецкий кебаб из рубленого мяса с перцем, томатом и лавашем."
            }
          : undefined
      },
      price: Math.round(390 * priceRatio),
      currency: "TRY",
      imageUrl: img.kebab,
      tag: "Acılı",
      isPopular: true,
      isActive: true,
      allergens: ["Gluten"],
      dietary: { spicy: true },
      sortOrder: 10
    },
    {
      id: `${restaurantSlug}-pasta`,
      restaurantSlug,
      categoryId: category("mains"),
      name: "Ege Otlu Makarna",
      translations: {
        tr: {
          translatedName: "Ege Otlu Makarna",
          description:
            "Ege otları, zeytinyağı, sarımsak ve parmesanla hazırlanan hafif makarna."
        },
        en: {
          translatedName: "Aegean Herb Pasta",
          description:
            "Light pasta prepared with Aegean herbs, olive oil, garlic and parmesan cheese."
        },
        it: global
          ? {
              translatedName: "Pasta alle erbe dell'Egeo",
              description: "Pasta leggera con erbe dell'Egeo, olio d'oliva, aglio e parmigiano."
            }
          : undefined
      },
      price: Math.round(285 * priceRatio),
      currency: "TRY",
      imageUrl: img.pasta,
      isPopular: false,
      isActive: true,
      allergens: ["Gluten", "Süt ürünleri"],
      dietary: { vegetarian: true },
      sortOrder: 20
    },
    {
      id: `${restaurantSlug}-kunefe`,
      restaurantSlug,
      categoryId: category("desserts"),
      name: "Künefe",
      translations: {
        tr: {
          translatedName: "Künefe",
          description:
            "Tel kadayıf, tuzsuz peynir ve şerbetle hazırlanan sıcak geleneksel tatlı."
        },
        en: {
          translatedName: "Künefe",
          description:
            "Warm Turkish dessert made with shredded pastry, mild cheese and syrup."
        }
      },
      price: Math.round(220 * priceRatio),
      currency: "TRY",
      imageUrl: img.kunefe,
      tag: "Sıcak",
      isPopular: true,
      isActive: true,
      allergens: ["Gluten", "Süt ürünleri"],
      sortOrder: 10
    },
    {
      id: `${restaurantSlug}-brownie`,
      restaurantSlug,
      categoryId: category("desserts"),
      name: "Sıcak Brownie",
      translations: {
        tr: {
          translatedName: "Sıcak Brownie",
          description: "Yoğun çikolatalı brownie, vanilyalı dondurma ile sıcak servis edilir."
        },
        en: {
          translatedName: "Warm Brownie",
          description: "Rich chocolate brownie served warm with vanilla ice cream."
        }
      },
      price: Math.round(205 * priceRatio),
      currency: "TRY",
      imageUrl: img.cheesecake,
      isPopular: false,
      isActive: true,
      allergens: ["Gluten", "Süt ürünleri", "Yumurta"],
      sortOrder: 20
    },
    {
      id: `${restaurantSlug}-lemonade`,
      restaurantSlug,
      categoryId: category("drinks"),
      name: "Ev Yapımı Limonata",
      translations: {
        tr: {
          translatedName: "Ev Yapımı Limonata",
          description: "Taze limon, nane ve az şekerle günlük hazırlanan ferah içecek."
        },
        en: {
          translatedName: "Homemade Lemonade",
          description: "Refreshing drink prepared daily with fresh lemon, mint and light sugar."
        },
        zh: global
          ? {
              translatedName: "自制柠檬水",
              description: "每日用新鲜柠檬、薄荷和少量糖制成的清爽饮品。"
            }
          : undefined
      },
      price: Math.round(115 * priceRatio),
      currency: "TRY",
      imageUrl: img.lemonade,
      isPopular: false,
      isActive: true,
      dietary: { vegan: true, vegetarian: true, glutenFree: true },
      sortOrder: 10
    },
    {
      id: `${restaurantSlug}-coldbrew`,
      restaurantSlug,
      categoryId: category("drinks"),
      name: "Cold Brew",
      translations: {
        tr: {
          translatedName: "Cold Brew",
          description: "12 saat soğuk demleme yöntemiyle hazırlanan yumuşak içimli kahve."
        },
        en: {
          translatedName: "Cold Brew",
          description: "Smooth coffee brewed cold for 12 hours and served over ice."
        }
      },
      price: Math.round(135 * priceRatio),
      currency: "TRY",
      imageUrl: img.coffee,
      tag: "Soğuk",
      isPopular: false,
      isActive: true,
      dietary: { vegan: true, vegetarian: true, glutenFree: true },
      sortOrder: 20
    }
  ].filter(Boolean) as MenuItem[];
}
