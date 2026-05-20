import {
  BadgeCheck,
  Languages,
  MessageSquareReply,
  PencilRuler,
  QrCode,
  RefreshCw
} from "lucide-react";

const features = [
  {
    title: "QR Menü",
    description: "Her restoran için benzersiz menü linki ve QR kod görseli.",
    icon: QrCode
  },
  {
    title: "Çok Dilli Menü",
    description: "Türkçe içerikten turistin anlayacağı açıklamalı global menü.",
    icon: Languages
  },
  {
    title: "Google Yorum Cevapları",
    description: "Olumlu, olumsuz ve yabancı müşteri yorumları için profesyonel taslaklar.",
    icon: MessageSquareReply
  },
  {
    title: "Masa QR Kart Tasarımı",
    description: "Masaya konacak sade, premium, çok dilli QR kart ön izlemesi.",
    icon: PencilRuler
  },
  {
    title: "Aylık Menü Güncelleme",
    description: "Fiyat, ürün, kampanya ve sezonluk menü değişiklikleri için bakım paketi.",
    icon: RefreshCw
  },
  {
    title: "Turist Dostu Açıklamalar",
    description: "Kelime çevirisi yerine yemeği içerik ve kültür bağlamıyla anlatan açıklamalar.",
    icon: BadgeCheck
  }
];

export function FeatureCards() {
  return (
    <section id="services" className="bg-porcelain py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-5xl">
            İşletme sahibinin anlayacağı kadar net, müşterinin kullanacağı kadar hızlı.
          </h2>
          <p className="mt-4 text-base leading-7 text-graphite/76">
            Paket yapısı satışa, admin paneli üretime, QR menü ise müşterinin masadaki gerçek deneyimine odaklanır.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
              <feature.icon className="h-8 w-8 text-ember" />
              <h3 className="mt-5 text-xl font-bold text-ink">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-graphite/72">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
