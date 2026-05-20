"use client";

import { useMemo, useState } from "react";
import { reviewReplyTemplates } from "@/data/reviewTemplates";
import { CopyButton } from "@/components/ui/CopyButton";

export function ReviewReplyModule() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(reviewReplyTemplates[0]?.id ?? "");
  const [comment, setComment] = useState("");
  const selectedTemplate = useMemo(
    () => reviewReplyTemplates.find((template) => template.id === selectedTemplateId) ?? reviewReplyTemplates[0],
    [selectedTemplateId]
  );

  const replyText = selectedTemplate?.template ?? "";

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">Google yorum cevap modülü</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-5xl">Profesyonel cevap taslakları</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite/70">
          İlk MVP hazır şablonla çalışır. İleride aynı arayüz AI cevap servisine bağlanabilir.
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-graphite">
            Yorum tipi seçimi
            <select
              value={selectedTemplateId}
              onChange={(event) => setSelectedTemplateId(event.target.value)}
              className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron"
            >
              {reviewReplyTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-graphite">
            Müşteri yorum metni
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={8}
              placeholder="Müşteri yorumunu buraya yapıştırın"
              className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron"
            />
          </label>
        </div>

        <div className="rounded-lg bg-porcelain p-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-ink">Cevap taslağı</h2>
              <p className="mt-1 text-sm text-graphite/64">{selectedTemplate?.languageCode.toUpperCase()} şablon</p>
            </div>
            <CopyButton text={replyText} label="Cevabı kopyala" className="bg-ember hover:bg-saffron" />
          </div>
          <textarea
            value={replyText}
            readOnly
            rows={10}
            className="mt-4 w-full rounded-md border border-ink/10 bg-white px-3 py-3 text-sm leading-6 text-ink"
          />
        </div>
      </div>
    </section>
  );
}
