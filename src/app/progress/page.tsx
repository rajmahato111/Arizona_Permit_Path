"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { chapters } from "@/data/chapters";
import { clearProgress, loadProgress, type ProgressState } from "@/lib/progress";

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressState | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  function reset() {
    clearProgress();
    setProgress(loadProgress());
  }

  const studied = new Set(progress?.studiedTopics ?? []);
  const attempts = progress?.attempts ?? [];

  return (
    <section className="section">
      <div className="az-shell">
        <div className="section-head">
          <span className="eyebrow">Progress</span>
          <h2>Your Copper State study trail.</h2>
          <p className="muted">
            Saved on this device with localStorage—no account required. Clear anytime if you
            want a fresh start.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
            <div className="eyebrow">Topics</div>
            <div className="font-display" style={{ fontSize: "2.2rem" }}>
              {studied.size}/{chapters.length}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0.85rem 0 0" }}>
              {chapters.map((chapter) => (
                <li
                  key={chapter.slug}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    padding: "0.4rem 0",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <Link href={`/study/${chapter.slug}`}>{chapter.title}</Link>
                  <span style={{ color: studied.has(chapter.slug) ? "var(--saguaro)" : "var(--stone)" }}>
                    {studied.has(chapter.slug) ? "Studied" : "Open"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              padding: "1.2rem",
              borderRadius: "1rem",
              border: "1px solid var(--line)",
              background: "rgba(255,255,255,0.6)",
            }}
          >
            <div className="eyebrow">Quiz history</div>
            {attempts.length === 0 ? (
              <p className="muted">No practice exams yet.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: "0.85rem 0 0" }}>
                {attempts.map((attempt) => (
                  <li
                    key={attempt.id}
                    style={{
                      padding: "0.65rem 0",
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    <strong>
                      {attempt.percent}% · {attempt.score}/{attempt.total}{" "}
                      {attempt.passed ? "Pass" : "Not yet"}
                    </strong>
                    <div className="muted" style={{ fontSize: "0.9rem" }}>
                      {new Date(attempt.at).toLocaleString()}
                      {attempt.timed ? " · timed" : " · untimed"}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="cta-row">
              <Link className="btn btn-primary" href="/practice">
                Practice again
              </Link>
              <button type="button" className="btn btn-ghost" onClick={reset}>
                Reset progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
