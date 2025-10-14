"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface EvaluationCardProps {
  evaluation: {
    id: string;
    clientName: string;
    evaluationDate: Date;
    status: string;
    createdAt: Date;
  };
}

export function EvaluationCard({ evaluation }: EvaluationCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/evaluate/${evaluation.id}`);
  };

  const handleResultsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/evaluate/${evaluation.id}/results`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md border border-slate-200 p-6 hover:shadow-lg transition-all hover:border-blue-300 cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {evaluation.clientName}
          </h3>
          <div className="flex gap-4 text-sm text-slate-600">
            <span>
              Evaluation Date:{" "}
              {format(new Date(evaluation.evaluationDate), "MMM d, yyyy")}
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
            {evaluation.status === "completed" ? "Completed" : "Draft"}
          </span>
          {evaluation.status === "completed" && (
            <button
              onClick={handleResultsClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-sm"
            >
              View Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
