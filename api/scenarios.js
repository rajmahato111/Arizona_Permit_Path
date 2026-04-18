import { scenarioCatalog } from "../src/scenarios.js";
import { json } from "./_utils.js";

export default {
  fetch(request) {
    if (request.method !== "GET") {
      return json({ error: "Method not allowed." }, { status: 405 });
    }

    return json({
      scenarios: scenarioCatalog,
      defaults: {
        action: scenarioCatalog[0].action,
        latestUserMessage: scenarioCatalog[0].latestUserMessage,
        conversationHistory: scenarioCatalog[0].conversationHistory,
        userState: scenarioCatalog[0].userState,
      },
    });
  },
};
