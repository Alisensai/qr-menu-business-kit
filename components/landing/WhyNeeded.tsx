import { CheckCircle2 } from "lucide-react";

const reasons = [
  "Basılı menü değişim maliyeti azalır",
  "Yabancı müşteriler menüyü daha rahat anlar",
  "Google yorumları profesyonel görünür",
  "Menü linki Instagram/WhatsApp üzerinden paylaşılabilir",
  "Fiyat ve ürün güncellemesi kolaylaşır"
];

export function WhyNeeded() {
  return (
    <section className="bg-ink py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-5xl">Neden gerekli?</h2>
          <p className="mt-4 text-base leading-7 text-white/70">
            QR menü tek başına teknik bir link değildir; doğru anlatılmış çok dilli menü ve hızlı yorum cevaplarıyla işletmenin dijital vitrinine dönüşür.
          </p>
        </div>
        <div className="grid gap-3">
          {reasons.map((reason) => (
            <div key={reason} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/8 p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-saffron" />
              <p className="font-semibold text-white/90">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
