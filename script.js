/**
 * ========================================================
 *  MOM'S LUXURY BIRTHDAY SURPRISE — CONTROLLER
 *  Page 1: Envelope -> Page 2: Prank Choice -> Page 3: Luxury Cake -> Page 4: 3D Gallery
 * ========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.birthdayConfig || {};

  // --------------------------------------------------------
  // 1. POPULATE CONFIG DATA INTO DOM
  // --------------------------------------------------------
  function populateConfig() {
    // Page 1
    if (config.envelope) {
      const b = document.getElementById("p1Badge");
      const i = document.getElementById("p1Instruction");
      const t = document.getElementById("p1LetterTitle");
      const d = document.getElementById("p1LetterBody");
      const c = document.getElementById("p1ContinueBtnText");
      if (b && config.envelope.badge) b.textContent = config.envelope.badge;
      if (i && config.envelope.instruction) i.textContent = config.envelope.instruction;
      if (t && config.envelope.greetingTitle) t.textContent = config.envelope.greetingTitle;
      if (d && config.envelope.letterPreview) d.textContent = config.envelope.letterPreview;
      if (c && config.envelope.continueButton) c.textContent = config.envelope.continueButton;
    }

    // Page 2
    if (config.giftChoice) {
      const h = document.getElementById("p2Heading");
      const s = document.getElementById("p2Subtitle");
      const a = document.getElementById("p2AcceptBtnText");
      const r = document.getElementById("p2RefuseBtnText");
      if (h && config.giftChoice.heading) h.textContent = config.giftChoice.heading;
      if (s && config.giftChoice.subtitle) s.textContent = config.giftChoice.subtitle;
      if (a && config.giftChoice.acceptBtn) a.textContent = config.giftChoice.acceptBtn;
      if (r && config.giftChoice.refuseBtn) r.textContent = config.giftChoice.refuseBtn;
    }

    // Page 3
    if (config.cakeScene) {
      const h = document.getElementById("p3Heading");
      const s = document.getElementById("p3Subtitle");
      const l = document.getElementById("p3LightBtnText");
      if (h && config.cakeScene.heading) h.textContent = config.cakeScene.heading;
      if (s && config.cakeScene.subtitle) s.textContent = config.cakeScene.subtitle;
      if (l && config.cakeScene.lightButton) l.textContent = config.cakeScene.lightButton;
    }

    // Page 4
    if (config.gallery) {
      const h = document.getElementById("p4Heading");
      const s = document.getElementById("p4Subtitle");
      const ch = document.getElementById("p4ClosingHeading");
      const cm = document.getElementById("p4ClosingMessage");
      const cs = document.getElementById("p4Signature");
      if (h && config.gallery.heading) h.textContent = config.gallery.heading;
      if (s && config.gallery.subtitle) s.textContent = config.gallery.subtitle;
      if (ch && config.gallery.closingHeading) ch.textContent = config.gallery.closingHeading;
      if (cm && config.gallery.closingMessage) cm.textContent = config.gallery.closingMessage;
      if (cs && config.gallery.signature) cs.textContent = config.gallery.signature;

      buildGalleryCards(config.gallery.photos || []);
    }
  }

  // --------------------------------------------------------
  // 2. BUILD 3D PHOTO GALLERY CARDS
  // --------------------------------------------------------
  const galleryTrack = document.getElementById("galleryTrack");

  function getFallbackSvg(index) {
    const icons = ["🌸", "✨", "🌷", "☀️", "💖", "☕", "👑", "💐"];
    const icon = icons[index % icons.length];
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='250' viewBox='0 0 260 250'><rect width='100%' height='100%' fill='%23FFF3F6'/><circle cx='130' cy='115' r='50' fill='%23FDE8EE'/><text x='130' y='130' font-size='42' text-anchor='middle'>${icon}</text><text x='130' y='185' font-family='serif' font-size='15' fill='%23B85567' text-anchor='middle'>Treasured Memory</text><text x='130' y='210' font-family='sans-serif' font-size='11' fill='%239E8A95' text-anchor='middle'>Add your photo to images/</text></svg>`;
  }

  function buildGalleryCards(photos) {
    if (!galleryTrack) return;
    galleryTrack.innerHTML = "";

    // Duplicate list once to create continuous infinite scroll effect
    const list = [...photos, ...photos];

    list.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "gallery-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `View photo: ${item.caption}`);

      // Slight organic vertical-axis tilt alternation
      const tilt = index % 2 === 0 ? -6 : 6;
      card.style.transform = `rotateY(${tilt}deg)`;

      const holder = document.createElement("div");
      holder.className = "card-image-holder";

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt || item.caption || "Mom's Memory";
      img.loading = "lazy";
      img.onerror = () => {
        img.src = getFallbackSvg(index);
      };

      holder.appendChild(img);

      const meta = document.createElement("div");
      meta.className = "card-meta";

      const caption = document.createElement("p");
      caption.className = "card-caption";
      caption.textContent = item.caption;

      meta.appendChild(caption);

      if (item.date) {
        const dateSpan = document.createElement("span");
        dateSpan.className = "card-date";
        dateSpan.textContent = item.date;
        meta.appendChild(dateSpan);
      }

      card.appendChild(holder);
      card.appendChild(meta);

      // Lightbox click
      card.addEventListener("click", () => {
        openLightbox(img.src, item.caption, item.date || "");
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(img.src, item.caption, item.date || "");
        }
      });

      galleryTrack.appendChild(card);
    });
  }

  // --------------------------------------------------------
  // 3. LIGHTBOX DIALOG
  // --------------------------------------------------------
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxDate = document.getElementById("lightboxDate");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");

  function openLightbox(src, caption, date) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightboxDate.textContent = date;
    lightboxModal.classList.add("active");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("active");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target.classList.contains("lightbox-backdrop")) closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal && lightboxModal.classList.contains("active")) {
      closeLightbox();
    }
  });

  // --------------------------------------------------------
  // 4. PAGE TRANSITIONS SYSTEM
  // --------------------------------------------------------
  const pages = {
    1: document.getElementById("page1"),
    2: document.getElementById("page2"),
    3: document.getElementById("page3"),
    4: document.getElementById("page4"),
  };
  const overlay = document.getElementById("transitionOverlay");
  let currentPage = 1;
  let isTransitioning = false;

  function switchPage(pageNumber, withOverlayFlash = false) {
    if (isTransitioning || !pages[pageNumber]) return;
    isTransitioning = true;

    if (withOverlayFlash && overlay) {
      overlay.classList.add("active");
      setTimeout(() => {
        performPageSwitch(pageNumber);
        setTimeout(() => {
          overlay.classList.remove("active");
          isTransitioning = false;
        }, 400);
      }, 400);
    } else {
      performPageSwitch(pageNumber);
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  function performPageSwitch(pageNumber) {
    Object.values(pages).forEach((page) => {
      if (page) page.classList.remove("active");
    });
    const target = pages[pageNumber];
    if (target) {
      target.classList.add("active");
      currentPage = pageNumber;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // --------------------------------------------------------
  // 5. PAGE 1: ENVELOPE INTERACTION
  // --------------------------------------------------------
  const envelopeElement = document.getElementById("envelopeElement");
  const continueToChoiceBtn = document.getElementById("continueToChoiceBtn");
  let isEnvelopeOpened = false;

  function openEnvelope() {
    if (isEnvelopeOpened || !envelopeElement) return;
    isEnvelopeOpened = true;
    envelopeElement.classList.add("opened");
    playChime();
    playMusic();
  }

  if (envelopeElement) {
    envelopeElement.addEventListener("click", (e) => {
      // Prevent re-trigger if clicking continue button inside
      if (e.target.closest("#continueToChoiceBtn")) return;
      openEnvelope();
    });
    envelopeElement.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  if (continueToChoiceBtn) {
    continueToChoiceBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      switchPage(2, false);
    });
  }

  // --------------------------------------------------------
  // 6. PAGE 2: PLAYFUL GIFT CHOICE & RUNAWAY BUTTON
  // --------------------------------------------------------
  const wantGiftBtn = document.getElementById("wantGiftBtn");
  const dontWantBtn = document.getElementById("dontWantBtn");
  const teaseFeedback = document.getElementById("teaseFeedback");
  let teaseIndex = 0;

  function dodgeRunawayButton() {
    if (!dontWantBtn || !wantGiftBtn) return;
    dontWantBtn.classList.add("dodging");
    playBlip();

    const btnWidth = dontWantBtn.offsetWidth || 190;
    const btnHeight = dontWantBtn.offsetHeight || 50;
    const padding = 24;

    // Viewport boundaries
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    // Safety zone around "I want my gift" button (NEVER OVERLAP)
    const safeRect = wantGiftBtn.getBoundingClientRect();
    const safetyBuffer = 60;

    let candidateX, candidateY;
    let attempts = 0;
    let collision = true;

    while (collision && attempts < 15) {
      candidateX = Math.max(padding, Math.floor(Math.random() * maxX));
      candidateY = Math.max(padding, Math.floor(Math.random() * maxY));

      // Check collision with wantGiftBtn
      const overlapsX =
        candidateX + btnWidth > safeRect.left - safetyBuffer &&
        candidateX < safeRect.right + safetyBuffer;
      const overlapsY =
        candidateY + btnHeight > safeRect.top - safetyBuffer &&
        candidateY < safeRect.bottom + safetyBuffer;

      if (!overlapsX || !overlapsY) {
        collision = false;
      }
      attempts++;
    }

    dontWantBtn.style.left = `${candidateX}px`;
    dontWantBtn.style.top = `${candidateY}px`;

    // Tease message update
    const messages = (config.giftChoice && config.giftChoice.teaseMessages) || [
      "Are you sure? 🙈",
      "Nope, can't catch me! 🏃‍♀️💨",
      "Mom, you HAVE to accept this gift! ❤️",
      "Just give up and click the pink one! 😜",
      "You can't escape my love! 🥰"
    ];

    if (teaseFeedback) {
      teaseFeedback.textContent = messages[teaseIndex % messages.length];
    }
    teaseIndex++;
  }

  if (dontWantBtn) {
    dontWantBtn.addEventListener("mouseenter", dodgeRunawayButton);
    dontWantBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      dodgeRunawayButton();
    });
    dontWantBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dodgeRunawayButton();
    });
  }

  if (wantGiftBtn) {
    wantGiftBtn.addEventListener("click", () => {
      playChime();
      switchPage(3, false);
    });
  }

  // --------------------------------------------------------
  // 7. PAGE 3: LUXURY CAKE & ACCELERATING ROTATION
  // --------------------------------------------------------
  const lightCandlesBtn = document.getElementById("lightCandlesBtn");
  const cakeRotationScene = document.getElementById("cakeRotationScene");
  const candlesDeck = document.getElementById("candlesDeck");
  const spotlightBackdrop = document.querySelector(".spotlight-backdrop");

  if (lightCandlesBtn && cakeRotationScene) {
    lightCandlesBtn.addEventListener("click", () => {
      lightCandlesBtn.disabled = true;
      if (config.cakeScene && config.cakeScene.lightingText) {
        lightCandlesBtn.innerHTML = `<span>${config.cakeScene.lightingText}</span>`;
      }

      // 1. Candles glow & surrounding light warms
      if (candlesDeck) candlesDeck.classList.add("candles-lit");
      if (spotlightBackdrop) spotlightBackdrop.classList.add("warm-glow");
      playChime();

      // 2. Begin smooth accelerating rotation
      setTimeout(() => {
        playWarpSound();
        cakeRotationScene.classList.add("spinning");

        // 3. Complete navigation to Page 4 reliably at climax
        setTimeout(() => {
          switchPage(4, true);

          // Reset Page 3 state for clean replay capability
          cakeRotationScene.classList.remove("spinning");
          if (candlesDeck) candlesDeck.classList.remove("candles-lit");
          if (spotlightBackdrop) spotlightBackdrop.classList.remove("warm-glow");
          lightCandlesBtn.disabled = false;
          if (config.cakeScene && config.cakeScene.lightButton) {
            lightCandlesBtn.innerHTML = `<span class="btn-sparkle">✨</span><span>${config.cakeScene.lightButton}</span><span class="btn-sparkle">✨</span>`;
          }
        }, 2600);
      }, 500);
    });
  }

  // --------------------------------------------------------
  // 8. PAGE 4: GALLERY PLAYBACK & REPLAY
  // --------------------------------------------------------
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevPhotoBtn = document.getElementById("prevPhotoBtn");
  const nextPhotoBtn = document.getElementById("nextPhotoBtn");
  const replayJourneyBtn = document.getElementById("replayJourneyBtn");
  let isGalleryPaused = false;

  if (playPauseBtn && galleryTrack) {
    playPauseBtn.addEventListener("click", () => {
      isGalleryPaused = !isGalleryPaused;
      if (isGalleryPaused) {
        galleryTrack.classList.add("paused");
        playPauseBtn.textContent = "▶ Resume";
      } else {
        galleryTrack.classList.remove("paused");
        playPauseBtn.textContent = "⏸ Pause";
      }
    });
  }

  if (prevPhotoBtn && galleryTrack) {
    prevPhotoBtn.addEventListener("click", () => {
      galleryTrack.classList.add("paused");
      galleryTrack.scrollBy({ left: -280, behavior: "smooth" });
    });
  }

  if (nextPhotoBtn && galleryTrack) {
    nextPhotoBtn.addEventListener("click", () => {
      galleryTrack.classList.add("paused");
      galleryTrack.scrollBy({ left: 280, behavior: "smooth" });
    });
  }

  if (replayJourneyBtn) {
    replayJourneyBtn.addEventListener("click", () => {
      // Clean reset
      isEnvelopeOpened = false;
      if (envelopeElement) envelopeElement.classList.remove("opened");
      if (dontWantBtn) {
        dontWantBtn.classList.remove("dodging");
        dontWantBtn.style.left = "";
        dontWantBtn.style.top = "";
      }
      teaseIndex = 0;
      switchPage(1, true);
    });
  }

  // --------------------------------------------------------
  // 9. WEB AUDIO SYNTHESIZER (No external sound files required)
  // --------------------------------------------------------
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playChime() {
    try {
      const ctx = getAudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 1.25);
      });
    } catch (e) {}
  }

  function playBlip() {
    try {
      const ctx = getAudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {}
  }

  function playWarpSound() {
    try {
      const ctx = getAudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 2.4);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.6);
    } catch (e) {}
  }

  // Background Music Controller
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const musicLabel = document.getElementById("musicLabel");
  const bgAudio = document.getElementById("bgAudio");
  let isMusicPlaying = false;
  let synthLoop = null;

  // Set audio source from config
  if (bgAudio) {
    if (config.audioFile) {
      bgAudio.src = config.audioFile;
    } else if (!bgAudio.src && bgAudio.querySelector("source")) {
      bgAudio.src = bgAudio.querySelector("source").getAttribute("src");
    }
  }

  function startAmbientPiano() {
    const scale = [261.63, 329.63, 392.0, 440.0, 523.25];
    playPianoNote();
    synthLoop = setInterval(playPianoNote, 1800);

    function playPianoNote() {
      try {
        const ctx = getAudioCtx();
        if (ctx.state === "suspended") ctx.resume();
        const freq = scale[Math.floor(Math.random() * scale.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.2);
      } catch (e) {}
    }
  }

  function stopAmbientPiano() {
    if (synthLoop) {
      clearInterval(synthLoop);
      synthLoop = null;
    }
  }

  function playMusic() {
    if (isMusicPlaying) return;
    if (bgAudio && bgAudio.src && !bgAudio.src.endsWith("none")) {
      bgAudio
        .play()
        .then(() => setMusicState(true))
        .catch((err) => {
          console.warn("Autoplay was blocked or waiting for user interaction:", err);
        });
    } else {
      startAmbientPiano();
      setMusicState(true);
    }
  }

  function pauseMusic() {
    if (bgAudio) bgAudio.pause();
    stopAmbientPiano();
    setMusicState(false);
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener("click", () => {
      if (!isMusicPlaying) {
        if (bgAudio && bgAudio.src && !bgAudio.src.endsWith("none")) {
          bgAudio
            .play()
            .then(() => setMusicState(true))
            .catch(() => {
              startAmbientPiano();
              setMusicState(true);
            });
        } else {
          startAmbientPiano();
          setMusicState(true);
        }
      } else {
        pauseMusic();
      }
    });
  }

  function setMusicState(playing) {
    isMusicPlaying = playing;
    if (musicToggleBtn && musicLabel) {
      if (playing) {
        musicToggleBtn.classList.add("playing");
        musicLabel.textContent = "Pause Music";
      } else {
        musicToggleBtn.classList.remove("playing");
        musicLabel.textContent = "Play Music";
      }
    }
  }

  // Attempt instant autoplay when page loads
  playMusic();

  // Modern browsers block autoplay with sound unless the user interacts.
  // One-time listener: on the very first touch/click anywhere or opening letter, audio starts immediately!
  const unlockEvents = ["click", "touchstart", "pointerdown", "keydown"];
  function unlockAudioHandler() {
    if (!isMusicPlaying) {
      playMusic();
    }
    unlockEvents.forEach((evt) => {
      window.removeEventListener(evt, unlockAudioHandler, true);
    });
  }
  unlockEvents.forEach((evt) => {
    window.addEventListener(evt, unlockAudioHandler, { capture: true, passive: true });
  });

  // --------------------------------------------------------
  // 10. ATMOSPHERE CANVAS (Subtle Petals & Golden Sparkles)
  // --------------------------------------------------------
  const canvas = document.getElementById("atmosphereCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const particles = [];
    const colors = ["#F7C5D0", "#FDE8EE", "#F5BAC8", "#FFD700", "#F8E8C8"];
    const count = window.innerWidth < 600 ? 14 : 26;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h - h,
        r: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.9 + 0.6,
        speedX: Math.random() * 0.8 - 0.4,
        tilt: Math.random() * 10 - 5,
        tiltAngle: 0,
        tiltInc: Math.random() * 0.05 + 0.02,
      });
    }

    function renderAtmosphere() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.tiltAngle += p.tiltInc;
        p.y += p.speedY;
        p.x += Math.sin(p.tiltAngle) * 0.5 + p.speedX;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.55;
        ctx.ellipse(p.x, p.y, p.r, p.r * 1.3, (p.tilt * Math.PI) / 180, 0, 2 * Math.PI);
        ctx.fill();

        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }
      });

      requestAnimationFrame(renderAtmosphere);
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      renderAtmosphere();
    }
  }

  // Initialize
  populateConfig();
});
