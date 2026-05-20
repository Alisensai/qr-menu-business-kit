import type { MenuCategory } from "@/types";
import { getCategoryTranslation } from "@/lib/languageUtils";

interface CategoryManagerProps {
  categories: MenuCategory[];
}

export function CategoryManager({ categories }: CategoryManagerProps) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-black text-ink">Kategori yönetimi</h2>
          <p className="mt-1 text-sm text-graphite/64">Sıralama, aktif/pasif durumu ve kategori adları.</p>
        </div>
        <button type="button" className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-ember">
          Kategori ekle
        </button>
      </div>
      <div className="mt-4 grid gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="grid gap-3 rounded-md bg-porcelain px-4 py-3 sm:grid-cols-[80px_1fr_110px_110px]"
          >
            <span className="text-sm font-black text-ember">#{category.sortOrder}</span>
            <span className="font-bold text-ink">{getCategoryTranslation(category, "tr").name}</span>
            <span className="text-sm font-semibold text-graphite/64">{category.id.split("-").slice(-1)[0]}</span>
            <span className={`text-sm font-black ${category.isActive ? "text-sage" : "text-ember"}`}>
              {category.isActive ? "Aktif" : "Pasif"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
