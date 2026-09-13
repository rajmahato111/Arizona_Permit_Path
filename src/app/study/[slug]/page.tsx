import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { chapterIndex, chapters, getChapter } from "@/data/chapters";
import { LessonReader } from "@/components/LessonReader";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  return { title: chapter?.title ?? "Lesson" };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const index = chapterIndex(slug);
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;

  return (
    <section className="section">
      <div className="az-shell" style={{ maxWidth: "760px" }}>
        <p className="muted" style={{ marginTop: 0 }}>
          <Link href="/study" style={{ textDecoration: "underline" }}>
            Study
          </Link>{" "}
          / Lesson {String(index + 1).padStart(2, "0")}
        </p>
        <div className="section-head">
          <span className="eyebrow">{chapter.eyebrow}</span>
          <h2>{chapter.title}</h2>
          <p className="muted">{chapter.summary}</p>
        </div>

        <LessonReader slug={chapter.slug} sections={chapter.sections} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "space-between",
            marginTop: "2rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--line)",
          }}
        >
          {prev ? (
            <Link className="btn btn-ghost" href={`/study/${prev.slug}`}>
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="btn btn-primary" href={`/study/${next.slug}`}>
              Next: {next.title}
            </Link>
          ) : (
            <Link className="btn btn-primary" href="/practice">
              Practice the exam →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
