import { DatabaseZap } from "lucide-react";

export function MockDataNotice() {
  return (
    <div className="mb-6 rounded-lg border border-saffron/35 bg-saffron/12 p-4 text-ink">
      <div className="flex gap-3">
        <DatabaseZap className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
        <div>
          <p className="font-black">Demo / mock data ile çalışıyor</p>
          <p className="mt-1 text-sm leading-6 text-graphite/74">
            Şu an veriler lokal mock data dosyalarından geliyor. Gerçek müşteri kullanımı için
            Supabase entegrasyonu sonraki aşamada yapılacak.
          </p>
        </div>
      </div>
    </div>
  );
}
