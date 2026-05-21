import type Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  addOneMonth,
  getStripeCustomerId,
  getStripePeriodEnd,
  getStripeSubscriptionId,
  mapStripeSubscriptionStatus,
  parsePackageType,
  toPrismaPackageType
} from "@/lib/billing";
import prisma from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

type TenantSubscriptionUpdate = {
  packageType?: ReturnType<typeof parsePackageType>;
  stripeCustomerId?: string | null;
  tenantId?: string | null;
};

async function syncSubscription(
  subscription: Stripe.Subscription,
  fallback: TenantSubscriptionUpdate = {}
) {
  const tenantId = subscription.metadata.tenantId || fallback.tenantId;
  const packageType = parsePackageType(subscription.metadata.packageType) ?? fallback.packageType;

  if (!tenantId) {
    return;
  }

  await prisma.tenant.updateMany({
    where: {
      id: tenantId
    },
    data: {
      ...(packageType ? { packageType: toPrismaPackageType(packageType) } : {}),
      stripeCustomerId: getStripeCustomerId(subscription.customer) ?? fallback.stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: mapStripeSubscriptionStatus(subscription.status),
      subscriptionEndsAt: getStripePeriodEnd(subscription)
    }
  });
}

async function syncCompletedCheckout(session: Stripe.Checkout.Session) {
  const tenantId = session.metadata?.tenantId ?? session.client_reference_id;
  const packageType = parsePackageType(session.metadata?.packageType);
  const stripeCustomerId = getStripeCustomerId(session.customer);
  const subscriptionId = getStripeSubscriptionId(session.subscription);

  if (!tenantId) {
    return;
  }

  if (subscriptionId) {
    const subscription = await getStripe().subscriptions.retrieve(subscriptionId);

    await syncSubscription(subscription, {
      tenantId,
      packageType,
      stripeCustomerId
    });
    return;
  }

  await prisma.tenant.updateMany({
    where: {
      id: tenantId
    },
    data: {
      ...(packageType ? { packageType: toPrismaPackageType(packageType) } : {}),
      stripeCustomerId,
      subscriptionStatus: "ACTIVE",
      subscriptionEndsAt: addOneMonth()
    }
  });
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      {
        error: "Stripe webhook signature configuration is missing."
      },
      {
        status: 400
      }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret
    );
  } catch {
    return NextResponse.json(
      {
        error: "Invalid Stripe webhook signature."
      },
      {
        status: 400
      }
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      await syncCompletedCheckout(event.data.object);
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await syncSubscription(event.data.object);
      break;
    default:
      break;
  }

  return NextResponse.json({
    received: true
  });
}
