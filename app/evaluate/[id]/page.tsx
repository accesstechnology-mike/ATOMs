import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-session";
import { db } from "@/lib/db";
import { evaluations, evaluationResponses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { EvaluationForm } from "@/components/evaluation-form";

export default async function EditEvaluationPage({
  params,
}: {
  params: { id: string };
}) {
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

  const initialData = {
    clientName: evaluation.clientName,
    evaluationDate: evaluation.evaluationDate.toISOString(),
    status: evaluation.status,
    responses: responses.map((r) => ({
      sectionName: r.sectionName,
      rating: r.rating,
      notes: r.notes || "",
      actionRequired: r.actionRequired || "",
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <EvaluationForm
        userId={session.user.id}
        evaluationId={params.id}
        initialData={initialData}
      />
    </div>
  );
}

