# QR Menu Business Kit

Restoran, kafe, butik otel, pansiyon ve turistik işletmelere satılabilecek profesyonel bir **QR Menü + Çok Dilli Menü + Google Yorum Cevap Paketi** MVP'si.

Bu uygulama işletme sahibine kod göstermez. İşletme sahibi QR menü linkini, QR kod görselini, mobil uyumlu menü sayfasını, çok dilli açıklamaları, yorum cevaplarını ve paket fiyatlarını görür. Admin tarafı ise restoran, ürün, paket, dil ve yorum cevap hazırlama akışını yönetmek için tasarlanmıştır.

## Özellikler

- Next.js App Router, TypeScript ve Tailwind CSS
- Modern landing page ve paket fiyatlandırma sayfası
- Mobil öncelikli QR menü sayfası: `/menu/[slug]`
- Paket bazlı aktif dil sistemi
- Türkçe, İngilizce, Arapça, Rusça ve Global paket dilleri
- Arapça/Farsça gibi RTL diller için yön desteği
- Eksik çeviri fallback sistemi
- Admin dashboard, restoran listesi ve restoran detay ekranı
- Kategori, ürün, fiyat, etiket, alerjen ve diyet bilgisi UI'ı
- QR kod gösterimi, QR PNG indirme ve masa kartı PNG indirme
- Google yorum cevap şablonları ve kopyalama butonları
- Hazır satış mesajı ve WhatsApp yönlendirme placeholder'ı
- Mock data ayrı data dosyalarında
- Supabase/Firebase/PostgreSQL entegrasyonuna uygun veri katmanı

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
npm run dev
```

Varsayılan adres:

```bash
http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Kontroller:

```bash
npm run type-check
npm run lint
npm run build
```

## Vercel Deploy

Bu proje Vercel için zero-config Next.js projesi olarak hazırlanmıştır. Ek bir `vercel.json` dosyası zorunlu değildir.

Git ile deploy:

1. Projeyi GitHub, GitLab veya Bitbucket reposuna gönderin.
2. Vercel panelinde **Add New Project** seçin.
3. Repoyu import edin.
4. Vercel framework olarak **Next.js** algılamalıdır.
5. Aşağıdaki ayarlarla deploy edin.

```text
Framework Preset: Next.js
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: .next
Development Command: npm run dev
Node.js Version: 20.x veya üzeri
```

CLI ile preview deploy:

```bash
npm install -g vercel
vercel
```

CLI ile production deploy:

```bash
vercel --prod
```

## Ortam Değişkenleri

MVP şu an mock data ile çalıştığı için zorunlu ortam değişkeni yoktur.

İsteğe bağlı:

```text
NEXT_PUBLIC_SITE_URL=https://kendi-domaininiz.com
```

Bu değer girilirse Next.js metadata URL'si gerçek production domainine göre oluşur. Girilmezse güvenli fallback olarak `https://qr-menu-business-kit.vercel.app` kullanılır.

QR kodların telefon kamerasıyla doğru şekilde açılması için `NEXT_PUBLIC_SITE_URL` production domainiyle ayarlanmalıdır. QR içerikleri relative path değil, tam URL olarak üretilir.

## Admin Demo Koruması

Admin route'ları müşteri demosunda doğrudan görünmesin diye basit bir demo şifre ekranı ile korunur.

```text
Demo şifre: demo123
```

Bu koruma sadece demo amaçlıdır ve gerçek güvenlik sağlamaz. Gerçek müşteri kullanımı için Supabase Auth veya başka bir gerçek authentication sistemi eklenmelidir.

## Klasör Yapısı

```text
app/
  page.tsx
  pricing/page.tsx
  menu/[slug]/page.tsx
  admin/page.tsx
  admin/restaurants/page.tsx
  admin/restaurants/[slug]/page.tsx
  admin/reviews/page.tsx
components/
  admin/
  landing/
  layout/
  menu/
  ui/
data/
  languages.ts
  packages.ts
  restaurants.ts
  reviewTemplates.ts
lib/
  getRestaurantBySlug.ts
  languageUtils.ts
  slugify.ts
  translationStatus.ts
types/
  index.ts
```

## Demo Linkleri

- Landing page: `/`
- Paketler: `/pricing`
- Admin panel: `/admin`
- Restoran listesi: `/admin/restaurants`
- Yorum cevap modülü: `/admin/reviews`
- Mavi Kıyı Bistro: `/menu/mavi-kiyi-bistro`
- Kapadokya Cave Cafe: `/menu/kapadokya-cave-cafe`
- İstanbul Marina Restaurant: `/menu/istanbul-marina-restaurant`

## Deploy Sonrası Kontrol Edilecek Route'lar

- `/`
- `/pricing`
- `/admin`
- `/admin/restaurants`
- `/admin/restaurants/mavi-kiyi-bistro`
- `/admin/reviews`
- `/menu/mavi-kiyi-bistro`
- `/menu/mavi-kiyi-bistro?lang=ar`
- `/menu/kapadokya-cave-cafe`
- `/menu/istanbul-marina-restaurant`

## Demo Restoranlar

1. **Mavi Kıyı Bistro**
   Paket: Turist Paket  
   Diller: TR, EN, AR, RU  
   Lokasyon: Arsuz / İskenderun

2. **Kapadokya Cave Cafe**
   Paket: Global Paket  
   Diller: TR, EN, AR, RU, DE, FR, ES, IT, FA, ZH  
   Lokasyon: Kapadokya

3. **İstanbul Marina Restaurant**
   Paket: Başlangıç Paket  
   Diller: TR, EN  
   Lokasyon: İstanbul

## Veri Modeli

Mock data şu an TypeScript dosyalarından gelir:

- `data/restaurants.ts`: restoranlar, kategoriler ve ürünler
- `data/languages.ts`: dil kodları, native adlar ve RTL bilgisi
- `data/packages.ts`: paketler, fiyatlar ve aktif dil listeleri
- `data/reviewTemplates.ts`: Google yorum cevap şablonları

Bu yapı ileride veritabanına taşınırken servis/repository katmanı eklenerek korunabilir.

## Gelecek Özellikler

- Supabase entegrasyonu
- Gerçek kullanıcı girişi
- AI ile otomatik çeviri
- AI ile otomatik yorum cevabı
- QR kod PNG indirme
- PDF teklif oluşturma
- Masa kartı PDF çıktısı
- Stripe/Lemon Squeezy ödeme
- WhatsApp entegrasyonu
- Çoklu müşteri yönetimi
