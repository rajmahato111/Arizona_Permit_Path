"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QuizRunner } from "@/components/QuizRunner";

function PracticeTakeInner() {
  const searchParams = useSearchParams();
  const timed = searchParams.get("timed") !== "0";

  return (
    <section className="section">
      <div className="az-shell quiz-shell">
        <QuizRunner timed={timed} />
      </div>
    </section>
  );
}

export default function PracticeTakePage() {
  return (
    <Suspense
      fallback={
        <section className="section">
          <div className="az-shell quiz-shell">
            <p className="muted">Loading practice exam…</p>
          </div>
        </section>
      }
    >
      <PracticeTakeInner />
    </Suspense>
  );
}
