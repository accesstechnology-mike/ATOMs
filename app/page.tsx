import Link from "next/link";
import { frameworkSections } from "@/lib/framework-data";

export default function HomePage() {
  const qolSections = frameworkSections.filter((s) => s.category === "qol");
  const atBuyinSections = frameworkSections.filter(
    (s) => s.category === "at_buyin"
  );
  const atTechnicalSections = frameworkSections.filter(
    (s) => s.category === "at_technical"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                ATOMs - Assistive Technology Outcome Measures
              </h1>
              <p className="text-slate-600 mt-1">
                Support Team Observation Framework
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/auth"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
              >
                Sign in to evaluate
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Golden Bubble of Joy
          </h2>
          <p className="text-lg text-slate-700 mb-4">
            Our clients do best, and AT fails less often, when our clients'
            support networks are well-equipped to help them.
          </p>
          <p className="text-slate-600 mb-2">
            
We know that our clients’ successes with AT are reliant on a network of interdependencies, human to human, human to tech, tech to human, tech to tech.  When these interdependencies are present, reliable and work in support of our client’s intentions… anything is possible.  We call this ‘The Golden Bubble of Joy’.
          </p>
          <p className="text-slate-600 mb-2">
            access: technology defines 'The Golden Bubble of Joy' as:
          </p>
          <blockquote className="border-l-4 border-blue-600 pl-4 py-2 italic text-slate-700 bg-blue-50 rounded-r">
            "A network of <strong>reliable interdependencies</strong> that has
            the ability to{" "}
            <strong>
              confidently support and enhance the quality of life.
            </strong>
            "
          </blockquote>
          <p className="text-slate-600 mt-4">
            This framework considers and plans how our clients' AT outcomes can
            be enhanced through the increased confidence and ability of the
            support network.
          </p>
        </div> */}

        {/* Quality of Life Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-blue-600">
            Quality of Life considerations
          </h2>
          <div className="space-y-6">
            {qolSections.map((section) => (
              <FrameworkSectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>

        {/* AT Buy-in Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-green-600">
            AT buy-in
          </h2>
          <div className="space-y-6">
            {atBuyinSections.map((section) => (
              <FrameworkSectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>

        {/* AT Technical Knowledge Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-purple-600">
            AT technical knowledge & understanding
          </h2>
          <div className="space-y-6">
            {atTechnicalSections.map((section) => (
              <FrameworkSectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to evaluate your support team?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Create an account to save evaluations, track progress over time, and
            generate actionable insights for improving support team performance.
          </p>
          <Link
            href="/auth"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-colors shadow-md"
          >
            Start Your First Evaluation
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-slate-600">
          <p>© 2025 access: technology. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FrameworkSectionCard({
  section,
}: {
  section: (typeof frameworkSections)[0];
}) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <p className="text-slate-600 italic mb-2">{section.prompt}</p>
      <h3 className="text-xl font-semibold text-slate-900 mb-4">
        {section.name}
      </h3>
      <div className="space-y-4">
        {section.descriptors.map((descriptor) => {
          // Split description by periods and filter out empty strings
          const sentences = descriptor.description
            .split(/\.\s+/)
            .filter((s) => s.trim().length > 0)
            .map((s) => s.trim() + (s.endsWith('.') ? '' : '.'));

          return (
            <div
              key={descriptor.rating}
              className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
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
              <div className="flex-1">
                <ul className="list-disc list-outside space-y-2 text-slate-700 text-sm leading-relaxed ml-4">
                  {sentences.map((sentence, idx) => (
                    <li key={idx} className="pl-2">
                      {sentence}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
