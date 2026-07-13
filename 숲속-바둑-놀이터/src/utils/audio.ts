/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API Synthesizer for Forest Baduk Playground
// This provides zero-dependency, extremely cute sound effects and ambient procedural forest music.

let audioCtx: AudioContext | null = null;
let bgmInterval: any = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Get volume scaler based on local storage settings
function getSfxVolume() {
  try {
    const saved = localStorage.getItem('forest_baduk_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.mute) return 0;
      return (parsed.sfxVolume ?? 50) / 100;
    }
  } catch (e) {
    // Ignore
  }
  return 0.5;
}

function getBgmVolume() {
  try {
    const saved = localStorage.getItem('forest_baduk_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.mute) return 0;
      return (parsed.bgmVolume ?? 40) / 100;
    }
  } catch (e) {
    // Ignore
  }
  return 0.4;
}

/**
 * Play a simple, cute UI click sound (bubble/pop)
 */
export function playClickSound() {
  try {
    const ctx = getAudioContext();
    const vol = getSfxVolume();
    if (vol <= 0) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    // Fast frequency sweep for bubble sound
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(vol * 0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.warn('Audio error:', e);
  }
}

/**
 * Play a stone placement sound depending on its type
 */
export function playStoneSound(type: 'traditional' | 'animals' | 'forest') {
  try {
    const ctx = getAudioContext();
    const vol = getSfxVolume();
    if (vol <= 0) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    if (type === 'animals') {
      // Squeak / Mew sound for animals
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);

      gainNode.gain.setValueAtTime(vol * 0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
    } else if (type === 'forest') {
      // Hollow apple plop sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(vol * 0.6, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
    } else {
      // Traditional Baduk stone "clack" (wood/stone tap)
      // Combines a short noise burst or frequency pluck
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(vol * 0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
    }

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.warn('Audio error:', e);
  }
}

/**
 * Play capture sound (delightful bursting bubble cascade)
 */
export function playCaptureSound() {
  try {
    const ctx = getAudioContext();
    const vol = getSfxVolume();
    if (vol <= 0) return;

    // Create 3 rapid pops for capture
    for (let i = 0; i < 3; i++) {
      const delay = i * 0.06;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(200 + i * 150, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(800 + i * 200, ctx.currentTime + delay + 0.08);

      gainNode.gain.setValueAtTime(vol * 0.3, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.09);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.1);
    }
  } catch (e) {
    console.warn('Audio error:', e);
  }
}

/**
 * Play a sparkling success chime
 */
export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    const vol = getSfxVolume();
    if (vol <= 0) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 major chord
    notes.forEach((freq, idx) => {
      const delay = idx * 0.07;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gainNode.gain.setValueAtTime(vol * 0.25, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.4);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.45);
    });
  } catch (e) {
    console.warn('Audio error:', e);
  }
}

/**
 * Play failure sound (disappointed slide down)
 */
export function playFailureSound() {
  try {
    const ctx = getAudioContext();
    const vol = getSfxVolume();
    if (vol <= 0) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(vol * 0.35, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    console.warn('Audio error:', e);
  }
}

/**
 * Start procedural ambient forest music
 * This plays soft, warm pentatonic bell-like melodies in the background to simulate a forest windchime.
 */
export function startBgm() {
  try {
    if (bgmInterval) return;

    // Trigger immediate notes
    playProceduralBgmNote();

    // Setup recurring forest bell chime
    bgmInterval = setInterval(() => {
      playProceduralBgmNote();
    }, 4500); // every 4.5 seconds
  } catch (e) {
    console.warn('BGM error:', e);
  }
}

export function stopBgm() {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

// Procedural sound design: Plays a soft ambient dual chime
function playProceduralBgmNote() {
  try {
    const ctx = getAudioContext();
    const vol = getBgmVolume();
    if (vol <= 0) return;

    // Soft pentatonic frequencies (G major pentatonic - warm, natural, cozy)
    // G3, B3, D4, E4, G4, B4, D5, E5
    const scale = [196.00, 246.94, 293.66, 329.63, 392.00, 493.88, 587.33, 659.25];
    
    // Pick 2 random harmonious notes to play near each other
    const note1 = scale[Math.floor(Math.random() * scale.length)];
    let note2 = scale[Math.floor(Math.random() * scale.length)];
    while (note2 === note1) {
      note2 = scale[Math.floor(Math.random() * scale.length)];
    }

    playBell(ctx, note1, 0, vol);
    playBell(ctx, note2, 0.4, vol * 0.8);
  } catch (e) {
    // Ignore context issues
  }
}

function playBell(ctx: AudioContext, frequency: number, delay: number, maxVolume: number) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

  // Soft lowpass filter to make it sound warm and round (like wood chimes or glass bells)
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1200, ctx.currentTime + delay);

  // Slow attack and long gentle decay
  gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
  gainNode.gain.linearRampToValueAtTime(maxVolume * 0.15, ctx.currentTime + delay + 0.15); // soft attack
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 2.5); // long cozy decay

  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + 2.6);
}
