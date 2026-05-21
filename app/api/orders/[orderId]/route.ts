import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import type { OrderStatus } from "@/types";

const allowedStatuses = new Set<OrderStatus>(["PENDING", "PREPARING", "COMPLETED"]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
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

  const { orderId } = await params;
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const status = payload?.status;

  if (typeof status !== "string" || !allowedStatuses.has(status as OrderStatus)) {
    return Response.json(
      {
        error: "Gecersiz siparis durumu."
      },
      {
        status: 400
      }
    );
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      branch: {
        tenantId
      }
    },
    select: {
      id: true
    }
  });

  if (!order) {
    return Response.json(
      {
        error: "Siparis bulunamadi."
      },
      {
        status: 404
      }
    );
  }

  const updatedOrder = await prisma.order.update({
    where: {
      id: order.id
    },
    data: {
      status: status as OrderStatus
    },
    select: {
      id: true,
      status: true,
      updatedAt: true
    }
  });

  return Response.json({
    order: {
      ...updatedOrder,
      updatedAt: updatedOrder.updatedAt.toISOString()
    }
  });
}
