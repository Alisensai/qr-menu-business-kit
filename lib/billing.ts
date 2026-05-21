import type Stripe from "stripe";
import type { PackageType } from "@/types";

const stripePriceEnvByPackage: Record<PackageType, string> = {
  starter: "STRIPE_PRICE_STARTER",
  tourist: "STRIPE_PRICE_TOURIST",
  global: "STRIPE_PRICE_GLOBAL",
  maintenance: "STRIPE_PRICE_MAINTENANCE"
};

const packageTypes = new Set<PackageType>([
  "starter",
  "tourist",
  "global",
  "maintenance"
]);

export function parsePackageType(value: FormDataEntryValue | string | null | undefined) {
  const packageType = typeof value === "string" ? value.trim().toLowerCase() : "";

  return packageTypes.has(packageType as PackageType) ? (packageType as PackageType) : null;
}

export function toPrismaPackageType(packageType: PackageType) {
  switch (packageType) {
    case "tourist":
      return "TOURIST" as const;
    case "global":
      return "GLOBAL" as const;
    case "maintenance":
      return "MAINTENANCE" as const;
    default:
      return "STARTER" as const;
  }
}

export function getStripePriceId(packageType: PackageType) {
  const envName = stripePriceEnvByPackage[packageType];
  const priceId = process.env[envName]?.trim();

  if (!priceId) {
    throw new Error(`${envName} is required for ${packageType} checkout.`);
  }

  return priceId;
}

export function hasStripePrice(packageType: PackageType) {
  return Boolean(process.env[stripePriceEnvByPackage[packageType]]?.trim());
}

export function addOneMonth(date = new Date()) {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + 1);
  return nextDate;
}

export function getStripePeriodEnd(subscription: Stripe.Subscription) {
  const periodEnd = Math.max(
    ...subscription.items.data.map((item) => item.current_period_end)
  );

  return Number.isFinite(periodEnd) ? new Date(periodEnd * 1000) : addOneMonth();
}

export function getStripeCustomerId(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined
) {
  return typeof customer === "string" ? customer : customer?.id ?? null;
}

export function getStripeSubscriptionId(
  subscription: string | Stripe.Subscription | null | undefined
) {
  return typeof subscription === "string" ? subscription : subscription?.id ?? null;
}

export function mapStripeSubscriptionStatus(status: Stripe.Subscription.Status) {
  switch (status) {
    case "active":
      return "ACTIVE" as const;
    case "trialing":
      return "TRIALING" as const;
    case "paused":
      return "PAUSED" as const;
    case "canceled":
    case "incomplete_expired":
      return "CANCELED" as const;
    default:
      return "PAST_DUE" as const;
  }
}

export function isTenantMenuExpired(
  status: "TRIALING" | "ACTIVE" | "PAST_DUE" | "PAUSED" | "CANCELED",
  subscriptionEndsAt: Date | null
) {
  if (status === "PAST_DUE" || status === "PAUSED" || status === "CANCELED") {
    return true;
  }

  return Boolean(subscriptionEndsAt && subscriptionEndsAt.getTime() <= Date.now());
}
