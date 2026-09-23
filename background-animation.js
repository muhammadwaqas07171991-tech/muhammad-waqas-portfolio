/**
 * Dynamic Environmental AI Background Video & Multi-Page Process Canvas Engine
 * -----------------------------------------------------------------------------
 * 1. Fullscreen High-Clarity Video Background (Vibrant, unmuted colors, crystal-clear visibility)
 * 2. High-Density Micro-Nodes (100-130 nodes, fine 1.2-2.2px radius, vividly luminescent)
 * 3. Connected Process Pipeline (Climate Data ➔ Hydrology ➔ Agriculture ➔ AI Models)
 * 4. Dedicated Distinct Dynamic Animation for Every Page:
 *    - Home: Multi-Domain Earth-AI Process Pipeline & Synaptic Conduit
 *    - About: Hydrological Watershed & Streamflow Dynamics
 *    - Publications: Atmospheric Climate Matrix & Precipitation Grid
 *    - Models: Deep Learning Multi-Layer Neural Tensor Network
 *    - Experience: Global Geospatial Research Orbit & Intercontinental Arcs
 *    - Services: Precision Agriculture Smart Farm Telemetry Mesh
 *    - Contact: Cybernetic Neural Resonance & Interactive Wave Shockwaves
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------
  // 1. PAGE DETECTION & VIBRANT BACKGROUND VIDEO INJECTION
  // -------------------------------------------------------------
  const path = window.location.pathname.toLowerCase();
  let pageTheme = 'home';
  if (path.includes('about')) pageTheme = 'about';
  else if (path.includes('publication')) pageTheme = 'publications';
  else if (path.includes('model')) pageTheme = 'models';
  else if (path.includes('experience')) pageTheme = 'experience';
  else if (path.includes('service')) pageTheme = 'services';
  else if (path.includes('contact')) pageTheme = 'contact';

  document.body.setAttribute('data-page', pageTheme);

  // Video container injection
  let videoWrapper = document.getElementById('bg-video-wrapper');
  if (!videoWrapper) {
    videoWrapper = document.createElement('div');
    videoWrapper.id = 'bg-video-wrapper';
    videoWrapper.className = 'bg-video-wrapper';
    videoWrapper.setAttribute('aria-hidden', 'true');

    const video = document.createElement('video');
    video.className = 'bg-video-media';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.preload = 'auto';

    // Page-specific video first, then fallback to main
    const srcPage = document.createElement('source');
    srcPage.src = `bg-video-${pageTheme}.mp4`;
    srcPage.type = 'video/mp4';

    const srcMain = document.createElement('source');
    srcMain.src = 'bg-video-main.mp4';
    srcMain.type = 'video/mp4';

    video.appendChild(srcPage);
    video.appendChild(srcMain);

    // Crystal-clear ambient vignette overlay
    const overlay = document.createElement('div');
    overlay.className = 'bg-video-overlay';

    videoWrapper.appendChild(video);
    videoWrapper.appendChild(overlay);
    document.body.prepend(videoWrapper);

    const onPlayReady = () => video.classList.add('is-ready');
    video.addEventListener('canplaythrough', onPlayReady, { once: true });
    video.addEventListener('playing', onPlayReady, { once: true });

    // Handle mobile autoplay policies
    const tryPlay = () => {
      video.play().then(onPlayReady).catch(() => {
        const startOnTouch = () => {
          video.play().then(onPlayReady);
          window.removeEventListener('pointerdown', startOnTouch);
          window.removeEventListener('scroll', startOnTouch);
        };
        window.addEventListener('pointerdown', startOnTouch, { passive: true });
        window.addEventListener('scroll', startOnTouch, { passive: true, once: true });
      });
    };
    tryPlay();
  }

  if (prefersReducedMotion) return;

  // -------------------------------------------------------------
  // 2. CANVAS CREATION & DPR SCALING
  // -------------------------------------------------------------
  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(canvas, document.body.firstChild.nextSibling);

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let animId = null;
  let globalTick = 0;

  // Interactive mouse tracker
  const mouse = {
    x: -9999,
    y: -9999,
    radius: 200,
    active: false,
    clickRipples: []
  };

  // High-contrast electric pigments (Clearly Seen over video)
  const COLORS = {
    cyan: { r: 56, g: 189, b: 248, hex: '#38bdf8' },       // River Hydrology
    aqua: { r: 0, g: 242, b: 254, hex: '#00f2fe' },        // AI Attention Core
    emerald: { r: 52, g: 211, b: 153, hex: '#34d399' },    // Agriculture & Bio
    violet: { r: 129, g: 140, b: 248, hex: '#818cf8' },    // Atmospheric Climate
    purple: { r: 168, g: 85, b: 247, hex: '#a855f7' },     // Deep Neural Latent
    amber: { r: 251, g: 191, b: 36, hex: '#fbbf24' },      // Solar Radiation
    white: { r: 255, g: 255, b: 255, hex: '#ffffff' }
  };

  // -------------------------------------------------------------
  // 3. COMMON BASE PARTICLES & PROCESS PACKETS
  // -------------------------------------------------------------
  class ProcessPacket {
    constructor(nodeA, nodeB, color) {
      this.nodeA = nodeA;
      this.nodeB = nodeB;
      this.progress = 0;
      this.speed = 0.016 + Math.random() * 0.022; // Fast, visible pulse
      this.color = color || COLORS.aqua;
    }
    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        if (this.nodeB && typeof this.nodeB.ping === 'function') this.nodeB.ping();
        return false;
      }
      return true;
    }
    draw() {
      const px = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * this.progress;
      const py = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * this.progress;
      const { r, g, b } = this.color;

      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 1)`;
      ctx.shadowBlur = 10;
      ctx.fill();

      // Motion streak tail
      const tx = px - (this.nodeB.x - this.nodeA.x) * 0.06;
      const ty = py - (this.nodeB.y - this.nodeA.y) * 0.06;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(px, py);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.85)`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();
    }
  }

  // =============================================================
  // PAGE ANIMATION 1: HOME (Integrated Earth-AI Process Pipeline)
  // =============================================================
  const homeState = {
    nodes: [],
    packets: [],
    maxNodes: 115,
    maxDist: 145,
    // Process stages: 0=Climate, 1=Hydrology, 2=Agri, 3=AI
    domains: [
      { name: 'Climate CMIP6', color: COLORS.violet, stage: 0 },
      { name: 'Hydrology Flow', color: COLORS.cyan, stage: 1 },
      { name: 'Smart Agriculture', color: COLORS.emerald, stage: 2 },
      { name: 'Deep Learning AI', color: COLORS.aqua, stage: 3 }
    ]
  };

  class HomeNode {
    constructor() {
      this.domainInfo = homeState.domains[Math.floor(Math.random() * homeState.domains.length)];
      this.reset(true);
    }
    reset(init = false) {
      this.x = init ? Math.random() * width : (Math.random() > 0.5 ? -10 : width + 10);
      this.y = Math.random() * height;
      const speed = 0.5 + Math.random() * 0.7;
      const ang = Math.random() * Math.PI * 2;
      this.vx = Math.cos(ang) * speed;
      this.vy = Math.sin(ang) * speed;

      // Small refined micro-nodes
      this.radius = 1.4 + Math.random() * 1.2;
      this.pulse = Math.random() * Math.PI * 2;
      this.pingWave = 0;
    }
    ping() {
      if (this.pingWave <= 0) this.pingWave = 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;

      // Cursor interaction
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius && dist > 5) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.6;
          this.y += (dy / dist) * force * 1.6;
        }
      }

      this.pulse += 0.04;
      if (this.pingWave > 0) {
        this.pingWave += 0.05;
        if (this.pingWave > 2.5) this.pingWave = 0;
      }
    }
    draw() {
      const { r, g, b } = this.domainInfo.color;
      const rNow = this.radius + Math.sin(this.pulse) * 0.4;

      // Luminous aura
      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
      ctx.fill();

      // Sharp glowing core
      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Ping wave
      if (this.pingWave > 0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rNow * (1 + this.pingWave * 2.2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, 1 - this.pingWave / 2.5)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function initHome() {
    homeState.nodes.length = 0;
    homeState.packets.length = 0;
    const count = Math.min(125, Math.max(50, Math.floor(width / 16)));
    for (let i = 0; i < count; i++) homeState.nodes.push(new HomeNode());
  }

  function renderHome() {
    const nodes = homeState.nodes;
    const packets = homeState.packets;

    // Draw living connected process synapses
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);

        if (dist < homeState.maxDist) {
          const prox = 1 - dist / homeState.maxDist;
          const alpha = prox * 0.55; // Crisp high-contrast visibility

          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${a.domainInfo.color.r}, ${a.domainInfo.color.g}, ${a.domainInfo.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.domainInfo.color.r}, ${b.domainInfo.color.g}, ${b.domainInfo.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9 + prox * 0.6;
          ctx.stroke();

          // Spawn process flow packets along directional pipeline
          // Stage 0 ➔ 1 ➔ 2 ➔ 3
          const isProcessFlow = (b.domainInfo.stage === (a.domainInfo.stage + 1) % 4);
          if (isProcessFlow && packets.length < 38 && Math.random() < 0.007 && dist < 120) {
            packets.push(new ProcessPacket(a, b, a.domainInfo.color));
          }
        }
      }

      // Cursor laser link
      if (mouse.active) {
        const mdx = mouse.x - a.x;
        const mdy = mouse.y - a.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Update & draw active packets
    for (let i = packets.length - 1; i >= 0; i--) {
      if (packets[i].update()) packets[i].draw();
      else packets.splice(i, 1);
    }

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }
  }

  // =============================================================
  // PAGE ANIMATION 2: ABOUT (Hydrological Watershed Streamflow Dynamics)
  // =============================================================
  const aboutState = {
    streamParticles: [],
    waveLines: 6
  };

  class RiverParticle {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = init ? Math.random() * width : -10;
      this.y = Math.random() * height;
      this.speed = 1.2 + Math.random() * 1.6;
      this.size = 1.3 + Math.random() * 1.5;
      this.waveFreq = 0.006 + Math.random() * 0.004;
      this.waveAmp = 18 + Math.random() * 24;
      this.phase = Math.random() * Math.PI * 2;
      this.color = Math.random() > 0.4 ? COLORS.cyan : COLORS.aqua;
    }
    update() {
      this.x += this.speed;
      this.phase += 0.025;
      this.yOffset = Math.sin(this.x * this.waveFreq + this.phase) * this.waveAmp;
      if (this.x > width + 20) this.reset(false);
    }
    draw() {
      const drawY = this.y + this.yOffset;
      const { r, g, b } = this.color;
      ctx.beginPath();
      ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.85)`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Stream velocity tracer tail
      ctx.beginPath();
      ctx.moveTo(this.x - this.speed * 8, drawY);
      ctx.lineTo(this.x, drawY);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.35)`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  function initAbout() {
    aboutState.streamParticles.length = 0;
    const count = Math.min(130, Math.max(60, Math.floor(width / 14)));
    for (let i = 0; i < count; i++) aboutState.streamParticles.push(new RiverParticle());
  }

  function renderAbout() {
    // 1. Draw flowing river contour stream lines
    ctx.lineWidth = 1.2;
    for (let w = 0; w < aboutState.waveLines; w++) {
      const baseY = height * (0.2 + (w / aboutState.waveLines) * 0.65);
      ctx.beginPath();
      for (let x = 0; x <= width; x += 16) {
        const y = baseY + Math.sin(x * 0.004 + globalTick * 0.015 + w * 0.8) * 22;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 + (w % 2) * 0.08})`;
      ctx.stroke();
    }

    // 2. Draw moving water particles & gauging connections
    const p = aboutState.streamParticles;
    for (let i = 0; i < p.length; i++) {
      p[i].update();
      p[i].draw();

      // Inter-particle velocity links
      for (let j = i + 1; j < Math.min(p.length, i + 8); j++) {
        const dx = p[j].x - p[i].x;
        const dy = (p[j].y + p[j].yOffset) - (p[i].y + p[i].yOffset);
        const dist = Math.hypot(dx, dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(p[i].x, p[i].y + p[i].yOffset);
          ctx.lineTo(p[j].x, p[j].y + p[j].yOffset);
          ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - dist / 90) * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  // =============================================================
  // PAGE ANIMATION 3: PUBLICATIONS (Atmospheric Climate Matrix & Precipitation)
  // =============================================================
  const pubState = {
    rainLines: [],
    radarNodes: []
  };

  class RainStreak {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : -20;
      this.len = 16 + Math.random() * 22;
      this.speed = 3.5 + Math.random() * 3.5;
      this.wind = 1.2 + Math.random() * 0.8;
      this.alpha = 0.25 + Math.random() * 0.35;
    }
    update() {
      this.y += this.speed;
      this.x += this.wind;
      if (this.y > height || this.x > width + 20) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.wind * 4, this.y + this.len);
      ctx.strokeStyle = `rgba(129, 140, 248, ${this.alpha})`;
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }
  }

  class RadarNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = 1.5 + Math.random() * 1.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#818cf8';
      ctx.shadowColor = '#818cf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initPublications() {
    pubState.rainLines.length = 0;
    pubState.radarNodes.length = 0;
    const rainCount = Math.min(80, Math.max(35, Math.floor(width / 24)));
    const nodeCount = Math.min(85, Math.max(40, Math.floor(width / 20)));

    for (let i = 0; i < rainCount; i++) pubState.rainLines.push(new RainStreak());
    for (let i = 0; i < nodeCount; i++) pubState.radarNodes.push(new RadarNode());
  }

  function renderPublications() {
    // 1. Draw atmospheric downscaling mesh
    const nodes = pubState.radarNodes;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${(1 - dist / 130) * 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // 2. Draw rainfall streaks
    for (let i = 0; i < pubState.rainLines.length; i++) {
      pubState.rainLines[i].update();
      pubState.rainLines[i].draw();
    }
  }

  // =============================================================
  // PAGE ANIMATION 4: AI MODELS (Deep Neural Lattice & Tensor Pulses)
  // =============================================================
  const modelsState = {
    layers: [],
    tensorPulses: [],
    layerCount: 5
  };

  class ModelNeuron {
    constructor(layerIndex, layerYRatio, totalInLayer) {
      this.layerIndex = layerIndex;
      this.layerYRatio = layerYRatio;
      this.radius = 1.8 + Math.random() * 1.0;
      this.pulse = Math.random() * Math.PI * 2;
      this.recalcPosition();
    }
    recalcPosition() {
      const marginX = width * 0.12;
      const spanX = width * 0.76;
      this.x = marginX + (this.layerIndex / (modelsState.layerCount - 1)) * spanX;
      this.y = height * this.layerYRatio;
    }
    update() {
      this.pulse += 0.04;
      // Slight vertical float
      this.curY = this.y + Math.sin(this.pulse + this.layerIndex) * 8;
    }
    draw() {
      const color = this.layerIndex === 0 ? COLORS.cyan :
                    (this.layerIndex === modelsState.layerCount - 1 ? COLORS.emerald : COLORS.aqua);
      const { r, g, b } = color;

      ctx.beginPath();
      ctx.arc(this.x, this.curY, this.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.22)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.curY, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 9;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initModels() {
    modelsState.layers = [];
    modelsState.tensorPulses = [];
    const counts = [8, 14, 16, 14, 6];

    for (let l = 0; l < modelsState.layerCount; l++) {
      const layerNeurons = [];
      const n = counts[l];
      for (let i = 0; i < n; i++) {
        const yRatio = 0.15 + (i / (n - 1 || 1)) * 0.70;
        layerNeurons.push(new ModelNeuron(l, yRatio, n));
      }
      modelsState.layers.push(layerNeurons);
    }
  }

  function renderModels() {
    const layers = modelsState.layers;

    // Connect adjacent layers with synaptic weights
    for (let l = 0; l < layers.length - 1; l++) {
      const curr = layers[l];
      const next = layers[l + 1];

      for (let i = 0; i < curr.length; i++) {
        const nA = curr[i];
        nA.update();
        nA.draw();

        for (let j = 0; j < next.length; j++) {
          const nB = next[j];
          if (l === layers.length - 2) {
            nB.update();
            nB.draw();
          }

          ctx.beginPath();
          ctx.moveTo(nA.x, nA.curY);
          ctx.lineTo(nB.x, nB.curY);
          ctx.strokeStyle = `rgba(0, 242, 254, 0.16)`;
          ctx.lineWidth = 0.7;
          ctx.stroke();

          // Spawn forward activation tensor pulses
          if (modelsState.tensorPulses.length < 42 && Math.random() < 0.003) {
            modelsState.tensorPulses.push({
              nA: { x: nA.x, y: nA.curY },
              nB: { x: nB.x, y: nB.curY },
              progress: 0,
              speed: 0.025 + Math.random() * 0.02
            });
          }
        }
      }
    }

    // Draw traveling tensor activation pulses
    const pulses = modelsState.tensorPulses;
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.progress += p.speed;
      if (p.progress >= 1) {
        pulses.splice(i, 1);
        continue;
      }
      const px = p.nA.x + (p.nB.x - p.nA.x) * p.progress;
      const py = p.nA.y + (p.nB.y - p.nA.y) * p.progress;

      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // =============================================================
  // PAGE ANIMATION 5: EXPERIENCE (Global Geospatial Research Orbit)
  // =============================================================
  const expState = {
    nodes: [],
    arcs: 5
  };

  class OrbitNode {
    constructor() {
      this.angle = Math.random() * Math.PI * 2;
      this.speed = (0.003 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1);
      this.radiusX = 140 + Math.random() * (width * 0.42);
      this.radiusY = 80 + Math.random() * (height * 0.35);
      this.size = 1.4 + Math.random() * 1.4;
      this.color = Math.random() > 0.5 ? COLORS.cyan : COLORS.emerald;
    }
    update() {
      this.angle += this.speed;
      this.x = width * 0.5 + Math.cos(this.angle) * this.radiusX;
      this.y = height * 0.5 + Math.sin(this.angle) * this.radiusY;
    }
    draw() {
      const { r, g, b } = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initExperience() {
    expState.nodes.length = 0;
    const count = Math.min(110, Math.max(50, Math.floor(width / 16)));
    for (let i = 0; i < count; i++) expState.nodes.push(new OrbitNode());
  }

  function renderExperience() {
    // 1. Draw orbital reference paths
    ctx.lineWidth = 1;
    for (let a = 1; a <= expState.arcs; a++) {
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.5, (width * 0.42) * (a / expState.arcs), (height * 0.35) * (a / expState.arcs), globalTick * 0.002, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.stroke();
    }

    // 2. Nodes & geodesic connection arcs
    const nodes = expState.nodes;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 125) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(52, 211, 153, ${(1 - dist / 125) * 0.42})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  // =============================================================
  // PAGE ANIMATION 6: SERVICES (Smart Agriculture Precision Sensor Grid)
  // =============================================================
  const servicesState = {
    sensors: [],
    radarAngle: 0
  };

  class AgriSensor {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.size = 1.5 + Math.random() * 1.3;
      this.phase = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
      this.phase += 0.035;
    }
    draw() {
      // Concentric bio-emerald sensor ping
      const pingR = 6 + (Math.sin(this.phase) + 1) * 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, pingR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.28)';
      ctx.lineWidth = 0.9;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initServices() {
    servicesState.sensors.length = 0;
    const count = Math.min(110, Math.max(50, Math.floor(width / 16)));
    for (let i = 0; i < count; i++) servicesState.sensors.push(new AgriSensor());
  }

  function renderServices() {
    servicesState.radarAngle += 0.015;
    const s = servicesState.sensors;

    // Draw field telecommunication links
    for (let i = 0; i < s.length; i++) {
      s[i].update();
      s[i].draw();

      for (let j = i + 1; j < s.length; j++) {
        const dx = s[j].x - s[i].x;
        const dy = s[j].y - s[i].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 135) {
          ctx.beginPath();
          ctx.moveTo(s[i].x, s[i].y);
          ctx.lineTo(s[j].x, s[j].y);
          ctx.strokeStyle = `rgba(52, 211, 153, ${(1 - dist / 135) * 0.48})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  // =============================================================
  // PAGE ANIMATION 7: CONTACT (Cybernetic Neural Resonance & Pulse Wave)
  // =============================================================
  const contactState = {
    nodes: []
  };

  class ContactNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      const speed = 0.6 + Math.random() * 0.8;
      const ang = Math.random() * Math.PI * 2;
      this.vx = Math.cos(ang) * speed;
      this.vy = Math.sin(ang) * speed;
      this.size = 1.3 + Math.random() * 1.3;
      this.color = Math.random() > 0.5 ? COLORS.cyan : COLORS.violet;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interactive wave
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.8;
          this.y += (dy / dist) * force * 1.8;
        }
      }
    }
    draw() {
      const { r, g, b } = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initContact() {
    contactState.nodes.length = 0;
    const count = Math.min(120, Math.max(55, Math.floor(width / 16)));
    for (let i = 0; i < count; i++) contactState.nodes.push(new ContactNode());
  }

  function renderContact() {
    const nodes = contactState.nodes;

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 140) * 0.52})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Cursor connection
      if (mouse.active) {
        const mdx = mouse.x - nodes[i].x;
        const mdy = mouse.y - nodes[i].y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${(1 - mdist / mouse.radius) * 0.7})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 4. MAIN DISPATCHER & LIFECYCLE
  // -------------------------------------------------------------
  function initPage() {
    switch (pageTheme) {
      case 'about': initAbout(); break;
      case 'publications': initPublications(); break;
      case 'models': initModels(); break;
      case 'experience': initExperience(); break;
      case 'services': initServices(); break;
      case 'contact': initContact(); break;
      case 'home':
      default:
        initHome();
        break;
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    initPage();
  }

  function render() {
    globalTick++;

    // Clear transparently so vibrant video background shines through 100%
    ctx.clearRect(0, 0, width, height);

    switch (pageTheme) {
      case 'about': renderAbout(); break;
      case 'publications': renderPublications(); break;
      case 'models': renderModels(); break;
      case 'experience': renderExperience(); break;
      case 'services': renderServices(); break;
      case 'contact': renderContact(); break;
      case 'home':
      default:
        renderHome();
        break;
    }

    animId = requestAnimationFrame(render);
  }

  // -------------------------------------------------------------
  // 5. EVENT LISTENERS
  // -------------------------------------------------------------
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animId) cancelAnimationFrame(animId);
    } else {
      animId = requestAnimationFrame(render);
    }
  });

  resize();
  render();
})();
