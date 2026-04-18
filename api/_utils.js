export function json(payload, init = {}) {
  const status = init.status || 200;
  const headers = new Headers(init.headers || {});
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");

  return new Response(JSON.stringify(payload, null, 2), {
    ...init,
    status,
    headers,
  });
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch (error) {
    throw new Error("Request body must be valid JSON.");
  }
}
