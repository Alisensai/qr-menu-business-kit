import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { extraLanguagePricing, pricingPackages } from "@/data/packages";
import { getLanguageLabel } from "@/lib/languageUtils";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-porcelain py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-5xl">Paket fiyatlandırma</h2>
            <p className="mt-4 text-base leading-7 text-graphite/76">
              Başlangıçtan global çok dilli menüye kadar satışta anlatması kolay, teslimatta yönetmesi net paketler.
            </p>
          </div>
          <Link href="/pricing" className="inline-flex w-fit rounded-md bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-ember">
            Tüm paketleri aç
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {pricingPackages.map((plan) => (
            <article
              key={plan.id}
              className={`relative rounded-lg border p-6 shadow-soft ${
                plan.highlight
                  ? "border-saffron bg-ink text-white"
                  : "border-ink/10 bg-white text-ink"
              }`}
            >
              {plan.highlight && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-saffron px-3 py-2 text-xs font-black text-ink">
                  <Sparkles className="h-4 w-4" />
                  En çok satılabilir
                </div>
              )}
              <h3 className="text-xl font-black">{plan.name}</h3>
              <p className={`mt-2 text-sm leading-6 ${plan.highlight ? "text-white/72" : "text-graphite/70"}`}>
                {plan.description}
              </p>
              <p className="mt-6 text-3xl font-black">{plan.price}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {plan.activeLanguages.slice(0, 5).map((language) => (
                  <span
                    key={language}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold ${
                      plan.highlight ? "bg-white/12 text-white" : "bg-porcelain text-graphite"
                    }`}
                  >
                    {getLanguageLabel(language)}
                  </span>
                ))}
                {plan.activeLanguages.length > 5 && (
                  <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${plan.highlight ? "bg-white/12" : "bg-porcelain"}`}>
                    +{plan.activeLanguages.length - 5}
                  </span>
                )}
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? "text-saffron" : "text-sage"}`} />
                    <span className={plan.highlight ? "text-white/82" : "text-graphite/78"}>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h3 className="font-bold text-ink">Ekstra dil fiyatlandırması</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {extraLanguagePricing.map((item) => (
              <span key={item} className="rounded-md bg-linen px-3 py-2 text-sm font-semibold text-graphite">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
