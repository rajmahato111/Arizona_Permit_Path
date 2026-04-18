function buildSafeFallback(signals, failure) {
  if (signals.policyBlock.blocked || signals.riskLevel === "critical") {
    return {
      decision: "refuse_or_escalate",
      rationale: "The system could not safely validate a model judgment, and the request is too risky to execute automatically.",
      followUpQuestion: null,
      factors: ["safe_fallback", failure]
    };
  }

  if (signals.requiresClarification) {
    return {
      decision: "ask_clarifying_question",
      rationale: "The system could not safely complete judgment and the request still has unresolved context.",
      followUpQuestion: "Can you clarify the missing details before I act?",
      factors: ["safe_fallback", failure]
    };
  }

  return {
    decision: "confirm_before_executing",
    rationale: "The system could not safely validate the model response, so it is requiring confirmation before any execution.",
    followUpQuestion: null,
    factors: ["safe_fallback", failure]
  };
}

export function finalizeDecision({ signals, parsedModelOutput, failure }) {
  if (failure) {
    return {
      ...buildSafeFallback(signals, failure),
      source: "fallback"
    };
  }

  if (signals.policyBlock.blocked) {
    return {
      decision: "refuse_or_escalate",
      rationale: "Code-level policy checks block this action regardless of the model's preference.",
      followUpQuestion: null,
      factors: [...signals.policyBlock.reasons, "deterministic_policy_override"],
      source: "deterministic_override"
    };
  }

  if (signals.requiresClarification) {
    return {
      decision: "ask_clarifying_question",
      rationale: "Deterministic checks found unresolved intent or parameters, so the system asks for clarification before executing.",
      followUpQuestion: parsedModelOutput.followUpQuestion || "Can you clarify the missing details before I proceed?",
      factors: [
        ...signals.missingCriticalContext,
        ...signals.ambiguityFlags,
        "deterministic_clarification_override"
      ],
      source: "deterministic_override"
    };
  }

  if (
    ["execute_silently", "execute_and_inform"].includes(parsedModelOutput.decision) &&
    (signals.requiresConfirmation || signals.riskLevel === "critical")
  ) {
    return {
      decision: "confirm_before_executing",
      rationale: "The model preferred a lower-friction action, but the coded safety thresholds require user confirmation for this level of risk or historical conflict.",
      followUpQuestion: null,
      factors: ["lower_friction_action_blocked_by_confirmation_threshold"],
      source: "deterministic_override"
    };
  }

  return {
    ...parsedModelOutput,
    source: "model_validated"
  };
}
