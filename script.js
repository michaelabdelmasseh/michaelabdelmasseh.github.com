/**
 * ========================================================
 *  MOM'S BIRTHDAY WEBSITE — INTERACTION & ANIMATIONS
 *  Pure Vanilla JavaScript (No dependencies required)
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------
  // 1. OPEN GIFT / UNWRAP EXPERIENCE
  // --------------------------------------------------------
  const openGiftBtn = document.getElementById('openGiftBtn');
  const welcomeScreen = document.getElementById('welcome');
  const mainExperience = document.getElementById('mainExperience');

  if (openGiftBtn && welcomeScreen && mainExperience) {
    openGiftBtn.addEventListener('click', () => {
      welcomeScreen.classList.add('opened');
      mainExperience.classList.add('visible');

      // Trigger celebration confetti
      fireConfetti(120);
      playChime();

      // Smooth scroll to celebration hero
      setTimeout(() => {
        const celebrationSection = document.getElementById('celebration');
        if (celebrationSection) {
          celebrationSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    });
  }

  // --------------------------------------------------------
  // 2. FALLING ROSE PETALS (CANVAS)
  // --------------------------------------------------------
  const petalsCanvas = document.getElementById('petals-canvas');
  if (petalsCanvas) {
    const ctx = petalsCanvas.getContext('2d');
    let width = (petalsCanvas.width = window.innerWidth);
    let height = (petalsCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = petalsCanvas.width = window.innerWidth;
      height = petalsCanvas.height = window.innerHeight;
    });

    const petals = [];
    const petalColors = ['#F7C5D0', '#FDE8EE', '#F3A8B6', '#EBB0BA', '#FFEBF0'];
    const maxPetals = window.innerWidth < 600 ? 18 : 32;

    for (let i = 0; i < maxPetals; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 8 + 6,
        d: Math.random() * maxPetals,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngle: 0,
        tiltAngleIncremental: (Math.random() * 0.07) + 0.04,
        speedY: (Math.random() * 1.2) + 0.8,
        speedX: (Math.random() * 1) - 0.5
      });
    }

    function renderPetals() {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.speedY;
        p.x += Math.sin(p.d) + p.speedX;
        p.tilt = Math.sin(p.tiltAngle - (p.d / 3)) * 14;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.65;
        ctx.ellipse(p.x, p.y, p.r, p.r * 1.4, (p.tilt * Math.PI) / 180, 0, 2 * Math.PI);
        ctx.fill();

        // Respawn when hitting bottom
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });

      requestAnimationFrame(renderPetals);
    }

    // Only run if user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      renderPetals();
    }
  }

  // --------------------------------------------------------
  // 3. CONFETTI CANNON (PURE CANVAS)
  // --------------------------------------------------------
  const confettiCanvas = document.getElementById('confetti-canvas');
  let confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  let confettiParticles = [];

  function resizeConfetti() {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  }
  window.addEventListener('resize', resizeConfetti);
  resizeConfetti();

  function fireConfetti(count = 90) {
    if (!confettiCanvas || !confettiCtx) return;
    const colors = ['#D4687A', '#F7C5D0', '#C9A55A', '#F3E5AB', '#FFFDF9', '#E87A90'];
    const w = confettiCanvas.width;
    const h = confettiCanvas.height;

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: w / 2 + (Math.random() * 200 - 100),
        y: h / 2 + (Math.random() * 100 - 50),
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 6,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        gravity: 0.35,
        friction: 0.98
      });
    }

    if (!isConfettiAnimating) {
      isConfettiAnimating = true;
      animateConfetti();
    }
  }

  let isConfettiAnimating = false;
  function animateConfetti() {
    if (!confettiCtx || confettiParticles.length === 0) {
      if (confettiCtx) confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      isConfettiAnimating = false;
      return;
    }

    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.friction;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.007;

      if (p.opacity <= 0 || p.y > confettiCanvas.height + 20) {
        confettiParticles.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.fillStyle = p.color;
      confettiCtx.globalAlpha = Math.max(0, p.opacity);
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      confettiCtx.restore();
    }

    requestAnimationFrame(animateConfetti);
  }

  // --------------------------------------------------------
  // 4. INTERACTIVE POLAROID GALLERY & LIGHTBOX
  // --------------------------------------------------------
  const polaroidItems = Array.from(document.querySelectorAll('.polaroid-item'));
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxDate = document.getElementById('lightboxDate');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentPhotoIndex = 0;

  function updateLightbox(index) {
    if (index < 0) index = polaroidItems.length - 1;
    if (index >= polaroidItems.length) index = 0;
    currentPhotoIndex = index;

    const item = polaroidItems[index];
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || '';
    const date = item.getAttribute('data-date') || '';

    if (lightboxImg) lightboxImg.src = img.src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    if (lightboxDate) lightboxDate.textContent = date;
  }

  polaroidItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      updateLightbox(idx);
      if (lightbox) {
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => updateLightbox(currentPhotoIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => updateLightbox(currentPhotoIndex + 1));

  // Close on backdrop click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target.classList.contains('lightbox-backdrop')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentPhotoIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentPhotoIndex + 1);
  });

  // --------------------------------------------------------
  // 5. CAKE & CANDLE BLOWOUT INTERACTION
  // --------------------------------------------------------
  const blowCandlesBtn = document.getElementById('blowCandlesBtn');
  const candles = document.querySelectorAll('.candle');
  const wishRevealedCard = document.getElementById('wishRevealedCard');

  if (blowCandlesBtn) {
    blowCandlesBtn.addEventListener('click', () => {
      // Extinguish flames
      candles.forEach((c) => c.classList.add('blown-out'));

      // Confetti celebration
      fireConfetti(140);
      playChime();

      // Show birthday message card
      if (wishRevealedCard) {
        wishRevealedCard.classList.remove('hidden');
        wishRevealedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      blowCandlesBtn.innerHTML = '<span>Wish Made! ✨ Happy Birthday!</span>';
      blowCandlesBtn.style.opacity = '0.85';
      blowCandlesBtn.disabled = true;
    });
  }

  // --------------------------------------------------------
  // 6. FLOATING HEARTS GENERATOR IN SECTION G
  // --------------------------------------------------------
  const heartsContainer = document.getElementById('floatingHeartsContainer');
  if (heartsContainer) {
    setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = ['❤️', '💖', '🌸', '✨', '💕'][Math.floor(Math.random() * 5)];
      heart.style.left = Math.random() * 90 + 5 + '%';
      heart.style.animationDuration = Math.random() * 2 + 3 + 's';
      heartsContainer.appendChild(heart);

      setTimeout(() => heart.remove(), 4000);
    }, 900);
  }

  // --------------------------------------------------------
  // 7. BACKGROUND MUSIC & SOUND SYSTEM
  // --------------------------------------------------------
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const musicLabel = document.getElementById('musicLabel');
  const bgAudio = document.getElementById('bgAudio');
  let isPlaying = false;

  // Web Audio Synthesizer (fallback melodic chime if no audio file present)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playChime() {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.3);
      });
    } catch (e) {
      // AudioContext unavailable or restricted
    }
  }

  // Ambient synth loop for background music if audio file fails
  let synthInterval = null;
  function startAmbientSynth() {
    const scale = [261.63, 329.63, 392.00, 440.00, 523.25]; // C major pentatonic
    playAmbientNote();
    synthInterval = setInterval(playAmbientNote, 1600);

    function playAmbientNote() {
      try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') ctx.resume();
        const freq = scale[Math.floor(Math.random() * scale.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.3);
      } catch (err) {}
    }
  }

  function stopAmbientSynth() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (!isPlaying) {
        // Try playing user's audio file first
        if (bgAudio && bgAudio.src && !bgAudio.src.endsWith('none')) {
          bgAudio.play()
            .then(() => {
              setPlayingState(true);
            })
            .catch(() => {
              // Fallback to ambient soothing chime loop
              startAmbientSynth();
              setPlayingState(true);
            });
        } else {
          startAmbientSynth();
          setPlayingState(true);
        }
      } else {
        if (bgAudio) bgAudio.pause();
        stopAmbientSynth();
        setPlayingState(false);
      }
    });
  }

  function setPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      musicToggleBtn.classList.add('playing');
      musicLabel.textContent = 'Pause Music';
    } else {
      musicToggleBtn.classList.remove('playing');
      musicLabel.textContent = 'Play Music';
    }
  }

});
