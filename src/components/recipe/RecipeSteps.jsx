import { ChefHat, ChevronDown, Clock, Play } from "lucide-react";
import { useState } from "react";

export default function RecipeSteps({ steps = [] }) {
  if (!steps.length) return null;

  const sorted = [...steps].sort(
    (a, b) => (a.stepNumber ?? 0) - (b.stepNumber ?? 0),
  );

  return (
    <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-stone-900 text-white">
          <ChefHat size={20} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-0.5">
            Cách làm
          </p>
          <h2
            className="text-2xl font-black text-stone-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Từng bước thực hiện
          </h2>
        </div>
        <div className="ml-auto text-sm text-stone-400 font-medium">
          {sorted.length} bước
        </div>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-orange-400 via-orange-200 to-transparent hidden md:block" />

        <div className="space-y-8">
          {sorted.map((step, idx) => (
            <StepCard
              key={step.id ?? idx}
              step={step}
              index={idx}
              isLast={idx === sorted.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index, isLast }) {
  const [expanded, setExpanded] = useState(index === 0);
  const hasMedia = step.imageUrls?.length > 0 || step.videoUrls?.length > 0;

  return (
    <div className="md:pl-16 relative">
      {/* Step number bubble */}
      <div className="hidden md:flex absolute left-0 top-0 w-12 h-12 rounded-full bg-stone-900 text-white items-center justify-center font-black text-sm shadow-lg z-10">
        {step.stepNumber ?? index + 1}
      </div>

      <div
        className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
          expanded
            ? "border-orange-200 shadow-xl shadow-orange-50"
            : "border-stone-100 shadow-sm"
        }`}
      >
        {/* Header row */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center gap-4 p-5 md:p-6 text-left group"
        >
          {/* Mobile step number */}
          <div className="flex md:hidden w-9 h-9 rounded-full bg-stone-900 text-white items-center justify-center font-black text-xs flex-shrink-0">
            {step.stepNumber ?? index + 1}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-0.5">
              Bước {step.stepNumber ?? index + 1}
            </p>
            <p className="text-stone-700 font-semibold text-sm leading-snug line-clamp-2">
              {step.instruction?.slice(0, 80)}
              {step.instruction?.length > 80 ? "..." : ""}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {step.stepTime && (
              <div className="flex items-center gap-1 text-xs text-stone-400 font-medium">
                <Clock size={13} />
                {step.stepTime} phút
              </div>
            )}
            {hasMedia && (
              <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                <Play size={10} className="text-orange-500 translate-x-[1px]" />
              </div>
            )}
            <ChevronDown
              size={18}
              className={`text-stone-400 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="px-5 md:px-6 pb-6 space-y-5 border-t border-stone-100 pt-5">
            <p className="text-stone-700 leading-[1.8] text-sm md:text-base">
              {step.instruction}
            </p>

            {/* Images */}
            {step.imageUrls?.length > 0 && (
              <div
                className={`grid gap-3 ${
                  step.imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {step.imageUrls.map((url, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden bg-stone-100 aspect-video"
                  >
                    <img
                      src={url}
                      alt={`Bước ${step.stepNumber ?? ""} - ảnh ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Videos */}
            {step.videoUrls?.length > 0 && (
              <div className="space-y-3">
                {step.videoUrls.map((url, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden bg-stone-900 aspect-video"
                  >
                    <video
                      controls
                      className="w-full h-full"
                      preload="metadata"
                    >
                      <source src={url} />
                    </video>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
