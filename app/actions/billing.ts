"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  getStripePriceId,
  parsePackageType
} from "@/lib/billing";
import { getSiteUrl } from "@/lib/menuUrl";
import prisma from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function startSubscriptionCheckout(formData: FormData) {
  const session = await auth();

  if (!session?.user?.tenantId) {
    redirect("/login?callbackUrl=/pricing");
  }

  if (session.user.role === "SUPER_ADMIN") {
    throw new Error("Super admins do not start tenant subscription checkouts.");
  }

  const packageType = parsePackageType(formData.get("packageType"));

  if (!packageType) {
    throw new Error("Unsupported subscription package.");
  }

  const tenant = await prisma.tenant.findUnique({
    where: {
      id: session.user.tenantId
    },
    select: {
      id: true,
      stripeCustomerId: true
    }
  });

  if (!tenant) {
    throw new Error("Tenant not found for the current user.");
  }

  const stripe = getStripe();
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: getStripePriceId(packageType),
        quantity: 1
      }
    ],
    customer: tenant.stripeCustomerId ?? undefined,
    customer_email: tenant.stripeCustomerId ? undefined : session.user.email ?? undefined,
    client_reference_id: tenant.id,
    allow_promotion_codes: true,
    success_url: `${getSiteUrl()}/pricing?checkout=success`,
    cancel_url: `${getSiteUrl()}/pricing?checkout=cancelled`,
    metadata: {
      tenantId: tenant.id,
      packageType
    },
    subscription_data: {
      metadata: {
        tenantId: tenant.id,
        packageType
      }
    }
  });

  if (!checkoutSession.url) {
    throw new Error("Stripe Checkout did not return a redirect URL.");
  }

  redirect(checkoutSession.url);
}
