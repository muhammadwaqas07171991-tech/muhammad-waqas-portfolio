/**
 * Environmental AI & Hydrology Background Animation Engine
 * Simulates:
 * 1. Climate / Atmospheric moisture particles with soft drift
 * 2. Neural network synaptic graph with pulsing data transmissions (AI / Deep Learning)
 * 3. Hydrological wave streamlines (Streamflow / Groundwater dynamics)
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
  canvas.style.opacity = '0.9';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let animationFrameId = null;
  let mouse = { x: -1000, y: -1000, radius: 150 };

  // Track window dimensions
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initElements();
  }

  // AI Neural Network Nodes
  const nodes = [];
  const nodeCount = Math.min(42, Math.max(20, Math.floor(window.innerWidth / 40)));
  const connectionDistance = 140;

  class NeuralNode {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height * 0.85; // Upper to mid region
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.baseRadius = Math.random() * 2 + 1.5;
      this.radius = this.baseRadius;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.02 + Math.random() * 0.02;
      // Palette: Cyan (#38bdf8), Emerald (#34d399), Neural Violet (#818cf8)
      const colors = ['rgba(56, 189, 248, ', 'rgba(52, 211, 153, ', 'rgba(129, 140, 248, '];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off borders
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse subtle interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius && dist > 0) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 1.5;
        this.y -= (dy / dist) * force * 1.5;
      }

      this.pulse += this.pulseSpeed;
      this.radius = this.baseRadius + Math.sin(this.pulse) * 0.8;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(1, this.radius), 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.75)';
      ctx.shadowColor = this.color + '0.9)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Climate / Atmospheric Precipitation & Moisture Droplets
  const particles = [];
  const particleCount = 45;

  class ClimateParticle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -10;
      this.length = Math.random() * 12 + 6;
      this.speed = Math.random() * 0.8 + 0.4;
      this.wind = 0.2 + Math.random() * 0.3;
      this.opacity = Math.random() * 0.35 + 0.15;
    }
    update() {
      this.y += this.speed;
      this.x += this.wind;
      if (this.y > height || this.x > width) {
        this.reset(false);
      }
    }
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.wind * 4, this.y + this.length);
      ctx.strokeStyle = `rgba(56, 189, 248, ${this.opacity * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // Hydrology Streamflow & Wave Vectors
  let waveStep = 0;
  function drawHydrologyWaves() {
    waveStep += 0.008;
    const waveCount = 3;
    const baseHeight = height * 0.84;

    for (let i = 0; i < waveCount; i++) {
      ctx.beginPath();
      const waveAlpha = 0.04 + i * 0.03;
      // Hydrology color gradient
      const gradient = ctx.createLinearGradient(0, baseHeight, width, height);
      if (i === 0) {
        gradient.addColorStop(0, `rgba(16, 185, 129, ${waveAlpha})`); // Emerald
        gradient.addColorStop(1, `rgba(56, 189, 248, ${waveAlpha})`); // Cyan
      } else if (i === 1) {
        gradient.addColorStop(0, `rgba(56, 189, 248, ${waveAlpha})`);
        gradient.addColorStop(1, `rgba(99, 102, 241, ${waveAlpha})`);
      } else {
        gradient.addColorStop(0, `rgba(52, 211, 153, ${waveAlpha * 0.8})`);
        gradient.addColorStop(1, `rgba(14, 165, 233, ${waveAlpha * 0.8})`);
      }

      ctx.fillStyle = gradient;
      ctx.moveTo(0, height);

      const segmentWidth = 25;
      const totalPoints = Math.ceil(width / segmentWidth) + 1;

      for (let p = 0; p <= totalPoints; p++) {
        const x = p * segmentWidth;
        const freq1 = 0.0025 + i * 0.001;
        const freq2 = 0.005 + i * 0.0015;
        const yOffset =
          Math.sin(x * freq1 + waveStep * (1.2 + i * 0.4)) * (24 + i * 10) +
          Math.cos(x * freq2 - waveStep * (0.8 + i * 0.3)) * (14 + i * 6);
        const y = baseHeight + i * 35 + yOffset;
        if (p === 0) {
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Top ripple line
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 - i * 0.03})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  function initElements() {
    nodes.length = 0;
    particles.length = 0;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new NeuralNode());
    }
    for (let i = 0; i < particleCount; i++) {
      particles.push(new ClimateParticle());
    }
  }

  // Draw connections between proximate neural nodes
  function drawNeuralSynapses() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.28;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Occasional synaptic signal pulse
          const time = Date.now() * 0.0015;
          const pulseOffset = (i * 7 + j * 13) % 20;
          const pos = (time + pulseOffset * 0.1) % 1;
          if (pos > 0.1 && pos < 0.9 && dist < 100) {
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pos;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pos;
            ctx.beginPath();
            ctx.arc(px, py, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 211, 153, ${alpha * 2.2})`;
            ctx.fill();
          }
        }
      }
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // 1. Hydrology wave dynamics
    drawHydrologyWaves();

    // 2. Climate moisture particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // 3. AI Neural Synapses & Nodes
    drawNeuralSynapses();
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
  }, { passive: true });

  window.addEventListener('mouseleave', function () {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Pause when page is hidden
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }
  });

  // Initialize
  resize();
  render();
})();
