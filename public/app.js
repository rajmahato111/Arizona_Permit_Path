const scenarioList = document.getElementById("scenario-list");
const form = document.getElementById("decision-form");
const actionField = document.getElementById("action");
const latestUserMessageField = document.getElementById("latestUserMessage");
const conversationHistoryField = document.getElementById("conversationHistory");
const userStateField = document.getElementById("userState");
const simulationModeField = document.getElementById("simulationMode");
const decisionSummary = document.getElementById("decision-summary");
const inputOutput = document.getElementById("input-output");
const signalsOutput = document.getElementById("signals-output");
const promptOutput = document.getElementById("prompt-output");
const rawModelOutput = document.getElementById("raw-model-output");
const parsedModelOutput = document.getElementById("parsed-model-output");

function formatDecision(decision) {
  return decision.replaceAll("_", " ");
}

function renderDecisionSummary(result) {
  if (!result || !result.finalDecision) {
    decisionSummary.innerHTML = `<p class="loading-text">Choose a scenario or edit the fields, then evaluate the decision.</p>`;
    return;
  }

  const decision = result.finalDecision.decision;
  const followUpQuestion = result.finalDecision.followUpQuestion
    ? `<p class="summary-followup"><strong>Follow-up:</strong> ${result.finalDecision.followUpQuestion}</p>`
    : "";
  const warning = result.failure
    ? `<p class="summary-warning"><strong>Failure path:</strong> ${result.failure}. Safe fallback behavior is active.</p>`
    : "";

  decisionSummary.innerHTML = `
    <div class="decision-chip ${decision}">${formatDecision(decision)}</div>
    <div class="summary-meta">
      <span>source: ${result.finalDecision.source}</span>
      <span>provider: ${result.model ? result.model.provider : "none"}</span>
      <span>model: ${result.model ? result.model.model : "n/a"}</span>
      <span>latency: ${result.model ? `${result.model.latencyMs}ms` : "n/a"}</span>
    </div>
    <p class="summary-rationale">${result.finalDecision.rationale}</p>
    ${followUpQuestion}
    ${warning}
  `;
}

function renderInspector(result) {
  inputOutput.textContent = JSON.stringify(result?.input || {}, null, 2);
  signalsOutput.textContent = JSON.stringify(result?.computedSignals || {}, null, 2);
  promptOutput.textContent = JSON.stringify(result?.exactPromptSent || {}, null, 2);
  rawModelOutput.textContent = result?.rawModelOutput || "No raw model output.";
  parsedModelOutput.textContent = JSON.stringify(result?.parsedModelOutput || {}, null, 2);
}

function setFormValues(scenario) {
  actionField.value = scenario.action;
  latestUserMessageField.value = scenario.latestUserMessage;
  conversationHistoryField.value = JSON.stringify(scenario.conversationHistory, null, 2);
  userStateField.value = JSON.stringify(scenario.userState, null, 2);
  simulationModeField.value = "normal";
}

function renderScenarios(scenarios) {
  scenarioList.innerHTML = "";
  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "scenario-card";
    button.innerHTML = `
      <small>${scenario.category}</small>
      <strong>${scenario.title}</strong>
      <span>${scenario.description}</span>
    `;
    button.addEventListener("click", () => {
      setFormValues(scenario);
      renderDecisionSummary(null);
      renderInspector({
        input: {
          action: scenario.action,
          latestUserMessage: scenario.latestUserMessage,
          conversationHistory: scenario.conversationHistory,
          userState: scenario.userState
        }
      });
    });
    scenarioList.appendChild(button);
  });
}

async function loadScenarios() {
  const response = await fetch("/api/scenarios");
  const data = await response.json();
  renderScenarios(data.scenarios);
  setFormValues(data.defaults);
  renderDecisionSummary(null);
  renderInspector({
    input: {
      action: data.defaults.action,
      latestUserMessage: data.defaults.latestUserMessage,
      conversationHistory: data.defaults.conversationHistory,
      userState: data.defaults.userState
    }
  });
}

async function submitDecision(event) {
  event.preventDefault();

  let conversationHistory;
  let userState;

  try {
    conversationHistory = JSON.parse(conversationHistoryField.value);
    userState = JSON.parse(userStateField.value);
  } catch (error) {
    decisionSummary.innerHTML = `<p class="summary-warning"><strong>Input error:</strong> ${error.message}</p>`;
    return;
  }

  decisionSummary.innerHTML = `<p class="loading-text">Evaluating decision…</p>`;

  const response = await fetch("/api/decide", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action: actionField.value,
      latestUserMessage: latestUserMessageField.value,
      conversationHistory,
      userState,
      simulationMode: simulationModeField.value
    })
  });

  const data = await response.json();
  if (!response.ok) {
    decisionSummary.innerHTML = `<p class="summary-warning"><strong>Request failed:</strong> ${data.error}</p>`;
    return;
  }

  renderDecisionSummary(data);
  renderInspector(data);
}

form.addEventListener("submit", submitDecision);
loadScenarios().catch((error) => {
  decisionSummary.innerHTML = `<p class="summary-warning"><strong>Startup error:</strong> ${error.message}</p>`;
});
