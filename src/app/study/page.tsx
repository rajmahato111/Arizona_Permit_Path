import Link from "next/link";
import type { Metadata } from "next";
import { chapters } from "@/data/chapters";
import { StudyListProgress } from "@/components/StudyListProgress";

export const metadata: Metadata = {
  title: "Study by topic",
};

export default function StudyIndexPage() {
  return (
    <section className="section">
      <div className="az-shell">
        <div className="section-head">
          <span className="eyebrow">Study mode</span>
          <h2>Arizona rules, one topic at a time.</h2>
          <p className="muted">
            Read short lessons drawn from the official driver license manual, mark topics
            as you go, then move into practice when the rules feel solid.
          </p>
        </div>
        <StudyListProgress />
        <div className="topic-list" style={{ marginTop: "1.25rem" }}>
          {chapters.map((chapter, index) => (
            <Link key={chapter.slug} href={`/study/${chapter.slug}`} className="topic-link">
              <span className="topic-index">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <span className="eyebrow">{chapter.eyebrow}</span>
                <strong style={{ display: "block", margin: "0.2rem 0" }}>{chapter.title}</strong>
                <span className="muted" style={{ fontSize: "0.95rem" }}>
                  {chapter.summary}
                </span>
              </span>
              <span className="muted" style={{ fontSize: "0.9rem" }}>
                {chapter.minutes} min
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
