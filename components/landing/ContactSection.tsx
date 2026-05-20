import { Camera, MessageCircle } from "lucide-react";

export function ContactSection() {
  return (
    <section className="bg-lagoon py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-5xl">Ücretsiz örnek menü hazırlayalım</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            Bir ürününüz için turist dostu İngilizce açıklama ve 3 Google yorum cevabı örneğiyle başlayabilirsiniz.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="https://wa.me/905320001020?text=%C3%9Ccretsiz%20%C3%B6rnek%20QR%20men%C3%BC%20haz%C4%B1rlamak%20istiyorum."
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black text-lagoon transition hover:bg-saffron hover:text-ink"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
          <a
            href="https://instagram.com"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-black text-white transition hover:bg-white hover:text-lagoon"
          >
            <Camera className="h-5 w-5" />
            Instagram DM
          </a>
        </div>
      </div>
    </section>
  );
}
