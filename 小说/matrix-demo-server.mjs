import { createHash, randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import tls from "node:tls";
import { fileURLToPath } from "node:url";

const HOST = "127.0.0.1";
const PORT = Number.parseInt(process.env.MATRIX_DEMO_PORT || "8765", 10);
const UPSTREAM_HOST = "matrix.tencent.com";
const UPSTREAM_PATH = "/ai_gen_txt_server/getClassify";
const HTML_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "matrix-fp-websocket-demo.html");
const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

function writeJson(response, status, value) {
  const body = Buffer.from(JSON.stringify(value));
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": body.length,
    "Cache-Control": "no-store"
  });
  response.end(body);
}

async function serveHtml(response) {
  const body = await readFile(HTML_FILE);
  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Content-Length": body.length,
    "Cache-Control": "no-store"
  });
  response.end(body);
}

async function proxyResult(requestUrl, response) {
  const cos = requestUrl.searchParams.get("cos") || "";
  const startTime = requestUrl.searchParams.get("startTime") || "";

  if (!cos || cos.length > 2048 || !/^\d+$/.test(startTime)) {
    writeJson(response, 400, { success: false, message: "Invalid result query" });
    return;
  }

  const target = new URL("https://matrix.tencent.com/user/detect/result");
  target.searchParams.set("cos", cos);
  target.searchParams.set("startTime", startTime);

  const upstream = await fetch(target, {
    method: "GET",
    redirect: "error",
    headers: {
      Accept: "application/json",
      Origin: "https://matrix.tencent.com",
      Referer: "https://matrix.tencent.com/ai-detect/ai_gen_txt",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36"
    }
  });
  const body = Buffer.from(await upstream.arrayBuffer());
  response.writeHead(upstream.status, {
    "Content-Type": upstream.headers.get("content-type") || "application/json; charset=utf-8",
    "Content-Length": body.length,
    "Cache-Control": "no-store"
  });
  response.end(body);
}

function rejectUpgrade(socket, status, message) {
  if (!socket.destroyed) {
    const body = Buffer.from(message);
    socket.end([
      `HTTP/1.1 ${status}`,
      "Connection: close",
      "Content-Type: text/plain; charset=utf-8",
      `Content-Length: ${body.length}`,
      "",
      message
    ].join("\r\n"));
  }
}

function proxyWebSocket(request, clientSocket, clientHead) {
  const localOrigin = request.headers.origin;
  const allowedOrigins = new Set([
    `http://127.0.0.1:${PORT}`,
    `http://localhost:${PORT}`
  ]);

  if (request.url !== "/matrix-proxy") {
    rejectUpgrade(clientSocket, "404 Not Found", "Unknown WebSocket route");
    return;
  }

  if (localOrigin && !allowedOrigins.has(localOrigin)) {
    rejectUpgrade(clientSocket, "403 Forbidden", "Origin not allowed");
    return;
  }

  const clientKey = request.headers["sec-websocket-key"];
  if (!clientKey || request.headers.upgrade?.toLowerCase() !== "websocket") {
    rejectUpgrade(clientSocket, "400 Bad Request", "Invalid WebSocket upgrade");
    return;
  }

  const upstreamKey = randomBytes(16).toString("base64");
  const upstreamRequest = [
    `GET ${UPSTREAM_PATH} HTTP/1.1`,
    `Host: ${UPSTREAM_HOST}`,
    "Connection: Upgrade",
    "Pragma: no-cache",
    "Cache-Control: no-cache",
    "Upgrade: websocket",
    "Origin: https://matrix.tencent.com",
    "Sec-WebSocket-Version: 13",
    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36",
    "Accept-Encoding: gzip, deflate, br, zstd",
    "Accept-Language: zh-CN,zh;q=0.9,en;q=0.8",
    "Sec-Fetch-Dest: empty",
    "Sec-Fetch-Mode: websocket",
    "Sec-Fetch-Site: same-origin",
    `Sec-WebSocket-Key: ${upstreamKey}`,
    "",
    ""
  ].join("\r\n");

  const upstreamSocket = tls.connect({
    host: UPSTREAM_HOST,
    port: 443,
    servername: UPSTREAM_HOST,
    rejectUnauthorized: true
  });
  let upstreamBuffer = Buffer.alloc(0);
  let upgraded = false;

  const fail = error => {
    const message = error instanceof Error ? error.message : String(error);
    if (!upgraded) {
      rejectUpgrade(clientSocket, "502 Bad Gateway", `Upstream WebSocket failed: ${message}`);
    } else {
      clientSocket.destroy();
    }
    upstreamSocket.destroy();
  };

  const onUpstreamData = chunk => {
    upstreamBuffer = Buffer.concat([upstreamBuffer, chunk]);
    const headerEnd = upstreamBuffer.indexOf("\r\n\r\n");
    if (headerEnd === -1) {
      return;
    }

    const responseHead = upstreamBuffer.subarray(0, headerEnd).toString("utf8");
    if (!responseHead.startsWith("HTTP/1.1 101")) {
      fail(new Error(responseHead.split("\r\n", 1)[0] || "upgrade rejected"));
      return;
    }

    upstreamSocket.off("data", onUpstreamData);
    upstreamSocket.off("error", fail);
    upstreamSocket.setTimeout(0);
    upgraded = true;

    const localAccept = createHash("sha1").update(clientKey + WS_GUID).digest("base64");
    clientSocket.write([
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${localAccept}`,
      "",
      ""
    ].join("\r\n"));

    const upstreamRemainder = upstreamBuffer.subarray(headerEnd + 4);
    if (upstreamRemainder.length) {
      clientSocket.write(upstreamRemainder);
    }
    if (clientHead.length) {
      upstreamSocket.write(clientHead);
    }

    clientSocket.on("error", () => upstreamSocket.destroy());
    upstreamSocket.on("error", () => clientSocket.destroy());
    clientSocket.on("close", () => upstreamSocket.destroy());
    upstreamSocket.on("close", () => clientSocket.destroy());
    clientSocket.pipe(upstreamSocket);
    upstreamSocket.pipe(clientSocket);
  };

  upstreamSocket.setTimeout(15_000, () => fail(new Error("upstream timeout")));
  upstreamSocket.once("secureConnect", () => upstreamSocket.write(upstreamRequest));
  upstreamSocket.on("data", onUpstreamData);
  upstreamSocket.once("error", fail);
}

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", `http://${request.headers.host || `${HOST}:${PORT}`}`);

    if (request.method === "GET" && (requestUrl.pathname === "/" || requestUrl.pathname === "/matrix-fp-websocket-demo.html")) {
      await serveHtml(response);
      return;
    }

    if (request.method === "GET" && requestUrl.pathname === "/health") {
      writeJson(response, 200, {
        ok: true,
        proxy: "/matrix-proxy",
        upstream: `wss://${UPSTREAM_HOST}${UPSTREAM_PATH}`
      });
      return;
    }

    if (request.method === "GET" && requestUrl.pathname === "/matrix-result") {
      await proxyResult(requestUrl, response);
      return;
    }

    writeJson(response, 404, { error: "Not found" });
  } catch (error) {
    writeJson(response, 502, { error: error instanceof Error ? error.message : String(error) });
  }
});

server.on("upgrade", proxyWebSocket);
server.on("clientError", (_, socket) => rejectUpgrade(socket, "400 Bad Request", "Bad request"));

server.listen(PORT, HOST, () => {
  console.log(`Matrix demo: http://${HOST}:${PORT}/matrix-fp-websocket-demo.html`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
