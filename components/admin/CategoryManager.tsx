import {
  createMenuCategory,
  deleteMenuCategory,
  updateMenuCategory
} from "@/app/actions/menu";
import type { MenuCategory } from "@/types";
import { getCategoryTranslation } from "@/lib/languageUtils";

export interface ManagedMenuCategory {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
}

interface CategoryManagerProps {
  branchId?: string;
  categories: Array<MenuCategory | ManagedMenuCategory>;
}

function isManagedCategory(
  category: MenuCategory | ManagedMenuCategory
): category is ManagedMenuCategory {
  return "name" in category;
}

function getCategoryName(category: MenuCategory | ManagedMenuCategory) {
  return isManagedCategory(category)
    ? category.name
    : getCategoryTranslation(category, "tr").name;
}

export function CategoryManager({ branchId, categories }: CategoryManagerProps) {
  const managedCategories = categories.filter(isManagedCategory);

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-black text-ink">Kategori yonetimi</h2>
          <p className="mt-1 text-sm text-graphite/64">
            Siralama, aktif durum ve kategori adlarini kontrol edin.
          </p>
        </div>
      </div>

      {branchId ? (
        <form
          action={createMenuCategory}
          className="mt-5 grid gap-3 rounded-lg bg-porcelain p-4 md:grid-cols-[1fr_1fr_120px_auto]"
        >
          <input type="hidden" name="branchId" value={branchId} />
          <label className="grid gap-2 text-xs font-bold text-graphite">
            Yeni kategori
            <input
              name="name"
              required
              placeholder="Kahvalti"
              className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron"
            />
          </label>
          <label className="grid gap-2 text-xs font-bold text-graphite">
            Slug
            <input
              name="slug"
              required
              placeholder="kahvalti"
              className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron"
            />
          </label>
          <label className="grid gap-2 text-xs font-bold text-graphite">
            Sira
            <input
              name="sortOrder"
              type="number"
              min="0"
              placeholder="Otomatik"
              className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron"
            />
          </label>
          <div className="grid content-end gap-2">
            <label className="inline-flex items-center gap-2 text-xs font-bold text-graphite">
              <input name="isActive" type="checkbox" defaultChecked className="h-4 w-4 accent-saffron" />
              Aktif
            </label>
            <button
              type="submit"
              className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-ember"
            >
              Ekle
            </button>
          </div>
        </form>
      ) : null}

      {branchId ? (
        <div className="mt-4 grid gap-3">
          {managedCategories.map((category) => (
            <form
              key={category.id}
              action={updateMenuCategory}
              className="grid gap-3 rounded-lg border border-ink/10 bg-porcelain p-4 lg:grid-cols-[110px_1fr_1fr_auto]"
            >
              <input type="hidden" name="categoryId" value={category.id} />
              <label className="grid gap-2 text-xs font-bold text-graphite">
                Sira
                <input
                  name="sortOrder"
                  type="number"
                  min="0"
                  defaultValue={category.sortOrder}
                  className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm font-black text-ember outline-none focus:border-saffron"
                />
              </label>
              <label className="grid gap-2 text-xs font-bold text-graphite">
                Kategori adi
                <input
                  name="name"
                  required
                  defaultValue={category.name}
                  className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron"
                />
              </label>
              <label className="grid gap-2 text-xs font-bold text-graphite">
                Slug
                <input
                  name="slug"
                  required
                  defaultValue={category.slug}
                  className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-saffron"
                />
              </label>
              <div className="grid content-end gap-2 sm:grid-cols-3 lg:grid-cols-1">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-graphite">
                  <input
                    name="isActive"
                    type="checkbox"
                    defaultChecked={category.isActive}
                    className="h-4 w-4 accent-saffron"
                  />
                  Aktif
                </label>
                <button
                  type="submit"
                  className="rounded-md bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-ember"
                >
                  Guncelle
                </button>
                <button
                  type="submit"
                  formAction={deleteMenuCategory}
                  formNoValidate
                  className="rounded-md border border-red-200 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
                >
                  Sil
                </button>
              </div>
            </form>
          ))}

          {managedCategories.length === 0 ? (
            <div className="rounded-md border border-dashed border-ink/15 px-4 py-4 text-sm text-graphite/68">
              Bu sube icin kategori eklenmedi.
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-4 grid gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="grid gap-3 rounded-md bg-porcelain px-4 py-3 sm:grid-cols-[80px_1fr_110px_110px]"
            >
              <span className="text-sm font-black text-ember">#{category.sortOrder}</span>
              <span className="font-bold text-ink">{getCategoryName(category)}</span>
              <span className="text-sm font-semibold text-graphite/64">
                {category.id.split("-").slice(-1)[0]}
              </span>
              <span className={`text-sm font-black ${category.isActive ? "text-sage" : "text-ember"}`}>
                {category.isActive ? "Aktif" : "Pasif"}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
