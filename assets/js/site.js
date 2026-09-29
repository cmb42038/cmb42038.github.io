// Site interactions: theme toggle, typing intro, copy-email buttons,
// project filter, card hover effects, and the flood-fill maze background.
// Plain JavaScript, no build step.
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- light / dark toggle ---------- */
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") ||
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- typing intro ---------- */
  var typed = document.getElementById("typed");
  if (typed && !reduceMotion) {
    var lines = (typed.getAttribute("data-lines") || "").split("|").filter(Boolean);
    var li = 0, ci = lines[0] ? lines[0].length : 0, deleting = true;
    var tick = function () {
      var line = lines[li];
      if (deleting) {
        ci--;
        if (ci <= 0) { deleting = false; li = (li + 1) % lines.length; line = lines[li]; ci = 0; }
      } else {
        ci++;
        if (ci >= line.length) { typed.textContent = line; deleting = true; return setTimeout(tick, 2200); }
      }
      typed.textContent = line.slice(0, Math.max(ci, 0));
      setTimeout(tick, deleting ? 28 : 55);
    };
    if (lines.length > 1) setTimeout(tick, 2600);
  }

  /* ---------- copy email buttons ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".copy-email"), function (btn) {
    var label = btn.querySelector(".copy-label");
    var original = label ? label.textContent : "";
    btn.addEventListener("click", function () {
      var email = btn.getAttribute("data-email");
      var done = function (msg) {
        if (label) label.textContent = msg;
        btn.classList.add("copied");
        setTimeout(function () { if (label) label.textContent = original; btn.classList.remove("copied"); }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () { done("Copied!"); }, function () { done(email); });
      } else { done(email); }
    });
  });

  /* ---------- project filter (one area per project) ---------- */
  var filters = document.getElementById("filters");
  if (filters) {
    var cards = Array.prototype.slice.call(document.querySelectorAll("#projects .card"));
    var empty = document.getElementById("empty-note");
    var counts = {};
    cards.forEach(function (c) { var k = c.getAttribute("data-category") || ""; counts[k] = (counts[k] || 0) + 1; });
    var allCount = filters.querySelector('[data-filter="all"] .count');
    if (allCount) allCount.textContent = cards.length;
    (filters.getAttribute("data-order") || "").split("|").forEach(function (cat) {
      if (!cat || !counts[cat]) return;
      var b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.setAttribute("data-filter", cat); b.setAttribute("aria-pressed", "false");
      b.appendChild(document.createTextNode(cat + " "));
      var n = document.createElement("span"); n.className = "count"; n.textContent = counts[cat]; b.appendChild(n);
      filters.appendChild(b);
    });
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn || btn.classList.contains("is-active")) return;
      var cat = btn.getAttribute("data-filter");
      Array.prototype.forEach.call(filters.querySelectorAll(".chip"), function (c) {
        var on = c === btn; c.classList.toggle("is-active", on); c.setAttribute("aria-pressed", on ? "true" : "false");
      });
      var shown = 0;
      cards.forEach(function (c, i) {
        var match = cat === "all" || c.getAttribute("data-category") === cat;
        c.hidden = !match;
        c.classList.remove("pop");
        if (match) {
          shown++;
          if (!reduceMotion) { void c.offsetWidth; c.style.animationDelay = (Math.min(shown, 8) * 40) + "ms"; c.classList.add("pop"); }
        }
      });
      if (empty) empty.hidden = shown !== 0;
    });
  }

  /* ---------- card spotlight + tilt ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    Array.prototype.forEach.call(document.querySelectorAll(".card"), function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (x * 100) + "%");
        card.style.setProperty("--my", (y * 100) + "%");
        card.style.setProperty("--ry", ((x - 0.5) * 4).toFixed(2) + "deg");
        card.style.setProperty("--rx", ((0.5 - y) * 4).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------- flood-fill maze background ---------- */
  var canvas = document.getElementById("maze-bg");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var hero = canvas.parentElement;
  var N = 1, E = 2, S = 4, W = 8;
  var DX = { 1: 0, 2: 1, 4: 0, 8: -1 }, DY = { 1: -1, 2: 0, 4: 1, 8: 0 }, OPP = { 1: 4, 2: 8, 4: 1, 8: 2 };
  var cell, cols, rows, walls, dist, order, path, goal, start;
  var phase, t0, hover = -1, running = true, raf = 0, colors = {};

  function readColors() {
    var cs = getComputedStyle(root);
    colors.wall = cs.getPropertyValue("--maze-wall").trim() || "rgba(0,0,0,.15)";
    colors.heat = cs.getPropertyValue("--maze-heat").trim() || "186,12,47";
    colors.path = cs.getPropertyValue("--maze-path").trim() || "0,98,155";
    colors.text = cs.getPropertyValue("--muted").trim() || "#666";
  }

  function build() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = hero.clientWidth, h = hero.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cell = w < 640 ? 30 : 38;
    cols = Math.ceil(w / cell); rows = Math.ceil(h / cell);
    var n = cols * rows;
    walls = new Array(n).fill(N | E | S | W);
    // Carve a perfect maze with an iterative depth-first search.
    var seen = new Array(n).fill(false), stack = [Math.floor(Math.random() * n)];
    seen[stack[0]] = true;
    while (stack.length) {
      var c = stack[stack.length - 1], x = c % cols, y = (c / cols) | 0, opts = [];
      [N, E, S, W].forEach(function (d) {
        var nx = x + DX[d], ny = y + DY[d];
        if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && !seen[ny * cols + nx]) opts.push(d);
      });
      if (!opts.length) { stack.pop(); continue; }
      var d = opts[(Math.random() * opts.length) | 0], nb = (y + DY[d]) * cols + (x + DX[d]);
      walls[c] &= ~d; walls[nb] &= ~OPP[d]; seen[nb] = true; stack.push(nb);
    }
    // Knock out a few extra walls so there are loops, like a real Micromouse maze.
    for (var k = 0; k < n * 0.08; k++) {
      var r = (Math.random() * n) | 0, rx = r % cols, ry = (r / cols) | 0, dd = [E, S][(Math.random() * 2) | 0];
      if (rx + DX[dd] < cols && ry + DY[dd] < rows) { walls[r] &= ~dd; walls[(ry + DY[dd]) * cols + rx + DX[dd]] &= ~OPP[dd]; }
    }
    // Goal near the top right, start near the bottom middle, so the run stays visible.
    var narrow = hero.clientWidth < 760;
    goal = Math.floor(rows * (narrow ? 0.18 : 0.22)) * cols + Math.floor(cols * (narrow ? 0.82 : 0.9));
    start = (rows - 2) * cols + Math.floor(cols * (narrow ? 0.12 : 0.52));
    // Flood fill: breadth-first distances from the goal.
    dist = new Array(n).fill(-1); dist[goal] = 0; order = [goal];
    for (var q = 0; q < order.length; q++) {
      var cc = order[q], cx = cc % cols, cy = (cc / cols) | 0;
      [N, E, S, W].forEach(function (d) {
        if (walls[cc] & d) return;
        var nx = cx + DX[d], ny = cy + DY[d];
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) return;
        var nb = ny * cols + nx;
        if (dist[nb] === -1) { dist[nb] = dist[cc] + 1; order.push(nb); }
      });
    }
    // Follow decreasing distance from start to goal.
    path = [start]; var cur = start, guard = 0;
    while (cur !== goal && dist[cur] > 0 && guard++ < n) {
      var bx = cur % cols, by = (cur / cols) | 0, next = -1;
      [N, E, S, W].forEach(function (d) {
        if (walls[cur] & d) return;
        var nx = bx + DX[d], ny = by + DY[d];
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) return;
        var nb = ny * cols + nx;
        if (dist[nb] === dist[cur] - 1) next = nb;
      });
      if (next < 0) break; cur = next; path.push(cur);
    }
    phase = "flood"; t0 = performance.now();
  }

  function center(i) { return [(i % cols) * cell + cell / 2, ((i / cols) | 0) * cell + cell / 2]; }

  function draw(now) {
    var w = hero.clientWidth, h = hero.clientHeight;
    ctx.clearRect(0, 0, w, h);
    var maxD = dist[order[order.length - 1]] || 1;
    var elapsed = now - t0;
    var floodDur = 3800, runDur = Math.max(2400, path.length * 70), holdDur = 2600;
    var wave = phase === "flood" ? (elapsed / floodDur) * maxD : maxD + 1;
    if (phase === "flood" && elapsed > floodDur) { phase = "run"; t0 = now; elapsed = 0; }
    var fade = 1;
    if (phase === "hold") { fade = Math.max(0, 1 - Math.max(0, elapsed - holdDur + 700) / 700); if (elapsed > holdDur) { build(); return; } }

    // flood-fill heat
    for (var i = 0; i < order.length; i++) {
      var c = order[i], d = dist[c];
      if (d > wave) break;
      var x = (c % cols) * cell, y = ((c / cols) | 0) * cell;
      var a = (0.2 * (1 - d / maxD) + 0.03) * fade;
      if (wave - d < 1.5) a += 0.12 * (1.5 - (wave - d)) * fade;
      ctx.fillStyle = "rgba(" + colors.heat + "," + a.toFixed(3) + ")";
      ctx.fillRect(x, y, cell, cell);
      if (cell >= 34 && (i % 3 === 0 || c === hover)) {
        ctx.fillStyle = colors.text; ctx.globalAlpha = 0.35 * fade;
        ctx.font = "10px 'JetBrains Mono', monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(String(d), x + cell / 2, y + cell / 2); ctx.globalAlpha = 1;
      }
    }
    // hovered cell
    if (hover >= 0) {
      ctx.fillStyle = "rgba(" + colors.path + ",0.16)";
      ctx.fillRect((hover % cols) * cell, ((hover / cols) | 0) * cell, cell, cell);
    }
    // walls
    ctx.strokeStyle = colors.wall; ctx.lineWidth = 1.5; ctx.lineCap = "round"; ctx.beginPath();
    for (var j = 0; j < walls.length; j++) {
      var wx = (j % cols) * cell, wy = ((j / cols) | 0) * cell, m = walls[j];
      if (m & N) { ctx.moveTo(wx, wy); ctx.lineTo(wx + cell, wy); }
      if (m & W) { ctx.moveTo(wx, wy); ctx.lineTo(wx, wy + cell); }
    }
    ctx.stroke();
    // goal marker
    var g = center(goal);
    ctx.strokeStyle = "rgba(" + colors.heat + "," + (0.7 * fade) + ")"; ctx.lineWidth = 2;
    ctx.strokeRect(g[0] - cell / 2 + 5, g[1] - cell / 2 + 5, cell - 10, cell - 10);
    // the mouse and its path
    if (phase === "run" || phase === "hold") {
      var prog = phase === "run" ? Math.min(1, elapsed / runDur) : 1;
      var steps = prog * (path.length - 1), whole = Math.floor(steps), frac = steps - whole;
      ctx.strokeStyle = "rgba(" + colors.path + "," + (0.85 * fade) + ")"; ctx.lineWidth = 3; ctx.lineJoin = "round";
      ctx.beginPath();
      var p0 = center(path[0]); ctx.moveTo(p0[0], p0[1]);
      for (var s = 1; s <= whole; s++) { var ps = center(path[s]); ctx.lineTo(ps[0], ps[1]); }
      var a1 = center(path[whole]), a2 = center(path[Math.min(whole + 1, path.length - 1)]);
      var mx = a1[0] + (a2[0] - a1[0]) * frac, my = a1[1] + (a2[1] - a1[1]) * frac;
      ctx.lineTo(mx, my); ctx.stroke();
      ctx.fillStyle = "rgba(" + colors.path + "," + fade + ")";
      ctx.shadowColor = "rgba(" + colors.path + ",0.6)"; ctx.shadowBlur = 14;
      ctx.beginPath(); ctx.arc(mx, my, 7, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      if (phase === "run" && prog >= 1) { phase = "hold"; t0 = now; }
    }
  }

  function loop(now) {
    if (!running) return;
    draw(now);
    raf = requestAnimationFrame(loop);
  }

  readColors(); build();
  if (reduceMotion) {
    phase = "hold"; t0 = -1e9; // draw the solved maze once, no animation
    var still = function () { phase = "run"; t0 = performance.now() - 1e7; draw(performance.now()); };
    still();
  } else {
    raf = requestAnimationFrame(loop);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        var vis = entries[0].isIntersecting;
        if (vis && !running) { running = true; raf = requestAnimationFrame(loop); }
        if (!vis) { running = false; cancelAnimationFrame(raf); }
      }).observe(hero);
    }
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { build(); if (reduceMotion) { phase = "run"; t0 = performance.now() - 1e7; draw(performance.now()); } }, 200);
  });
  new MutationObserver(function () { readColors(); if (reduceMotion) draw(performance.now()); }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onScheme = function () { readColors(); };
    if (mq.addEventListener) mq.addEventListener("change", onScheme); else if (mq.addListener) mq.addListener(onScheme);
  }
  hero.addEventListener("pointermove", function (e) {
    var r = canvas.getBoundingClientRect();
    var x = Math.floor((e.clientX - r.left) / cell), y = Math.floor((e.clientY - r.top) / cell);
    hover = (x >= 0 && y >= 0 && x < cols && y < rows) ? y * cols + x : -1;
  });
  hero.addEventListener("pointerleave", function () { hover = -1; });
  var again = document.getElementById("maze-new");
  if (again) again.addEventListener("click", function () {
    build();
    if (reduceMotion) { phase = "run"; t0 = performance.now() - 1e7; draw(performance.now()); }
  });
})();
