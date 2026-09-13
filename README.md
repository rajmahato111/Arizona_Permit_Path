# Arizona Permit Path

A calm, mobile-friendly study + practice-test app for the Arizona MVD instruction permit / driver license knowledge exam.

## Features

- **Study mode** — eight short topic lessons grounded in the Arizona Driver License Manual (ADOT MVD)
- **Practice test** — 30 multiple-choice questions, optional 40-minute timer, **80% pass mark** (ADOT’s published threshold), review of missed answers with explanations
- **Progress** — studied topics + quiz history stored in `localStorage`
- **Arizona-forward UI** — Sonoran sky / canyon copper branding (not a generic purple dashboard)

## Source material

The named upload `AZ_MVD_Permit_Test_Animated_Study_Guide_7539.pdf` was not available in this agent environment. Content is therefore taken from the official **Arizona Driver License Manual** (ADOT MVD, revised March 2026):

https://apps.azdot.gov/files/mvd/mvd-forms-lib/99-0117.pdf

Practice items are **study aids based on that guide**, not official MVD exam questions. Always confirm current rules at [azdot.gov/mvd](https://azdot.gov/mvd).

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
