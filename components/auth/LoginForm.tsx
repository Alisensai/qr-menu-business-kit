"use client";

import { KeyRound, LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import type { FormEvent } from "react";
import { useState } from "react";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      callbackUrl,
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirect: false
    });

    if (result?.error) {
      setError("E-posta veya sifre dogrulanamadi.");
      setIsSubmitting(false);
      return;
    }

    window.location.assign(result?.url ?? callbackUrl);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <label className="grid gap-2 text-sm font-bold text-graphite">
        E-posta
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none transition focus:border-saffron"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-graphite">
        Sifre
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-md border border-ink/10 bg-porcelain px-3 py-3 text-ink outline-none transition focus:border-saffron"
        />
      </label>

      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-black text-white transition hover:bg-ember disabled:cursor-wait disabled:opacity-70"
      >
        {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
        Giris yap
      </button>
    </form>
  );
}
