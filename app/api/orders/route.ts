import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface SubmittedOrderItem {
  menuItemId: string;
  quantity: number;
  note: string | null;
}

function getLimitedText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue ? trimmedValue.slice(0, maxLength) : null;
}

function getSubmittedItems(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  const itemsById = new Map<string, SubmittedOrderItem>();

  value.slice(0, 40).forEach((item) => {
    if (!item || typeof item !== "object") {
      return;
    }

    const { menuItemId, quantity, note } = item as Record<string, unknown>;

    if (
      typeof menuItemId !== "string" ||
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return;
    }

    const currentItem = itemsById.get(menuItemId);
    const safeQuantity = Math.min(quantity, 20);

    itemsById.set(menuItemId, {
      menuItemId,
      quantity: Math.min((currentItem?.quantity ?? 0) + safeQuantity, 20),
      note: getLimitedText(note, 220) ?? currentItem?.note ?? null
    });
  });

  return Array.from(itemsById.values());
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const branchId = typeof payload?.branchId === "string" ? payload.branchId : "";
  const submittedItems = getSubmittedItems(payload?.items);

  if (!branchId || submittedItems.length === 0) {
    return Response.json(
      {
        error: "Siparis icin gecerli sube ve urun secimi gerekli."
      },
      {
        status: 400
      }
    );
  }

  const branch = await prisma.branch.findFirst({
    where: {
      id: branchId,
      isActive: true
    },
    select: {
      id: true,
      currency: true
    }
  });

  if (!branch) {
    return Response.json(
      {
        error: "Siparis verilen sube bulunamadi."
      },
      {
        status: 404
      }
    );
  }

  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: {
        in: submittedItems.map((item) => item.menuItemId)
      },
      isActive: true,
      category: {
        branchId: branch.id,
        isActive: true
      }
    },
    select: {
      id: true,
      name: true,
      price: true,
      currency: true
    }
  });
  const menuItemById = new Map(menuItems.map((item) => [item.id, item]));

  if (menuItems.length !== submittedItems.length) {
    return Response.json(
      {
        error: "Sepetteki bazi urunler artik siparis verilemiyor."
      },
      {
        status: 409
      }
    );
  }

  const pricedItems = submittedItems.map((item) => ({
    ...item,
    menuItem: menuItemById.get(item.menuItemId)!
  }));
  const totalAmount = pricedItems.reduce(
    (sum, item) => sum + item.menuItem.price.toNumber() * item.quantity,
    0
  );
  const order = await prisma.order.create({
    data: {
      branchId: branch.id,
      tableCode: getLimitedText(payload?.tableCode, 40),
      qrCode: getLimitedText(payload?.qrCode, 80),
      customerNote: getLimitedText(payload?.customerNote, 280),
      totalAmount,
      currency: branch.currency,
      items: {
        create: pricedItems.map((item) => ({
          menuItemId: item.menuItem.id,
          itemName: item.menuItem.name,
          unitPrice: item.menuItem.price,
          currency: item.menuItem.currency,
          quantity: item.quantity,
          note: item.note
        }))
      }
    },
    select: {
      id: true,
      status: true
    }
  });

  return Response.json(
    {
      orderId: order.id,
      status: order.status
    },
    {
      status: 201
    }
  );
}

export async function GET() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!tenantId) {
    return Response.json(
      {
        error: "Oturum gerekli."
      },
      {
        status: 401
      }
    );
  }

  const orders = await prisma.order.findMany({
    where: {
      branch: {
        tenantId
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 80,
    include: {
      branch: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      items: {
        orderBy: {
          createdAt: "asc"
        },
        select: {
          id: true,
          menuItemId: true,
          itemName: true,
          unitPrice: true,
          currency: true,
          quantity: true,
          note: true
        }
      }
    }
  });

  return Response.json({
    orders: orders.map((order) => ({
      id: order.id,
      branch: order.branch,
      tableCode: order.tableCode,
      qrCode: order.qrCode,
      status: order.status,
      totalAmount: order.totalAmount.toNumber(),
      currency: order.currency,
      customerNote: order.customerNote,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      items: order.items.map((item) => ({
        ...item,
        unitPrice: item.unitPrice.toNumber()
      }))
    }))
  });
}
