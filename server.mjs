import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

import { buildDecisionResponse } from "./src/decision-engine.js";
import { scenarioCatalog } from "./src/scenarios.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = normalize(join(__filename, ".."));
const publicDir = join(__dirname, "public");
const host = "127.0.0.1";
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload, null, 2));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf-8");
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error("Request body must be valid JSON."));
      }
    });
    request.on("error", reject);
  });
}

async function serveStatic(response, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const normalizedPath = normalize(safePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(publicDir, normalizedPath);

  if (!filePath.startsWith(publicDir) || !existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = extname(filePath);
  response.writeHead(200, {
    "Content-Type": contentTypes[extension] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/api/scenarios") {
    sendJson(response, 200, {
      scenarios: scenarioCatalog,
      defaults: {
        action: scenarioCatalog[0].action,
        latestUserMessage: scenarioCatalog[0].latestUserMessage,
        conversationHistory: scenarioCatalog[0].conversationHistory,
        userState: scenarioCatalog[0].userState,
      },
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/decide") {
    try {
      const payload = await readRequestBody(request);
      const result = await buildDecisionResponse(payload);
      sendJson(response, 200, result);
    } catch (error) {
      sendJson(response, 400, {
        error: error instanceof Error ? error.message : "Unexpected server error.",
      });
    }
    return;
  }

  if (request.method === "GET") {
    await serveStatic(response, url.pathname);
    return;
  }

  sendJson(response, 405, { error: "Method not allowed." });
});

server.listen(port, host, async () => {
  const indexPath = join(publicDir, "index.html");
  const hasIndex = existsSync(indexPath) ? "ready" : "missing index.html";
  console.log(`alfred_ prototype listening on http://${host}:${port} (${hasIndex})`);
  await readFile(indexPath, "utf8").catch(() => null);
});
