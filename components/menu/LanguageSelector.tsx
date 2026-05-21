"use client";

import clsx from "clsx";
import type { LanguageCode } from "@/types";
import { getLanguages } from "@/lib/languageUtils";

interface LanguageSelectorProps {
  activeLanguages: LanguageCode[];
  selectedLanguage: LanguageCode;
  onChange: (language: LanguageCode) => void;
}

export function LanguageSelector({
  activeLanguages,
  selectedLanguage,
  onChange
}: LanguageSelectorProps) {
  const languages = getLanguages(activeLanguages);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="Dil seçimi">
      {languages.map((language) => {
        const isActive = selectedLanguage === language.code;

        return (
          <button
            type="button"
            key={language.code}
            onClick={() => onChange(language.code)}
            aria-pressed={isActive}
            className={clsx(
              "inline-flex min-h-10 shrink-0 items-center justify-center rounded-md border px-3.5 py-2 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron",
              isActive
                ? "border-[#f0c76b] bg-[#f0c76b] text-[#07111f] shadow-[0_12px_30px_rgba(217,155,43,0.26)]"
                : "border-white/[0.12] bg-white/10 text-[#fff3dc] hover:border-[#f0c76b]/60 hover:bg-white/[0.16]"
            )}
          >
            <span dir={language.direction}>{language.nativeName}</span>
          </button>
        );
      })}
    </div>
  );
}
