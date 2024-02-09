import { UserRole } from "@/lib/types";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role: UserRole | null;
    } & DefaultUser;
  }

  interface User extends DefaultUser {
    role: UserRole | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole | null;
  }
}
