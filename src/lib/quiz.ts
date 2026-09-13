import { PASS_PERCENT } from "@/lib/constants";

export function percentCorrect(score: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((score / total) * 100);
}

export function didPass(score: number, total: number) {
  return percentCorrect(score, total) >= PASS_PERCENT;
}

export function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
