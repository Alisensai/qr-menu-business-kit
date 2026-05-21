import Image from "next/image";
import { Camera, Clock3, MapPin, Phone } from "lucide-react";
import type { Restaurant } from "@/types";

interface MenuHeaderProps {
  restaurant: Restaurant;
}

const chipClassName =
  "inline-flex shrink-0 items-center gap-2 rounded-md border border-white/[0.14] bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 shadow-[0_16px_40px_rgba(4,10,20,0.2)] backdrop-blur transition hover:border-saffron/70 hover:bg-white/[0.16] hover:text-white";

export function MenuHeader({ restaurant }: MenuHeaderProps) {
  const logoMark = restaurant.logoUrl ?? restaurant.name.slice(0, 2);

  return (
    <header className="relative isolate overflow-hidden bg-[#07111f] text-white">
      <div className="relative h-[16.5rem] sm:h-[19rem]">
        <Image
          src={restaurant.coverImageUrl}
          alt={`${restaurant.name} kapak görseli`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,0.25)_0%,rgba(5,14,28,0.72)_42%,rgba(5,13,25,0.98)_100%)]" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-6xl px-4 pb-5 sm:px-6 sm:pb-7 lg:px-8">
          <div className="flex items-end gap-4">
            <div className="relative grid h-16 w-16 shrink-0 place-items-center border border-saffron/80 bg-[#081527]/[0.78] text-lg font-black text-[#f5d48d] shadow-[0_18px_48px_rgba(2,8,18,0.4)] backdrop-blur sm:h-[4.5rem] sm:w-[4.5rem]">
              <span className="absolute inset-1 border border-[#f5d48d]/[0.35]" />
              <span className="relative tracking-[0.12em]" dir="ltr">
                {logoMark}
              </span>
            </div>
            <div className="min-w-0 pb-0.5">
              <h1 className="font-display text-[2rem] font-bold leading-none text-[#fff7ea] sm:text-5xl">
                {restaurant.name}
              </h1>
              <p className="mt-2 max-w-2xl line-clamp-2 text-sm leading-6 text-white/[0.72] sm:text-base">
                {restaurant.description}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className={chipClassName}
            >
              <MapPin className="h-3.5 w-3.5 text-[#e4bd62]" />
              {restaurant.location}
            </a>
            <a href={`tel:${restaurant.phone}`} className={chipClassName} dir="ltr">
              <Phone className="h-3.5 w-3.5 text-[#e4bd62]" />
              {restaurant.phone}
            </a>
            <span className={chipClassName}>
              <Clock3 className="h-3.5 w-3.5 text-[#e4bd62]" />
              {restaurant.openingHours}
            </span>
            <a
              href={restaurant.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={chipClassName}
            >
              <Camera className="h-3.5 w-3.5 text-[#e4bd62]" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
