import { AlertTriangle, CheckCircle2, CircleDashed } from "lucide-react";
import { languages } from "@/data/languages";
import { getTranslationStatus } from "@/lib/translationStatus";
import type { Restaurant } from "@/types";

interface TranslationStatusProps {
  restaurant: Restaurant;
  includeOptional?: boolean;
}

export function TranslationStatus({ restaurant, includeOptional = true }: TranslationStatusProps) {
  const statuses = getTranslationStatus(restaurant);
  const optional = languages
    .filter((language) => !restaurant.activeLanguages.includes(language.code))
    .map((language) => ({
      languageCode: language.code,
      languageName: language.nativeName,
      missingCount: 0,
      totalCount: 0,
      status: "optional" as const
    }));
  const visibleStatuses = includeOptional ? [...statuses, ...optional] : statuses;

  return (
    <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-ink">Çeviri durumu</h2>
          <p className="mt-1 text-sm text-graphite/64">{restaurant.name}</p>
        </div>
        <span className="rounded-md bg-porcelain px-3 py-2 text-xs font-black text-graphite">
          {restaurant.activeLanguages.length} aktif dil
        </span>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {visibleStatuses.map((status) => {
          const complete = status.status === "complete";
          const optionalStatus = status.status === "optional";
          return (
            <div
              key={status.languageCode}
              className="flex items-center justify-between gap-3 rounded-md border border-ink/10 bg-porcelain px-3 py-3"
            >
              <div className="flex items-center gap-2">
                {complete ? (
                  <CheckCircle2 className="h-4 w-4 text-sage" />
                ) : optionalStatus ? (
                  <CircleDashed className="h-4 w-4 text-graphite/45" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-ember" />
                )}
                <span className="text-sm font-bold text-ink">{status.languageName}</span>
              </div>
              <span
                className={`rounded-md px-2 py-1 text-xs font-black ${
                  complete
                    ? "bg-sage/12 text-sage"
                    : optionalStatus
                      ? "bg-white text-graphite/55"
                      : "bg-saffron/18 text-ember"
                }`}
              >
                {complete
                  ? "Tamamlandı"
                  : optionalStatus
                    ? "Opsiyonel"
                    : `${status.missingCount} eksik`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
