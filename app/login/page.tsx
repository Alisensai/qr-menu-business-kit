import { QrCode } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
  }>;
};

function getSafeCallbackUrl(callbackUrl: string | string[] | undefined) {
  const requestedPath = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;

  if (!requestedPath?.startsWith("/") || requestedPath.startsWith("//")) {
    return "/admin";
  }

  return requestedPath;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = getSafeCallbackUrl(params.callbackUrl);

  if (session?.user) {
    redirect(callbackUrl);
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
            <h1 className="text-2xl font-black text-ink">Admin Girisi</h1>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-graphite/72">
          Isletme menuleri ve teslim paketleri icin yetkili hesabinla devam et.
        </p>

        <LoginForm callbackUrl={callbackUrl} />
      </section>
    </main>
  );
}
