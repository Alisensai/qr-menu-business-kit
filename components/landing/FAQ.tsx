const faqs = [
  {
    question: "QR menü için uygulama indirmek gerekir mi?",
    answer: "Hayır. Müşteri telefon kamerasıyla QR kodu okutur ve menü tarayıcıda açılır."
  },
  {
    question: "Menü fiyatları sonradan değiştirilebilir mi?",
    answer: "Evet. Admin panelde fiyat, ürün, kategori ve aktif/pasif durumları düzenlenebilir."
  },
  {
    question: "Kaç dil eklenebilir?",
    answer: "Başlangıç paketinde TR/EN, Turist paketinde TR/EN/AR/RU, Global pakette 10+ dil altyapısı vardır."
  },
  {
    question: "Google yorum cevaplarını kim kullanır?",
    answer: "İşletme sahibi veya sizin paket hazırlama ekibiniz, admin panelden hazır cevap taslaklarını kopyalayabilir."
  },
  {
    question: "Aylık bakım zorunlu mu?",
    answer: "Zorunlu değildir. Sık menü ve fiyat güncelleyen işletmeler için önerilir."
  },
  {
    question: "Menü linki Instagram’a eklenebilir mi?",
    answer: "Evet. Menü linki Instagram bio, WhatsApp ve Google Business profiline eklenebilir."
  }
];

export function FAQ() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-5xl">Sık sorulan sorular</h2>
        <div className="mt-10 grid gap-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-lg border border-ink/10 bg-porcelain p-5">
              <summary className="cursor-pointer list-none text-base font-bold text-ink">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-graphite/74">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
