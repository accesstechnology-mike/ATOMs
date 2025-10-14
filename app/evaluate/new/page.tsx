import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-session";
import { EvaluationForm } from "@/components/evaluation-form";

export default async function NewEvaluationPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <EvaluationForm userId={session.user.id} />
    </div>
  );
}

