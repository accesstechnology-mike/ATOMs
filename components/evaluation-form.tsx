"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { frameworkSections } from "@/lib/framework-data";

interface EvaluationFormProps {
  userId: string;
  evaluationId?: string;
  initialData?: {
    clientName: string;
    evaluationDate: string;
    status: string;
    responses: Array<{
      sectionName: string;
      rating: number | null;
      notes: string;
      actionRequired: string;
    }>;
  };
}

export function EvaluationForm({
  userId,
  evaluationId,
  initialData,
}: EvaluationFormProps) {
  const router = useRouter();
  const [clientName, setClientName] = useState(
    initialData?.clientName || ""
  );
  const [evaluationDate, setEvaluationDate] = useState(
    initialData?.evaluationDate
      ? new Date(initialData.evaluationDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [responses, setResponses] = useState<
    Record<
      string,
      { rating: number | null; notes: string; actionRequired: string }
    >
  >(() => {
    const initial: Record<
      string,
      { rating: number | null; notes: string; actionRequired: string }
    > = {};

    if (initialData?.responses) {
      initialData.responses.forEach((response) => {
        initial[response.sectionName] = {
          rating: response.rating,
          notes: response.notes || "",
          actionRequired: response.actionRequired || "",
        };
      });
    } else {
      frameworkSections.forEach((section) => {
        initial[section.id] = { rating: null, notes: "", actionRequired: "" };
      });
    }

    return initial;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRatingChange = (sectionId: string, rating: number) => {
    setResponses((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], rating },
    }));
  };

  const handleNotesChange = (sectionId: string, notes: string) => {
    setResponses((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], notes },
    }));
  };

  const handleActionChange = (sectionId: string, actionRequired: string) => {
    setResponses((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], actionRequired },
    }));
  };

  const handleSubmit = async (status: "draft" | "completed") => {
    if (!clientName.trim()) {
      setError("Please enter a client name");
      return;
    }

    if (status === "completed") {
      const allRated = frameworkSections.every(
        (section) => responses[section.id]?.rating !== null
      );
      if (!allRated) {
        setError("Please complete all ratings before submitting");
        return;
      }
    }

    setError("");
    setLoading(true);

    try {
      const responsesArray = frameworkSections.map((section) => ({
        category: section.category,
        sectionName: section.id,
        rating: responses[section.id]?.rating || null,
        notes: responses[section.id]?.notes || "",
        actionRequired: responses[section.id]?.actionRequired || "",
      }));

      const response = await fetch("/api/evaluations", {
        method: evaluationId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          evaluationId,
          userId,
          clientName,
          evaluationDate: new Date(evaluationDate).toISOString(),
          status,
          responses: responsesArray,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save evaluation");
      }

      const data = await response.json();

      if (status === "completed") {
        router.push(`/evaluate/${data.evaluationId}/results`);
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save evaluation");
      setLoading(false);
    }
  };

  const qolSections = frameworkSections.filter((s) => s.category === "qol");
  const atBuyinSections = frameworkSections.filter(
    (s) => s.category === "at_buyin"
  );
  const atTechnicalSections = frameworkSections.filter(
    (s) => s.category === "at_technical"
  );

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {evaluationId ? "Edit Evaluation" : "New Evaluation"}
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Client Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Client Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="clientName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Client Name *
              </label>
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white"
                placeholder="Enter client name"
              />
            </div>
            <div>
              <label
                htmlFor="evaluationDate"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Evaluation Date *
              </label>
              <input
                type="date"
                id="evaluationDate"
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Quality of Life Sections */}
        <SectionGroup
          title="Quality of Life considerations"
          sections={qolSections}
          responses={responses}
          onRatingChange={handleRatingChange}
          onNotesChange={handleNotesChange}
          onActionChange={handleActionChange}
          color="blue"
        />

        {/* AT Buy-in Sections */}
        <SectionGroup
          title="AT buy-in"
          sections={atBuyinSections}
          responses={responses}
          onRatingChange={handleRatingChange}
          onNotesChange={handleNotesChange}
          onActionChange={handleActionChange}
          color="green"
        />

        {/* AT Technical Knowledge Sections */}
        <SectionGroup
          title="AT technical knowledge & understanding"
          sections={atTechnicalSections}
          responses={responses}
          onRatingChange={handleRatingChange}
          onNotesChange={handleNotesChange}
          onActionChange={handleActionChange}
          color="purple"
        />

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 shadow-lg p-6 mt-8 rounded-xl">
          <div className="max-w-6xl mx-auto flex justify-end gap-4">
            <button
              onClick={() => handleSubmit("draft")}
              disabled={loading}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSubmit("completed")}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Complete Evaluation"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionGroup({
  title,
  sections,
  responses,
  onRatingChange,
  onNotesChange,
  onActionChange,
  color,
}: {
  title: string;
  sections: (typeof frameworkSections)[0][];
  responses: Record<
    string,
    { rating: number | null; notes: string; actionRequired: string }
  >;
  onRatingChange: (sectionId: string, rating: number) => void;
  onNotesChange: (sectionId: string, notes: string) => void;
  onActionChange: (sectionId: string, actionRequired: string) => void;
  color: "blue" | "green" | "purple";
}) {
  const borderColor = {
    blue: "border-blue-600",
    green: "border-green-600",
    purple: "border-purple-600",
  }[color];

  return (
    <div className="mb-12">
      <h2
        className={`text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 ${borderColor}`}
      >
        {title}
      </h2>
      <div className="space-y-8">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-lg shadow-md border border-slate-200 p-6"
          >
            <p className="text-slate-600 italic mb-2">{section.prompt}</p>
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              {section.name}
            </h3>

            {/* Rating Options */}
            <div className="space-y-3 mb-6">
              {section.descriptors.map((descriptor) => {
                // Split description by periods and filter out empty strings
                const sentences = descriptor.description
                  .split(/\.\s+/)
                  .filter((s) => s.trim().length > 0)
                  .map((s) => s.trim() + (s.endsWith('.') ? '' : '.'));

                return (
                  <label
                    key={descriptor.rating}
                    className={`flex gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      responses[section.id]?.rating === descriptor.rating
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`rating-${section.id}`}
                      value={descriptor.rating}
                      checked={responses[section.id]?.rating === descriptor.rating}
                      onChange={() =>
                        onRatingChange(section.id, descriptor.rating)
                      }
                      className="mt-1 w-5 h-5 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                            descriptor.rating === 1
                              ? "bg-green-600"
                              : descriptor.rating === 2
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                        >
                          {descriptor.rating}
                        </div>
                      </div>
                      <ul className="list-disc list-outside space-y-2 text-slate-700 text-sm leading-relaxed ml-4">
                        {sentences.map((sentence, idx) => (
                          <li key={idx} className="pl-2">
                            {sentence}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label
                htmlFor={`notes-${section.id}`}
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Notes
              </label>
              <textarea
                id={`notes-${section.id}`}
                value={responses[section.id]?.notes || ""}
                onChange={(e) => onNotesChange(section.id, e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white"
                placeholder="Add any observations or context..."
              />
            </div>

            {/* Action Required */}
            <div>
              <label
                htmlFor={`action-${section.id}`}
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Action Required
              </label>
              <textarea
                id={`action-${section.id}`}
                value={responses[section.id]?.actionRequired || ""}
                onChange={(e) => onActionChange(section.id, e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white"
                placeholder="What actions should be taken..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

