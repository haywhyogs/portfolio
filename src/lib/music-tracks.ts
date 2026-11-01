// Music track definitions: each track has a distinct rhythm and character
// Synthesized with Web Audio API — no external files needed

export type TrackId = "focus" | "adventure" | "ambient";

export type TrackInfo = {
  id: TrackId;
  name: string;
  description: string;
};

export const tracks: TrackInfo[] = [
  { id: "focus", name: "Focus", description: "Steady pulse for deep work" },
  { id: "adventure", name: "Adventure", description: "Driving rhythm, high energy" },
  { id: "ambient", name: "Ambient", description: "Calm pad, no rhythm" },
];

// Pentatonic scale (always consonant)
const PENTA = {
  C3: 130.81, D3: 146.83, E3: 164.81, G3: 196.0, A3: 220.0,
  C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.0, A4: 440.0,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.0,
};

function makeKick(ctx: AudioContext, dest: GainNode, time: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(80, time);
  osc.frequency.exponentialRampToValueAtTime(30, time + 0.08);
  gain.gain.setValueAtTime(0.4, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(time);
  osc.stop(time + 0.15);
}

function makeHihat(ctx: AudioContext, dest: GainNode, time: number, vol = 0.08) {
  const bufferSize = ctx.sampleRate * 0.03;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(8000, time);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  noise.start(time);
  noise.stop(time + 0.05);
}

function makeSnare(ctx: AudioContext, dest: GainNode, time: number) {
  // Noise component
  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const nFilter = ctx.createBiquadFilter();
  nFilter.type = "highpass";
  nFilter.frequency.setValueAtTime(1500, time);
  const nGain = ctx.createGain();
  nGain.gain.setValueAtTime(0.15, time);
  nGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
  noise.connect(nFilter);
  nFilter.connect(nGain);
  nGain.connect(dest);
  noise.start(time);
  noise.stop(time + 0.12);
  // Tone component
  const osc = ctx.createOscillator();
  const oGain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(180, time);
  oGain.gain.setValueAtTime(0.1, time);
  oGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
  osc.connect(oGain);
  oGain.connect(dest);
  osc.start(time);
  osc.stop(time + 0.1);
}

function makePad(ctx: AudioContext, dest: GainNode, freqs: number[], startTime: number, duration: number, vol = 0.045) {
  const oscs: OscillatorNode[] = [];
  const gains: GainNode[] = [];

  freqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + duration * 0.3);
    gain.gain.setValueAtTime(vol, startTime + duration * 0.7);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
    oscs.push(osc);
    gains.push(gain);
  });

  return { oscs, gains };
}

function makeNote(ctx: AudioContext, dest: GainNode, freq: number, time: number, vol = 0.03, decay = 1.5) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, time);
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(vol, time + 0.05);
  gain.gain.linearRampToValueAtTime(0, time + decay);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(time);
  osc.stop(time + decay + 0.1);
}

// Focus: steady kick at 90 BPM, warm pads, sparse melody, hi-hat on off-beats
function startFocus(ctx: AudioContext): () => void {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 3);
  master.connect(ctx.destination);

  const bpm = 90;
  const beat = 60 / bpm; // 0.667s
  const bar = beat * 4;   // 2.667s
  let nextBar = ctx.currentTime + 0.1;
  let barCount = 0;

  const chords = [
    [PENTA.C3, PENTA.E3, PENTA.G3, PENTA.A3],
    [PENTA.A3, PENTA.C4, PENTA.E4, PENTA.G4],
    [PENTA.G3, 246.94, PENTA.D4, PENTA.E4],
    [PENTA.D3, PENTA.G3, PENTA.A3, PENTA.D4],
  ];

  const melodyNotes = [PENTA.E5, PENTA.G5, PENTA.A5, PENTA.G5, PENTA.E5, PENTA.D5];

  let melodyIdx = 0;

  function scheduleBar(time: number, bCount: number) {
    // Chord (one per bar)
    makePad(ctx, master, chords[bCount % chords.length], time, bar, 0.04);

    // Kick on every beat
    for (let b = 0; b < 4; b++) {
      makeKick(ctx, master, time + b * beat);
    }

    // Hi-hat on off-beats (8th notes)
    for (let h = 0; h < 8; h++) {
      if (h % 2 === 1) {
        makeHihat(ctx, master, time + h * (beat / 2), 0.05);
      }
    }

    // Melody note on beat 1 and 3
    if (bCount % 2 === 0) {
      makeNote(ctx, master, melodyNotes[melodyIdx % melodyNotes.length], time, 0.03, 1.2);
      melodyIdx++;
    }
  }

  // Schedule ahead
  const intervalId = setInterval(() => {
    while (nextBar < ctx.currentTime + 1.5) {
      scheduleBar(nextBar, barCount);
      nextBar += bar;
      barCount++;
    }
  }, 500);

  return () => {
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    clearInterval(intervalId);
    setTimeout(() => { try { master.disconnect(); } catch {} }, 1200);
  };
}

// Adventure: driving 120 BPM, kick+snare, bass line, melodic ostinato
function startAdventure(ctx: AudioContext): () => void {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 2);
  master.connect(ctx.destination);

  const bpm = 120;
  const beat = 60 / bpm; // 0.5s
  const bar = beat * 4;   // 2s
  let nextBar = ctx.currentTime + 0.1;
  let barCount = 0;

  const bassNotes = [PENTA.C3, PENTA.C3, PENTA.A3 / 2, PENTA.A3 / 2, PENTA.G3 / 2, PENTA.G3 / 2, PENTA.D3, PENTA.D3];
  const ostinato = [PENTA.C4, PENTA.E4, PENTA.G4, PENTA.E4, PENTA.C4, PENTA.D4, PENTA.E4, PENTA.D4];

  function scheduleBar(time: number, bCount: number) {
    const bassFreq = bassNotes[bCount % bassNotes.length];

    // Bass line (low sine, one note per beat with variation)
    for (let b = 0; b < 4; b++) {
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = "sine";
      bassOsc.frequency.setValueAtTime(bassFreq, time + b * beat);
      bassGain.gain.setValueAtTime(0, time + b * beat);
      bassGain.gain.linearRampToValueAtTime(0.08, time + b * beat + 0.02);
      bassGain.gain.linearRampToValueAtTime(0, time + b * beat + beat * 0.8);
      bassOsc.connect(bassGain);
      bassGain.connect(master);
      bassOsc.start(time + b * beat);
      bassOsc.stop(time + b * beat + beat);
    }

    // Kick pattern: 1, 2+, 3, 4 (syncopated)
    makeKick(ctx, master, time);
    makeKick(ctx, master, time + beat * 1.5);
    makeKick(ctx, master, time + beat * 2);
    makeKick(ctx, master, time + beat * 3.5);

    // Snare on 2 and 4
    makeSnare(ctx, master, time + beat);
    makeSnare(ctx, master, time + beat * 3);

    // Hi-hat 8th notes
    for (let h = 0; h < 8; h++) {
      makeHihat(ctx, master, time + h * (beat / 2), h % 2 === 0 ? 0.07 : 0.04);
    }

    // Melodic ostinato (8th notes)
    for (let n = 0; n < 8; n++) {
      makeNote(ctx, master, ostinato[n % ostinato.length], time + n * (beat / 2), 0.025, 0.4);
    }

    // Pad chord
    const chordFreqs = bCount % 4 < 2
      ? [PENTA.C4, PENTA.E4, PENTA.G4]
      : [PENTA.A3, PENTA.C4, PENTA.E4];
    makePad(ctx, master, chordFreqs, time, bar, 0.025);
  }

  const intervalId = setInterval(() => {
    while (nextBar < ctx.currentTime + 1.5) {
      scheduleBar(nextBar, barCount);
      nextBar += bar;
      barCount++;
    }
  }, 500);

  return () => {
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    clearInterval(intervalId);
    setTimeout(() => { try { master.disconnect(); } catch {} }, 700);
  };
}

// Ambient: slow pad chords, no rhythm, sparse notes (the original)
function startAmbient(ctx: AudioContext): () => void {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 4);
  master.connect(ctx.destination);

  const chords = [
    [PENTA.C3, PENTA.E3, PENTA.G3, PENTA.A3],
    [PENTA.A3, PENTA.C4, PENTA.E4, PENTA.G4],
    [PENTA.G3, PENTA.D4, PENTA.E4, PENTA.A4],
    [PENTA.D3, PENTA.G3, PENTA.A3, PENTA.D4],
  ];

  let chordIndex = 0;
  let activeVoices: { osc: OscillatorNode; gain: GainNode }[] = [];

  function playChord(freqs: number[]) {
    const now = ctx.currentTime;
    activeVoices.forEach(({ osc, gain }) => {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + 4);
      setTimeout(() => { try { osc.stop(); } catch {} }, 4500);
    });

    activeVoices = freqs.map((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 4);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      return { osc, gain };
    });
  }

  playChord(chords[0]);

  const chordInterval = setInterval(() => {
    chordIndex = (chordIndex + 1) % chords.length;
    playChord(chords[chordIndex]);
  }, 12000);

  const melodicNotes = [PENTA.C5, PENTA.D5, PENTA.E5, PENTA.G5, PENTA.A5];
  let noteIdx = 0;
  const noteInterval = setInterval(() => {
    makeNote(ctx, master, melodicNotes[noteIdx % melodicNotes.length], ctx.currentTime, 0.03, 2.5);
    noteIdx++;
  }, 3000);

  return () => {
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    clearInterval(chordInterval);
    clearInterval(noteInterval);
    setTimeout(() => {
      activeVoices.forEach(({ osc }) => { try { osc.stop(); } catch {} });
      try { master.disconnect(); } catch {}
    }, 1200);
  };
}

export function startTrack(ctx: AudioContext, trackId: TrackId): () => void {
  switch (trackId) {
    case "focus":
      return startFocus(ctx);
    case "adventure":
      return startAdventure(ctx);
    case "ambient":
      return startAmbient(ctx);
  }
}