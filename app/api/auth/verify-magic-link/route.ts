import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, verifications, sessions } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();

    if (!token || !email) {
      return NextResponse.json(
        { error: "Token and email are required" },
        { status: 400 }
      );
    }

    // Find and verify the token
    const [verification] = await db
      .select()
      .from(verifications)
      .where(
        and(
          eq(verifications.identifier, email),
          eq(verifications.value, token),
          gt(verifications.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!verification) {
      return NextResponse.json(
        { error: "Invalid or expired magic link" },
        { status: 400 }
      );
    }

    // Find the user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    // Mark email as verified and update user
    await db
      .update(users)
      .set({
        emailVerified: new Date(),
      })
      .where(eq(users.id, user.id));

    // Create session
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const [session] = await db
      .insert(sessions)
      .values({
        userId: user.id,
        token: sessionToken,
        expiresAt,
        ipAddress: request.ip || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      })
      .returning();

    // Delete the used verification token
    await db
      .delete(verifications)
      .where(eq(verifications.id, verification.id));

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
      },
    });

    // Set session cookie
    response.cookies.set("session-token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Error verifying magic link:", error);
    return NextResponse.json(
      { error: "Failed to verify magic link" },
      { status: 500 }
    );
  }
}
