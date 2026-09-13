import type { Metadata } from "next";
import { PracticeSetup } from "@/components/PracticeSetup";
import {
  EXAM_QUESTION_COUNT,
  EXAM_TIME_SECONDS,
  PASS_PERCENT,
  SOURCE_NOTE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Practice test",
};

export default function PracticePage() {
  return (
    <section className="section">
      <div className="az-shell quiz-shell">
        <div className="section-head">
          <span className="eyebrow">Practice test mode</span>
          <h2>Sit an Arizona-style knowledge check.</h2>
          <p className="muted">
            {EXAM_QUESTION_COUNT} multiple-choice questions, {PASS_PERCENT}% to pass
            (ADOT’s published threshold). Optional {EXAM_TIME_SECONDS / 60}-minute timer.
            Review every miss with an explanation after you finish.
          </p>
        </div>
        <PracticeSetup />
        <p className="muted" style={{ marginTop: "1.5rem", fontSize: "0.92rem" }}>
          {SOURCE_NOTE}
        </p>
      </div>
    </section>
  );
}
