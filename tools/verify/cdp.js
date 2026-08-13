// Raw CDP driver for Masala Run headless verification (docs/verification.md fallback).
// Node 26 has a built-in WebSocket, so there is nothing to install.
const fs = require("fs");

const PORT = process.env.MR_CDP_PORT ? +process.env.MR_CDP_PORT : 9333;
const BASE = "http://127.0.0.1:" + PORT;

async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await fetch(BASE + "/json/list").then((r) => r.json());
      const page = list.find((t) => t.type === "page");
      if (page) return page;
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("no CDP page target");
}

class Session {
  constructor(ws) {
    this.ws = ws; this.id = 0; this.pending = new Map();
    this.console = []; this.errors = [];
    ws.addEventListener("message", (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && this.pending.has(m.id)) {
        const { resolve, reject } = this.pending.get(m.id);
        this.pending.delete(m.id);
        m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
      } else if (m.method === "Runtime.exceptionThrown") {
        this.errors.push(m.params.exceptionDetails.text + " " +
          (m.params.exceptionDetails.exception?.description || ""));
      } else if (m.method === "Runtime.consoleAPICalled") {
        const txt = m.params.args.map((a) => a.value ?? a.description ?? a.type).join(" ");
        this.console.push(m.params.type + ": " + txt);
        if (m.params.type === "error") this.errors.push(txt);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expr) {
    const r = await this.send("Runtime.evaluate", {
      expression: expr, awaitPromise: true, returnByValue: true,
    });
    if (r.exceptionDetails) {
      throw new Error("eval: " + r.exceptionDetails.text + " " +
        (r.exceptionDetails.exception?.description || "") + "\n  expr: " + expr.slice(0, 200));
    }
    return r.result.value;
  }
  async shot(path, crop) {
    const args = { format: "png" };
    if (crop) args.clip = { ...crop, scale: 1 };
    const r = await this.send("Page.captureScreenshot", args);
    fs.writeFileSync(path, Buffer.from(r.data, "base64"));
    return path;
  }
}

async function connect() {
  const t = await target();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res, { once: true });
    ws.addEventListener("error", rej, { once: true });
  });
  const s = new Session(ws);
  await s.send("Page.enable");
  await s.send("Runtime.enable");
  return s;
}

// Navigate and wait for the game to be live.
async function boot(s, url) {
  await s.send("Page.navigate", { url });
  for (let i = 0; i < 120; i++) {
    const ok = await s.eval("typeof window.__mr === 'object' && !!window.__mr.dims").catch(() => false);
    if (ok) break;
    await new Promise((r) => setTimeout(r, 150));
  }
  await s.eval(`(async()=>{for(let i=0;i<12;i++)await new Promise(r=>requestAnimationFrame(r));})()`);
}

// Advance n ticks with real rAF frames, holding god mode so a diagnostic walk
// cannot die (docs/verification.md).
async function ticks(s, n, holdY) {
  return s.eval(`(async()=>{
    for(let i=0;i<${n};i++){
      __mr.player.maxHp = __mr.player.hp = 99;
      ${holdY != null ? `__mr.player.y = ${holdY};` : ""}
      __mr.tick(1/60);
      if(i%6===0) await new Promise(r=>requestAnimationFrame(r));
    }
    await new Promise(r=>requestAnimationFrame(r));
    return true;
  })()`);
}

// Crop rect for the design area (verification.md: viewport != play area).
async function designCrop(s) {
  return s.eval(`(()=>{const l=__mr.layout,d=__mr.dims;
    return {x:Math.round(l.offX),y:Math.round(l.offY),
            width:Math.round(d.W*l.scale),height:Math.round(d.H*l.scale)};})()`);
}

module.exports = { connect, boot, ticks, designCrop, Session };
