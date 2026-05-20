import { menuCategories, menuItems, restaurants } from "@/data/restaurants";

export function getRestaurantBySlug(slug: string) {
  const restaurant = restaurants.find((item) => item.slug === slug);

  if (!restaurant) {
    return null;
  }

  const categories = menuCategories
    .filter((category) => category.restaurantSlug === slug)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const items = menuItems
    .filter((item) => item.restaurantSlug === slug)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    restaurant,
    categories,
    items
  };
}
