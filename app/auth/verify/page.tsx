"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setStatus("error");
      setMessage("Invalid magic link. Please try signing in again.");
      return;
    }

    verifyMagicLink(token, email);
  }, [searchParams]);

  const verifyMagicLink = async (token: string, email: string) => {
    try {
      const response = await fetch("/api/auth/verify-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed");
      }

      setStatus("success");
      setMessage("Successfully signed in! Redirecting...");
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Failed to verify magic link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200 text-center">
          {status === "verifying" && (
            <>
              <div className="text-6xl mb-6">🔄</div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Verifying...
              </h1>
              <p className="text-slate-600">
                Please wait while we sign you in.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="text-6xl mb-6">✅</div>
              <h1 className="text-2xl font-bold text-green-900 mb-2">
                Success!
              </h1>
              <p className="text-slate-600 mb-4">{message}</p>
              <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="text-6xl mb-6">❌</div>
              <h1 className="text-2xl font-bold text-red-900 mb-2">
                Verification Failed
              </h1>
              <p className="text-slate-600 mb-6">{message}</p>
              <Link
                href="/auth"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Try Again
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
