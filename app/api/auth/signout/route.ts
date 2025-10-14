import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/auth-session";

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session-token")?.value;
    
    if (sessionToken) {
      await destroySession(sessionToken);
    }

    const response = NextResponse.json({ success: true });
    
    // Clear the session cookie
    response.cookies.set("session-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Error signing out:", error);
    return NextResponse.json(
      { error: "Failed to sign out" },
      { status: 500 }
    );
  }
}
