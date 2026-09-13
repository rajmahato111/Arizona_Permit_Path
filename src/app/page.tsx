import Link from "next/link";
import { chapters } from "@/data/chapters";
import { APP_NAME, APP_TAGLINE, PASS_PERCENT } from "@/lib/constants";
import { HomeProgress } from "@/components/HomeProgress";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-sky" aria-hidden />
        <div className="az-shell hero-copy">
          <span className="eyebrow">Arizona MVD · Instruction permit</span>
          <h1>{APP_NAME}</h1>
          <p>{APP_TAGLINE}</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/study">
              Start studying
            </Link>
            <Link className="btn btn-secondary" href="/practice">
              Take a practice test
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="az-shell">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Learn the rules, then prove them under exam conditions.</h2>
            <p className="muted">
              Short lessons organized like the Arizona Driver License Manual, plus a
              multiple-choice practice exam with an {PASS_PERCENT}% pass mark—the same
              threshold ADOT publishes for the real written test.
            </p>
          </div>
          <HomeProgress topicCount={chapters.length} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="az-shell">
          <div className="section-head">
            <span className="eyebrow">Study path</span>
            <h2>Eight focused topics. No PDF dump.</h2>
            <p className="muted">
              Work through Copper State essentials—permits, signs, sharing the road,
              weather, and the numbers worth memorizing.
            </p>
          </div>
          <div className="topic-list">
            {chapters.map((chapter, index) => (
              <Link key={chapter.slug} href={`/study/${chapter.slug}`} className="topic-link">
                <span className="topic-index">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <strong style={{ display: "block", marginBottom: "0.2rem" }}>
                    {chapter.title}
                  </strong>
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
    </>
  );
}
