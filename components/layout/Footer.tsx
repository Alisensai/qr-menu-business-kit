import Link from "next/link";
import { Camera, MessageCircle, QrCode } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-3 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-saffron text-ink">
              <QrCode className="h-5 w-5" />
            </span>
            QR Menu Business Kit
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/68">
            Restoranlar, kafeler ve turistik işletmeler için QR menü, açıklamalı çok dilli menü ve Google yorum cevap altyapısı.
          </p>
        </div>

        <div className="grid gap-3 text-sm text-white/72">
          <Link href="/menu/mavi-kiyi-bistro" className="hover:text-white">Demo Menü</Link>
          <Link href="/pricing" className="hover:text-white">Paketler</Link>
        </div>

        <div className="grid content-start gap-3 text-sm">
          <a href="https://wa.me/905320001020" className="inline-flex items-center gap-2 text-white/72 hover:text-white">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a href="https://instagram.com" className="inline-flex items-center gap-2 text-white/72 hover:text-white">
            <Camera className="h-4 w-4" />
            Instagram DM
          </a>
        </div>
      </div>
    </footer>
  );
}
