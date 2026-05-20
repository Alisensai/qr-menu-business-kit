import { RestaurantForm } from "@/components/admin/RestaurantForm";
import { RestaurantList } from "@/components/admin/RestaurantList";

export default function AdminRestaurantsPage() {
  return (
    <div className="space-y-6">
      <RestaurantList />
      <RestaurantForm />
    </div>
  );
}
