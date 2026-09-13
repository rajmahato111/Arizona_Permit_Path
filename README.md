# Arizona Permit Path

A calm, mobile-friendly study + practice-test app for the Arizona MVD instruction permit / driver license knowledge exam.

## Features

- **Study mode** — eight short lessons organized like the animated MVD permit study guide (memory map, signs, lights, lanes, parking, buses/ROW, weather/control, everyday rules)
- **Practice test** — 30 multiple-choice questions from a ~100-item bank grounded in that guide, optional 40-minute timer, **80% pass mark**, review of missed answers with explanations
- **Progress** — studied topics + quiz history in `localStorage`
- **Arizona-forward UI** — Sonoran sky / canyon copper branding

## Source material

Primary: **AZ MVD Permit Test Animated Study Guide** (120 animation-style flashcards from the operator questionnaire).

Secondary: official **Arizona Driver License Manual** (ADOT MVD) where the flashcard guide is thin (for example permit ages and insurance minima).

Practice items are **study-guide practice aids**, not official MVD exam questions. Confirm current rules at [azdot.gov/mvd](https://azdot.gov/mvd).

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

```bash
npm run build && npm start
```

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · React 19
