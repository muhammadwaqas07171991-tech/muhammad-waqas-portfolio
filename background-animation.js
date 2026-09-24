/**
 * Dynamic Environmental AI Background Video & Multi-Page Process Canvas Engine
 * -----------------------------------------------------------------------------
 * 1. High-Definition Thematic Backdrop + Fullscreen Video System for Every Page
 * 2. High-Density Micro-Nodes (100-130 nodes, dual glow: soft aura + sharp luminous core)
 * 3. Interactive Mouse Laser Conduits & Dynamic Cursor Physics on EVERY Page
 * 4. Dynamic Process Packets with Motion Tails & Ping Waves on EVERY Page
 * 5. Multi-Color Gradient Synaptic Mesh on EVERY Page
 * 6. Interactive Click Ripple Shockwaves across all pages
 * 7. Dedicated Domain Architecture per Page:
 *    - Home: Multi-Domain Earth-AI Process Pipeline (Climate ➔ Hydrology ➔ Agri ➔ AI)
 *    - About: Hydrological Watershed & Fluvial River-Basin Dynamics
 *    - Services: Precision Smart Agriculture & Agro-Ecosystem Telemetry Mesh
 *    - Experience: Global Intercontinental Geospatial Orbit & Research Hubs (KR, TH, PK)
 *    - Models: Deep Neural Tensor Architecture & Multi-Head Self-Attention Lattice
 *    - Publications: Atmospheric CMIP6 Climate Downscaling & Doppler Radar Matrix
 *    - Contact: Cybernetic Communication Nexus & Acoustic Harmonic Resonance
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------
  // 1. PAGE DETECTION & BACKDROP / VIDEO SYSTEM INJECTION
  // -------------------------------------------------------------
  const path = window.location.pathname.toLowerCase();
  const explicitPage = document.body.getAttribute('data-page');
  let pageTheme = explicitPage || 'home';
  if (!explicitPage) {
    if (path.includes('about')) pageTheme = 'about';
    else if (path.includes('publication')) pageTheme = 'publications';
    else if (path.includes('model')) pageTheme = 'models';
    else if (path.includes('experience')) pageTheme = 'experience';
    else if (path.includes('service')) pageTheme = 'services';
    else if (path.includes('contact')) pageTheme = 'contact';
  }
  document.body.setAttribute('data-page', pageTheme);

  // Background wrapper injection
  let videoWrapper = document.getElementById('bg-video-wrapper');
  if (!videoWrapper) {
    videoWrapper = document.createElement('div');
    videoWrapper.id = 'bg-video-wrapper';
    videoWrapper.className = 'bg-video-wrapper';
    videoWrapper.setAttribute('aria-hidden', 'true');

    // 1. High-definition backdrop image layer
    const backdrop = document.createElement('div');
    backdrop.className = 'bg-backdrop';
    videoWrapper.appendChild(backdrop);

    // 2. Video layer (for dynamic wireframe / video overlays)
    const video = document.createElement('video');
    video.className = 'bg-video-media';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.preload = 'auto';

    const srcPage = document.createElement('source');
    srcPage.src = `bg-video-${pageTheme}.mp4`;
    srcPage.type = 'video/mp4';

    const srcMain = document.createElement('source');
    srcMain.src = 'bg-video-main.mp4';
    srcMain.type = 'video/mp4';

    video.appendChild(srcPage);
    video.appendChild(srcMain);
    videoWrapper.appendChild(video);

    // 3. Crystal-clear ambient vignette overlay
    const overlay = document.createElement('div');
    overlay.className = 'bg-video-overlay';
    videoWrapper.appendChild(overlay);

    document.body.prepend(videoWrapper);

    const onPlayReady = () => video.classList.add('is-ready');
    video.addEventListener('canplaythrough', onPlayReady, { once: true });
    video.addEventListener('playing', onPlayReady, { once: true });

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
  let canvas = document.getElementById('ambient-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'ambient-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild.nextSibling);
  }

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
    radius: 190,
    active: false,
    ripples: []
  };

  // High-contrast electric pigments (Luminous over high-def backdrops)
  const COLORS = {
    cyan: { r: 56, g: 189, b: 248, hex: '#38bdf8' },       // River Hydrology
    aqua: { r: 0, g: 242, b: 254, hex: '#00f2fe' },        // AI Attention Core
    emerald: { r: 52, g: 211, b: 153, hex: '#34d399' },    // Agriculture & Bio
    lime: { r: 163, g: 230, b: 53, hex: '#a3e635' },       // Crop Canopy
    violet: { r: 129, g: 140, b: 248, hex: '#818cf8' },    // Atmospheric Climate
    purple: { r: 168, g: 85, b: 247, hex: '#a855f7' },     // Deep Neural Latent
    amber: { r: 251, g: 191, b: 36, hex: '#fbbf24' },      // Solar Radiation / Hubs
    white: { r: 255, g: 255, b: 255, hex: '#ffffff' }
  };

  // -------------------------------------------------------------
  // 3. SHARED CORE PROCESS PACKET CLASS
  // -------------------------------------------------------------
  class ProcessPacket {
    constructor(nodeA, nodeB, color, speedMultiplier = 1) {
      this.nodeA = nodeA;
      this.nodeB = nodeB;
      this.progress = 0;
      this.speed = (0.016 + Math.random() * 0.024) * speedMultiplier;
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
      // Glowing pure white pulse head
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 1)`;
      ctx.shadowBlur = 10;
      ctx.fill();

      // Motion streak tail
      const tx = px - (this.nodeB.x - this.nodeA.x) * 0.07;
      const ty = py - (this.nodeB.y - this.nodeA.y) * 0.07;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(px, py);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();
    }
  }

  // -------------------------------------------------------------
  // HELPER: DRAW MOUSE LASER CONDUITS ON ANY NODE SET
  // -------------------------------------------------------------
  function drawMouseLaserLinks(nodes, laserColor) {
    if (!mouse.active) return;
    const { r, g, b } = laserColor;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const mdx = mouse.x - a.x;
      const mdy = mouse.y - a.y;
      const mdist = Math.hypot(mdx, mdy);
      if (mdist < mouse.radius) {
        const mAlpha = (1 - mdist / mouse.radius) * 0.75;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${mAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
  }

  // -------------------------------------------------------------
  // HELPER: RENDER INTERACTIVE CLICK RIPPLES
  // -------------------------------------------------------------
  function updateAndDrawRipples(color) {
    const { r, g, b } = color;
    for (let i = mouse.ripples.length - 1; i >= 0; i--) {
      const rip = mouse.ripples[i];
      rip.radius += 3.8;
      rip.alpha -= 0.022;
      if (rip.alpha <= 0) {
        mouse.ripples.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${rip.alpha})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();
    }
  }

  // =============================================================
  // PAGE 1: HOME (Multi-Domain Earth-AI Process Pipeline)
  // =============================================================
  const homeState = {
    nodes: [],
    packets: [],
    maxDist: 145,
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

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

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
    const count = Math.min(125, Math.max(55, Math.floor(width / 16)));
    for (let i = 0; i < count; i++) homeState.nodes.push(new HomeNode());
  }

  function renderHome() {
    const nodes = homeState.nodes;
    const packets = homeState.packets;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);

        if (dist < homeState.maxDist) {
          const prox = 1 - dist / homeState.maxDist;
          const alpha = prox * 0.55;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${a.domainInfo.color.r}, ${a.domainInfo.color.g}, ${a.domainInfo.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.domainInfo.color.r}, ${b.domainInfo.color.g}, ${b.domainInfo.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9 + prox * 0.6;
          ctx.stroke();

          const isProcessFlow = (b.domainInfo.stage === (a.domainInfo.stage + 1) % 4);
          if (isProcessFlow && packets.length < 38 && Math.random() < 0.007 && dist < 120) {
            packets.push(new ProcessPacket(a, b, a.domainInfo.color));
          }
        }
      }
    }

    drawMouseLaserLinks(nodes, COLORS.aqua);

    for (let i = packets.length - 1; i >= 0; i--) {
      if (packets[i].update()) packets[i].draw();
      else packets.splice(i, 1);
    }

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }
  }

  // =============================================================
  // PAGE 2: ABOUT (Hydrological Watershed & River-Basin Dynamics)
  // =============================================================
  const aboutState = {
    nodes: [],
    packets: [],
    contourLines: 5,
    maxDist: 140
  };

  class HydroNode {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = init ? Math.random() * width : -10;
      this.y = Math.random() * height;
      this.baseY = this.y;
      this.vx = 0.8 + Math.random() * 0.9;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = 1.4 + Math.random() * 1.3;
      this.pulse = Math.random() * Math.PI * 2;
      this.pingWave = 0;
      this.color = Math.random() > 0.4 ? COLORS.cyan : COLORS.aqua;
    }
    ping() {
      if (this.pingWave <= 0) this.pingWave = 1;
    }
    update() {
      this.x += this.vx;
      this.pulse += 0.035;
      this.y = this.baseY + Math.sin(this.x * 0.005 + this.pulse) * 16;

      if (this.x > width + 20) {
        this.x = -15;
        this.baseY = Math.random() * height;
      }

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius && dist > 5) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.7;
          this.y += (dy / dist) * force * 1.7;
        }
      }

      if (this.pingWave > 0) {
        this.pingWave += 0.05;
        if (this.pingWave > 2.5) this.pingWave = 0;
      }
    }
    draw() {
      const { r, g, b } = this.color;
      const rNow = this.radius + Math.sin(this.pulse) * 0.35;

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.22)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (this.pingWave > 0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rNow * (1 + this.pingWave * 2.2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, 1 - this.pingWave / 2.5)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function initAbout() {
    aboutState.nodes.length = 0;
    aboutState.packets.length = 0;
    const count = Math.min(120, Math.max(55, Math.floor(width / 16)));
    for (let i = 0; i < count; i++) aboutState.nodes.push(new HydroNode());
  }

  function renderAbout() {
    const nodes = aboutState.nodes;
    const packets = aboutState.packets;

    // Draw flowing river elevation contours
    ctx.lineWidth = 1.1;
    for (let c = 0; c < aboutState.contourLines; c++) {
      const baseY = height * (0.2 + (c / aboutState.contourLines) * 0.65);
      ctx.beginPath();
      for (let x = 0; x <= width; x += 18) {
        const y = baseY + Math.sin(x * 0.004 + globalTick * 0.015 + c * 0.85) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 + (c % 2) * 0.07})`;
      ctx.stroke();
    }

    // Synapses and downstream flow packets
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);

        if (dist < aboutState.maxDist) {
          const prox = 1 - dist / aboutState.maxDist;
          const alpha = prox * 0.52;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9 + prox * 0.6;
          ctx.stroke();

          // Spawn downstream hydro-packets from left to right
          if (b.x > a.x && packets.length < 36 && Math.random() < 0.008 && dist < 125) {
            packets.push(new ProcessPacket(a, b, a.color, 1.1));
          }
        }
      }
    }

    drawMouseLaserLinks(nodes, COLORS.cyan);

    for (let i = packets.length - 1; i >= 0; i--) {
      if (packets[i].update()) packets[i].draw();
      else packets.splice(i, 1);
    }

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }
  }

  // =============================================================
  // PAGE 3: SERVICES (Smart Agriculture & Precision Telemetry Mesh)
  // =============================================================
  const servicesState = {
    nodes: [],
    packets: [],
    maxDist: 140
  };

  class AgriNode {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = init ? Math.random() * width : Math.random() * width;
      this.y = init ? Math.random() * height : (Math.random() > 0.5 ? -10 : height + 10);
      const speed = 0.45 + Math.random() * 0.6;
      const ang = Math.random() * Math.PI * 2;
      this.vx = Math.cos(ang) * speed;
      this.vy = Math.sin(ang) * speed;
      this.radius = 1.4 + Math.random() * 1.3;
      this.pulse = Math.random() * Math.PI * 2;
      this.pingWave = 0;
      const r = Math.random();
      this.color = r > 0.65 ? COLORS.emerald : (r > 0.3 ? COLORS.lime : COLORS.amber);
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
      const { r, g, b } = this.color;
      const rNow = this.radius + Math.sin(this.pulse) * 0.4;

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.24)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (this.pingWave > 0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rNow * (1 + this.pingWave * 2.2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, 1 - this.pingWave / 2.5)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function initServices() {
    servicesState.nodes.length = 0;
    servicesState.packets.length = 0;
    const count = Math.min(120, Math.max(55, Math.floor(width / 16)));
    for (let i = 0; i < count; i++) servicesState.nodes.push(new AgriNode());
  }

  function renderServices() {
    const nodes = servicesState.nodes;
    const packets = servicesState.packets;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);

        if (dist < servicesState.maxDist) {
          const prox = 1 - dist / servicesState.maxDist;
          const alpha = prox * 0.54;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9 + prox * 0.6;
          ctx.stroke();

          // Spawn agro-telemetry sensor packets
          if (packets.length < 36 && Math.random() < 0.007 && dist < 120) {
            packets.push(new ProcessPacket(a, b, a.color, 1.0));
          }
        }
      }
    }

    drawMouseLaserLinks(nodes, COLORS.emerald);

    for (let i = packets.length - 1; i >= 0; i--) {
      if (packets[i].update()) packets[i].draw();
      else packets.splice(i, 1);
    }

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }
  }

  // =============================================================
  // PAGE 4: EXPERIENCE (Global Intercontinental Geospatial Orbit)
  // =============================================================
  const expState = {
    nodes: [],
    packets: [],
    arcs: 4,
    maxDist: 140
  };

  class OrbitNode {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.angle = Math.random() * Math.PI * 2;
      this.speed = (0.003 + Math.random() * 0.005) * (Math.random() > 0.5 ? 1 : -1);
      this.radiusX = 140 + Math.random() * (width * 0.44);
      this.radiusY = 80 + Math.random() * (height * 0.38);
      this.radius = 1.4 + Math.random() * 1.3;
      this.pulse = Math.random() * Math.PI * 2;
      this.pingWave = 0;
      const r = Math.random();
      this.color = r > 0.6 ? COLORS.cyan : (r > 0.3 ? COLORS.amber : COLORS.violet);
    }
    ping() {
      if (this.pingWave <= 0) this.pingWave = 1;
    }
    update() {
      this.angle += this.speed;
      this.x = width * 0.5 + Math.cos(this.angle) * this.radiusX;
      this.y = height * 0.5 + Math.sin(this.angle) * this.radiusY;

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius && dist > 5) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.7;
          this.y += (dy / dist) * force * 1.7;
        }
      }

      this.pulse += 0.04;
      if (this.pingWave > 0) {
        this.pingWave += 0.05;
        if (this.pingWave > 2.5) this.pingWave = 0;
      }
    }
    draw() {
      const { r, g, b } = this.color;
      const rNow = this.radius + Math.sin(this.pulse) * 0.4;

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.24)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (this.pingWave > 0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rNow * (1 + this.pingWave * 2.2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, 1 - this.pingWave / 2.5)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function initExperience() {
    expState.nodes.length = 0;
    expState.packets.length = 0;
    const count = Math.min(120, Math.max(55, Math.floor(width / 16)));
    for (let i = 0; i < count; i++) expState.nodes.push(new OrbitNode());
  }

  function renderExperience() {
    const nodes = expState.nodes;
    const packets = expState.packets;

    // Draw orbital reference trajectories
    ctx.lineWidth = 1;
    for (let a = 1; a <= expState.arcs; a++) {
      ctx.beginPath();
      ctx.ellipse(
        width * 0.5,
        height * 0.5,
        (width * 0.44) * (a / expState.arcs),
        (height * 0.38) * (a / expState.arcs),
        globalTick * 0.002,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.stroke();
    }

    // Geodesic intercontinental links
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);

        if (dist < expState.maxDist) {
          const prox = 1 - dist / expState.maxDist;
          const alpha = prox * 0.52;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9 + prox * 0.6;
          ctx.stroke();

          // Intercontinental data packets
          if (packets.length < 36 && Math.random() < 0.008 && dist < 120) {
            packets.push(new ProcessPacket(a, b, a.color, 1.1));
          }
        }
      }
    }

    drawMouseLaserLinks(nodes, COLORS.amber);

    for (let i = packets.length - 1; i >= 0; i--) {
      if (packets[i].update()) packets[i].draw();
      else packets.splice(i, 1);
    }

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }
  }

  // =============================================================
  // PAGE 5: MODELS (Deep Neural Tensor Architecture & Attention Lattice)
  // =============================================================
  const modelsState = {
    nodes: [],
    packets: [],
    layerCount: 5,
    maxDist: 140
  };

  class TensorNode {
    constructor(layerIdx, yRatio) {
      this.layerIdx = layerIdx;
      this.yRatio = yRatio;
      this.pulse = Math.random() * Math.PI * 2;
      this.pingWave = 0;
      this.radius = 1.5 + Math.random() * 1.3;
      const palette = [COLORS.violet, COLORS.purple, COLORS.aqua, COLORS.cyan, COLORS.emerald];
      this.color = palette[layerIdx % palette.length];
      this.recalc();
    }
    recalc() {
      const marginX = width * 0.10;
      const spanX = width * 0.80;
      this.baseX = marginX + (this.layerIdx / (modelsState.layerCount - 1)) * spanX;
      this.baseY = height * this.yRatio;
      this.x = this.baseX;
      this.y = this.baseY;
    }
    ping() {
      if (this.pingWave <= 0) this.pingWave = 1;
    }
    update() {
      this.pulse += 0.04;
      this.x = this.baseX + Math.cos(this.pulse + this.layerIdx) * 6;
      this.y = this.baseY + Math.sin(this.pulse + this.layerIdx) * 10;

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius && dist > 5) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.8;
          this.y += (dy / dist) * force * 1.8;
        }
      }

      if (this.pingWave > 0) {
        this.pingWave += 0.05;
        if (this.pingWave > 2.5) this.pingWave = 0;
      }
    }
    draw() {
      const { r, g, b } = this.color;
      const rNow = this.radius + Math.sin(this.pulse) * 0.4;

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (this.pingWave > 0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rNow * (1 + this.pingWave * 2.2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, 1 - this.pingWave / 2.5)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function initModels() {
    modelsState.nodes.length = 0;
    modelsState.packets.length = 0;
    const counts = [12, 22, 26, 22, 12];
    for (let l = 0; l < modelsState.layerCount; l++) {
      const n = counts[l];
      for (let i = 0; i < n; i++) {
        const yRatio = 0.12 + (i / (n - 1 || 1)) * 0.76;
        modelsState.nodes.push(new TensorNode(l, yRatio));
      }
    }
  }

  function renderModels() {
    const nodes = modelsState.nodes;
    const packets = modelsState.packets;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        // Connect within layer and to adjacent forward layer
        if (Math.abs(b.layerIdx - a.layerIdx) <= 1) {
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);

          if (dist < modelsState.maxDist) {
            const prox = 1 - dist / modelsState.maxDist;
            const alpha = prox * 0.52;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${alpha})`);
            grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha})`);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.9 + prox * 0.6;
            ctx.stroke();

            // Forward tensor activation pulses
            if (b.layerIdx > a.layerIdx && packets.length < 40 && Math.random() < 0.009) {
              packets.push(new ProcessPacket(a, b, a.color, 1.2));
            }
          }
        }
      }
    }

    drawMouseLaserLinks(nodes, COLORS.purple);

    for (let i = packets.length - 1; i >= 0; i--) {
      if (packets[i].update()) packets[i].draw();
      else packets.splice(i, 1);
    }

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }
  }

  // =============================================================
  // PAGE 6: PUBLICATIONS (Atmospheric Climate Matrix & Radar Downscaling)
  // =============================================================
  const pubState = {
    nodes: [],
    packets: [],
    radarAngle: 0,
    maxDist: 140
  };

  class ClimateNode {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = init ? Math.random() * width : Math.random() * width;
      this.y = init ? Math.random() * height : -10;
      this.vx = 0.4 + Math.random() * 0.6;
      this.vy = 0.5 + Math.random() * 0.8;
      this.radius = 1.4 + Math.random() * 1.3;
      this.pulse = Math.random() * Math.PI * 2;
      this.pingWave = 0;
      const r = Math.random();
      this.color = r > 0.5 ? COLORS.violet : COLORS.cyan;
    }
    ping() {
      if (this.pingWave <= 0) this.pingWave = 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x > width + 20) this.x = -15;
      if (this.y > height + 20) this.y = -15;

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
      const { r, g, b } = this.color;
      const rNow = this.radius + Math.sin(this.pulse) * 0.4;

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.24)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (this.pingWave > 0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rNow * (1 + this.pingWave * 2.2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, 1 - this.pingWave / 2.5)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function initPublications() {
    pubState.nodes.length = 0;
    pubState.packets.length = 0;
    const count = Math.min(120, Math.max(55, Math.floor(width / 16)));
    for (let i = 0; i < count; i++) pubState.nodes.push(new ClimateNode());
  }

  function renderPublications() {
    const nodes = pubState.nodes;
    const packets = pubState.packets;

    // Atmospheric downscaling mesh
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);

        if (dist < pubState.maxDist) {
          const prox = 1 - dist / pubState.maxDist;
          const alpha = prox * 0.52;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9 + prox * 0.6;
          ctx.stroke();

          // Kinetic precipitation downscaling packets
          if (b.y > a.y && packets.length < 36 && Math.random() < 0.008 && dist < 120) {
            packets.push(new ProcessPacket(a, b, a.color, 1.2));
          }
        }
      }
    }

    drawMouseLaserLinks(nodes, COLORS.violet);

    for (let i = packets.length - 1; i >= 0; i--) {
      if (packets[i].update()) packets[i].draw();
      else packets.splice(i, 1);
    }

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }
  }

  // =============================================================
  // PAGE 7: CONTACT (Cybernetic Communication Nexus & Harmonic Resonance)
  // =============================================================
  const contactState = {
    nodes: [],
    packets: [],
    maxDist: 145
  };

  class ContactNode {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = init ? Math.random() * width : Math.random() * width;
      this.y = init ? Math.random() * height : (Math.random() > 0.5 ? -10 : height + 10);
      const speed = 0.5 + Math.random() * 0.7;
      const ang = Math.random() * Math.PI * 2;
      this.vx = Math.cos(ang) * speed;
      this.vy = Math.sin(ang) * speed;
      this.radius = 1.4 + Math.random() * 1.3;
      this.pulse = Math.random() * Math.PI * 2;
      this.pingWave = 0;
      const r = Math.random();
      this.color = r > 0.5 ? COLORS.cyan : COLORS.purple;
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

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius && dist > 5) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.8;
          this.y += (dy / dist) * force * 1.8;
        }
      }

      this.pulse += 0.04;
      if (this.pingWave > 0) {
        this.pingWave += 0.05;
        if (this.pingWave > 2.5) this.pingWave = 0;
      }
    }
    draw() {
      const { r, g, b } = this.color;
      const rNow = this.radius + Math.sin(this.pulse) * 0.4;

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, rNow, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (this.pingWave > 0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rNow * (1 + this.pingWave * 2.2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, 1 - this.pingWave / 2.5)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function initContact() {
    contactState.nodes.length = 0;
    contactState.packets.length = 0;
    const count = Math.min(125, Math.max(55, Math.floor(width / 16)));
    for (let i = 0; i < count; i++) contactState.nodes.push(new ContactNode());
  }

  function renderContact() {
    const nodes = contactState.nodes;
    const packets = contactState.packets;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);

        if (dist < contactState.maxDist) {
          const prox = 1 - dist / contactState.maxDist;
          const alpha = prox * 0.54;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9 + prox * 0.6;
          ctx.stroke();

          // Cybernetic inquiry signal packets
          if (packets.length < 38 && Math.random() < 0.008 && dist < 125) {
            packets.push(new ProcessPacket(a, b, a.color, 1.1));
          }
        }
      }
    }

    drawMouseLaserLinks(nodes, COLORS.cyan);

    for (let i = packets.length - 1; i >= 0; i--) {
      if (packets[i].update()) packets[i].draw();
      else packets.splice(i, 1);
    }

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }
  }

  // -------------------------------------------------------------
  // 4. MAIN LIFECYCLE & DISPATCHER
  // -------------------------------------------------------------
  function initPage() {
    switch (pageTheme) {
      case 'about': initAbout(); break;
      case 'services': initServices(); break;
      case 'experience': initExperience(); break;
      case 'models': initModels(); break;
      case 'publications': initPublications(); break;
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
    ctx.clearRect(0, 0, width, height);

    switch (pageTheme) {
      case 'about':
        renderAbout();
        updateAndDrawRipples(COLORS.cyan);
        break;
      case 'services':
        renderServices();
        updateAndDrawRipples(COLORS.emerald);
        break;
      case 'experience':
        renderExperience();
        updateAndDrawRipples(COLORS.amber);
        break;
      case 'models':
        renderModels();
        updateAndDrawRipples(COLORS.purple);
        break;
      case 'publications':
        renderPublications();
        updateAndDrawRipples(COLORS.violet);
        break;
      case 'contact':
        renderContact();
        updateAndDrawRipples(COLORS.aqua);
        break;
      case 'home':
      default:
        renderHome();
        updateAndDrawRipples(COLORS.aqua);
        break;
    }

    animId = requestAnimationFrame(render);
  }

  // -------------------------------------------------------------
  // 5. EVENT LISTENERS (Pointer, Click Ripple, Window)
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

  window.addEventListener('pointerdown', (e) => {
    mouse.ripples.push({
      x: e.clientX,
      y: e.clientY,
      radius: 5,
      alpha: 0.95
    });
    if (mouse.ripples.length > 8) mouse.ripples.shift();
  }, { passive: true });

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
