# alfred_ Execution Decision Layer Prototype

A minimal, inspectable prototype for the alfred_ application challenge. The app decides how an assistant should respond to a proposed action in context:

- execute silently
- execute and inform
- confirm before executing
- ask a clarifying question
- refuse or escalate

The prototype is intentionally small. It focuses on decision quality, safe fallbacks, and visibility into the full pipeline rather than tool integrations or visual polish.

## What Signals The System Uses

The server computes lightweight deterministic signals before any model judgment:

- `actionType`: reminder, calendar, communications, finance, booking, or general
- `riskFactors`: financial, legal, external, fraud, privacy
- `riskLevel`: low, medium, high, critical
- `policyBlock`: hard stops for risky payment behavior like wire transfers to new accounts
- `missingCriticalContext`: unresolved execution details such as missing booking time
- `ambiguityFlags`: shorthand references or underspecified scheduling
- `hasExplicitApproval`: whether the latest user message contains a clear approval
- `hasPriorApprovalPrompt`: whether the conversation already framed a concrete pending action
- `hasContradictionInHistory`: cases like "send it" after an earlier "hold off"
- `reversibility` and `externalImpact`
- basic user state like delegation preference and urgency

These signals are used both to shape the prompt and to enforce safe code-level overrides.

## How Responsibility Is Split Between LLM And Regular Code

Code handles:

- input normalization
- rule and signal computation
- policy blocks
- prompt assembly
- model output parsing and schema validation
- safe fallback behavior on timeout, malformed output, or invalid decisions

The model handles:

- contextual synthesis across the action, latest message, history, and user state
- judgment for borderline cases
- concise rationale generation
- optional follow-up question text when clarification is needed

This split keeps the system inspectable and prevents the model from being the only safety layer.

## What The Model Decides Vs. What Is Deterministic

Deterministic:

- whether a request hits a hard policy block
- whether critical context is obviously missing
- whether silent execution should be disallowed because the risk threshold is too high
- what the fallback should be if model behavior is unreliable

Model-driven:

- whether a resolved but non-trivial request should be `execute_and_inform` or `confirm_before_executing`
- how to explain the tradeoff succinctly
- how strongly history changes the interpretation of the latest message

In practice the final decision is model-proposed but code-validated. The code can override unsafe model outputs.

## Prompt Design

The prompt is deliberately simple:

- a system instruction defines the 5 allowed decisions and reminds the model this is a contextual conversation problem
- a user payload includes the original inputs plus the computed deterministic signals
- the model is asked to return strict JSON with `decision`, `rationale`, `confidence`, `followUpQuestion`, and `factors`

The app exposes the exact prompt in the UI so reviewers can inspect the full pipeline.

## Failure Modes

The prototype explicitly demonstrates:

- `LLM timeout`
- `Malformed model output`
- `Missing critical context`

Safe default behavior avoids irreversible execution:

- high-risk or blocked requests fall back to `refuse_or_escalate`
- unresolved context falls back to `ask_clarifying_question`
- otherwise the system falls back to `confirm_before_executing`

The UI has failure injection controls for timeout and malformed-output simulation.

## Scenario Coverage

The app ships with 6 scenarios:

- 2 clear / easy
- 2 ambiguous
- 2 adversarial or risky

One scenario specifically tests the requirement that "Yep, send it" should not be interpreted in isolation when earlier history said to hold off pending legal review.

## How I Would Evolve This As alfred_ Gains Riskier Tools

As the tool surface expands, I would move from simple heuristics to a layered decision stack:

1. capability-specific policy modules for finance, external comms, legal-sensitive actions, and identity-sensitive changes
2. richer user preference memory for silent-execution thresholds and trusted domains
3. evidence retrieval over recent conversation state, tool state, and pending approvals
4. calibrated confidence and disagreement checks between deterministic policy and model judgment
5. offline eval suites with labeled scenarios, regressions, and red-team cases
6. audit logging for reviewer replay and trust analysis

## What I Would Build In The Next 6 Months

- a proper scenario and evaluation harness with pass/fail metrics
- capability-specific policies instead of generic keyword heuristics
- tool-state grounding so the system knows draft status, existing calendar events, pending approvals, and account risk
- user-configurable trust settings for silent execution by capability
- better ambiguity resolution with entity extraction and memory
- production observability around overrides, fallbacks, and user trust outcomes

## What I Intentionally Did Not Build

- real email, calendar, or reminder integrations
- persistent storage or account auth
- a full design system
- a learned risk model or benchmark dataset
- production deployment wiring to a specific provider

These were conscious tradeoffs to keep the prototype focused and inspectable inside the challenge timebox.

## Local Run

```bash
npm start
```

Then open `http://127.0.0.1:3000`.

Optional environment variables:

```bash
OPENAI_API_KEY=...
MODEL_NAME=gpt-4.1-mini
PORT=3000
```

If `OPENAI_API_KEY` is missing, the app uses a deterministic mock model so the full UI still works.

## Deploy On Vercel

This repo is set up for Vercel using:

- static frontend assets from `public/`
- serverless API routes from `api/`

To deploy:

1. Import the GitHub repository into Vercel.
2. Keep the project as a plain Node.js project.
3. Add `OPENAI_API_KEY` in Vercel project environment variables if you want the live model path.
4. Deploy.

The checked-in [vercel.json](/Users/rajkumarmahto/Odyn%20Research/alfred_/vercel.json:1) points Vercel at `public/` for static output and configures the API functions under `api/`.

## Project Structure

```text
.
├── api/
│   ├── _utils.js
│   ├── decide.js
│   └── scenarios.js
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── src/
│   ├── constants.js
│   ├── decision-engine.js
│   ├── finalize.js
│   ├── model.js
│   ├── prompt.js
│   ├── scenarios.js
│   └── signals.js
├── server.mjs
└── vercel.json
```
