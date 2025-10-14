"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLink, setMagicLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      // Send magic link
      const response = await fetch("/api/auth/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send magic link");
      }

      const data = await response.json();
      setMessage("Check your email for a magic link to sign in!");
      
      // In development, show the magic link for easier testing
      if (data.magicLink) {
        setMagicLink(data.magicLink);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to send magic link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Sign In
            </h1>
            <p className="text-slate-600">
              Enter your email to receive a magic link
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {message}
              {magicLink && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded border-dashed">
                  <p className="text-xs text-yellow-800 mb-2">
                    <strong>Development Mode:</strong> Click the link below to sign in
                  </p>
                  <a 
                    href={magicLink}
                    className="text-blue-600 hover:text-blue-800 underline text-xs break-all"
                  >
                    {magicLink}
                  </a>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-slate-900 bg-white"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? "Sending Magic Link..." : "Send Magic Link"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-600">
            <p className="mb-4">
              We'll send you a secure link to sign in. No password needed!
            </p>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to framework
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
