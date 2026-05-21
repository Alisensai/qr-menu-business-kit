import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuPageClient } from "@/components/menu/MenuPageClient";
import { getPackageLanguages } from "@/lib/languageUtils";
import prisma from "@/lib/prisma";
import type {
  CurrencyCode,
  LanguageCode,
  MenuCategory,
  MenuItem,
  PackageType,
  Restaurant
} from "@/types";

export const dynamic = "force-dynamic";

const fallbackCoverImageUrl =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80";

function getPackageType(packageType: string): PackageType {
  if (packageType === "TOURIST") {
    return "tourist";
  }

  if (packageType === "GLOBAL") {
    return "global";
  }

  if (packageType === "MAINTENANCE") {
    return "maintenance";
  }

  return "starter";
}

function getCurrency(currency: string): CurrencyCode {
  if (currency === "EUR" || currency === "USD") {
    return currency;
  }

  return "TRY";
}

function getActiveLanguages(packageType: PackageType) {
  const packageLanguages = getPackageLanguages(packageType);

  return packageLanguages.length > 0 ? packageLanguages : (["tr", "en"] satisfies LanguageCode[]);
}

function getItemDescription(description: string | null) {
  return description?.trim() || "Aciklama hazirlaniyor.";
}

async function getBranchMenu(slug: string) {
  return prisma.branch.findFirst({
    where: {
      slug,
      isActive: true
    },
    include: {
      tenant: {
        select: {
          packageType: true
        }
      },
      categories: {
        where: {
          isActive: true
        },
        orderBy: {
          sortOrder: "asc"
        },
        include: {
          items: {
            where: {
              isActive: true
            },
            orderBy: [
              {
                sortOrder: "asc"
              },
              {
                createdAt: "asc"
              }
            ]
          }
        }
      }
    }
  });
}

function toMenuPageData(branch: NonNullable<Awaited<ReturnType<typeof getBranchMenu>>>) {
  const packageType = getPackageType(branch.tenant.packageType);
  const restaurant: Restaurant = {
    id: branch.id,
    name: branch.name,
    slug: branch.slug,
    description: branch.description ?? `${branch.name} dijital menusu.`,
    location: branch.location ?? "Konum bilgisi hazirlaniyor",
    phone: branch.phone ?? "",
    instagramUrl: branch.instagramUrl ?? "https://instagram.com",
    googleMapsUrl: branch.googleMapsUrl ?? "https://maps.google.com",
    coverImageUrl: branch.coverImageUrl ?? fallbackCoverImageUrl,
    logoUrl: branch.logoUrl ?? undefined,
    packageType,
    activeLanguages: getActiveLanguages(packageType),
    openingHours: branch.openingHours ?? "Calisma saatleri hazirlaniyor",
    currency: getCurrency(branch.currency),
    status: "active",
    createdAt: branch.createdAt.toISOString().slice(0, 10)
  };
  const categories: MenuCategory[] = branch.categories.map((category) => ({
    id: category.id,
    restaurantSlug: branch.slug,
    translations: {
      tr: { name: category.name },
      en: { name: category.name }
    },
    isActive: category.isActive,
    sortOrder: category.sortOrder
  }));
  const items: MenuItem[] = branch.categories.flatMap((category) =>
    category.items.map((item) => {
      const description = getItemDescription(item.description);

      return {
        id: item.id,
        restaurantSlug: branch.slug,
        categoryId: item.categoryId,
        name: item.name,
        translations: {
          tr: {
            translatedName: item.name,
            description
          },
          en: {
            translatedName: item.name,
            description
          }
        },
        price: item.price.toNumber(),
        currency: getCurrency(item.currency),
        imageUrl: item.imageUrl ?? undefined,
        tag: item.tag ?? undefined,
        isPopular: item.isPopular,
        isActive: item.isActive,
        allergens: item.allergens,
        dietary: {
          vegan: item.isVegan,
          vegetarian: item.isVegetarian,
          spicy: item.isSpicy,
          glutenFree: item.isGlutenFree
        },
        sortOrder: item.sortOrder
      };
    })
  );

  return {
    restaurant,
    categories,
    items
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = await prisma.branch.findFirst({
    where: {
      slug,
      isActive: true
    },
    select: {
      name: true,
      description: true
    }
  });

  if (!branch) {
    return {
      title: "Menu bulunamadi"
    };
  }

  return {
    title: `${branch.name} QR Menu`,
    description: branch.description ?? `${branch.name} dijital menusu.`
  };
}

export default async function MenuPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string; table?: string; qr?: string }>;
}) {
  const { slug } = await params;
  const { lang, table, qr } = await searchParams;
  const branch = await getBranchMenu(slug);

  if (!branch) {
    notFound();
  }

  const data = toMenuPageData(branch);
  const initialLanguage = data.restaurant.activeLanguages.includes(lang as LanguageCode)
    ? (lang as LanguageCode)
    : undefined;

  return (
    <MenuPageClient
      restaurant={data.restaurant}
      categories={data.categories}
      items={data.items}
      initialLanguage={initialLanguage}
      orderSource={{
        tableCode: table,
        qrCode: qr
      }}
    />
  );
}
