import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Smartphone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[86vh] overflow-hidden bg-ink text-white">
      <Image
        src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=80"
        alt="Modern restoran masasında QR menü deneyimi"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/24" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-porcelain to-transparent" />

      <div className="relative mx-auto flex min-h-[86vh] max-w-7xl items-center px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold leading-[1.06] text-white sm:text-6xl lg:text-7xl">
            Restoranınız için QR Menü, Çok Dilli Menü ve Google Yorum Cevapları
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-xl">
            Müşterileriniz masadaki QR kodu okutarak menünüzü telefondan açsın. Menü Türkçe, İngilizce, Arapça, Rusça ve isteğe bağlı global dillerle hazırlanabilir.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/menu/mavi-kiyi-bistro"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-saffron px-6 py-3 text-sm font-bold text-ink transition hover:bg-white"
            >
              <Smartphone className="h-5 w-5" />
              Demo Menüyü Gör
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink"
            >
              Paketleri İncele
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="https://wa.me/905320001020?text=QR%20men%C3%BC%20paketleri%20i%C3%A7in%20teklif%20almak%20istiyorum."
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-ink/20 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-saffron hover:text-saffron"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp’tan Teklif Al
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
