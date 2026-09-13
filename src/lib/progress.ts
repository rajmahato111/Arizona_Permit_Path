"use client";

import { STORAGE_KEY } from "./constants";

export type QuizAttempt = {
  id: string;
  at: string;
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  timed: boolean;
  missedIds: string[];
};

export type ProgressState = {
  studiedTopics: string[];
  attempts: QuizAttempt[];
  lastLessonSlug?: string;
};

const empty: ProgressState = {
  studiedTopics: [],
  attempts: [],
};

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function loadProgress(): ProgressState {
  if (!canUseStorage()) return empty;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      studiedTopics: Array.isArray(parsed.studiedTopics) ? parsed.studiedTopics : [],
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts.slice(0, 40) : [],
      lastLessonSlug: parsed.lastLessonSlug,
    };
  } catch {
    return empty;
  }
}

export function saveProgress(next: ProgressState) {
  if (!canUseStorage()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function markTopicStudied(slug: string) {
  const current = loadProgress();
  if (!current.studiedTopics.includes(slug)) {
    current.studiedTopics = [...current.studiedTopics, slug];
  }
  current.lastLessonSlug = slug;
  saveProgress(current);
  return current;
}

export function recordAttempt(attempt: Omit<QuizAttempt, "id" | "at">) {
  const current = loadProgress();
  const full: QuizAttempt = {
    ...attempt,
    id: `${Date.now()}`,
    at: new Date().toISOString(),
  };
  current.attempts = [full, ...current.attempts].slice(0, 40);
  saveProgress(current);
  return full;
}

export function clearProgress() {
  if (!canUseStorage()) return;
  localStorage.removeItem(STORAGE_KEY);
}
