import { extraLanguagePricing, pricingPackages } from "@/data/packages";
import { getLanguageLabel } from "@/lib/languageUtils";

export function PricingManager() {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div>
        <h2 className="text-lg font-black text-ink">Paket ve dil sistemi</h2>
        <p className="mt-1 text-sm text-graphite/64">Seçili pakete göre aktif dil listesi otomatik belirlenir, admin ek dil açıp kapatabilir.</p>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {pricingPackages.map((plan) => (
          <article key={plan.id} className="rounded-lg bg-porcelain p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-ink">{plan.name}</h3>
                <p className="mt-1 text-sm text-graphite/64">{plan.description}</p>
              </div>
              <span className="rounded-md bg-white px-3 py-2 text-sm font-black text-ember">
                {plan.price}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {plan.activeLanguages.map((language) => (
                <span key={language} className="rounded-md bg-white px-2.5 py-1 text-xs font-black text-graphite">
                  {getLanguageLabel(language)}
                </span>
              ))}
              {plan.activeLanguages.length === 0 && (
                <span className="rounded-md bg-white px-2.5 py-1 text-xs font-black text-graphite">
                  Mevcut restoran dilleri
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-linen p-4">
        <h3 className="font-black text-ink">Ekstra dil fiyatlandırması</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {extraLanguagePricing.map((item) => (
            <span key={item} className="rounded-md bg-white px-3 py-2 text-sm font-bold text-graphite">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
