/**
 * BassEngine — a tiny synthesized trap pattern (kick / sub / hats / snare)
 * built on raw WebAudio. Drives the hero visualizer through an AnalyserNode.
 * AudioContext is created lazily on first user gesture to satisfy autoplay rules.
 */

export type EngineListener = (playing: boolean) => void;

const BPM = 138;
const SIXTEENTH = 60 / BPM / 4;
const LOOKAHEAD = 0.12;
const TICK_MS = 25;

const KICK_STEPS = [0, 7, 8, 13];
const SNARE_STEPS = [4, 12];
// F1, D#1, C1, G#1 — one root per bar
const ROOTS = [43.65, 38.89, 32.7, 51.91];

class BassEngine {
  playing = false;
  analyser: AnalyserNode | null = null;

  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private timer: number | null = null;
  private nextTime = 0;
  private step = 0;
  private bar = 0;
  private lastKickPerf = -1e9;
  private listeners = new Set<EngineListener>();

  private ensure() {
    if (this.ctx) return;
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.82;
    master.connect(analyser);
    analyser.connect(ctx.destination);

    const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    this.ctx = ctx;
    this.master = master;
    this.analyser = analyser;
    this.noise = noise;
  }

  async start() {
    this.ensure();
    const ctx = this.ctx!;
    if (ctx.state !== "running") await ctx.resume();
    const t = ctx.currentTime;
    this.master!.gain.cancelScheduledValues(t);
    this.master!.gain.setValueAtTime(this.master!.gain.value, t);
    this.master!.gain.linearRampToValueAtTime(0.9, t + 0.35);
    this.step = 0;
    this.bar = 0;
    this.nextTime = t + 0.08;
    this.playing = true;
    if (this.timer === null) this.timer = window.setInterval(this.tick, TICK_MS);
    this.emit();
  }

  stop() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master!.gain.cancelScheduledValues(t);
    this.master!.gain.setValueAtTime(this.master!.gain.value, t);
    this.master!.gain.linearRampToValueAtTime(0.0001, t + 0.22);
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    this.playing = false;
    window.setTimeout(() => {
      if (!this.playing) this.ctx?.suspend();
    }, 320);
    this.emit();
  }

  toggle() {
    if (this.playing) this.stop();
    else void this.start();
  }

  /** 0 → 1 decay envelope fired on every kick; used for visual punch. */
  punch() {
    const age = (performance.now() - this.lastKickPerf) / 280;
    if (age >= 1 || !this.playing) return 0;
    return Math.pow(1 - age, 2);
  }

  subscribe(fn: EngineListener) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.listeners.forEach((fn) => fn(this.playing));
  }

  private tick = () => {
    if (!this.ctx) return;
    while (this.nextTime < this.ctx.currentTime + LOOKAHEAD) {
      this.scheduleStep(this.step, this.nextTime);
      this.nextTime += SIXTEENTH;
      this.step = (this.step + 1) % 16;
      if (this.step === 0) this.bar = (this.bar + 1) % 4;
    }
  };

  private scheduleStep(i: number, t: number) {
    if (KICK_STEPS.includes(i)) {
      this.kick(t);
      this.sub(t, ROOTS[this.bar]);
      this.lastKickPerf = performance.now();
    }
    if (SNARE_STEPS.includes(i)) this.snare(t);
    this.hat(t, i % 4 === 2 ? 0.16 : 0.055);
  }

  private kick(t: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(44, t + 0.11);
    gain.gain.setValueAtTime(1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);
    osc.connect(gain).connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.45);
  }

  private sub(t: number, freq: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const lp = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, t);
    lp.type = "lowpass";
    lp.frequency.value = 150;
    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(lp).connect(gain).connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.55);
  }

  private hat(t: number, level: number) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7200;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(level, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    src.connect(hp).connect(gain).connect(this.master!);
    src.start(t, Math.random());
    src.stop(t + 0.08);
  }

  private snare(t: number) {
    const ctx = this.ctx!;
    // noise body
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1900;
    bp.Q.value = 0.9;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.55, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    src.connect(bp).connect(ng).connect(this.master!);
    src.start(t, Math.random());
    src.stop(t + 0.2);
    // tonal snap
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(185, t);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.3, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    osc.connect(og).connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.1);
  }
}

export const engine = new BassEngine();
