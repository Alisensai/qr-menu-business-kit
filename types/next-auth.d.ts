import { DefaultSession } from "next-auth";

export type AppUserRole = "OWNER" | "ADMIN" | "EDITOR";

declare module "next-auth" {
  interface User {
    tenantId: string;
    role: AppUserRole;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      tenantId: string;
      role: AppUserRole;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    tenantId: string;
    role: AppUserRole;
  }
}
