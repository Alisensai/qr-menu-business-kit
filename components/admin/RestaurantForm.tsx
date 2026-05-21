"use client";

import { useState } from "react";
import { createBranch, deleteBranch, updateBranch } from "@/app/actions/branch";
import { slugify } from "@/lib/slugify";
import type { CurrencyCode, Restaurant } from "@/types";

export interface EditableBranch {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  location: string | null;
  phone: string | null;
  instagramUrl: string | null;
  googleMapsUrl: string | null;
  coverImageUrl: string | null;
  logoUrl: string | null;
  openingHours: string | null;
  currency: string;
  isActive: boolean;
}

interface RestaurantFormProps {
  restaurant?: Restaurant;
  branch?: EditableBranch;
}

interface BranchFormState {
  name: string;
  slug: string;
  description: string;
  location: string;
  phone: string;
  instagramUrl: string;
  googleMapsUrl: string;
  coverImageUrl: string;
  logoUrl: string;
  openingHours: string;
  currency: CurrencyCode;
  isActive: boolean;
}

const emptyBranch: BranchFormState = {
  name: "",
  slug: "",
  description: "",
  location: "",
  phone: "",
  instagramUrl: "",
  googleMapsUrl: "",
  coverImageUrl: "",
  logoUrl: "",
  openingHours: "",
  currency: "TRY",
  isActive: true
};

function getInitialFormState(branch?: EditableBranch, restaurant?: Restaurant): BranchFormState {
  if (branch) {
    return {
      name: branch.name,
      slug: branch.slug,
      description: branch.description ?? "",
      location: branch.location ?? "",
      phone: branch.phone ?? "",
      instagramUrl: branch.instagramUrl ?? "",
      googleMapsUrl: branch.googleMapsUrl ?? "",
      coverImageUrl: branch.coverImageUrl ?? "",
      logoUrl: branch.logoUrl ?? "",
      openingHours: branch.openingHours ?? "",
      currency: branch.currency as CurrencyCode,
      isActive: branch.isActive
    };
  }

  if (restaurant) {
    return {
      name: restaurant.name,
      slug: restaurant.slug,
      description: restaurant.description,
      location: restaurant.location,
      phone: restaurant.phone,
      instagramUrl: restaurant.instagramUrl,
      googleMapsUrl: restaurant.googleMapsUrl,
      coverImageUrl: restaurant.coverImageUrl,
      logoUrl: restaurant.logoUrl ?? "",
      openingHours: restaurant.openingHours,
      currency: restaurant.currency,
      isActive: restaurant.status === "active"
    };
  }

  return emptyBranch;
}

export function RestaurantForm({ restaurant, branch }: RestaurantFormProps) {
  const [form, setForm] = useState(() => getInitialFormState(branch, restaurant));
  const isEditing = Boolean(branch);

  function setField<K extends keyof BranchFormState>(key: K, value: BranchFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <form action={isEditing ? updateBranch : createBranch} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      {branch ? <input type="hidden" name="branchId" value={branch.id} /> : null}

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-black text-ink">
            {isEditing ? "Restoran / sube duzenle" : "Restoran / sube olustur"}
          </h2>
          <p className="mt-1 text-sm text-graphite/64">
            Temel sube bilgileri tenant veritabanina kaydedilir.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {branch ? (
            <button
              type="submit"
              formAction={deleteBranch}
              formNoValidate
              className="rounded-md border border-red-200 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
            >
              Sil
            </button>
          ) : null}
          <button type="submit" className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-ember">
            {isEditing ? "Guncelle" : "Kaydet"}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-graphite">
          Restoran adi
          <input
            name="name"
            required
            value={form.name}
            onChange={(event) => {
              const name = event.target.value;
              setForm((current) => ({ ...current, name, slug: current.slug || slugify(name) }));
            }}
            className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-graphite">
          Slug
          <input
            name="slug"
            required
            value={form.slug}
            onChange={(event) => setField("slug", slugify(event.target.value))}
            className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-graphite md:col-span-2">
          Aciklama
          <textarea
            name="description"
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
            rows={3}
            className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-graphite">
          Lokasyon
          <input name="location" value={form.location} onChange={(event) => setField("location", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>

        <label className="grid gap-2 text-sm font-bold text-graphite">
          Telefon
          <input name="phone" value={form.phone} onChange={(event) => setField("phone", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>

        <label className="grid gap-2 text-sm font-bold text-graphite">
          Instagram
          <input name="instagramUrl" value={form.instagramUrl} onChange={(event) => setField("instagramUrl", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>

        <label className="grid gap-2 text-sm font-bold text-graphite">
          Google Maps linki
          <input name="googleMapsUrl" value={form.googleMapsUrl} onChange={(event) => setField("googleMapsUrl", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>

        <label className="grid gap-2 text-sm font-bold text-graphite">
          Kapak gorseli URL
          <input name="coverImageUrl" value={form.coverImageUrl} onChange={(event) => setField("coverImageUrl", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>

        <label className="grid gap-2 text-sm font-bold text-graphite">
          Logo alani
          <input name="logoUrl" value={form.logoUrl} onChange={(event) => setField("logoUrl", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>

        <label className="grid gap-2 text-sm font-bold text-graphite">
          Calisma saatleri
          <input name="openingHours" value={form.openingHours} onChange={(event) => setField("openingHours", event.target.value)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron" />
        </label>

        <label className="grid gap-2 text-sm font-bold text-graphite">
          Para birimi
          <select name="currency" value={form.currency} onChange={(event) => setField("currency", event.target.value as CurrencyCode)} className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none focus:border-saffron">
            <option value="TRY">TRY</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-md bg-porcelain px-3 py-3 text-sm font-bold text-graphite">
          <input
            name="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={(event) => setField("isActive", event.target.checked)}
            className="h-4 w-4 accent-saffron"
          />
          Aktif sube
        </label>
      </div>
    </form>
  );
}
