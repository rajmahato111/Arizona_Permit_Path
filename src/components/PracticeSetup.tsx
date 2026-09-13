"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { EXAM_QUESTION_COUNT, EXAM_TIME_SECONDS, PASS_PERCENT } from "@/lib/constants";

export function PracticeSetup() {
  const router = useRouter();
  const [timed, setTimed] = useState(true);

  function start() {
    const params = new URLSearchParams({ timed: timed ? "1" : "0" });
    router.push(`/practice/take?${params.toString()}`);
  }

  return (
    <div
      style={{
        padding: "1.35rem",
        borderRadius: "1.15rem",
        border: "1px solid var(--line)",
        background: "rgba(255,255,255,0.62)",
        display: "grid",
        gap: "1rem",
      }}
    >
      <label style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={timed}
          onChange={(e) => setTimed(e.target.checked)}
          style={{ marginTop: "0.3rem" }}
        />
        <span>
          <strong>Timed mode</strong>
          <span className="muted" style={{ display: "block", marginTop: "0.2rem" }}>
            {EXAM_TIME_SECONDS / 60} minutes on the clock. Untimed is fine for first runs.
          </span>
        </span>
      </label>

      <ul className="muted" style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.55 }}>
        <li>{EXAM_QUESTION_COUNT} questions drawn from the study-guide practice bank</li>
        <li>Pass at {PASS_PERCENT}% or higher</li>
        <li>One best answer per question—just like Arizona practice exams advise</li>
        <li>Full review of missed items when you submit</li>
      </ul>

      <button type="button" className="btn btn-primary" onClick={start}>
        Begin practice exam
      </button>
    </div>
  );
}
