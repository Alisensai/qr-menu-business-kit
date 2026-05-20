import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuPageClient } from "@/components/menu/MenuPageClient";
import { restaurants } from "@/data/restaurants";
import { getRestaurantBySlug } from "@/lib/getRestaurantBySlug";
import type { LanguageCode } from "@/types";

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    slug: restaurant.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getRestaurantBySlug(slug);

  if (!data) {
    return {
      title: "Menü bulunamadı"
    };
  }

  return {
    title: `${data.restaurant.name} QR Menü`,
    description: data.restaurant.description
  };
}

export default async function MenuPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const data = getRestaurantBySlug(slug);

  if (!data) {
    notFound();
  }

  const initialLanguage = data.restaurant.activeLanguages.includes(lang as LanguageCode)
    ? (lang as LanguageCode)
    : undefined;

  return (
    <MenuPageClient
      restaurant={data.restaurant}
      categories={data.categories}
      items={data.items}
      initialLanguage={initialLanguage}
    />
  );
}
