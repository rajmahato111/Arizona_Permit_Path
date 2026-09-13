"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { pickExamQuestions, type Question } from "@/data/questions";
import {
  EXAM_QUESTION_COUNT,
  EXAM_TIME_SECONDS,
  PASS_PERCENT,
} from "@/lib/constants";
import { recordAttempt } from "@/lib/progress";
import { didPass, formatTime, percentCorrect } from "@/lib/quiz";

type Phase = "active" | "results";

export function QuizRunner({ timed }: { timed: boolean }) {
  const exam = useMemo(() => pickExamQuestions(EXAM_QUESTION_COUNT), []);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(EXAM_TIME_SECONDS);
  const [phase, setPhase] = useState<Phase>("active");
  const [missed, setMissed] = useState<Question[]>([]);

  useEffect(() => {
    if (!timed || phase !== "active") return;
    if (secondsLeft <= 0) {
      finish();
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timed, secondsLeft, phase]);

  const current = exam[index];
  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round((answeredCount / exam.length) * 100);

  function select(choiceIndex: number) {
    if (!current || phase !== "active") return;
    setAnswers((prev) => ({ ...prev, [current.id]: choiceIndex }));
  }

  function finish() {
    if (phase === "results") return;
    let score = 0;
    const wrong: Question[] = [];
    for (const q of exam) {
      if (answers[q.id] === q.correctIndex) score += 1;
      else wrong.push(q);
    }
    const percent = percentCorrect(score, exam.length);
    const passed = didPass(score, exam.length);
    recordAttempt({
      score,
      total: exam.length,
      percent,
      passed,
      timed,
      missedIds: wrong.map((q) => q.id),
    });
    setMissed(wrong);
    setPhase("results");
    // stash latest result for the results page deep-link style review
    sessionStorage.setItem(
      "az-permit-last-result",
      JSON.stringify({
        score,
        total: exam.length,
        percent,
        passed,
        timed,
        answers,
        questionIds: exam.map((q) => q.id),
      }),
    );
  }

  if (phase === "results") {
    const score = exam.filter((q) => answers[q.id] === q.correctIndex).length;
    const percent = percentCorrect(score, exam.length);
    const passed = percent >= PASS_PERCENT;

    return (
      <div>
        <div className="section-head">
          <span className="eyebrow">{passed ? "Pass" : "Keep studying"}</span>
          <h2>{passed ? "You cleared the bar." : "Not quite yet."}</h2>
          <p className="muted">
            Score {score}/{exam.length} ({percent}%). Arizona requires {PASS_PERCENT}% or
            higher on the written exam.
          </p>
        </div>

        <div className="cta-row" style={{ marginBottom: "1.5rem" }}>
          <Link className="btn btn-primary" href="/practice">
            Retake practice
          </Link>
          <Link className="btn btn-secondary" href="/study">
            Review lessons
          </Link>
          <Link className="btn btn-ghost" href="/progress">
            Progress
          </Link>
        </div>

        <h3 className="font-display" style={{ fontSize: "1.4rem" }}>
          Missed answers
        </h3>
        {missed.length === 0 ? (
          <p className="muted">Clean sheet — every answer matched the study guide.</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem", marginTop: "0.75rem" }}>
            {missed.map((q) => (
              <div
                key={q.id}
                style={{
                  padding: "1rem",
                  borderRadius: "1rem",
                  border: "1px solid var(--line)",
                  background: "rgba(255,255,255,0.65)",
                }}
              >
                <p style={{ margin: "0 0 0.55rem", fontWeight: 650 }}>{q.prompt}</p>
                <p className="muted" style={{ margin: "0 0 0.35rem" }}>
                  Your answer:{" "}
                  {answers[q.id] == null ? "No answer" : q.choices[answers[q.id]]}
                </p>
                <p style={{ margin: "0 0 0.45rem", color: "var(--saguaro)", fontWeight: 650 }}>
                  Correct: {q.choices[q.correctIndex]}
                </p>
                <p className="muted" style={{ margin: 0 }}>
                  {q.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <div>
          <span className="eyebrow">Question {index + 1}</span>
          <div className="muted">of {exam.length} · study-guide practice</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <strong>{progressPct}% answered</strong>
          {timed ? (
            <div className="muted">Time left {formatTime(secondsLeft)}</div>
          ) : (
            <div className="muted">Untimed</div>
          )}
        </div>
      </div>

      <div className="progress-track" style={{ marginBottom: "1.25rem" }}>
        <div className="progress-fill" style={{ width: `${((index + 1) / exam.length) * 100}%` }} />
      </div>

      <h2 className="font-display" style={{ fontSize: "1.55rem", marginTop: 0 }}>
        {current.prompt}
      </h2>

      <div role="listbox" aria-label="Answer choices">
        {current.choices.map((choice, choiceIndex) => {
          const selected = answers[current.id] === choiceIndex;
          return (
            <button
              key={choice}
              type="button"
              className="choice"
              data-state={selected ? "selected" : undefined}
              onClick={() => select(choiceIndex)}
            >
              <span style={{ fontWeight: 700, marginRight: "0.55rem", color: "var(--copper-deep)" }}>
                {String.fromCharCode(65 + choiceIndex)}.
              </span>
              {choice}
            </button>
          );
        })}
      </div>

      <div className="cta-row" style={{ marginTop: "1.35rem" }}>
        <button
          type="button"
          className="btn btn-ghost"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          Back
        </button>
        {index < exam.length - 1 ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIndex((i) => Math.min(exam.length - 1, i + 1))}
          >
            Next
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={finish}>
            Submit exam
          </button>
        )}
      </div>
    </div>
  );
}
