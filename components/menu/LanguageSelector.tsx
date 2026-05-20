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
      {languages.map((language) => (
        <button
          type="button"
          key={language.code}
          onClick={() => onChange(language.code)}
          className={clsx(
            "shrink-0 rounded-md px-3 py-2 text-sm font-black transition",
            selectedLanguage === language.code
              ? "bg-ink text-white shadow-soft"
              : "bg-white text-graphite ring-1 ring-ink/10 hover:text-ember"
          )}
        >
          {language.nativeName}
        </button>
      ))}
    </div>
  );
}
