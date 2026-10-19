/**
 * ========================================================
 *  MOM'S BIRTHDAY WEBSITE — MULTI-STAGE CONTROLLER
 *  Envelope (الظرف) -> Prank Choice -> Luxury Cake Spin Warp -> 3D Horizontal Carousel
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------
  // WEB AUDIO SOUND EFFECTS (No external files needed)
  // --------------------------------------------------------
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

  function playDodgeSound() {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }

  function playWarpSound() {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      // Sweeping frequency that rises as it speeds up
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 2.4);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.7);
    } catch (e) {}
  }

  // --------------------------------------------------------
  // STAGE CONTROLLER WITH TELEPORT FLASH
  // --------------------------------------------------------
  const stages = {
    stage1: document.getElementById('stage1'),
    stage2: document.getElementById('stage2'),
    stage3: document.getElementById('stage3'),
    stage4: document.getElementById('stage4')
  };
  const flash = document.getElementById('teleportFlash');

  function goToStage(stageId, withFlash = false) {
    if (withFlash && flash) {
      flash.classList.add('active');
      setTimeout(() => {
        switchActiveStage(stageId);
        setTimeout(() => {
          flash.classList.remove('active');
        }, 300);
      }, 400);
    } else {
      switchActiveStage(stageId);
    }
  }

  function switchActiveStage(stageId) {
    Object.values(stages).forEach(stage => {
      if (stage) stage.classList.remove('active');
    });
    const target = stages[stageId];
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // --------------------------------------------------------
  // STAGE 1: THE ENVELOPE (الظرف)
  // --------------------------------------------------------
  const envelopeBox = document.getElementById('envelopeBox');
  const waxSealBtn = document.getElementById('waxSealBtn');
  const letterCard = document.getElementById('letterCard');
  let envelopeOpened = false;

  function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;
    envelopeBox.classList.add('opened');
    playChime();
    fireConfetti(60);

    // After brief reveal, teleport to Stage 2 (Choice)
    setTimeout(() => {
      goToStage('stage2', true);
    }, 2000);
  }

  if (envelopeBox) envelopeBox.addEventListener('click', openEnvelope);
  if (waxSealBtn) waxSealBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelope();
  });
  if (letterCard) letterCard.addEventListener('click', (e) => {
    e.stopPropagation();
    goToStage('stage2', true);
  });

  // --------------------------------------------------------
  // STAGE 2: PRANK CHOICE (RUNAWAY BUTTON & GIFT)
  // --------------------------------------------------------
  const wantGiftBtn = document.getElementById('wantGiftBtn');
  const dontWantBtn = document.getElementById('dontWantBtn');
  const prankTeaseText = document.getElementById('prankTeaseText');

  const teaseMessages = [
    "Are you sure, Mom? 😂",
    "Nope, can't touch this! 🏃‍♀️💨",
    "Mom, you HAVE to accept this gift! ❤️",
    "Just give up and click the pink one! 😜",
    "I won't let you refuse! You deserve the world! 🎁",
    "Still trying? Just tap 'I Want My Gift'! 🥰"
  ];
  let dodgeCount = 0;

  function dodgeButton() {
    if (!dontWantBtn) return;
    dontWantBtn.classList.add('dodging');
    playDodgeSound();

    const btnWidth = dontWantBtn.offsetWidth || 180;
    const btnHeight = dontWantBtn.offsetHeight || 50;
    const padding = 30;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    dontWantBtn.style.left = `${randomX}px`;
    dontWantBtn.style.top = `${randomY}px`;

    // Update teasing message
    if (prankTeaseText) {
      prankTeaseText.textContent = teaseMessages[dodgeCount % teaseMessages.length];
    }
    dodgeCount++;
  }

  if (dontWantBtn) {
    dontWantBtn.addEventListener('mouseenter', dodgeButton);
    dontWantBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeButton();
    });
    dontWantBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dodgeButton();
    });
  }

  if (wantGiftBtn) {
    wantGiftBtn.addEventListener('click', () => {
      playChime();
      fireConfetti(100);
      // Teleport to Stage 3: The Royal Cake
      goToStage('stage3', true);
    });
  }

  // --------------------------------------------------------
  // STAGE 3: LUXURY CAKE & SPEEDING ROTATION WARP
  // --------------------------------------------------------
  const lightCandlesBtn = document.getElementById('lightCandlesBtn');
  const cakeVortexWrapper = document.getElementById('cakeVortexWrapper');

  if (lightCandlesBtn && cakeVortexWrapper) {
    lightCandlesBtn.addEventListener('click', () => {
      lightCandlesBtn.disabled = true;
      lightCandlesBtn.innerHTML = '<span>Accelerating into Surprise... ✨</span>';

      // Play rising warp audio
      playWarpSound();

      // Start the speeding rotation
      cakeVortexWrapper.classList.add('spinning-warp');

      // Teleport right at the climax of the spin
      setTimeout(() => {
        goToStage('stage4', true);
        fireConfetti(160);
        cakeVortexWrapper.classList.remove('spinning-warp');
        lightCandlesBtn.disabled = false;
        lightCandlesBtn.innerHTML = '<span>✨ Light Up The Candles & Enter the Dream 🎂</span>';
      }, 2500);
    });
  }

  // --------------------------------------------------------
  // STAGE 4: 3D HORIZONTAL ROTATING CAROUSEL & FINALE
  // --------------------------------------------------------
  const carousel3D = document.getElementById('carousel3D');
  const toggleCarouselBtn = document.getElementById('toggleCarouselBtn');
  let isCarouselPaused = false;

  if (toggleCarouselBtn && carousel3D) {
    toggleCarouselBtn.addEventListener('click', () => {
      isCarouselPaused = !isCarouselPaused;
      if (isCarouselPaused) {
        carousel3D.classList.add('paused');
        toggleCarouselBtn.textContent = '▶ Resume Rotation';
      } else {
        carousel3D.classList.remove('paused');
        toggleCarouselBtn.textContent = '⏸ Pause Rotation';
      }
    });
  }

  // Replay Journey Button
  const replayBtn = document.getElementById('replayBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      envelopeOpened = false;
      if (envelopeBox) envelopeBox.classList.remove('opened');
      if (dontWantBtn) {
        dontWantBtn.classList.remove('dodging');
        dontWantBtn.style.left = '';
        dontWantBtn.style.top = '';
      }
      dodgeCount = 0;
      goToStage('stage1', true);
    });
  }

  // --------------------------------------------------------
  // FALLING ROSE PETALS (CANVAS)
  // --------------------------------------------------------
  const petalsCanvas = document.getElementById('petalsCanvas');
  if (petalsCanvas) {
    const ctx = petalsCanvas.getContext('2d');
    let width = (petalsCanvas.width = window.innerWidth);
    let height = (petalsCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = petalsCanvas.width = window.innerWidth;
      height = petalsCanvas.height = window.innerHeight;
    });

    const petals = [];
    const colors = ['#F7C5D0', '#FDE8EE', '#F3A8B6', '#EBB0BA', '#FFEBF0'];
    const maxPetals = window.innerWidth < 600 ? 16 : 28;

    for (let i = 0; i < maxPetals; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 8 + 6,
        d: Math.random() * maxPetals,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngle: 0,
        tiltAngleInc: Math.random() * 0.06 + 0.03,
        speedY: Math.random() * 1.1 + 0.7,
        speedX: Math.random() * 1 - 0.5
      });
    }

    function renderPetals() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(p => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += p.speedY;
        p.x += Math.sin(p.d) + p.speedX;
        p.tilt = Math.sin(p.tiltAngle - p.d / 3) * 14;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.65;
        ctx.ellipse(p.x, p.y, p.r, p.r * 1.4, (p.tilt * Math.PI) / 180, 0, 2 * Math.PI);
        ctx.fill();

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });
      requestAnimationFrame(renderPetals);
    }
    renderPetals();
  }

  // --------------------------------------------------------
  // CONFETTI CANNON (CANVAS)
  // --------------------------------------------------------
  const confettiCanvas = document.getElementById('confettiCanvas');
  let confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  let confettiParticles = [];
  let isConfettiAnimating = false;

  function resizeConfetti() {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  }
  window.addEventListener('resize', resizeConfetti);
  resizeConfetti();

  function fireConfetti(count = 100) {
    if (!confettiCanvas || !confettiCtx) return;
    const colors = ['#D4687A', '#F7C5D0', '#C9A55A', '#FFD700', '#FFFDF9'];
    const w = confettiCanvas.width;
    const h = confettiCanvas.height;

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: w / 2 + (Math.random() * 200 - 100),
        y: h / 2 + (Math.random() * 100 - 50),
        vx: (Math.random() - 0.5) * 18,
        vy: -Math.random() * 15 - 6,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
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
      p.rotation += p.rotSpeed;
      p.opacity -= 0.008;

      if (p.opacity <= 0 || p.y > confettiCanvas.height + 20) {
        confettiParticles.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.fillStyle = p.color;
      confettiCtx.globalAlpha = Math.max(0, p.opacity);
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      confettiCtx.restore();
    }

    requestAnimationFrame(animateConfetti);
  }

  // --------------------------------------------------------
  // BACKGROUND MUSIC
  // --------------------------------------------------------
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicLabel = document.getElementById('musicLabel');
  const bgAudio = document.getElementById('bgAudio');
  let isPlaying = false;

  let synthInterval = null;
  function startAmbientSynth() {
    const scale = [261.63, 329.63, 392.00, 440.00, 523.25];
    playAmbientNote();
    synthInterval = setInterval(playAmbientNote, 1800);

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
        if (bgAudio && bgAudio.src && !bgAudio.src.endsWith('none')) {
          bgAudio.play()
            .then(() => setPlayingState(true))
            .catch(() => {
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
