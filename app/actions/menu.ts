"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

const SORT_ORDER_STEP = 10;
const SUPPORTED_CURRENCIES = new Set(["TRY", "EUR", "USD"]);
const MENU_IMAGE_MAX_BYTES = 4_000_000;
const MENU_IMAGE_EXTENSIONS = {
  "image/avif": "avif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
} as const;

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

function getSortOrder(formData: FormData) {
  const value = String(formData.get("sortOrder") ?? "").trim();

  if (!value) {
    return null;
  }

  const sortOrder = Number(value);

  if (!Number.isInteger(sortOrder) || sortOrder < 0) {
    throw new Error("sortOrder must be a non-negative integer.");
  }

  return sortOrder;
}

function getCurrency(formData: FormData) {
  const currency = getRequiredString(formData, "currency").toUpperCase();

  if (!SUPPORTED_CURRENCIES.has(currency)) {
    throw new Error("Unsupported menu item currency.");
  }

  return currency;
}

function getPrice(formData: FormData) {
  const price = getRequiredString(formData, "price").replace(",", ".");
  const amount = Number(price);

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("price must be a non-negative number.");
  }

  return price;
}

function getAllergens(formData: FormData) {
  return String(formData.get("allergens") ?? "")
    .split(",")
    .map((allergen) => allergen.trim())
    .filter(Boolean);
}

function getItemInput(formData: FormData) {
  return {
    name: getRequiredString(formData, "name"),
    description: getOptionalString(formData, "description"),
    price: getPrice(formData),
    currency: getCurrency(formData),
    imageUrl: getOptionalString(formData, "imageUrl"),
    tag: getOptionalString(formData, "tag"),
    isPopular: formData.get("isPopular") === "on",
    isActive: formData.get("isActive") === "on",
    allergens: getAllergens(formData),
    isVegan: formData.get("isVegan") === "on",
    isVegetarian: formData.get("isVegetarian") === "on",
    isSpicy: formData.get("isSpicy") === "on",
    isGlutenFree: formData.get("isGlutenFree") === "on"
  };
}

function getMenuImage(formData: FormData) {
  const file = formData.get("imageFile");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("A menu item image is required.");
  }

  if (!(file.type in MENU_IMAGE_EXTENSIONS)) {
    throw new Error("Menu item images must be AVIF, JPG, PNG, or WebP.");
  }

  if (file.size > MENU_IMAGE_MAX_BYTES) {
    throw new Error("Menu item images must be 4 MB or smaller.");
  }

  return {
    file,
    extension: MENU_IMAGE_EXTENSIONS[file.type as keyof typeof MENU_IMAGE_EXTENSIONS]
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

async function getAuthorizedBranch(branchId: string, tenantId: string) {
  const branch = await prisma.branch.findFirst({
    where: {
      id: branchId,
      tenantId
    },
    select: {
      id: true,
      slug: true
    }
  });

  if (!branch) {
    throw new Error("Branch not found for the current tenant.");
  }

  return branch;
}

async function getAuthorizedCategory(categoryId: string, tenantId: string) {
  const category = await prisma.menuCategory.findFirst({
    where: {
      id: categoryId,
      branch: {
        tenantId
      }
    },
    select: {
      id: true,
      branchId: true,
      sortOrder: true,
      branch: {
        select: {
          slug: true
        }
      }
    }
  });

  if (!category) {
    throw new Error("Menu category not found for the current tenant.");
  }

  return category;
}

async function getAuthorizedItem(itemId: string, tenantId: string) {
  const item = await prisma.menuItem.findFirst({
    where: {
      id: itemId,
      category: {
        branch: {
          tenantId
        }
      }
    },
    select: {
      id: true,
      categoryId: true,
      sortOrder: true,
      category: {
        select: {
          branch: {
            select: {
              id: true,
              slug: true
            }
          }
        }
      }
    }
  });

  if (!item) {
    throw new Error("Menu item not found for the current tenant.");
  }

  return item;
}

async function getNextCategorySortOrder(branchId: string) {
  const aggregate = await prisma.menuCategory.aggregate({
    where: {
      branchId
    },
    _max: {
      sortOrder: true
    }
  });

  return (aggregate._max.sortOrder ?? 0) + SORT_ORDER_STEP;
}

async function getNextItemSortOrder(categoryId: string) {
  const aggregate = await prisma.menuItem.aggregate({
    where: {
      categoryId
    },
    _max: {
      sortOrder: true
    }
  });

  return (aggregate._max.sortOrder ?? 0) + SORT_ORDER_STEP;
}

function revalidateMenuAdmin(branchSlug: string) {
  revalidatePath("/admin/restaurants");
  revalidatePath(`/admin/restaurants/${branchSlug}`);
}

function revalidateMenuRoutes(branchSlug: string) {
  revalidateMenuAdmin(branchSlug);
  revalidatePath(`/menu/${branchSlug}`);
}

export async function createMenuCategory(formData: FormData) {
  const tenantId = await getAuthenticatedTenantId();
  const branchId = getRequiredString(formData, "branchId");
  const branch = await getAuthorizedBranch(branchId, tenantId);
  const name = getRequiredString(formData, "name");
  const slug = slugify(getRequiredString(formData, "slug"));
  const sortOrder = getSortOrder(formData) ?? (await getNextCategorySortOrder(branch.id));

  if (!slug) {
    throw new Error("Category slug is required.");
  }

  await prisma.menuCategory.create({
    data: {
      branchId: branch.id,
      name,
      slug,
      isActive: formData.get("isActive") === "on",
      sortOrder
    }
  });

  revalidateMenuAdmin(branch.slug);
}

export async function updateMenuCategory(formData: FormData) {
  const tenantId = await getAuthenticatedTenantId();
  const categoryId = getRequiredString(formData, "categoryId");
  const category = await getAuthorizedCategory(categoryId, tenantId);
  const name = getRequiredString(formData, "name");
  const slug = slugify(getRequiredString(formData, "slug"));

  if (!slug) {
    throw new Error("Category slug is required.");
  }

  await prisma.menuCategory.update({
    where: {
      id: category.id
    },
    data: {
      name,
      slug,
      isActive: formData.get("isActive") === "on",
      sortOrder: getSortOrder(formData) ?? category.sortOrder
    }
  });

  revalidateMenuRoutes(category.branch.slug);
}

export async function deleteMenuCategory(formData: FormData) {
  const tenantId = await getAuthenticatedTenantId();
  const categoryId = getRequiredString(formData, "categoryId");
  const category = await getAuthorizedCategory(categoryId, tenantId);

  await prisma.menuCategory.delete({
    where: {
      id: category.id
    }
  });

  revalidateMenuAdmin(category.branch.slug);
}

export async function createMenuItem(formData: FormData) {
  const tenantId = await getAuthenticatedTenantId();
  const categoryId = getRequiredString(formData, "categoryId");
  const category = await getAuthorizedCategory(categoryId, tenantId);
  const sortOrder = getSortOrder(formData) ?? (await getNextItemSortOrder(category.id));

  await prisma.menuItem.create({
    data: {
      categoryId: category.id,
      ...getItemInput(formData),
      sortOrder
    }
  });

  revalidateMenuAdmin(category.branch.slug);
}

export async function updateMenuItem(formData: FormData) {
  const tenantId = await getAuthenticatedTenantId();
  const itemId = getRequiredString(formData, "itemId");
  const item = await getAuthorizedItem(itemId, tenantId);
  const categoryId = getRequiredString(formData, "categoryId");
  const nextCategory = await getAuthorizedCategory(categoryId, tenantId);

  if (nextCategory.branchId !== item.category.branch.id) {
    throw new Error("Menu items can only move within their current branch.");
  }

  const requestedSortOrder = getSortOrder(formData);
  const sortOrder =
    requestedSortOrder ??
    (item.categoryId === nextCategory.id
      ? item.sortOrder
      : await getNextItemSortOrder(nextCategory.id));

  await prisma.menuItem.update({
    where: {
      id: item.id
    },
    data: {
      categoryId: nextCategory.id,
      ...getItemInput(formData),
      sortOrder
    }
  });

  revalidateMenuRoutes(nextCategory.branch.slug);
}

export async function uploadMenuItemImage(formData: FormData) {
  const tenantId = await getAuthenticatedTenantId();
  const itemId = getRequiredString(formData, "itemId");
  const item = await getAuthorizedItem(itemId, tenantId);
  const { file, extension } = getMenuImage(formData);

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required to upload menu item images.");
  }

  const blob = await put(
    `menu-items/${item.category.branch.slug}/${item.id}.${extension}`,
    file,
    {
      access: "public",
      addRandomSuffix: true
    }
  );

  await prisma.menuItem.update({
    where: {
      id: item.id
    },
    data: {
      imageUrl: blob.url
    }
  });

  revalidateMenuRoutes(item.category.branch.slug);
}

export async function deleteMenuItem(formData: FormData) {
  const tenantId = await getAuthenticatedTenantId();
  const itemId = getRequiredString(formData, "itemId");
  const item = await getAuthorizedItem(itemId, tenantId);

  await prisma.menuItem.delete({
    where: {
      id: item.id
    }
  });

  revalidateMenuRoutes(item.category.branch.slug);
}
