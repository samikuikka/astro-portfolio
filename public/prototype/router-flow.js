/**
 * RouterFlow — a reusable vertical router-topology animation.
 *
 * Requests drop from circular endpoint nodes at the top, travel curved
 * wires into a router device icon in the middle (antennas, LEDs that blink
 * when it routes), and land on slim server boxes at the bottom. Wires only
 * exist once used: they draw themselves in ahead of the packet, flow
 * (animated dashes) while it travels, and keep a tinted routing history
 * afterwards. Servers flash on landing and keep the latest result chip;
 * the billed counter tallies the run.
 *
 * Usage: <script src="/prototype/router-flow.js"></script>
 *        RouterFlow.mount(element, config)
 *
 * config = {
 *   mark: "bad" | "good",              // header glyph + counter color
 *   routerKey: "apo-…" | null,         // tag the router routes by (shown at the router)
 *   replicas: 3,                       // server count (row at the bottom)
 *   requests: [
 *     { label: "A · no key",           // packet chip text
 *       from: 0,                       // source node index
 *       to: 0,                         // replica index the router sends it to
 *       outcome: "miss" | "write" | "hit",
 *       billed: 23293,                 // tokens added to the counter on landing
 *       chip: "0/23,293 cached" },     // result chip text on the replica
 *   ],
 * }
 */
(function () {
  "use strict";

  const CSS = `
.rf { border: 1px solid #292929; background: #161616; padding: 6px 0 10px; overflow: hidden;
      font-family: "Noto Sans", ui-sans-serif, system-ui, sans-serif; }
.rf * { box-sizing: border-box; margin: 0; padding: 0; border-radius: 0 !important; }
.rf-head { display: flex; align-items: baseline; gap: 8px; margin: 2px 12px 0; }
.rf-mark { font-size: 11px; font-weight: 600; }
.rf-mark.bad { color: #cf4c4c; }
.rf-mark.good { color: #4db168; }
.rf-count { margin-left: auto; font-size: 10px; color: #8a8a8a; font-family: ui-monospace, monospace; }
.rf-count b { font-weight: 600; font-size: 11.5px; margin-left: 5px; }
.rf-count b.bad { color: #cf4c4c; }
.rf-count b.good { color: #4db168; }
.rf-stage { position: relative; height: 254px; }
.rf svg.wires { position: absolute; inset: 0; overflow: visible; }

/* wires are invisible until a packet uses them */
.rf .ln { stroke: #3a3a3a; stroke-width: 1.5; fill: none; visibility: hidden; }
.rf .ln.bridge { stroke: none; }
.rf .ln.flow, .rf .ln.used, .rf .ln.t-miss, .rf .ln.t-write, .rf .ln.t-hit { visibility: visible; }
.rf .ln.used { stroke: #3a3a3a; }
.rf .ln.flow { stroke: #8a8a8a; stroke-dasharray: 5 7; animation: rf-dash .5s linear infinite; }
@keyframes rf-dash { to { stroke-dashoffset: -12; } }
.rf .ln.t-miss { stroke: #a84848; }
.rf .ln.t-write { stroke: #b08530; }
.rf .ln.t-hit { stroke: #3f9e5f; stroke-dasharray: none; animation: none; }

/* circular endpoint nodes */
.rf-src { position: absolute; top: 4px; width: 24px; height: 24px; transform: translateX(-50%);
          border-radius: 50% !important; display: flex; align-items: center; justify-content: center;
          background: #101010; border: 1px solid #3a3a3a;
          font-size: 9px; color: #8a8a8a; font-family: ui-monospace, monospace; }

/* router device icon: body, antennas, LEDs that blink while routing */
.rf-router { position: absolute; top: 86px; left: 50%; transform: translateX(-50%);
             display: flex; flex-direction: column; align-items: center; }
.rf-router .rnode { display: block; }
.rf-router .rnode .ant, .rf-router .rnode .body, .rf-router .rnode .vent {
  stroke: #5a5a5a; stroke-width: 1.5; fill: none; transition: stroke .25s ease; }
.rf-router .rnode .body { fill: #101010; }
.rf-router .rnode .led { fill: #3a3a3a; }
.rf-router.decide .rnode .ant, .rf-router.decide .rnode .body, .rf-router.decide .rnode .vent { stroke: #ededed; }
.rf-router.decide .rnode .led { animation: rf-led .28s steps(2, jump-none) infinite alternate; }
@keyframes rf-led { from { fill: #d7a13e; } to { fill: #3a3a3a; } }
.rf-router .rkey { margin-top: 4px; font-size: 9px; color: #d7a13e; font-family: ui-monospace, monospace;
                   opacity: 0; transition: opacity .3s ease; }
.rf-router.keyed .rkey { opacity: 1; }

/* slim server boxes; active states use full-color borders */
.rf-rep { position: absolute; top: 202px; width: 21%; height: 46px; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
          background: #1c1c1c; border: 1px solid #2f2f2f;
          transition: border-color .4s ease, box-shadow .4s ease; }
.rf-rep .rlbl { font-size: 9px; color: #5c5c5c; font-family: ui-monospace, monospace; }
.rf-rep.st-miss { border-color: #cf4c4c; box-shadow: inset 0 0 0 1px #cf4c4c44; }
.rf-rep.st-write { border-color: #d7a13e; box-shadow: inset 0 0 0 1px #d7a13e44; }
.rf-rep.st-hit { border-color: #4db168; box-shadow: inset 0 0 0 1px #4db16844; }
.rf-rep.warm::after { content: ""; position: absolute; top: 3px; right: 3px; width: 4px; height: 4px; background: #4db168; }
.rf-res { display: none; font-size: 9px; font-family: ui-monospace, monospace; white-space: nowrap; }
.rf-res.show { display: inline-flex; animation: rf-pop .3s ease; }
.rf-res.miss { color: #cf4c4c; }
.rf-res.write { color: #d7a13e; }
.rf-res.read { color: #4db168; }
@keyframes rf-pop { from { transform: scale(.85); opacity: 0; } to { transform: none; opacity: 1; } }

.rf-pkt { position: absolute; left: 0; top: 0; height: 18px; padding: 0 5px; display: none; align-items: center;
          background: #161616; border: 1px solid #4a4a4a; z-index: 2;
          font-size: 9px; color: #ededed; font-family: ui-monospace, monospace; white-space: nowrap; }
.rf-pkt.spawn { display: inline-flex; animation: rf-pop .25s ease; }
`;

  // a small router device: antennas, body, LED row, vent line
  const ROUTER_GLYPH =
    '<svg class="rnode" width="72" height="56" viewBox="0 0 72 56">' +
    '<path class="ant" d="M 20 16 L 12 3"></path>' +
    '<path class="ant" d="M 52 16 L 60 3"></path>' +
    '<rect class="body" x="4" y="16" width="64" height="28"></rect>' +
    '<circle class="led" cx="18" cy="28" r="2.4"></circle>' +
    '<circle class="led" cx="28" cy="28" r="2.4"></circle>' +
    '<circle class="led" cx="38" cy="28" r="2.4"></circle>' +
    '<circle class="led" cx="48" cy="28" r="2.4"></circle>' +
    '<path class="vent" d="M 14 37 L 58 37"></path>' +
    "</svg>";

  function ensureStyles() {
    if (document.getElementById("rf-styles")) return;
    const s = document.createElement("style");
    s.id = "rf-styles";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ?timers: drive animation frames on setTimeout instead of rAF. Same
  // visuals at ~30fps; used by headless captures (virtual time fast-forwards
  // timers but stalls rAF). Harmless without the parameter.
  const RF_TIMERS = new URLSearchParams(location.search).has("timers");
  if (new URLSearchParams(location.search).has("timers")) {
    const st = document.createElement("style");
    st.textContent = "* { transition: none !important; animation: none !important; }";
    document.head.appendChild(st);
  }

  if (RF_TIMERS) {
    window.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 33);
  }

  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function mount(root, cfg) {
    ensureStyles();
    const N = cfg.replicas || 3;
    const fmt = (n) => n.toLocaleString("en-US");

    root.className = "rf";
    root.innerHTML =
      '<div class="rf-head"><span class="rf-mark ' + cfg.mark + '">' + (cfg.mark === "bad" ? "✗" : "✓") + "</span>" +
      '<span class="rf-count">billed<b class="' + cfg.mark + '">0</b> tok</span></div>' +
      '<div class="rf-stage"></div>';
    const stage = root.querySelector(".rf-stage");
    const count = root.querySelector(".rf-count b");

    // node centers inset from the edges so the replica boxes and the source
    // circles above them never clip at the chart borders
    const xAt = (i, n) => (n === 1 ? 50 : 15 + (70 / (n - 1)) * i);
    stage.innerHTML =
      '<svg class="wires"></svg>' +
      cfg.requests.map((r) => '<div class="rf-src">' + String.fromCharCode(65 + r.from) + "</div>").join("") +
      '<div class="rf-router">' + ROUTER_GLYPH + '<span class="rkey"></span></div>' +
      Array.from({ length: N }, (_, i) =>
        '<div class="rf-rep"><span class="rlbl">replica ' + (i + 1) + '</span><span class="rf-res"></span></div>',
      ).join("") +
      cfg.requests.map(() => '<div class="rf-pkt"></div>').join("");

    const svg = stage.querySelector("svg.wires");
    const router = stage.querySelector(".rf-router");
    const body = router.querySelector(".rnode .body"); // wires attach to the body box
    const srcs = [...stage.querySelectorAll(".rf-src")];
    const reps = [...stage.querySelectorAll(".rf-rep")];
    const pkts = [...stage.querySelectorAll(".rf-pkt")];
    if (cfg.routerKey) router.querySelector(".rkey").textContent = cfg.routerKey;

    srcs.forEach((s, i) => { s.style.left = xAt(cfg.requests[i].from, N) + "%"; });
    reps.forEach((r, i) => { r.style.left = xAt(i, N) + "%"; });

    // one inbound wire per request, one outbound wire per replica, plus a
    // hidden per-request path across the router body so the packet crosses
    // through it instead of teleporting edge to edge
    const mkPath = () => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("class", "ln");
      svg.appendChild(p);
      return p;
    };
    const inPaths = cfg.requests.map(mkPath);
    const outPaths = Array.from({ length: N }, mkPath);
    const bridges = cfg.requests.map(mkPath);

    const rectIn = (el) => {
      const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
      return { left: r.left - s.left, top: r.top - s.top, w: r.width, h: r.height };
    };

    function layout() {
      const s = stage.getBoundingClientRect();
      svg.setAttribute("width", s.width);
      svg.setAttribute("height", s.height);
      svg.setAttribute("viewBox", "0 0 " + s.width + " " + s.height);
      const B = rectIn(body);
      const cx = B.left + B.w / 2, top = B.top, bottom = B.top + B.h;
      const ports = (n) => {
        const spread = 14;
        return n === 1 ? [0] : Array.from({ length: n }, (_, i) => -spread + ((2 * spread) / (n - 1)) * i);
      };
      const inXs = ports(srcs.length), outXs = ports(N);
      const curve = (x1, y1, x2, y2) => {
        const my = (y1 + y2) / 2;
        return "M " + x1 + " " + y1 + " C " + x1 + " " + my + ", " + x2 + " " + my + ", " + x2 + " " + y2;
      };
      cfg.requests.forEach((r, i) => {
        const S = rectIn(srcs[i]);
        inPaths[i].setAttribute("d", curve(S.left + S.w / 2, S.top + S.h + 4, cx + inXs[i], top));
        bridges[i].setAttribute("d", curve(cx + inXs[i], top, cx + outXs[r.to], bottom));
      });
      Array.from({ length: N }, (_, i) => {
        const P = rectIn(reps[i]);
        outPaths[i].setAttribute("d", curve(cx + outXs[i], bottom, P.left + P.w / 2, P.top));
      });
    }

    let runId = 0;

    // move a packet along an SVG path; a runId bump mid-flight cancels it
    function travel(pathEl, pkt, dur, done) {
      const id = runId;
      const len = pathEl.getTotalLength();
      const t0 = performance.now();
      const frame = (now) => {
        if (id !== runId) return;
        const t = Math.min(1, (now - t0) / dur);
        const p = pathEl.getPointAtLength(easeInOut(t) * len);
        pkt.style.transform = "translate(" + (p.x - pkt.offsetWidth / 2) + "px," + (p.y - pkt.offsetHeight / 2) + "px)";
        if (t < 1) requestAnimationFrame(frame);
        else done();
      };
      requestAnimationFrame(frame);
    }

    // a wire draws itself in just ahead of the packet that uses it
    function drawOn(p) {
      const len = p.getTotalLength();
      p.style.visibility = "visible";
      p.style.transition = "none";
      p.style.strokeDasharray = len + " " + len;
      p.style.strokeDashoffset = len;
      const toZero = (t) => { p.style.strokeDashoffset = (len * (1 - t)) + "px"; };
      if (RF_TIMERS) {
        const t0 = performance.now();
        const tick = () => {
          const t = Math.min(1, (performance.now() - t0) / 450);
          toZero(t);
          if (t < 1) setTimeout(tick, 20);
        };
        tick();
        return;
      }
      void p.getBoundingClientRect();
      p.style.transition = "stroke-dashoffset .45s ease";
      toZero(1);
    }

    // hand the wire back to class-based styling (flow dashes / tint)
    function toClass(p, cls) {
      p.style.cssText = "";
      p.setAttribute("class", "ln" + (cls ? " " + cls : ""));
    }

    function reset() {
      count.textContent = "0";
      pkts.forEach((p) => { p.className = "rf-pkt"; p.style.transform = ""; });
      reps.forEach((r) => {
        r.className = "rf-rep";
        const res = r.querySelector(".rf-res");
        res.className = "rf-res";
        res.textContent = "";
      });
      [...inPaths, ...outPaths, ...bridges].forEach((p) => { p.style.cssText = ""; p.setAttribute("class", "ln"); });
      bridges.forEach((p) => p.setAttribute("class", "ln bridge"));
      router.classList.remove("decide", "keyed");
      layout();
    }

    const RES_CLS = { miss: "miss", write: "write", hit: "read" };

    function land(i) {
      const r = cfg.requests[i];
      const rep = reps[r.to];
      const res = rep.querySelector(".rf-res");
      rep.classList.remove("st-write", "st-hit");
      rep.classList.add("st-" + r.outcome, "warm");
      res.className = "rf-res " + RES_CLS[r.outcome];
      res.textContent = r.chip;
      void res.offsetWidth;
      res.classList.add("show");
      count.textContent = fmt(cfg.requests.slice(0, i + 1).reduce((a, q) => a + q.billed, 0));
      toClass(outPaths[r.to], "t-" + r.outcome);
    }

    function guard(fn) {
      const id = runId;
      return (...args) => { if (id === runId) fn(...args); };
    }

    function runRequest(i, done) {
      if (i >= cfg.requests.length) return done();
      const r = cfg.requests[i];
      const pkt = pkts[i];
      pkt.textContent = r.label;

      const g = guard(() => {
        pkt.classList.add("spawn");
        const p0 = inPaths[i].getPointAtLength(0);
        pkt.style.transform = "translate(" + (p0.x - pkt.offsetWidth / 2) + "px," + (p0.y - pkt.offsetHeight / 2) + "px)";
        drawOn(inPaths[i]);
        setTimeout(guard(() => {
          toClass(inPaths[i], "flow");
          travel(inPaths[i], pkt, 700, guard(() => {
            toClass(inPaths[i], "used");
            router.classList.add("decide");
            if (cfg.routerKey) router.classList.add("keyed");
            setTimeout(() => router.classList.remove("decide"), 600);
            drawOn(outPaths[r.to]);
            // cross through the router while it decides
            travel(bridges[i], pkt, 300, guard(() => {
              toClass(outPaths[r.to], "flow");
              travel(outPaths[r.to], pkt, 700, guard(() => {
                pkt.classList.remove("spawn");
                land(i);
                setTimeout(guard(() => runRequest(i + 1, done)), 320);
              }));
            }));
          }));
        }), 260);
      });
      g();
    }

    function play() {
      runId += 1;
      reset();
      const finish = guard(() => setTimeout(guard(play), 1500));
      runRequest(0, finish);
    }

    function staticEnd() {
      layout();
      let total = 0;
      const lastByRep = {};
      cfg.requests.forEach((r, i) => {
        total += r.billed;
        lastByRep[r.to] = r;
        toClass(inPaths[i], "used");
      });
      Object.entries(lastByRep).forEach(([repIdx, r]) => {
        const el = reps[+repIdx];
        el.classList.add("st-" + r.outcome, "warm");
        const res = el.querySelector(".rf-res");
        res.className = "rf-res show " + RES_CLS[r.outcome];
        res.textContent = r.chip;
        toClass(outPaths[+repIdx], "t-" + r.outcome);
      });
      count.textContent = fmt(total);
      if (cfg.routerKey) router.classList.add("keyed");
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      staticEnd();
      let rt;
      window.addEventListener("resize", () => {
        clearTimeout(rt);
        rt = setTimeout(staticEnd, 150);
      });
    } else {
      const startLoop = () => {
        if (stage.clientWidth < 120) return requestAnimationFrame(startLoop);
        play();
      };
      startLoop();
      root.addEventListener("click", () => play());
      // wires are drawn in px from live node rects — redraw when resized,
      // but only once the width is sane (resize can fire at transient
      // sizes mid-drag)
      let rt, rt2, lastW = 0;
      const safeRestart = () => {
        const w = stage.clientWidth;
        if (w < 120) return setTimeout(safeRestart, 100);
        if (w === lastW) return;
        lastW = w;
        play();
      };
      window.addEventListener("resize", () => {
        clearTimeout(rt);
        rt = setTimeout(safeRestart, 150);
        // a settle pass: resize can report transient widths mid-drag, so
        // confirm once more at the final size
        clearTimeout(rt2);
        rt2 = setTimeout(safeRestart, 600);
      });
    }
  }

  window.RouterFlow = { mount };
})();
