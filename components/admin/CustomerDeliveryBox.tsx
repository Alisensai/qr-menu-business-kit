"use client";

import { MessageCircle, Send } from "lucide-react";
import { useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { AssetDownloadButtons, useResolvedMenuUrl } from "@/components/menu/AssetDownloadButtons";
import { pricingPackages } from "@/data/packages";
import { getLanguageLabel } from "@/lib/languageUtils";
import type { Restaurant } from "@/types";

interface CustomerDeliveryBoxProps {
  restaurant: Restaurant;
  menuUrl: string;
}

export function CustomerDeliveryBox({ restaurant, menuUrl }: CustomerDeliveryBoxProps) {
  const resolvedMenuUrl = useResolvedMenuUrl(menuUrl);
  const packageInfo = pricingPackages.find((item) => item.id === restaurant.packageType);

  const whatsappMessage = useMemo(
    () =>
      `Merhaba, ${restaurant.name} için QR menü demo linkiniz hazır.\n\nMenü linki: ${resolvedMenuUrl}\n\nBu linki Instagram bio, WhatsApp veya Google işletme profilinizde paylaşabilirsiniz. QR kod ve masa kartı görsellerini de ekte kullanabilirsiniz.`,
    [resolvedMenuUrl, restaurant.name]
  );

  const instagramMessage = useMemo(
    () =>
      `Merhaba, ${restaurant.name} QR menü demonuz hazır.\nMenü linki: ${resolvedMenuUrl}\nQR kod ve masa kartı görsellerini işletmenizde kullanabilirsiniz.`,
    [resolvedMenuUrl, restaurant.name]
  );

  return (
    <section id="customer-delivery" className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">Müşteriye Gönder</p>
          <h2 className="mt-2 text-xl font-black text-ink">{restaurant.name} teslim paketi</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-graphite/70">
            Müşteriye gönderilecek link, QR görseli, masa kartı ve hazır mesajlar tek yerde.
          </p>
        </div>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`}
          className="inline-flex w-fit items-center gap-2 rounded-md bg-sage px-4 py-2 text-sm font-bold text-white transition hover:bg-ink"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp aç
        </a>
      </div>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-lg bg-porcelain p-4">
          <p className="text-sm font-black text-ink">Menü linki</p>
          <p className="mt-2 break-all rounded-md bg-white px-3 py-3 text-sm font-semibold text-graphite">
            {resolvedMenuUrl}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <CopyButton text={resolvedMenuUrl} label="Link kopyala" className="bg-ember hover:bg-saffron" />
            <AssetDownloadButtons
              menuUrl={resolvedMenuUrl}
              restaurantName={restaurant.name}
              restaurantSlug={restaurant.slug}
            />
          </div>
        </div>

        <div className="rounded-lg bg-linen p-4">
          <p className="text-sm font-black text-ink">Paket fiyat özeti</p>
          <div className="mt-3 flex items-start justify-between gap-3 rounded-md bg-white p-3">
            <div>
              <p className="font-black text-ink">{packageInfo?.name}</p>
              <p className="mt-1 text-sm text-graphite/64">{packageInfo?.description}</p>
            </div>
            <span className="rounded-md bg-saffron/18 px-3 py-2 text-sm font-black text-ember">
              {packageInfo?.price}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {restaurant.activeLanguages.map((language) => (
              <span key={language} className="rounded-md bg-white px-2.5 py-1 text-xs font-black text-graphite">
                {getLanguageLabel(language)}
              </span>
            ))}
          </div>
          <ul className="mt-4 grid gap-2 text-sm text-graphite/72 sm:grid-cols-2">
            {packageInfo?.features.slice(0, 4).map((feature) => (
              <li key={feature} className="rounded-md bg-white px-3 py-2 font-semibold">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-porcelain p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm font-black text-ink">
              <MessageCircle className="h-4 w-4 text-ember" />
              Hazır WhatsApp satış mesajı
            </p>
            <CopyButton text={whatsappMessage} label="Kopyala" className="bg-ink hover:bg-ember" />
          </div>
          <textarea
            readOnly
            rows={6}
            value={whatsappMessage}
            className="mt-3 w-full rounded-md border border-ink/10 bg-white px-3 py-3 text-sm leading-6 text-ink"
          />
        </div>

        <div className="rounded-lg bg-porcelain p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm font-black text-ink">
              <Send className="h-4 w-4 text-ember" />
              Hazır Instagram DM mesajı
            </p>
            <CopyButton text={instagramMessage} label="Kopyala" className="bg-ink hover:bg-ember" />
          </div>
          <textarea
            readOnly
            rows={6}
            value={instagramMessage}
            className="mt-3 w-full rounded-md border border-ink/10 bg-white px-3 py-3 text-sm leading-6 text-ink"
          />
        </div>
      </div>
    </section>
  );
}
