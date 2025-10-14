"use client";

import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
      });
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
      // Still redirect even if there's an error
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
    >
      Sign out
    </button>
  );
}

