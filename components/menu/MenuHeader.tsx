import Image from "next/image";
import { Camera, Clock, MapPin, Phone } from "lucide-react";
import type { Restaurant } from "@/types";

interface MenuHeaderProps {
  restaurant: Restaurant;
}

export function MenuHeader({ restaurant }: MenuHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-ink text-white">
      <div className="relative h-60 sm:h-72">
        <Image
          src={restaurant.coverImageUrl}
          alt={`${restaurant.name} kapak görseli`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/54 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-lg border border-white/18 bg-white/16 text-xl font-black backdrop-blur">
            {restaurant.logoUrl ?? restaurant.name.slice(0, 2)}
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-5xl">{restaurant.name}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/78">{restaurant.description}</p>
          <div className="mt-4 grid gap-2 text-sm text-white/82 sm:grid-cols-2">
            <a href={restaurant.googleMapsUrl} className="inline-flex items-center gap-2 hover:text-saffron">
              <MapPin className="h-4 w-4" />
              {restaurant.location}
            </a>
            <a href={`tel:${restaurant.phone}`} className="inline-flex items-center gap-2 hover:text-saffron">
              <Phone className="h-4 w-4" />
              {restaurant.phone}
            </a>
            <a href={restaurant.instagramUrl} className="inline-flex items-center gap-2 hover:text-saffron">
              <Camera className="h-4 w-4" />
              Instagram
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {restaurant.openingHours}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
