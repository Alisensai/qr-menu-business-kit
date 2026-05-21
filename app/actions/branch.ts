"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

const RESTAURANTS_PATH = "/admin/restaurants";
const SUPPORTED_CURRENCIES = new Set(["TRY", "EUR", "USD"]);

function getRequiredString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();

  if (!value) {
    throw new Error(`${key} is required.`);
  }

  return value;
}

function getOptionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || null;
}

function getBranchInput(formData: FormData) {
  const name = getRequiredString(formData, "name");
  const slug = slugify(getRequiredString(formData, "slug"));
  const currency = getRequiredString(formData, "currency").toUpperCase();

  if (!slug) {
    throw new Error("slug is required.");
  }

  if (!SUPPORTED_CURRENCIES.has(currency)) {
    throw new Error("Unsupported branch currency.");
  }

  return {
    name,
    slug,
    description: getOptionalString(formData, "description"),
    location: getOptionalString(formData, "location"),
    phone: getOptionalString(formData, "phone"),
    instagramUrl: getOptionalString(formData, "instagramUrl"),
    googleMapsUrl: getOptionalString(formData, "googleMapsUrl"),
    coverImageUrl: getOptionalString(formData, "coverImageUrl"),
    logoUrl: getOptionalString(formData, "logoUrl"),
    openingHours: getOptionalString(formData, "openingHours"),
    currency,
    isActive: formData.get("isActive") === "on"
  };
}

async function getAuthenticatedTenantId() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!tenantId) {
    redirect("/login");
  }

  return tenantId;
}

function revalidateRestaurantAdmin() {
  revalidatePath(RESTAURANTS_PATH);
}

export async function createBranch(formData: FormData) {
  const tenantId = await getAuthenticatedTenantId();
  const branch = getBranchInput(formData);

  await prisma.branch.create({
    data: {
      tenantId,
      ...branch
    }
  });

  revalidateRestaurantAdmin();
}

export async function updateBranch(formData: FormData) {
  const tenantId = await getAuthenticatedTenantId();
  const branchId = getRequiredString(formData, "branchId");
  const branch = getBranchInput(formData);

  const result = await prisma.branch.updateMany({
    where: {
      id: branchId,
      tenantId
    },
    data: branch
  });

  if (result.count === 0) {
    throw new Error("Branch not found for the current tenant.");
  }

  revalidateRestaurantAdmin();
}

export async function deleteBranch(formData: FormData) {
  const tenantId = await getAuthenticatedTenantId();
  const branchId = getRequiredString(formData, "branchId");

  const result = await prisma.branch.deleteMany({
    where: {
      id: branchId,
      tenantId
    }
  });

  if (result.count === 0) {
    throw new Error("Branch not found for the current tenant.");
  }

  revalidateRestaurantAdmin();
}
