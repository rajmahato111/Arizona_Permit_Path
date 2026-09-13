import Link from "next/link";
import { APP_NAME, SOURCE_NOTE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="az-shell" style={{ display: "grid", gap: "0.75rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 1.25rem" }}>
          <strong className="font-display" style={{ color: "var(--ink)" }}>
            {APP_NAME}
          </strong>
          <Link href="/study">Study</Link>
          <Link href="/practice">Practice</Link>
          <Link href="/progress">Progress</Link>
        </div>
        <p style={{ margin: 0, maxWidth: "52rem", lineHeight: 1.5 }}>{SOURCE_NOTE}</p>
        <p style={{ margin: 0 }}>
          Not affiliated with ADOT or MVD. Always verify current rules at{" "}
          <a href="https://azdot.gov/mvd" style={{ textDecoration: "underline" }}>
            azdot.gov/mvd
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
