"use client";

import clsx from "clsx";
import { CheckCircle2, ChefHat, Clock3, ReceiptText, RefreshCw } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import { formatCurrency } from "@/lib/languageUtils";
import type { OrderStatus } from "@/types";

interface AdminOrderItem {
  id: string;
  menuItemId: string | null;
  itemName: string;
  unitPrice: number;
  currency: string;
  quantity: number;
  note: string | null;
}

interface AdminOrder {
  id: string;
  branch: {
    id: string;
    name: string;
    slug: string;
  };
  tableCode: string | null;
  qrCode: string | null;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  customerNote: string | null;
  createdAt: string;
  updatedAt: string;
  items: AdminOrderItem[];
}

interface OrdersResponse {
  orders: AdminOrder[];
}

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Siparisler yuklenemedi.");
  }

  return (await response.json()) as OrdersResponse;
};

const statusMeta = {
  PENDING: {
    label: "Bekliyor",
    icon: Clock3,
    className: "border-amber-200 bg-amber-50 text-amber-800"
  },
  PREPARING: {
    label: "Hazirlaniyor",
    icon: ChefHat,
    className: "border-sky-200 bg-sky-50 text-sky-800"
  },
  COMPLETED: {
    label: "Tamamlandi",
    icon: CheckCircle2,
    className: "border-emerald-200 bg-emerald-50 text-emerald-800"
  }
} satisfies Record<OrderStatus, { label: string; icon: typeof Clock3; className: string }>;

function formatOrderTime(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

export function OrdersDashboard() {
  const { data, error, isLoading, mutate } = useSWR<OrdersResponse>("/api/orders", fetcher, {
    refreshInterval: 5000
  });
  const [updatingOrderId, setUpdatingOrderId] = useState("");

  async function updateStatus(orderId: string, status: OrderStatus) {
    setUpdatingOrderId(orderId);

    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    setUpdatingOrderId("");

    if (response.ok) {
      await mutate();
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border border-ink/10 bg-white p-5 text-sm font-bold text-graphite shadow-soft">
        Siparisler yukleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-700">
        Siparis listesi alinamadi.
      </div>
    );
  }

  const orders = data?.orders ?? [];

  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-3 rounded-lg border border-ink/10 bg-white p-5 shadow-soft sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">
            Canli mutfak akisi
          </p>
          <h2 className="mt-2 text-2xl font-black text-ink">Siparisler</h2>
          <p className="mt-1 text-sm text-graphite/68">
            Liste 5 saniyede bir yenilenir. Durumu mutfak akisina gore guncelleyin.
          </p>
        </div>
        <button
          type="button"
          onClick={() => mutate()}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-ink/10 bg-porcelain px-4 text-sm font-black text-ink transition hover:border-saffron hover:text-ember"
        >
          <RefreshCw className="h-4 w-4" />
          Yenile
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-dashed border-ink/15 bg-white px-5 py-12 text-center shadow-soft">
          <ReceiptText className="mx-auto h-8 w-8 text-ember" />
          <h3 className="mt-3 text-lg font-black text-ink">Yeni siparis yok.</h3>
          <p className="mt-1 text-sm text-graphite/68">
            QR menuden gelen siparisler burada gorunecek.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {orders.map((order) => {
            const status = statusMeta[order.status];
            const StatusIcon = status.icon;

            return (
              <article
                key={order.id}
                className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft"
              >
                <div className="flex flex-col justify-between gap-3 border-b border-ink/10 pb-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black text-ink">{order.branch.name}</h3>
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-black",
                          status.className
                        )}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-graphite/64" dir="ltr">
                      #{order.id.slice(0, 8).toUpperCase()} | {formatOrderTime(order.createdAt)}
                    </p>
                    <p className="mt-2 text-sm font-bold text-graphite">
                      {order.tableCode ? `Masa ${order.tableCode}` : "Masa bilgisi yok"}
                      {order.qrCode ? ` | QR ${order.qrCode}` : ""}
                    </p>
                  </div>
                  <p className="text-2xl font-black text-ember" dir="ltr">
                    {formatCurrency(order.totalAmount, order.currency)}
                  </p>
                </div>

                <div className="space-y-2 py-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-md bg-porcelain px-3 py-2 text-sm text-graphite"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-black text-ink">
                          {item.quantity}x {item.itemName}
                        </p>
                        <p className="font-black text-ember" dir="ltr">
                          {formatCurrency(item.unitPrice * item.quantity, item.currency)}
                        </p>
                      </div>
                      {item.note ? (
                        <p className="mt-1 text-xs font-semibold text-graphite/70">Not: {item.note}</p>
                      ) : null}
                    </div>
                  ))}
                  {order.customerNote ? (
                    <p className="rounded-md border border-saffron/30 bg-saffron/10 px-3 py-2 text-sm font-bold text-graphite">
                      Siparis notu: {order.customerNote}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2 border-t border-ink/10 pt-3">
                  <button
                    type="button"
                    onClick={() => updateStatus(order.id, "PREPARING")}
                    disabled={order.status === "PREPARING" || updatingOrderId === order.id}
                    className="rounded-md bg-ink px-3 py-2 text-sm font-black text-white transition hover:bg-ember disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Hazirlaniyor
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(order.id, "COMPLETED")}
                    disabled={order.status === "COMPLETED" || updatingOrderId === order.id}
                    className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Tamamlandi
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
