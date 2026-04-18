import { buildDecisionResponse } from "../src/decision-engine.js";
import { json, readJson } from "./_utils.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, { status: 405 });
    }

    try {
      const payload = await readJson(request);
      const result = await buildDecisionResponse(payload);
      return json(result);
    } catch (error) {
      return json(
        {
          error: error instanceof Error ? error.message : "Unexpected server error.",
        },
        { status: 400 }
      );
    }
  },
};
