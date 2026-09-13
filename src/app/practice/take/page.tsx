import type { Metadata } from "next";
import { QuizRunner } from "@/components/QuizRunner";

export const metadata: Metadata = {
  title: "Exam in progress",
};

type Props = { searchParams: Promise<{ timed?: string }> };

export default async function PracticeTakePage({ searchParams }: Props) {
  const params = await searchParams;
  const timed = params.timed !== "0";

  return (
    <section className="section">
      <div className="az-shell quiz-shell">
        <QuizRunner timed={timed} />
      </div>
    </section>
  );
}
