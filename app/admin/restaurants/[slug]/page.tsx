import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { CustomerDeliveryBox } from "@/components/admin/CustomerDeliveryBox";
import { MenuEditor } from "@/components/admin/MenuEditor";
import { RestaurantForm } from "@/components/admin/RestaurantForm";
import { TranslationStatus } from "@/components/admin/TranslationStatus";
import { QRCodeCard } from "@/components/menu/QRCodeCard";
import { restaurants } from "@/data/restaurants";
import { getRestaurantBySlug } from "@/lib/getRestaurantBySlug";
import { getMenuUrl } from "@/lib/menuUrl";
import prisma from "@/lib/prisma";

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
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!tenantId) {
    redirect("/login");
  }

  const branch = await prisma.branch.findFirst({
    where: {
      tenantId,
      slug
    }
  });

  if (branch) {
    const categories = await prisma.menuCategory.findMany({
      where: {
        branchId: branch.id
      },
      orderBy: {
        sortOrder: "asc"
      },
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
        sortOrder: true
      }
    });
    const items = await prisma.menuItem.findMany({
      where: {
        category: {
          branchId: branch.id
        }
      },
      orderBy: [
        {
          sortOrder: "asc"
        },
        {
          createdAt: "asc"
        }
      ],
      select: {
        id: true,
        categoryId: true,
        name: true,
        description: true,
        price: true,
        currency: true,
        imageUrl: true,
        tag: true,
        isPopular: true,
        isActive: true,
        allergens: true,
        isVegan: true,
        isVegetarian: true,
        isSpicy: true,
        isGlutenFree: true,
        sortOrder: true
      }
    });

    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">Tenant sube detayi</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-5xl">{branch.name}</h1>
        </div>

        <RestaurantForm
          branch={{
            id: branch.id,
            name: branch.name,
            slug: branch.slug,
            description: branch.description,
            location: branch.location,
            phone: branch.phone,
            instagramUrl: branch.instagramUrl,
            googleMapsUrl: branch.googleMapsUrl,
            coverImageUrl: branch.coverImageUrl,
            logoUrl: branch.logoUrl,
            openingHours: branch.openingHours,
            currency: branch.currency,
            isActive: branch.isActive
          }}
        />
        <CategoryManager branchId={branch.id} categories={categories} />
        <MenuEditor
          branchCurrency={branch.currency}
          categories={categories}
          items={items.map((item) => ({
            ...item,
            price: item.price.toString()
          }))}
        />
      </div>
    );
  }

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
