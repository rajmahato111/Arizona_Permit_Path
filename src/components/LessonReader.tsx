"use client";

import { useEffect } from "react";
import type { Chapter } from "@/data/chapters";
import { markTopicStudied } from "@/lib/progress";

export function LessonReader({
  slug,
  sections,
}: {
  slug: string;
  sections: Chapter["sections"];
}) {
  useEffect(() => {
    markTopicStudied(slug);
  }, [slug]);

  return (
    <article className="lesson-panel">
      {sections.map((section) => (
        <div key={section.heading} className="lesson-block">
          <h3 className="font-display" style={{ margin: "0 0 0.65rem", fontSize: "1.45rem" }}>
            {section.heading}
          </h3>
          {section.blocks.map((block, i) => {
            if (block.type === "p") {
              return (
                <p key={i} className="muted" style={{ margin: "0.55rem 0" }}>
                  {block.text}
                </p>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} style={{ margin: "0.55rem 0", paddingLeft: "1.15rem", lineHeight: 1.55 }}>
                  {block.items.map((item) => (
                    <li key={item} style={{ marginBottom: "0.4rem" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === "key") {
              return (
                <div key={i} className="key-stat">
                  <span>{block.label}</span>
                  <span style={{ color: "var(--ink)" }}>{block.value}</span>
                </div>
              );
            }
            return (
              <div key={i} className="callout">
                <strong style={{ display: "block", marginBottom: "0.25rem" }}>{block.title}</strong>
                <span className="muted">{block.text}</span>
              </div>
            );
          })}
        </div>
      ))}
    </article>
  );
}
