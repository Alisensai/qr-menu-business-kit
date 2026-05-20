"use client";

import { LockKeyhole, QrCode } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useState, useSyncExternalStore } from "react";

const ADMIN_ACCESS_KEY = "qr-menu-admin-demo-access";
const ADMIN_ACCESS_EVENT = "qr-menu-admin-demo-access-change";
const DEMO_PASSWORD = "demo123";

function hasStoredAccess() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.localStorage.getItem(ADMIN_ACCESS_KEY) === "granted" ||
    window.sessionStorage.getItem(ADMIN_ACCESS_KEY) === "granted"
  );
}

function subscribeToAccessChange(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(ADMIN_ACCESS_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(ADMIN_ACCESS_EVENT, callback);
  };
}

function grantDemoAccess() {
  window.localStorage.setItem(ADMIN_ACCESS_KEY, "granted");
  window.sessionStorage.setItem(ADMIN_ACCESS_KEY, "granted");
  window.dispatchEvent(new Event(ADMIN_ACCESS_EVENT));
}

export function AdminGate({ children }: { children: ReactNode }) {
  const hasAccess = useSyncExternalStore(subscribeToAccessChange, hasStoredAccess, () => false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");

    if (password === DEMO_PASSWORD) {
      grantDemoAccess();
      setError("");
      return;
    }

    setError("Şifre hatalı. Demo şifresini kontrol edin.");
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <main className="grid min-h-screen place-items-center bg-porcelain px-4 py-12">
      <section className="w-full max-w-md rounded-lg border border-ink/10 bg-white p-6 shadow-lift">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-saffron text-ink">
            <QrCode className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">QR Menu Kit</p>
            <h1 className="text-2xl font-black text-ink">Admin Demo Girişi</h1>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-graphite/72">
          Bu alan işletme menülerini ve teslim paketlerini yönetmek için kullanılır.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-graphite">
            Demo şifresi
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="demo123"
              className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none transition focus:border-saffron"
            />
          </label>

          {error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</p>
          ) : null}

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-black text-white transition hover:bg-ember"
          >
            <LockKeyhole className="h-4 w-4" />
            Giriş yap
          </button>
        </form>
      </section>
    </main>
  );
}
