import { notFound } from "next/navigation";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { CustomerDeliveryBox } from "@/components/admin/CustomerDeliveryBox";
import { MenuEditor } from "@/components/admin/MenuEditor";
import { RestaurantForm } from "@/components/admin/RestaurantForm";
import { TranslationStatus } from "@/components/admin/TranslationStatus";
import { QRCodeCard } from "@/components/menu/QRCodeCard";
import { restaurants } from "@/data/restaurants";
import { getRestaurantBySlug } from "@/lib/getRestaurantBySlug";
import { getMenuUrl } from "@/lib/menuUrl";

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    slug: restaurant.slug
  }));
}

export default async function AdminRestaurantDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getRestaurantBySlug(slug);

  if (!data) {
    notFound();
  }

  const menuUrl = getMenuUrl(data.restaurant.slug);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">Restoran detay</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-5xl">
          {data.restaurant.name}
        </h1>
      </div>
      <CustomerDeliveryBox restaurant={data.restaurant} menuUrl={menuUrl} />
      <RestaurantForm restaurant={data.restaurant} />
      <TranslationStatus restaurant={data.restaurant} />
      <CategoryManager categories={data.categories} />
      <MenuEditor restaurant={data.restaurant} categories={data.categories} items={data.items} />
      <section id="qr">
        <QRCodeCard
          menuUrl={menuUrl}
          restaurantName={data.restaurant.name}
          restaurantSlug={data.restaurant.slug}
        />
      </section>
    </div>
  );
}
