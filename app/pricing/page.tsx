import { ContactSection } from "@/components/landing/ContactSection";
import { SubscriptionPricingSection } from "@/components/billing/SubscriptionPricingSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function PricingPage({
  searchParams
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const [session, params] = await Promise.all([auth(), searchParams]);
  const tenant = session?.user?.tenantId
    ? await prisma.tenant.findUnique({
        where: {
          id: session.user.tenantId
        },
        select: {
          name: true,
          packageType: true,
          subscriptionStatus: true,
          subscriptionEndsAt: true
        }
      })
    : null;
  const checkoutState =
    params.checkout === "success" || params.checkout === "cancelled"
      ? params.checkout
      : undefined;

  return (
    <>
      <Header />
      <main className="pt-16">
        <SubscriptionPricingSection
          checkoutState={checkoutState}
          tenant={tenant}
          viewerRole={session?.user?.role ?? null}
        />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
