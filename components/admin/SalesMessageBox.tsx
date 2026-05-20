import { CopyButton } from "@/components/ui/CopyButton";

const salesMessage =
  "Merhaba, işletmeniz için QR menü + İngilizce menü çevirisi + Google yorum cevap paketi hazırlıyorum.\n\nBu sistemle müşterileriniz masadaki QR kodu okutarak menünüzü telefondan görebilir. Menü Türkçe/İngilizce olarak hazırlanır; isterseniz Arapça, Rusça, Almanca veya diğer diller de eklenebilir.\n\nAyrıca Google yorumlarınıza profesyonel cevap taslakları hazırlıyorum. İsterseniz 1 ürününüz için ücretsiz örnek menü çevirisi ve 3 yorum cevabı hazırlayıp gösterebilirim.";

export function SalesMessageBox() {
  const whatsappText = `https://wa.me/?text=${encodeURIComponent(salesMessage)}`;

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-black text-ink">Satış mesajı</h2>
          <p className="mt-1 text-sm text-graphite/64">WhatsApp veya Instagram DM için hazır metin.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={salesMessage} label="Kopyala" className="bg-ember hover:bg-saffron" />
          <a href={whatsappText} className="inline-flex items-center rounded-md border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition hover:border-saffron hover:text-ember">
            WhatsApp mesajı
          </a>
        </div>
      </div>
      <pre className="mt-4 whitespace-pre-wrap rounded-md bg-porcelain p-4 text-sm leading-6 text-graphite">
        {salesMessage}
      </pre>
    </section>
  );
}
