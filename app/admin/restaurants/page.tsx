import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RestaurantForm } from "@/components/admin/RestaurantForm";
import { RestaurantList } from "@/components/admin/RestaurantList";
import prisma from "@/lib/prisma";

export default async function AdminRestaurantsPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!tenantId) {
    redirect("/login");
  }

  const branches = await prisma.branch.findMany({
    where: {
      tenantId
    },
    orderBy: {
      updatedAt: "desc"
    }
  });

  return (
    <div className="space-y-6">
      <RestaurantList branches={branches} />
      <RestaurantForm />
    </div>
  );
}
