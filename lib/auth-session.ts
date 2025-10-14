import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { users, sessions } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { cookies } from "next/headers";

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  emailVerified: Date | null;
}

export async function getSession(): Promise<{ user: SessionUser } | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session-token")?.value;

    if (!sessionToken) {
      return null;
    }

    // Find valid session
    const result = await db
      .select({
        user: {
          id: users.id,
          email: users.email,
          name: users.name,
          emailVerified: users.emailVerified,
        }
      })
      .from(sessions)
      .innerJoin(users, eq(users.id, sessions.userId))
      .where(
        and(
          eq(sessions.token, sessionToken),
          gt(sessions.expiresAt, new Date())
        )
      )
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return { user: result[0].user };

  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function getSessionFromRequest(request: NextRequest): Promise<{ user: SessionUser } | null> {
  try {
    const sessionToken = request.cookies.get("session-token")?.value;

    if (!sessionToken) {
      return null;
    }

    // Find valid session
    const result = await db
      .select({
        user: {
          id: users.id,
          email: users.email,
          name: users.name,
          emailVerified: users.emailVerified,
        }
      })
      .from(sessions)
      .innerJoin(users, eq(users.id, sessions.userId))
      .where(
        and(
          eq(sessions.token, sessionToken),
          gt(sessions.expiresAt, new Date())
        )
      )
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return { user: result[0].user };

  } catch (error) {
    console.error("Error getting session from request:", error);
    return null;
  }
}

export async function destroySession(sessionToken?: string): Promise<void> {
  try {
    if (!sessionToken) {
      const cookieStore = cookies();
      sessionToken = cookieStore.get("session-token")?.value;
    }

    if (sessionToken) {
      await db
        .delete(sessions)
        .where(eq(sessions.token, sessionToken));
    }
  } catch (error) {
    console.error("Error destroying session:", error);
  }
}
