"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { AssetDownloadButtons, useResolvedMenuUrl } from "@/components/menu/AssetDownloadButtons";
import { CopyButton } from "@/components/ui/CopyButton";

interface QRCodeCardProps {
  menuUrl: string;
  restaurantName: string;
  restaurantSlug: string;
  compact?: boolean;
}

export function QRCodeCard({
  menuUrl,
  restaurantName,
  restaurantSlug,
  compact = false
}: QRCodeCardProps) {
  const resolvedMenuUrl = useResolvedMenuUrl(menuUrl);

  return (
    <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">QR Menü</p>
          <h3 className="mt-1 text-lg font-bold text-ink">{restaurantName}</h3>
          <p className="mt-1 break-all text-sm text-graphite/70">{resolvedMenuUrl}</p>
        </div>
        <Link
          href={resolvedMenuUrl}
          className="rounded-md border border-ink/10 p-2 text-ink transition hover:border-saffron hover:text-ember"
          title="Menüyü aç"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      <div
        className={`mt-4 grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-[150px_1fr]"}`}
      >
        <div className="flex justify-center rounded-md bg-linen p-4">
          <QRCodeSVG value={resolvedMenuUrl} size={compact ? 136 : 150} fgColor="#1c2430" />
        </div>
        <div className="rounded-md border border-dashed border-saffron/60 bg-porcelain p-4 text-center">
          <p className="text-base font-bold text-ink">Menümüzü görmek için QR kodu okutun</p>
          <p className="mt-1 text-sm font-semibold text-ember">Scan for menu</p>
          <p className="mt-3 text-sm text-graphite">Türkçe / English / العربية / Русский</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <CopyButton text={resolvedMenuUrl} label="Menü linkini kopyala" className="bg-ember hover:bg-saffron" />
        <AssetDownloadButtons
          menuUrl={resolvedMenuUrl}
          restaurantName={restaurantName}
          restaurantSlug={restaurantSlug}
        />
      </div>
    </div>
  );
}
