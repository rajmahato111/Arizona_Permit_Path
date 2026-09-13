"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadProgress, type ProgressState } from "@/lib/progress";

export function HomeProgress({ topicCount }: { topicCount: number }) {
  const [progress, setProgress] = useState<ProgressState | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const studied = progress?.studiedTopics.length ?? 0;
  const latest = progress?.attempts[0];
  const pct = topicCount ? Math.round((studied / topicCount) * 100) : 0;

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      }}
    >
      <div
        style={{
          padding: "1.2rem",
          borderRadius: "1rem",
          border: "1px solid var(--line)",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <div className="eyebrow">Topics studied</div>
        <div className="font-display" style={{ fontSize: "2.4rem", marginTop: "0.35rem" }}>
          {studied}/{topicCount}
        </div>
        <div className="progress-track" style={{ marginTop: "0.85rem" }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div
        style={{
          padding: "1.2rem",
          borderRadius: "1rem",
          border: "1px solid var(--line)",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <div className="eyebrow">Latest practice</div>
        <div className="font-display" style={{ fontSize: "2.4rem", marginTop: "0.35rem" }}>
          {latest ? `${latest.percent}%` : "—"}
        </div>
        <p className="muted" style={{ margin: "0.4rem 0 0" }}>
          {latest
            ? latest.passed
              ? "Passed — keep sharpening weak spots."
              : "Not yet — review missed answers and retry."
            : "No attempts yet. When you are ready, sit a full practice exam."}
        </p>
      </div>
      <div
        style={{
          padding: "1.2rem",
          borderRadius: "1rem",
          border: "1px solid var(--line)",
          background: "rgba(255,255,255,0.6)",
          display: "grid",
          alignContent: "space-between",
        }}
      >
        <div>
          <div className="eyebrow">Continue</div>
          <p className="muted" style={{ margin: "0.55rem 0 1rem" }}>
            Resume a lesson or jump straight into exam practice.
          </p>
        </div>
        <div className="cta-row" style={{ marginTop: 0 }}>
          <Link
            className="btn btn-primary"
            href={progress?.lastLessonSlug ? `/study/${progress.lastLessonSlug}` : "/study"}
          >
            Resume study
          </Link>
          <Link className="btn btn-ghost" href="/practice">
            Practice
          </Link>
        </div>
      </div>
    </div>
  );
}
