/**
 * Dynamic Environmental AI Background Video & Neural Synapse Engine
 * ------------------------------------------------------------------
 * Seamlessly integrates:
 * 1. Fullscreen cinematic HTML5 video background tailored per page
 *    (Climate Change, Hydrological Modeling, Deep Learning & Smart Agriculture)
 * 2. Dynamic, continuously moving Neural-Hydrological nodes with live
 *    interconnected synapses, traveling data packets, and cursor magnetic interactivity.
 * 3. 100% fluid, zero static artifacts.
 */

(function () {
  'use strict';

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------
  // 1. PAGE DETECTION & BACKGROUND VIDEO INJECTION
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

  // Inject Video Background Wrapper if not already present
  let videoWrapper = document.getElementById('bg-video-wrapper');
  if (!videoWrapper) {
    videoWrapper = document.createElement('div');
    videoWrapper.id = 'bg-video-wrapper';
    videoWrapper.className = 'bg-video-wrapper';
    videoWrapper.setAttribute('aria-hidden', 'true');

    // Video element with page-specific source and fallback
    const video = document.createElement('video');
    video.className = 'bg-video-media';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.preload = 'auto';

    // Page-specific video first, then fallback
    const srcPage = document.createElement('source');
    srcPage.src = `bg-video-${pageTheme}.mp4`;
    srcPage.type = 'video/mp4';

    const srcMain = document.createElement('source');
    srcMain.src = 'bg-video-main.mp4';
    srcMain.type = 'video/mp4';

    video.appendChild(srcPage);
    video.appendChild(srcMain);

    // Vignette overlay for readable glassmorphic cards
    const overlay = document.createElement('div');
    overlay.className = 'bg-video-overlay';

    videoWrapper.appendChild(video);
    videoWrapper.appendChild(overlay);
    document.body.prepend(videoWrapper);

    // Smooth reveal once playing
    const onPlayReady = () => {
      video.classList.add('is-ready');
    };
    video.addEventListener('canplaythrough', onPlayReady, { once: true });
    video.addEventListener('playing', onPlayReady, { once: true });

    // Handle mobile / browser autoplay policies
    const tryPlay = () => {
      video.play().then(onPlayReady).catch(() => {
        // Autoplay may be restricted until user interaction
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
  // 2. DYNAMIC MOVING CONNECTED NODES CANVAS ENGINE
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

  // Interactive mouse tracking
  const mouse = {
    x: -9999,
    y: -9999,
    radius: 190,
    active: false,
    clickPulse: 0
  };

  // Color themes for node domains
  const DOMAIN_PALETTES = [
    { name: 'hydro', r: 56, g: 189, b: 248, hex: '#38bdf8' },    // River Hydrology (Cyan)
    { name: 'climate', r: 129, g: 140, b: 248, hex: '#818cf8' }, // Atmospheric Climate (Neural Violet)
    { name: 'agri', r: 52, g: 211, b: 153, hex: '#34d399' },     // Smart Agriculture (Bio-Emerald)
    { name: 'ai', r: 0, g: 242, b: 254, hex: '#00f2fe' }         // Deep Learning Core (Electric Aqua)
  ];

  // Particle Node class: constantly moving, floating, breathing
  class DynamicNode {
    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      this.x = init ? Math.random() * width : (Math.random() > 0.5 ? -15 : width + 15);
      this.y = init ? Math.random() * height : Math.random() * height;

      // Smooth floating velocities (easily visible motion)
      const speed = 0.65 + Math.random() * 0.85;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      // Harmonic oscillation parameters for organic drift
      this.theta = Math.random() * Math.PI * 2;
      this.thetaSpeed = 0.015 + Math.random() * 0.02;
      this.driftAmp = 0.35 + Math.random() * 0.35;

      // Visuals
      this.baseRadius = 2.4 + Math.random() * 2.2;
      this.radius = this.baseRadius;
      this.pulse = Math.random() * Math.PI * 2;
      this.orbitAngle = Math.random() * Math.PI * 2;
      this.orbitSpeed = (Math.random() - 0.5) * 0.035;

      // Domain coloring
      this.domain = DOMAIN_PALETTES[Math.floor(Math.random() * DOMAIN_PALETTES.length)];
      this.pingWave = 0;
    }

    triggerPing() {
      if (this.pingWave <= 0) {
        this.pingWave = 1;
      }
    }

    update() {
      // Harmonic wave drift
      this.theta += this.thetaSpeed;
      const waveX = Math.cos(this.theta) * this.driftAmp;
      const waveY = Math.sin(this.theta * 1.25) * this.driftAmp;

      this.x += this.vx + waveX;
      this.y += this.vy + waveY;

      // Seamless screen edge wrap
      const pad = 30;
      if (this.x < -pad) this.x = width + pad;
      if (this.x > width + pad) this.x = -pad;
      if (this.y < -pad) this.y = height + pad;
      if (this.y > height + pad) this.y = -pad;

      // Interactive cursor attraction
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

      // Breathing aura
      this.pulse += 0.032;
      this.radius = this.baseRadius + Math.sin(this.pulse) * 0.65;
      this.orbitAngle += this.orbitSpeed;

      // Wave ping decay
      if (this.pingWave > 0) {
        this.pingWave += 0.04;
        if (this.pingWave > 2.5) {
          this.pingWave = 0;
        }
      }
    }

    draw() {
      const { r, g, b } = this.domain;

      // 1. Soft radial energy aura
      const aura = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4.2);
      aura.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.45)`);
      aura.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 4.2, 0, Math.PI * 2);
      ctx.fillStyle = aura;
      ctx.fill();

      // 2. Solid glowing core
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(1.8, this.radius), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.95)`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 1)`;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Rotating orbital satellite ring / arc
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2.6, this.orbitAngle, this.orbitAngle + 1.4);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // 4. Expanding radar ping if energized by packet
      if (this.pingWave > 0) {
        const pingRadius = this.radius * (1 + this.pingWave * 2.8);
        const pingAlpha = Math.max(0, (1 - this.pingWave / 2.5) * 0.7);
        ctx.beginPath();
        ctx.arc(this.x, this.y, pingRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${pingAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
  }

  // Active Synaptic Data Packet (signal traveling between moving nodes)
  class LiveSynapsePacket {
    constructor(nodeA, nodeB) {
      this.nodeA = nodeA;
      this.nodeB = nodeB;
      this.progress = 0;
      this.speed = 0.012 + Math.random() * 0.016;
      this.color = nodeA.domain;
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.nodeB.triggerPing();
        return false;
      }
      return true;
    }

    draw() {
      const px = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * this.progress;
      const py = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * this.progress;
      const { r, g, b } = this.color;

      // Photon Head
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 1)`;
      ctx.shadowBlur = 9;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Glow tail
      const tailX = px - (this.nodeB.x - this.nodeA.x) * 0.04;
      const tailY = py - (this.nodeB.y - this.nodeA.y) * 0.04;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(px, py);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
  }

  // Node & Packet Collections
  const nodes = [];
  const packets = [];
  const maxPackets = 32;
  const maxConnectionDist = 175;

  function initNodes() {
    nodes.length = 0;
    packets.length = 0;
    // Desktop: ~44 nodes; Mobile: ~22 nodes for buttery 60fps
    const targetCount = Math.min(54, Math.max(22, Math.floor(window.innerWidth / 32)));
    for (let i = 0; i < targetCount; i++) {
      nodes.push(new DynamicNode());
    }
  }

  // Draw living dynamic connections between moving nodes
  function drawLiveConnections() {
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxConnectionDist) {
          // Opacity strengthens as nodes move closer
          const proximity = 1 - dist / maxConnectionDist;
          const alpha = Math.pow(proximity, 1.3) * 0.38;

          // Glowing two-color gradient between domain nodes
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${a.domain.r}, ${a.domain.g}, ${a.domain.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.domain.r}, ${b.domain.g}, ${b.domain.b}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8 + proximity * 0.8;
          ctx.stroke();

          // Spawn live data packet transfer between active synapses
          if (packets.length < maxPackets && Math.random() < 0.004 && dist < 140) {
            packets.push(new LiveSynapsePacket(a, b));
          }
        }
      }

      // Dynamic cursor laser attraction links
      if (mouse.active) {
        const mdx = mouse.x - a.x;
        const mdy = mouse.y - a.y;
        const mdist = Math.hypot(mdx, mdy);

        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.58;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Cursor magnetic epicenter glow
    if (mouse.active) {
      const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 75);
      cursorGlow.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
      cursorGlow.addColorStop(0.5, 'rgba(0, 242, 254, 0.08)');
      cursorGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 75, 0, Math.PI * 2);
      ctx.fillStyle = cursorGlow;
      ctx.fill();
    }
  }

  // -------------------------------------------------------------
  // 3. CANVAS RESIZE & ANIMATION LOOP
  // -------------------------------------------------------------
  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    initNodes();
  }

  function render() {
    globalTick++;

    // Clear transparently so video background shines through cleanly
    ctx.clearRect(0, 0, width, height);

    // 1. Draw live moving connections & cursor links
    drawLiveConnections();

    // 2. Update and draw active data packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const alive = packets[i].update();
      if (alive) {
        packets[i].draw();
      } else {
        packets.splice(i, 1);
      }
    }

    // 3. Update and draw dynamically moving nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }

    animId = requestAnimationFrame(render);
  }

  // -------------------------------------------------------------
  // 4. EVENT LISTENERS
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

  window.addEventListener('click', (e) => {
    // Excite nearby nodes on click
    for (let i = 0; i < nodes.length; i++) {
      const dx = nodes[i].x - e.clientX;
      const dy = nodes[i].y - e.clientY;
      if (Math.hypot(dx, dy) < 220) {
        nodes[i].triggerPing();
      }
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animId) cancelAnimationFrame(animId);
    } else {
      animId = requestAnimationFrame(render);
    }
  });

  // Kickstart
  resize();
  render();
})();
