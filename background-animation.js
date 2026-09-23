/**
 * Multi-Domain Environmental AI Canvas Engine
 * Visually combines:
 * 1. CLIMATE CHANGE: Global CMIP6 latitude/longitude projection arcs, atmospheric wind vectors,
 *    and shifting isobar weather fronts.
 * 2. HYDROLOGY: Sinuous dendritic river basin network, flowing water streamflow tracer pulses,
 *    and groundwater water-table equipotential flowlines.
 * 3. SMART AGRICULTURE: Precision agricultural field grid, soil moisture sensor telemetry pings,
 *    and crop evapotranspiration vapor streams.
 * 4. AI & DEEP LEARNING: Neural network nodes connecting these physical layers with pulsing
 *    synaptic data packets and interactive magnetic cursor connections.
 */

(function () {
  'use strict';

  // Respect user preference for reduced motion
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

  const ctx = canvas.getContext('2d', { alpha: false });
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let animationFrameId = null;
  let globalTick = 0;

  // Mouse tracking
  const mouse = {
    x: -9999,
    y: -9999,
    radius: 170,
    active: false
  };

  // Color Palette Constants
  const PALETTE = {
    cyan: { r: 56, g: 189, b: 248, hex: '#38bdf8' },      // AI / Streamflow Cyan
    emerald: { r: 52, g: 211, b: 153, hex: '#34d399' },  // Agriculture / Soil Emerald
    teal: { r: 20, g: 184, b: 166, hex: '#14b8a6' },     // Hydrology / Water Teal
    violet: { r: 129, g: 140, b: 248, hex: '#818cf8' },  // Climate Change / Atmosphere
    amber: { r: 251, g: 191, b: 36, hex: '#fbbf24' }     // Solar / Radiative Forcing
  };

  // -------------------------------------------------------------
  // 1. CLIMATE CHANGE: Global CMIP6 Grid Arcs & Wind Vectors
  // -------------------------------------------------------------
  function drawClimateAtmosphere() {
    ctx.save();
    
    // Draw Global Coordinate Grid Arcs (CMIP6 Climate GCM Grid)
    const centerX = width * 0.85;
    const centerY = height * 0.22;
    const globeRadius = Math.min(width, height) * 0.42;

    ctx.strokeStyle = 'rgba(129, 140, 248, 0.055)';
    ctx.lineWidth = 1;

    // Latitude circles
    for (let r = 60; r <= globeRadius; r += 55) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Longitude elliptical arcs
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, globeRadius, globeRadius * (i * 0.22), (globalTick * 0.001) + (i * 0.4), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(129, 140, 248, ${0.04 - i * 0.007})`;
      ctx.stroke();
    }

    // Atmospheric Isobar Pressure Waves (Monsoon Moisture & Temperature Flux)
    const layers = 3;
    for (let l = 0; l < layers; l++) {
      ctx.beginPath();
      const waveAlpha = 0.035 + l * 0.02;
      const grad = ctx.createLinearGradient(0, height * 0.4, width, height);
      if (l === 0) {
        grad.addColorStop(0, `rgba(129, 140, 248, ${waveAlpha})`);
        grad.addColorStop(1, `rgba(56, 189, 248, ${waveAlpha})`);
      } else if (l === 1) {
        grad.addColorStop(0, `rgba(20, 184, 166, ${waveAlpha})`);
        grad.addColorStop(1, `rgba(52, 211, 153, ${waveAlpha})`);
      } else {
        grad.addColorStop(0, `rgba(52, 211, 153, ${waveAlpha * 0.7})`);
        grad.addColorStop(1, `rgba(129, 140, 248, ${waveAlpha * 0.7})`);
      }

      ctx.fillStyle = grad;
      ctx.moveTo(0, height);

      const segment = 40;
      const points = Math.ceil(width / segment) + 1;
      const baseH = height * (0.75 + l * 0.08);

      for (let p = 0; p <= points; p++) {
        const px = p * segment;
        const py = baseH +
          Math.sin(px * 0.0022 + globalTick * (0.01 + l * 0.004)) * (26 + l * 14) +
          Math.cos(px * 0.0045 - globalTick * 0.008) * (14 + l * 8);
        ctx.lineTo(px, py);
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Glowing isobar crest line
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.14 - l * 0.035})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.restore();
  }

  // -------------------------------------------------------------
  // 2. HYDROLOGY: River Basin Network & Streamflow Tracers
  // -------------------------------------------------------------
  const streamTracers = [];
  const tracerCount = 40;

  // River branches definitions
  const riverBranches = [
    { startY: 0.35, midY: 0.52, endY: 0.68, cpX1: 0.25, cpX2: 0.65 },
    { startY: 0.20, midY: 0.40, endY: 0.55, cpX1: 0.35, cpX2: 0.70 },
    { startY: 0.50, midY: 0.62, endY: 0.82, cpX1: 0.40, cpX2: 0.75 }
  ];

  class StreamTracer {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.branch = Math.floor(Math.random() * riverBranches.length);
      this.progress = init ? Math.random() : 0;
      this.speed = 0.0018 + Math.random() * 0.0022;
      this.size = Math.random() * 2 + 1.2;
      this.alpha = Math.random() * 0.4 + 0.25;
    }
    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.reset(false);
      }
    }
    draw() {
      const b = riverBranches[this.branch];
      // Cubic bezier interpolation along river path
      const t = this.progress;
      const x0 = 0, y0 = height * b.startY;
      const x1 = width * b.cpX1, y1 = height * b.midY;
      const x2 = width * b.cpX2, y2 = height * b.midY * 1.1;
      const x3 = width, y3 = height * b.endY;

      // Bezier curve point
      const cx = (1 - t) ** 3 * x0 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x3;
      const cy = (1 - t) ** 3 * y0 + 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * y3;

      ctx.beginPath();
      ctx.arc(cx, cy, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(20, 184, 166, ${this.alpha})`;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function drawRiverBasinNetwork() {
    ctx.save();
    // Draw subtle river branches (Catchment Drainage Network)
    for (let i = 0; i < riverBranches.length; i++) {
      const b = riverBranches[i];
      ctx.beginPath();
      ctx.moveTo(0, height * b.startY);
      ctx.bezierCurveTo(
        width * b.cpX1, height * b.midY,
        width * b.cpX2, height * b.midY * 1.1,
        width, height * b.endY
      );
      ctx.strokeStyle = `rgba(20, 184, 166, ${0.11 - i * 0.02})`;
      ctx.lineWidth = 2.5 - i * 0.5;
      ctx.stroke();

      // Tributary feeder line
      ctx.beginPath();
      ctx.moveTo(width * (b.cpX1 - 0.15), height * (b.startY - 0.12));
      ctx.quadraticCurveTo(
        width * (b.cpX1), height * b.midY,
        width * (b.cpX1 + 0.12), height * (b.midY * 1.05)
      );
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
    ctx.restore();
  }

  // -------------------------------------------------------------
  // 3. SMART AGRICULTURE: Precision Field Grids & Sensor Pings
  // -------------------------------------------------------------
  const agriSensors = [
    { xRatio: 0.18, yRatio: 0.72, label: 'SOIL-M01' },
    { xRatio: 0.42, yRatio: 0.65, label: 'GW-T02' },
    { xRatio: 0.68, yRatio: 0.78, label: 'PET-S03' },
    { xRatio: 0.88, yRatio: 0.60, label: 'CROP-R04' }
  ];

  function drawAgricultureTelemetry() {
    ctx.save();
    // Perspective field boundary grid in lower third
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.04)';
    ctx.lineWidth = 1;

    const gridY = height * 0.70;
    const gridRows = 5;
    for (let r = 0; r < gridRows; r++) {
      const y = gridY + (r * 32);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Vanishing field grid lines
    const cols = 9;
    const vanishingX = width * 0.5;
    const vanishingY = height * 0.45;
    for (let c = 0; c <= cols; c++) {
      const startX = (width / cols) * c;
      ctx.beginPath();
      ctx.moveTo(vanishingX, vanishingY);
      ctx.lineTo(startX, height);
      ctx.stroke();
    }

    // Telemetry Sensor Pings (Expanding circular pulses)
    for (let i = 0; i < agriSensors.length; i++) {
      const s = agriSensors[i];
      const sx = width * s.xRatio;
      const sy = height * s.yRatio;

      // Ping radar wave
      const pingPhase = (globalTick * 0.02 + i * 1.5) % Math.PI;
      const pingRadius = pingPhase * 16;
      const pingAlpha = Math.max(0, (1 - pingPhase / Math.PI) * 0.4);

      ctx.beginPath();
      ctx.arc(sx, sy, pingRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(52, 211, 153, ${pingAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Sensor Core Pin
      ctx.beginPath();
      ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Sensor telemetry text label
      ctx.font = '9px "Space Grotesk", monospace';
      ctx.fillStyle = 'rgba(52, 211, 153, 0.45)';
      ctx.fillText(s.label, sx + 6, sy - 4);
    }
    ctx.restore();
  }

  // -------------------------------------------------------------
  // 4. AI & DEEP LEARNING: Interactive Neural Nodes & Synapses
  // -------------------------------------------------------------
  const nodes = [];
  const nodeCount = Math.min(50, Math.max(24, Math.floor(window.innerWidth / 34)));
  const maxConnectionDist = 155;
  const packets = [];
  const maxPackets = 24;

  const THEMES = ['ai', 'climate', 'hydrology', 'agriculture'];

  class NeuralNode {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : (Math.random() > 0.5 ? -10 : height + 10);
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.theme = THEMES[Math.floor(Math.random() * THEMES.length)];
      this.color = PALETTE[this.theme === 'ai' ? 'cyan' : (this.theme === 'climate' ? 'violet' : (this.theme === 'hydrology' ? 'teal' : 'emerald'))];
      this.baseRadius = Math.random() * 2 + 2;
      this.radius = this.baseRadius;
      this.pulse = Math.random() * Math.PI * 2;
      this.orbitAngle = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;

      // Mouse magnetic linkage
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.6;
          this.y += (dy / dist) * force * 1.6;
        }
      }

      this.pulse += 0.03;
      this.radius = this.baseRadius + Math.sin(this.pulse) * 0.7;
      this.orbitAngle += 0.015;
    }
    draw() {
      const { r, g, b } = this.color;

      // Soft outer aura
      const aura = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
      aura.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.28)`);
      aura.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
      ctx.fillStyle = aura;
      ctx.fill();

      // Core node dot
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(1.5, this.radius), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.95)`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.85)`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Rotating satellite ring for AI and climate nodes
      if (this.theme === 'ai' || this.theme === 'climate') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.6, this.orbitAngle, this.orbitAngle + 1.4);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
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

      // Node to node edges
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxConnectionDist) {
          const alpha = (1 - dist / maxConnectionDist) * 0.30;
          const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          grad.addColorStop(0, `rgba(${nodeA.color.r}, ${nodeA.color.g}, ${nodeA.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${nodeB.color.r}, ${nodeB.color.g}, ${nodeB.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          // Spontaneous data pulse
          if (packets.length < maxPackets && Math.random() < 0.0035 && dist < 120) {
            packets.push(new SynapticPacket(nodeA, nodeB));
          }
        }
      }

      // Dynamic connection to Mouse
      if (mouse.active) {
        const mdx = mouse.x - nodeA.x;
        const mdy = mouse.y - nodeA.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.50;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    // Mouse aura glow
    if (mouse.active) {
      const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 65);
      mouseGrad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
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
    streamTracers.length = 0;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new NeuralNode());
    }

    for (let i = 0; i < tracerCount; i++) {
      streamTracers.push(new StreamTracer());
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

    // Deep slate-carbon canvas base
    ctx.fillStyle = '#060d13';
    ctx.fillRect(0, 0, width, height);

    // 1. Climate Change: Atmosphere isobars & CMIP6 global grid arcs
    drawClimateAtmosphere();

    // 2. Hydrology: River basin network & streamflow tracers
    drawRiverBasinNetwork();
    for (let i = 0; i < streamTracers.length; i++) {
      streamTracers[i].update();
      streamTracers[i].draw();
    }

    // 3. Smart Agriculture: Precision field grid & sensor pings
    drawAgricultureTelemetry();

    // 4. AI & Deep Learning: Neural graph edges & data packets
    drawNeuralConnections();

    for (let i = packets.length - 1; i >= 0; i--) {
      const alive = packets[i].update();
      if (alive) {
        packets[i].draw();
      } else {
        packets.splice(i, 1);
      }
    }

    // 5. Render active nodes
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
