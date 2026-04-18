import { DEFAULT_TIMEOUT_MS, DECISIONS } from "./constants.js";

class ModelTimeoutError extends Error {
  constructor(message = "Model request timed out.") {
    super(message);
    this.name = "ModelTimeoutError";
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function chooseMockDecision(input, signals) {
  let decision = "execute_and_inform";
  let rationale = "The request is understood and appears operationally safe enough to proceed with visible follow-up.";
  let followUpQuestion = null;
  const factors = [];

  if (signals.policyBlock.blocked) {
    decision = "refuse_or_escalate";
    rationale = "The action touches a blocked payment or fraud pattern, so it should be escalated instead of executed automatically.";
    factors.push(...signals.policyBlock.reasons);
  } else if (signals.requiresClarification) {
    decision = "ask_clarifying_question";
    rationale = "Critical execution details are still unresolved, so clarification is safer than guessing.";
    followUpQuestion = signals.missingCriticalContext.includes("missing_booking_time")
      ? "What day, time, and location should I use for the dinner booking?"
      : "Can you confirm the exact target and parameters before I act?";
    factors.push(...signals.missingCriticalContext, ...signals.ambiguityFlags);
  } else if (signals.hasContradictionInHistory) {
    decision = "confirm_before_executing";
    rationale = "The latest approval conflicts with an earlier hold, so explicit confirmation is warranted before acting.";
    factors.push("prior_hold_conflicts_with_latest_message");
  } else if (signals.requiresConfirmation) {
    decision = "confirm_before_executing";
    rationale = "The action is resolved, but its external or high-impact risk profile is above the silent execution threshold.";
    factors.push("confirmation_threshold_exceeded");
  } else if (signals.riskLevel === "critical") {
    decision = "refuse_or_escalate";
    rationale = "This request carries very high downside if mis-executed, so it should not be performed automatically.";
    factors.push("critical_risk");
  } else if (signals.riskLevel === "high") {
    decision = "confirm_before_executing";
    rationale = "Intent is mostly clear, but the external and legal or financial impact is high enough to require explicit confirmation.";
    factors.push("high_risk");
  } else if (
    signals.riskLevel === "low" &&
    signals.reversibility === "high" &&
    signals.userState.delegationPreference === "high"
  ) {
    decision = "execute_silently";
    rationale = "The task is low risk, reversible, and consistent with a user who is comfortable delegating routine work.";
    factors.push("routine_low_risk", "high_delegation_preference");
  } else {
    factors.push("moderate_but_resolved_request");
  }

  return {
    decision,
    rationale,
    confidence: decision === "ask_clarifying_question" ? 0.72 : 0.8,
    followUpQuestion,
    factors
  };
}

export async function requestModelDecision({ input, signals, prompt, simulationMode }) {
  if (simulationMode === "timeout") {
    await sleep(100);
    throw new ModelTimeoutError("Simulated LLM timeout.");
  }

  if (simulationMode === "malformed") {
    return {
      provider: "simulated",
      model: "malformed-fixture",
      rawText: "DECISION=maybe_send_it",
      latencyMs: 10
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    const mock = chooseMockDecision(input, signals);
    return {
      provider: "mock",
      model: "heuristic-simulator",
      rawText: JSON.stringify(mock, null, 2),
      latencyMs: 4
    };
  }

  const controller = new AbortController();
  const startedAt = Date.now();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  const model = process.env.MODEL_NAME || "gpt-4.1-mini";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: prompt.systemPrompt },
          { role: "user", content: prompt.userPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Model request failed with status ${response.status}.`);
    }

    const body = await response.json();
    return {
      provider: "openai",
      model,
      rawText: body.choices?.[0]?.message?.content || "",
      latencyMs: Date.now() - startedAt
    };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new ModelTimeoutError();
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export function parseModelOutput(rawText) {
  let parsed;

  try {
    parsed = JSON.parse(rawText);
  } catch (error) {
    throw new Error("Model returned malformed JSON.");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Model output must be an object.");
  }

  if (!DECISIONS.includes(parsed.decision)) {
    throw new Error("Model output contained an invalid decision.");
  }

  return {
    decision: parsed.decision,
    rationale: typeof parsed.rationale === "string" ? parsed.rationale : "No rationale provided.",
    confidence: typeof parsed.confidence === "number" ? parsed.confidence : null,
    followUpQuestion: typeof parsed.followUpQuestion === "string" ? parsed.followUpQuestion : null,
    factors: Array.isArray(parsed.factors) ? parsed.factors : []
  };
}

export { ModelTimeoutError };
