import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth-session";
import { db } from "@/lib/db";
import { evaluations } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { format } from "date-fns";
import { SignOutButton } from "@/components/sign-out-button";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  const userEvaluations = await db
    .select()
    .from(evaluations)
    .where(eq(evaluations.userId, session.user.id))
    .orderBy(desc(evaluations.createdAt));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-600 mt-1">
                Welcome back, {session.user.name || session.user.email}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <Link
                href="/"
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                Framework
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Actions */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Your Evaluations
          </h2>
          <Link
            href="/evaluate/new"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
          >
            + New Evaluation
          </Link>
        </div>

        {/* Evaluations List */}
        {userEvaluations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No evaluations yet
              </h3>
              <p className="text-slate-600 mb-6">
                Create your first evaluation to start tracking support team
                performance.
              </p>
              <Link
                href="/evaluate/new"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Create Your First Evaluation
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {userEvaluations.map((evaluation) => (
              <Link
                key={evaluation.id}
                href={`/evaluate/${evaluation.id}`}
                className="bg-white rounded-lg shadow-md border border-slate-200 p-6 hover:shadow-lg transition-all hover:border-blue-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {evaluation.clientName}
                    </h3>
                    <div className="flex gap-4 text-sm text-slate-600">
                      <span>
                        Evaluation Date:{" "}
                        {format(
                          new Date(evaluation.evaluationDate),
                          "MMM d, yyyy"
                        )}
                      </span>
                      <span>
                        Created:{" "}
                        {format(new Date(evaluation.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        evaluation.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {evaluation.status === "completed"
                        ? "Completed"
                        : "Draft"}
                    </span>
                    {evaluation.status === "completed" && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <Link
                          href={`/evaluate/${evaluation.id}/results`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-sm"
                        >
                          View Results
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

