import { computeSignals } from "./signals.js";
import { buildPrompt } from "./prompt.js";
import { finalizeDecision } from "./finalize.js";
import { ModelTimeoutError, parseModelOutput, requestModelDecision } from "./model.js";

function normalizeConversationHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((entry) => entry && typeof entry === "object")
    .map((entry) => ({
      role: String(entry.role || "user"),
      content: String(entry.content || "")
    }));
}

export async function buildDecisionResponse(payload) {
  const input = {
    action: String(payload.action || ""),
    latestUserMessage: String(payload.latestUserMessage || ""),
    conversationHistory: normalizeConversationHistory(payload.conversationHistory),
    userState: payload.userState && typeof payload.userState === "object" ? payload.userState : {},
    simulationMode: String(payload.simulationMode || "normal")
  };

  const signals = computeSignals(input);
  const prompt = buildPrompt(input, signals);

  let modelCall = null;
  let parsedModelOutput = null;
  let failure = null;

  try {
    modelCall = await requestModelDecision({
      input,
      signals,
      prompt,
      simulationMode: input.simulationMode
    });
    parsedModelOutput = parseModelOutput(modelCall.rawText);
  } catch (error) {
    if (error instanceof ModelTimeoutError) {
      failure = "llm_timeout";
    } else if (error instanceof Error && /malformed|invalid decision/i.test(error.message)) {
      failure = "malformed_model_output";
    } else {
      failure = "model_request_error";
    }
  }

  const finalDecision = finalizeDecision({
    signals,
    parsedModelOutput,
    failure
  });

  return {
    input,
    computedSignals: signals,
    exactPromptSent: prompt,
    model: modelCall
      ? {
          provider: modelCall.provider,
          model: modelCall.model,
          latencyMs: modelCall.latencyMs
        }
      : null,
    rawModelOutput: modelCall ? modelCall.rawText : null,
    parsedModelOutput,
    failure,
    finalDecision
  };
}
