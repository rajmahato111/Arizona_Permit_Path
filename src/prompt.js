export function buildPrompt(input, signals) {
  const systemPrompt = [
    "You are an execution decision layer for an AI assistant that acts over email, calendar, reminders, and scheduling.",
    "Decide exactly one action state:",
    "- execute_silently",
    "- execute_and_inform",
    "- confirm_before_executing",
    "- ask_clarifying_question",
    "- refuse_or_escalate",
    "Treat this as a contextual conversation decision, not a latest-message classifier.",
    "Use the deterministic signals as strong guidance, especially around ambiguity, policy blocks, contradictory history, and high-risk actions.",
    "Return strict JSON with keys: decision, rationale, confidence, followUpQuestion, factors."
  ].join("\n");

  const userPrompt = JSON.stringify(
    {
      instruction: "Choose the safest reasonable execution decision and explain it briefly.",
      input: {
        action: input.action,
        latestUserMessage: input.latestUserMessage,
        conversationHistory: input.conversationHistory,
        userState: input.userState
      },
      computedSignals: signals,
      responseShape: {
        decision: "one of the allowed decision enums",
        rationale: "1-3 concise sentences",
        confidence: "number between 0 and 1",
        followUpQuestion: "string or null",
        factors: ["short reason", "short reason"]
      }
    },
    null,
    2
  );

  return {
    systemPrompt,
    userPrompt
  };
}
