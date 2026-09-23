/**
 * Ultra-Modern Environmental AI, Climate & Hydrology Animated Canvas Engine
 * Simulates an interactive Living Eco-Tech Ecosystem:
 * 1. AI Deep Learning: Interconnected neural graph with pulsing synaptic data packets
 * 2. Climate Change: Atmospheric pressure contours & global teleconnection vectors
 * 3. Hydrology: Flowing streamflow tracer particles & groundwater flowlines
 * 4. Smart Agriculture: Distributed environmental sensor nodes & telemetry pings
 * 5. Interactive: Dynamic mouse connection hub with magnetic linkage & photon bursts
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
  canvas.style.opacity = '1';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d', { alpha: false });
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let animationFrameId = null;

  // Mouse tracking
  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    radius: 180,
    active: false
  };

  // Color Palette Constants (Exact palette requested)
  const PALETTE = {
    ai: { r: 56, g: 189, b: 248, hex: '#38bdf8' },         // Electric Cyan
    climate: { r: 129, g: 140, b: 248, hex: '#818cf8' },   // Neural Violet
    hydrology: { r: 20, g: 184, b: 166, hex: '#14b8a6' },  // Deep Teal / Water
    agriculture: { r: 52, g: 211, b: 153, hex: '#34d399' } // Bio Emerald / Mint
  };

  const NODE_TYPES = ['ai', 'climate', 'hydrology', 'agriculture'];

  // -------------------------------------------------------------
  // 1. NEURAL & ENVIRONMENTAL INTERACTIVE NODES
  // -------------------------------------------------------------
  const nodes = [];
  const nodeCount = Math.min(54, Math.max(26, Math.floor(window.innerWidth / 32)));
  const maxConnectionDist = 160;

  class GraphNode {
    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : (Math.random() > 0.5 ? -10 : height + 10);
      this.vx = (Math.random() - 0.5) * 0.55;
      this.vy = (Math.random() - 0.5) * 0.55;
      this.baseRadius = Math.random() * 2.2 + 2;
      this.radius = this.baseRadius;
      this.type = NODE_TYPES[Math.floor(Math.random() * NODE_TYPES.length)];
      this.color = PALETTE[this.type];
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.02 + Math.random() * 0.025;
      this.orbitAngle = Math.random() * Math.PI * 2;
      this.orbitSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Soft boundary loop
      if (this.x < -30) this.x = width + 30;
      if (this.x > width + 30) this.x = -30;
      if (this.y < -30) this.y = height + 30;
      if (this.y > height + 30) this.y = -30;

      // Dynamic mouse interaction (magnetic attraction & gentle spring)
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.8;
          this.y += (dy / dist) * force * 1.8;
        }
      }

      this.pulse += this.pulseSpeed;
      this.radius = this.baseRadius + Math.sin(this.pulse) * 0.8;
      this.orbitAngle += this.orbitSpeed;
    }

    draw() {
      const { r, g, b } = this.color;

      // Outer glowing aura
      const auraGradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 4.5
      );
      auraGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
      auraGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 4.5, 0, Math.PI * 2);
      ctx.fillStyle = auraGradient;
      ctx.fill();

      // Solid central core
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(1.5, this.radius), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.95)`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Subtle satellite orbit ring for AI / Climate nodes
      if (this.type === 'ai' || this.type === 'climate') {
        ctx.beginPath();
        const orbitRadius = this.radius * 2.8;
        ctx.arc(this.x, this.y, orbitRadius, this.orbitAngle, this.orbitAngle + 1.2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  // -------------------------------------------------------------
  // 2. SYNAPSE CONNECTIONS & TRAVELING DATA PACKETS
  // -------------------------------------------------------------
  const packets = [];
  const maxPackets = 28;

  class DataPacket {
    constructor(nodeA, nodeB) {
      this.nodeA = nodeA;
      this.nodeB = nodeB;
      this.progress = 0;
      this.speed = 0.008 + Math.random() * 0.012;
      this.color = nodeA.color;
      this.size = Math.random() * 1.5 + 1.5;
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
      ctx.arc(px, py, this.size, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 1)`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // -------------------------------------------------------------
  // 3. HYDROLOGY STREAMFLOW PARTICLES & VECTORS
  // -------------------------------------------------------------
  const hydrologicParticles = [];
  const hydroCount = 50;

  class HydrologicTracer {
    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      this.x = init ? Math.random() * width : -10;
      this.y = Math.random() * height;
      this.speed = Math.random() * 1.2 + 0.6;
      this.length = Math.random() * 18 + 10;
      this.frequency = 0.003 + Math.random() * 0.002;
      this.amplitude = Math.random() * 14 + 6;
      this.baseY = this.y;
      this.phase = Math.random() * Math.PI * 2;
      this.alpha = Math.random() * 0.28 + 0.12;
    }

    update() {
      this.x += this.speed;
      this.phase += 0.02;
      this.y = this.baseY + Math.sin(this.x * this.frequency + this.phase) * this.amplitude;

      if (this.x > width + 20) {
        this.reset(false);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.length, this.y - (this.amplitude * 0.15));
      ctx.strokeStyle = `rgba(20, 184, 166, ${this.alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Flow head particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha * 1.5})`;
      ctx.fill();
    }
  }

  // -------------------------------------------------------------
  // 4. ATMOSPHERIC CLIMATE CONTOUR WAVES (ISOBARS & MONSOON)
  // -------------------------------------------------------------
  let waveTime = 0;
  function drawClimateContours() {
    waveTime += 0.006;
    const layers = 3;

    for (let l = 0; l < layers; l++) {
      ctx.beginPath();
      const alpha = 0.025 + l * 0.02;
      const gradient = ctx.createLinearGradient(0, height * 0.6, width, height);
      if (l === 0) {
        gradient.addColorStop(0, `rgba(56, 189, 248, ${alpha})`);
        gradient.addColorStop(1, `rgba(20, 184, 166, ${alpha})`);
      } else if (l === 1) {
        gradient.addColorStop(0, `rgba(129, 140, 248, ${alpha})`);
        gradient.addColorStop(1, `rgba(52, 211, 153, ${alpha})`);
      } else {
        gradient.addColorStop(0, `rgba(52, 211, 153, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(56, 189, 248, ${alpha * 0.8})`);
      }

      ctx.fillStyle = gradient;
      ctx.moveTo(0, height);

      const segment = 35;
      const totalPoints = Math.ceil(width / segment) + 1;
      const baseline = height * (0.80 + l * 0.06);

      for (let p = 0; p <= totalPoints; p++) {
        const x = p * segment;
        const y =
          baseline +
          Math.sin(x * 0.0025 + waveTime * (1 + l * 0.4)) * (24 + l * 12) +
          Math.cos(x * 0.005 - waveTime * 0.8) * (12 + l * 6);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Glowing contour streamline
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 - l * 0.03})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // -------------------------------------------------------------
  // INITIALIZATION & RESIZE
  // -------------------------------------------------------------
  function initElements() {
    nodes.length = 0;
    packets.length = 0;
    hydrologicParticles.length = 0;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new GraphNode());
    }

    for (let i = 0; i < hydroCount; i++) {
      hydrologicParticles.push(new HydrologicTracer());
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
  // RENDER CONNECTIONS BETWEEN NODES & MOUSE
  // -------------------------------------------------------------
  function drawNetworkEdges() {
    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i];

      // Draw lines between nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxConnectionDist) {
          const alpha = (1 - dist / maxConnectionDist) * 0.32;
          const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          grad.addColorStop(0, `rgba(${nodeA.color.r}, ${nodeA.color.g}, ${nodeA.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${nodeB.color.r}, ${nodeB.color.g}, ${nodeB.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          // Spontaneously spawn synaptic data packets
          if (packets.length < maxPackets && Math.random() < 0.0035 && dist < 120) {
            packets.push(new DataPacket(nodeA, nodeB));
          }
        }
      }

      // Draw connection from nearby nodes to Mouse cursor
      if (mouse.active) {
        const mdx = mouse.x - nodeA.x;
        const mdy = mouse.y - nodeA.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.55;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Draw mouse focal glow if active
    if (mouse.active) {
      const mouseGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 60
      );
      mouseGrad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      mouseGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
      ctx.fillStyle = mouseGrad;
      ctx.fill();
    }
  }

  // -------------------------------------------------------------
  // MAIN ANIMATION LOOP
  // -------------------------------------------------------------
  function render() {
    // Deep carbon background with high contrast
    ctx.fillStyle = '#060d13';
    ctx.fillRect(0, 0, width, height);

    // 1. Climate & Hydrological Isobar Contours
    drawClimateContours();

    // 2. Hydrology Streamflow Tracers
    for (let i = 0; i < hydrologicParticles.length; i++) {
      hydrologicParticles[i].update();
      hydrologicParticles[i].draw();
    }

    // 3. Synaptic Network Edges
    drawNetworkEdges();

    // 4. Synaptic Data Packets (Pulsing Information Flow)
    for (let i = packets.length - 1; i >= 0; i--) {
      const alive = packets[i].update();
      if (alive) {
        packets[i].draw();
      } else {
        packets.splice(i, 1);
      }
    }

    // 5. Neural & Environmental Nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // -------------------------------------------------------------
  // EVENT LISTENERS & VISIBILITY HANDLING
  // -------------------------------------------------------------
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

  // Touch support for mobile devices
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

  // Pause when tab is not visible to preserve GPU & battery
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }
  });

  // Start engine
  resize();
  render();
})();
