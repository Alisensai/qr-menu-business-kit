"use client";

import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/languageUtils";
import { useCartStore } from "@/store/useCartStore";

interface CartDrawerProps {
  branchId: string;
  restaurantName: string;
  tableCode?: string;
  qrCode?: string;
  isOpen: boolean;
  onClose: () => void;
}

type OrderSubmitState = "idle" | "submitting" | "success" | "error";

export function CartDrawer({
  branchId,
  restaurantName,
  tableCode,
  qrCode,
  isOpen,
  onClose
}: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const updateNote = useCartStore((state) => state.updateNote);
  const clearCart = useCartStore((state) => state.clearCart);
  const [customerNote, setCustomerNote] = useState("");
  const [submitState, setSubmitState] = useState<OrderSubmitState>("idle");
  const [submitError, setSubmitError] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const currency = items[0]?.currency ?? "TRY";

  function closeDrawer() {
    setSubmitState("idle");
    setSubmitError("");
    setConfirmationCode("");
    setCustomerNote("");
    onClose();
  }

  async function submitOrder() {
    if (items.length === 0 || submitState === "submitting") {
      return;
    }

    setSubmitState("submitting");
    setSubmitError("");

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        branchId,
        tableCode,
        qrCode,
        customerNote,
        items: items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          note: item.note
        }))
      })
    });

    const result = (await response.json().catch(() => null)) as
      | { orderId?: string; error?: string }
      | null;

    if (!response.ok || !result?.orderId) {
      setSubmitState("error");
      setSubmitError(result?.error ?? "Siparis kaydedilemedi. Lutfen tekrar deneyin.");
      return;
    }

    clearCart();
    setCustomerNote("");
    setConfirmationCode(result.orderId.slice(0, 8).toUpperCase());
    setSubmitState("success");
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Sepeti kapat"
        onClick={closeDrawer}
        className="absolute inset-0 bg-[#07111f]/60 backdrop-blur-sm"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute inset-x-0 bottom-0 max-h-[92vh] overflow-hidden rounded-t-[1.6rem] border border-[#d8bf93] bg-[#fff7ea] shadow-[0_-24px_90px_rgba(7,17,31,0.38)] sm:bottom-5 sm:left-auto sm:right-5 sm:top-5 sm:w-[28rem] sm:rounded-[1.6rem]"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-[#ead8b9] bg-[#07111f] px-4 py-4 text-[#fff3df]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f0c76b]">
                Canli Siparis
              </p>
              <h2 id="cart-title" className="mt-1 font-display text-2xl font-bold">
                Sepetiniz
              </h2>
              <p className="mt-1 text-xs leading-5 text-white/70">
                {restaurantName}
                {tableCode ? ` | Masa ${tableCode}` : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={closeDrawer}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/15 bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c76b]"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          {submitState === "success" ? (
            <div className="grid flex-1 content-center gap-4 px-5 py-8 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#eaf1db] text-[#435b2d]">
                <CheckCircle2 className="h-9 w-9" />
              </span>
              <div>
                <h3 className="font-display text-3xl font-bold text-[#07111f]">
                  Siparisiniz Alindi
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5d564c]">
                  Siparis mutfaga iletildi. Takip kodunuz{" "}
                  <span className="font-black text-[#8a5d22]" dir="ltr">
                    {confirmationCode}
                  </span>
                  .
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="mx-auto inline-flex h-12 items-center rounded-md bg-[#07111f] px-5 text-sm font-black text-[#fff3df] transition hover:bg-[#13243a]"
              >
                Menuye Don
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {items.length === 0 ? (
                  <div className="grid min-h-56 place-items-center rounded-[1.2rem] border border-dashed border-[#d8bf93] bg-white/65 px-5 text-center">
                    <div>
                      <ShoppingBag className="mx-auto h-8 w-8 text-[#9a7640]" />
                      <p className="mt-3 font-black text-[#07111f]">Sepetiniz bos.</p>
                      <p className="mt-1 text-sm leading-6 text-[#655d52]">
                        Urun kartlarindan secim yaparak siparisi baslatin.
                      </p>
                    </div>
                  </div>
                ) : (
                  items.map((item) => (
                    <article
                      key={item.menuItemId}
                      className="rounded-[1.2rem] border border-[#ead8b9] bg-white p-3 shadow-[0_16px_38px_rgba(20,17,15,0.07)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-black text-[#07111f]">{item.name}</h3>
                          <p className="mt-1 text-sm font-black text-[#8a5d22]" dir="ltr">
                            {formatCurrency(item.price, item.currency)}
                          </p>
                        </div>
                        <div
                          className="inline-flex shrink-0 items-center rounded-md border border-[#e0c899] bg-[#fff5df]"
                          dir="ltr"
                        >
                          <button
                            type="button"
                            onClick={() => decreaseItem(item.menuItemId)}
                            className="grid h-9 w-9 place-items-center text-[#07111f] transition hover:bg-[#f0dfbb]"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="h-4 w-4" />
                            ) : (
                              <Minus className="h-4 w-4" />
                            )}
                          </button>
                          <span className="min-w-8 text-center text-sm font-black text-[#07111f]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseItem(item.menuItemId)}
                            className="grid h-9 w-9 place-items-center text-[#07111f] transition hover:bg-[#f0dfbb]"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <label className="mt-3 grid gap-1.5 text-xs font-bold text-[#5d564c]">
                        Urune ozel not
                        <textarea
                          value={item.note}
                          onChange={(event) => updateNote(item.menuItemId, event.target.value)}
                          maxLength={220}
                          rows={2}
                          placeholder="Orn: sogansiz, az acili"
                          className="resize-none rounded-md border border-[#e6d3b0] bg-[#fff8ec] px-3 py-2 text-sm font-semibold text-[#07111f] outline-none transition placeholder:text-[#877766] focus:border-[#c99639]"
                        />
                      </label>
                    </article>
                  ))
                )}

                {items.length > 0 ? (
                  <label className="grid gap-1.5 rounded-[1.2rem] border border-[#ead8b9] bg-white p-3 text-xs font-bold text-[#5d564c]">
                    Siparis notu
                    <textarea
                      value={customerNote}
                      onChange={(event) => setCustomerNote(event.target.value)}
                      maxLength={280}
                      rows={2}
                      placeholder="Masa icin genel bir not ekleyin"
                      className="resize-none rounded-md border border-[#e6d3b0] bg-[#fff8ec] px-3 py-2 text-sm font-semibold text-[#07111f] outline-none transition placeholder:text-[#877766] focus:border-[#c99639]"
                    />
                  </label>
                ) : null}

                {submitError ? (
                  <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
                    {submitError}
                  </p>
                ) : null}
              </div>

              <footer className="border-t border-[#ead8b9] bg-[#fff0d5] px-4 py-4">
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[#6b6257]">Toplam</p>
                    <p className="font-display text-3xl font-bold text-[#07111f]" dir="ltr">
                      {formatCurrency(total, currency)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearCart}
                    disabled={items.length === 0}
                    className="text-sm font-black text-[#8a5d22] transition hover:text-[#07111f] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Sepeti Temizle
                  </button>
                </div>
                <button
                  type="button"
                  onClick={submitOrder}
                  disabled={items.length === 0 || submitState === "submitting"}
                  className="inline-flex h-12 w-full items-center justify-center rounded-md bg-[#07111f] text-sm font-black text-[#fff3df] shadow-[0_16px_34px_rgba(7,17,31,0.2)] transition hover:bg-[#13243a] disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {submitState === "submitting" ? "Siparis Kaydediliyor..." : "Siparisi Gonder"}
                </button>
              </footer>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
