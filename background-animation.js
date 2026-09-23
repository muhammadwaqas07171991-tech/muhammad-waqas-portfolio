/**
 * Environmental AI Cinematic Canvas Animation Engine
 * Layers live interactive animations on top of the Climate-Hydrology-Agriculture Landscape:
 * 1. AI Synaptic Graph: Floating neural nodes with pulsing data packets & dynamic cursor link
 * 2. Hydrology River Current: Glowing cyan water flow tracers drifting down the river valley
 * 3. Climate Precipitation: Gentle atmospheric rain / moisture particles falling from storm clouds
 * 4. Agricultural Telemetry: Expanding bio-emerald sensor pings across crop terraces
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let animationFrameId = null;
  let globalTick = 0;

  // Mouse interaction
  const mouse = {
    x: -9999,
    y: -9999,
    radius: 180,
    active: false
  };

  // Color Palette
  const PALETTE = {
    cyan: { r: 56, g: 189, b: 248, hex: '#38bdf8' },      // AI & Streamflow
    emerald: { r: 52, g: 211, b: 153, hex: '#34d399' },  // Agriculture & Crops
    teal: { r: 20, g: 184, b: 166, hex: '#14b8a6' },     // River Hydrology
    violet: { r: 129, g: 140, b: 248, hex: '#818cf8' },  // Atmospheric Climate
    gold: { r: 251, g: 191, b: 36, hex: '#fbbf24' }      // Solar Irradiance
  };

  // -------------------------------------------------------------
  // 1. CLIMATE: Rain & Atmospheric Moisture Particles (Storm Cloud)
  // -------------------------------------------------------------
  const rainDrops = [];
  const rainCount = 42;

  class RainDrop {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      // Concentrated towards left and center under storm clouds
      this.x = Math.random() * (width * 0.65);
      this.y = init ? Math.random() * height : -15;
      this.speed = Math.random() * 2.4 + 1.6;
      this.wind = 0.8 + Math.random() * 0.6;
      this.length = Math.random() * 16 + 8;
      this.alpha = Math.random() * 0.28 + 0.12;
    }
    update() {
      this.y += this.speed;
      this.x += this.wind;
      if (this.y > height || this.x > width * 0.75) {
        this.reset(false);
      }
    }
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.wind * 4, this.y + this.length);
      ctx.strokeStyle = `rgba(56, 189, 248, ${this.alpha})`;
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }
  }

  // -------------------------------------------------------------
  // 2. HYDROLOGY: River Streamflow Flow Tracers along Riverbed
  // -------------------------------------------------------------
  const riverTracers = [];
  const tracerCount = 48;

  // River path coordinates (approximating valley stream)
  const riverPath = [
    { x: 0.0, y: 0.72 },
    { x: 0.16, y: 0.78 },
    { x: 0.28, y: 0.66 },
    { x: 0.36, y: 0.52 },
    { x: 0.44, y: 0.49 },
    { x: 0.52, y: 0.47 },
    { x: 0.60, y: 0.48 }
  ];

  class RiverTracer {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.progress = init ? Math.random() : 0;
      this.speed = 0.002 + Math.random() * 0.0025;
      this.laneOffset = (Math.random() - 0.5) * 36;
      this.size = Math.random() * 2 + 1.2;
      this.alpha = Math.random() * 0.45 + 0.25;
    }
    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.reset(false);
      }
    }
    draw() {
      // Evaluate piecewise path along river
      const totalSegments = riverPath.length - 1;
      const scaledP = this.progress * totalSegments;
      const index = Math.min(totalSegments - 1, Math.floor(scaledP));
      const subT = scaledP - index;

      const p0 = riverPath[index];
      const p1 = riverPath[index + 1];

      // Flow coordinate
      const rx = (p0.x + (p1.x - p0.x) * subT) * width;
      const ry = (p0.y + (p1.y - p0.y) * subT) * height + this.laneOffset;

      // Draw glowing fluid tracer
      ctx.beginPath();
      ctx.arc(rx, ry, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // -------------------------------------------------------------
  // 3. AGRICULTURE: Smart Farm Sensor Telemetry Pings
  // -------------------------------------------------------------
  const cropSensors = [
    { xRatio: 0.46, yRatio: 0.68, label: 'SOIL-MOISTURE' },
    { xRatio: 0.62, yRatio: 0.64, label: 'CROP-ET' },
    { xRatio: 0.78, yRatio: 0.72, label: 'PRECISION-IRR' },
    { xRatio: 0.90, yRatio: 0.62, label: 'NITROGEN-OP' },
    { xRatio: 0.72, yRatio: 0.54, label: 'CANOPY-TEMP' }
  ];

  function drawCropTelemetry() {
    ctx.save();
    for (let i = 0; i < cropSensors.length; i++) {
      const s = cropSensors[i];
      const sx = width * s.xRatio;
      const sy = height * s.yRatio;

      // Concentric expanding radar wave
      const phase = (globalTick * 0.02 + i * 1.3) % Math.PI;
      const radius = phase * 18;
      const alpha = Math.max(0, (1 - phase / Math.PI) * 0.45);

      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Sensor Pin Core
      ctx.beginPath();
      ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Small telemetry badge
      ctx.font = '9px "Space Grotesk", monospace';
      ctx.fillStyle = 'rgba(167, 243, 208, 0.6)';
      ctx.fillText(s.label, sx + 6, sy - 5);
    }
    ctx.restore();
  }

  // -------------------------------------------------------------
  // 4. AI NEURAL NETWORK: Interconnected Nodes & Synapses
  // -------------------------------------------------------------
  const nodes = [];
  const nodeCount = Math.min(48, Math.max(22, Math.floor(window.innerWidth / 36)));
  const maxConnDist = 150;
  const packets = [];
  const maxPackets = 26;

  class NeuralNode {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : (Math.random() > 0.5 ? -10 : height + 10);
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.baseRadius = Math.random() * 2 + 1.8;
      this.radius = this.baseRadius;
      this.pulse = Math.random() * Math.PI * 2;
      this.orbitAngle = Math.random() * Math.PI * 2;
      // Palette: Cyan (AI/Water), Emerald (Agri), Violet (Climate)
      const colors = [PALETTE.cyan, PALETTE.emerald, PALETTE.teal, PALETTE.violet];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;

      // Interactive mouse attraction
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }
      }

      this.pulse += 0.03;
      this.radius = this.baseRadius + Math.sin(this.pulse) * 0.6;
      this.orbitAngle += 0.015;
    }
    draw() {
      const { r, g, b } = this.color;

      // Soft glow
      const aura = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3.8);
      aura.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.35)`);
      aura.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 3.8, 0, Math.PI * 2);
      ctx.fillStyle = aura;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(1.5, this.radius), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.95)`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbital satellite arc
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2.5, this.orbitAngle, this.orbitAngle + 1.2);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  class SynapticPacket {
    constructor(nodeA, nodeB) {
      this.nodeA = nodeA;
      this.nodeB = nodeB;
      this.progress = 0;
      this.speed = 0.009 + Math.random() * 0.012;
      this.color = nodeA.color;
    }
    update() {
      this.progress += this.speed;
      return this.progress < 1;
    }
    draw() {
      const px = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * this.progress;
      const py = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * this.progress;
      const { r, g, b } = this.color;

      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 1)`;
      ctx.shadowBlur = 7;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function drawNeuralConnections() {
    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i];

      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxConnDist) {
          const alpha = (1 - dist / maxConnDist) * 0.28;
          const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          grad.addColorStop(0, `rgba(${nodeA.color.r}, ${nodeA.color.g}, ${nodeA.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${nodeB.color.r}, ${nodeB.color.g}, ${nodeB.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          if (packets.length < maxPackets && Math.random() < 0.0035 && dist < 120) {
            packets.push(new SynapticPacket(nodeA, nodeB));
          }
        }
      }

      // Cursor magnetic laser link
      if (mouse.active) {
        const mdx = mouse.x - nodeA.x;
        const mdy = mouse.y - nodeA.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.52;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    if (mouse.active) {
      const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 65);
      mouseGrad.addColorStop(0, 'rgba(56, 189, 248, 0.24)');
      mouseGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 65, 0, Math.PI * 2);
      ctx.fillStyle = mouseGrad;
      ctx.fill();
    }
  }

  // -------------------------------------------------------------
  // INITIALIZATION & RESIZE
  // -------------------------------------------------------------
  function initElements() {
    nodes.length = 0;
    packets.length = 0;
    rainDrops.length = 0;
    riverTracers.length = 0;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new NeuralNode());
    }

    for (let i = 0; i < rainCount; i++) {
      rainDrops.push(new RainDrop());
    }

    for (let i = 0; i < tracerCount; i++) {
      riverTracers.push(new RiverTracer());
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initElements();
  }

  // -------------------------------------------------------------
  // ANIMATION LOOP
  // -------------------------------------------------------------
  function render() {
    globalTick++;

    // Clear transparently so photographic background landscape shines through
    ctx.clearRect(0, 0, width, height);

    // 1. Rain particles falling from storm clouds (Climate)
    for (let i = 0; i < rainDrops.length; i++) {
      rainDrops[i].update();
      rainDrops[i].draw();
    }

    // 2. River current tracers along stream (Hydrology)
    for (let i = 0; i < riverTracers.length; i++) {
      riverTracers[i].update();
      riverTracers[i].draw();
    }

    // 3. Crop telemetry sensor pings (Agriculture)
    drawCropTelemetry();

    // 4. Neural synaptic network & cursor link (AI)
    drawNeuralConnections();

    for (let i = packets.length - 1; i >= 0; i--) {
      const alive = packets[i].update();
      if (alive) {
        packets[i].draw();
      } else {
        packets.splice(i, 1);
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Event Listeners
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', function () {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('touchmove', function (e) {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', function () {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }
  });

  resize();
  render();
})();
