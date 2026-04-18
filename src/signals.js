const ACTION_KEYWORDS = {
  reminders: ["reminder", "remind", "todo", "to-do"],
  calendar: ["calendar", "meeting", "reschedule", "invite", "1:1"],
  communications: ["email", "reply", "send", "draft", "message"],
  finance: ["wire", "transfer", "$", "payment", "invoice", "vendor account", "bank"],
  legal: ["contract", "pricing language", "discount", "legal"],
  booking: ["book", "reserve", "dinner", "restaurant", "schedule"]
};

function includesAny(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

function compact(list) {
  return list.filter(Boolean);
}

function inferActionType(text) {
  if (includesAny(text, ACTION_KEYWORDS.finance)) return "finance";
  if (includesAny(text, ACTION_KEYWORDS.communications)) return "communications";
  if (includesAny(text, ACTION_KEYWORDS.calendar)) return "calendar";
  if (includesAny(text, ACTION_KEYWORDS.reminders)) return "reminder";
  if (includesAny(text, ACTION_KEYWORDS.booking)) return "booking";
  return "general";
}

function detectAmbiguity(action, latestUserMessage) {
  const lowerAction = action.toLowerCase();
  const lowerLatest = latestUserMessage.toLowerCase();
  const flags = [];

  if (/\b(it|that|this|them)\b/.test(lowerLatest)) {
    flags.push("latest_message_uses_pronoun_reference");
  }

  if (lowerAction.includes("next week") && !/\b(mon|tues|wednes|thurs|fri|sat|sun|\d{1,2}(:\d{2})?\s?(am|pm))\b/.test(lowerAction)) {
    flags.push("scheduling_window_is_underspecified");
  }

  if (includesAny(lowerAction, ACTION_KEYWORDS.booking) && !/\b(at|on)\b/.test(lowerAction)) {
    flags.push("booking_missing_time_or_location");
  }

  if (lowerAction.includes("send") && lowerLatest.trim().length < 16) {
    flags.push("short_confirmation_may_depend_on_prior_context");
  }

  return flags;
}

function detectMissingCriticalContext(action, latestUserMessage, actionType) {
  const lowerAction = action.toLowerCase();
  const missing = [];

  if (!action.trim()) {
    missing.push("missing_action");
  }

  if (!latestUserMessage.trim()) {
    missing.push("missing_latest_user_message");
  }

  if (actionType === "booking" && !/\b(mon|tues|wednes|thurs|fri|sat|sun|tomorrow|tonight|lunch|dinner|\d{1,2}(:\d{2})?\s?(am|pm))\b/.test(lowerAction)) {
    missing.push("missing_booking_time");
  }

  if (actionType === "communications" && lowerAction.includes("send") && !/\b(to|partner|acme|vendor|customer|legal|maya)\b/.test(lowerAction)) {
    missing.push("missing_message_target");
  }

  return missing;
}

function detectHistorySignals(conversationHistory) {
  const joined = conversationHistory.map((entry) => entry.content.toLowerCase()).join("\n");
  const hasHold = /\b(hold off|don't send|do not send|not yet|wait until|wait for legal|legal reviews)\b/.test(joined);
  const hasPriorApprovalPrompt = /\b(want me to send|should i send|ready to send|want me to book)\b/.test(joined);
  return {
    hasHold,
    hasPriorApprovalPrompt
  };
}

function detectApproval(latestUserMessage) {
  return /\b(yes|yep|send it|go ahead|looks good|do it|please send|ship it)\b/i.test(latestUserMessage);
}

function computeRiskProfile(action, latestUserMessage, conversationHistory) {
  const fullText = [action, latestUserMessage, ...conversationHistory.map((entry) => entry.content)].join("\n").toLowerCase();
  const factors = compact([
    includesAny(fullText, ACTION_KEYWORDS.finance) && "financial",
    includesAny(fullText, ACTION_KEYWORDS.legal) && "legal",
    /\b(external|partner|vendor|customer)\b/.test(fullText) && "external",
    /\b(new account|bank|routing)\b/.test(fullText) && "fraud",
    /\b(personal data|ssn|private|confidential)\b/.test(fullText) && "privacy"
  ]);

  let riskScore = 1;
  if (factors.includes("external")) riskScore += 1;
  if (factors.includes("legal")) riskScore += 2;
  if (factors.includes("financial")) riskScore += 3;
  if (factors.includes("fraud")) riskScore += 2;
  if (factors.includes("privacy")) riskScore += 2;

  let riskLevel = "low";
  if (riskScore >= 7) {
    riskLevel = "critical";
  } else if (riskScore >= 5) {
    riskLevel = "high";
  } else if (riskScore >= 3) {
    riskLevel = "medium";
  }

  return { riskFactors: factors, riskScore, riskLevel };
}

function computePolicyBlock(action, latestUserMessage, riskFactors) {
  const fullText = `${action}\n${latestUserMessage}`.toLowerCase();
  const reasons = compact([
    /\bwire\b/.test(fullText) && "wire_transfers_are_blocked_from_silent_execution",
    /\bnew account\b/.test(fullText) && "new_payment_destinations_require_escalation",
    riskFactors.includes("fraud") && "potential_fraud_pattern_detected"
  ]);

  return {
    blocked: reasons.length > 0,
    reasons
  };
}

export function computeSignals(input) {
  const action = String(input.action || "");
  const latestUserMessage = String(input.latestUserMessage || "");
  const conversationHistory = Array.isArray(input.conversationHistory) ? input.conversationHistory : [];
  const userState = input.userState && typeof input.userState === "object" ? input.userState : {};

  const actionType = inferActionType(action);
  const ambiguityFlags = detectAmbiguity(action, latestUserMessage);
  const missingCriticalContext = detectMissingCriticalContext(action, latestUserMessage, actionType);
  const historySignals = detectHistorySignals(conversationHistory);
  const hasExplicitApproval = detectApproval(latestUserMessage);
  const { riskFactors, riskScore, riskLevel } = computeRiskProfile(action, latestUserMessage, conversationHistory);
  const policyBlock = computePolicyBlock(action, latestUserMessage, riskFactors);
  const hasContradictionInHistory = historySignals.hasHold && hasExplicitApproval;
  const externalImpact = riskFactors.includes("external") || actionType === "communications";
  const reversibility = actionType === "reminder" ? "high" : actionType === "calendar" ? "medium" : "low";
  const requiresClarification =
    missingCriticalContext.length > 0 ||
    ambiguityFlags.includes("scheduling_window_is_underspecified") ||
    ambiguityFlags.includes("booking_missing_time_or_location") ||
    (ambiguityFlags.includes("latest_message_uses_pronoun_reference") && !historySignals.hasPriorApprovalPrompt);
  const requiresConfirmation =
    hasContradictionInHistory ||
    riskLevel === "high" ||
    (riskFactors.includes("external") && (riskFactors.includes("legal") || riskFactors.includes("financial")));

  return {
    actionType,
    ambiguityFlags,
    requiresClarification,
    requiresConfirmation,
    missingCriticalContext,
    hasExplicitApproval,
    hasPriorApprovalPrompt: historySignals.hasPriorApprovalPrompt,
    hasContradictionInHistory,
    policyBlock,
    externalImpact,
    reversibility,
    riskFactors,
    riskScore,
    riskLevel,
    userState: {
      delegationPreference: userState.delegationPreference || "unknown",
      urgency: userState.urgency || "unknown"
    }
  };
}
