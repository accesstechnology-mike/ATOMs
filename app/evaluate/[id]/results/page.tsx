import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth-session";
import { db } from "@/lib/db";
import { evaluations, evaluationResponses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { format } from "date-fns";
import { frameworkSections, getCategoryLabel } from "@/lib/framework-data";

export default async function ResultsPage({ params }: { params: { id: string } }) {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  const [evaluation] = await db
    .select()
    .from(evaluations)
    .where(eq(evaluations.id, params.id))
    .limit(1);

  if (!evaluation || evaluation.userId !== session.user.id) {
    redirect("/dashboard");
  }

  const responses = await db
    .select()
    .from(evaluationResponses)
    .where(eq(evaluationResponses.evaluationId, params.id));

  // Group responses by rating
  const rating3Responses = responses.filter((r) => r.rating === 3);
  const rating2Responses = responses.filter((r) => r.rating === 2);

  // Helper to get section details
  const getSectionDetails = (sectionName: string) => {
    return frameworkSections.find((s) => s.id === sectionName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Evaluation Results
              </h1>
              <p className="text-slate-600 mt-1">{evaluation.clientName}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/evaluate/${params.id}`}
                className="px-5 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                Edit Evaluation
              </Link>
              <Link
                href="/dashboard"
                className="px-5 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Evaluation Summary
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-600 mb-1">Client</p>
              <p className="text-lg font-semibold text-slate-900">
                {evaluation.clientName}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Evaluation Date</p>
              <p className="text-lg font-semibold text-slate-900">
                {format(new Date(evaluation.evaluationDate), "MMMM d, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Completed</p>
              <p className="text-lg font-semibold text-slate-900">
                {format(new Date(evaluation.updatedAt), "MMMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-3xl font-bold text-red-600">
                  {rating3Responses.length}
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Priority Items (Rating 3)
                </div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-3xl font-bold text-amber-600">
                  {rating2Responses.length}
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Secondary Items (Rating 2)
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-3xl font-bold text-green-600">
                  {responses.filter((r) => r.rating === 1).length}
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Excellent Items (Rating 1)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Items (Rating 3) */}
        {rating3Responses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-red-600 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                3
              </span>
              Priority Action Items
            </h2>
            <div className="space-y-6">
              {rating3Responses.map((response) => {
                const section = getSectionDetails(response.sectionName);
                if (!section) return null;

                return (
                  <div
                    key={response.id}
                    className="bg-white rounded-lg shadow-md border-2 border-red-300 p-6"
                  >
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full mb-2">
                        {getCategoryLabel(section.category)}
                      </span>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {section.name}
                      </h3>
                    </div>

                    {response.notes && (
                      <div className="mb-4 p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm font-medium text-slate-700 mb-1">
                          Notes:
                        </p>
                        <p className="text-slate-600">{response.notes}</p>
                      </div>
                    )}

                    {response.actionRequired && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Action Required:
                        </p>
                        <p className="text-blue-800">{response.actionRequired}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Secondary Items (Rating 2) */}
        {rating2Responses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-amber-600 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                2
              </span>
              Secondary Action Items
            </h2>
            <div className="space-y-6">
              {rating2Responses.map((response) => {
                const section = getSectionDetails(response.sectionName);
                if (!section) return null;

                return (
                  <div
                    key={response.id}
                    className="bg-white rounded-lg shadow-md border-2 border-amber-300 p-6"
                  >
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full mb-2">
                        {getCategoryLabel(section.category)}
                      </span>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {section.name}
                      </h3>
                    </div>

                    {response.notes && (
                      <div className="mb-4 p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm font-medium text-slate-700 mb-1">
                          Notes:
                        </p>
                        <p className="text-slate-600">{response.notes}</p>
                      </div>
                    )}

                    {response.actionRequired && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Action Required:
                        </p>
                        <p className="text-blue-800">{response.actionRequired}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Print Button */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-slate-200">
          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-md"
          >
            Print or Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
}

