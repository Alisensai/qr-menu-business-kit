import type { ReviewReplyTemplate } from "@/types";

export const reviewReplyTemplates: ReviewReplyTemplate[] = [
  {
    id: "positive-tr",
    type: "positive",
    label: "Olumlu yorum",
    languageCode: "tr",
    template:
      "Değerli yorumunuz için çok teşekkür ederiz. Deneyiminizden memnun kalmanıza çok sevindik. Sizi tekrar ağırlamaktan mutluluk duyarız."
  },
  {
    id: "negative-tr",
    type: "negative",
    label: "Olumsuz yorum",
    languageCode: "tr",
    template:
      "Geri bildiriminiz için teşekkür ederiz. Yaşadığınız olumsuz deneyim için üzgünüz. Hizmet kalitemizi artırmak adına yorumunuzu ekibimizle paylaşacağız. Sizi tekrar daha iyi bir deneyimle ağırlamak isteriz."
  },
  {
    id: "slow-service-tr",
    type: "slow-service",
    label: "Geç servis yorumu",
    languageCode: "tr",
    template:
      "Zaman ayırıp yorumunuzu paylaştığınız için teşekkür ederiz. Servis süresiyle ilgili yaşadığınız aksaklık için üzgünüz. Ekibimizle birlikte süreci iyileştirmek için gerekli kontrolleri yapacağız."
  },
  {
    id: "taste-praise-tr",
    type: "taste-praise",
    label: "Lezzet övgüsü",
    languageCode: "tr",
    template:
      "Güzel sözleriniz bizim için çok değerli. Lezzetlerimizi beğenmenize çok sevindik. Sizi yeniden soframızda görmek isteriz."
  },
  {
    id: "price-complaint-tr",
    type: "price-complaint",
    label: "Fiyat şikayeti",
    languageCode: "tr",
    template:
      "Geri bildiriminiz için teşekkür ederiz. Fiyatlandırmamızı ürün kalitesi, porsiyon ve servis standartlarımızı dikkate alarak belirliyoruz. Yorumunuzu değerlendirme sürecimize dahil edeceğiz."
  },
  {
    id: "tourist-en",
    type: "tourist",
    label: "Turist yorumu",
    languageCode: "en",
    template:
      "Thank you for your kind feedback. We are glad you enjoyed your visit. We would be happy to welcome you again."
  },
  {
    id: "english-en",
    type: "english",
    label: "İngilizce yorum",
    languageCode: "en",
    template:
      "Thank you for sharing your experience with us. Your feedback is valuable, and we hope to host you again soon."
  },
  {
    id: "arabic-ar",
    type: "arabic",
    label: "Arapça yorum",
    languageCode: "ar",
    template:
      "شكراً جزيلاً على تعليقكم الكريم. يسعدنا أن تجربتكم كانت جيدة، ونتطلع إلى استقبالكم مرة أخرى."
  },
  {
    id: "russian-ru",
    type: "russian",
    label: "Rusça yorum",
    languageCode: "ru",
    template:
      "Большое спасибо за ваш отзыв. Мы рады, что вам понравилось, и будем счастливы видеть вас снова."
  }
];
