"use client";

import { useEffect, useState } from "react";
import { chapters } from "@/data/chapters";
import { loadProgress } from "@/lib/progress";

export function StudyListProgress() {
  const [studied, setStudied] = useState(0);

  useEffect(() => {
    setStudied(loadProgress().studiedTopics.length);
  }, []);

  const pct = Math.round((studied / chapters.length) * 100);

  return (
    <div
      style={{
        padding: "1rem 1.1rem",
        borderRadius: "1rem",
        border: "1px solid var(--line)",
        background: "rgba(255,255,255,0.55)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <strong>
          {studied} of {chapters.length} topics studied
        </strong>
        <span className="muted">{pct}%</span>
      </div>
      <div className="progress-track" style={{ marginTop: "0.75rem" }}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
