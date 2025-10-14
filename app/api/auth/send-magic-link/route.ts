import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, verifications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Find or create user
    let [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
      [user] = await db
        .insert(users)
        .values({
          email,
          emailVerified: null,
        })
        .returning();
    }

    // Generate magic link token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store verification token
    await db.insert(verifications).values({
      identifier: email,
      value: token,
      expiresAt,
    });

    // In development, log the magic link
    const magicLink = `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;
    
    console.log("🔗 Magic Link:", magicLink);

    // TODO: In production, send actual email here
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      message: "Magic link sent to your email",
      // In development, include the link for testing
      ...(process.env.NODE_ENV === "development" && { 
        magicLink,
        note: "In development - check console for magic link" 
      })
    });

  } catch (error) {
    console.error("Error sending magic link:", error);
    return NextResponse.json(
      { error: "Failed to send magic link" },
      { status: 500 }
    );
  }
}
