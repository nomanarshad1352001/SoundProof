import { useEffect, useRef, type RefObject } from "react";
import { engine } from "../audio/engine";

const BARS = 72;

/**
 * Full-bleed canvas equalizer. Reads the live AnalyserNode while the bass
 * engine runs; otherwise falls back to a slow ambient sine drift.
 */
export default function EqCanvas({
  className,
  punchTarget,
}: {
  className?: string;
  punchTarget?: RefObject<HTMLDivElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let gradient: CanvasGradient | null = null;
    const freq = new Uint8Array(128);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gradient = ctx.createLinearGradient(0, h, 0, h * 0.15);
      gradient.addColorStop(0, "#ff3d00");
      gradient.addColorStop(0.6, "#ff6a00");
      gradient.addColorStop(1, "#ffb300");
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      const live = engine.playing && engine.analyser;
      if (live) engine.analyser!.getByteFrequencyData(freq);

      const punch = engine.punch();

      // kick bloom behind the bars
      if (punch > 0.02) {
        const r = Math.max(w, h) * (0.22 + punch * 0.1);
        const bloom = ctx.createRadialGradient(w / 2, h, 0, w / 2, h, r);
        bloom.addColorStop(0, `rgba(255,61,0,${0.28 * punch})`);
        bloom.addColorStop(1, "rgba(255,61,0,0)");
        ctx.fillStyle = bloom;
        ctx.fillRect(0, 0, w, h);
      }

      if (punchTarget?.current) {
        const s = 1 + punch * 0.012;
        punchTarget.current.style.transform = `scale3d(${s},${s},1)`;
      }

      const step = w / BARS;
      const barW = step * 0.6;

      for (let i = 0; i < BARS; i++) {
        let v: number;
        if (live) {
          const bin = 2 + Math.floor(Math.pow(i / BARS, 1.7) * 84);
          v = freq[Math.min(bin, freq.length - 1)] / 255;
          v = Math.pow(v, 1.25);
        } else {
          const t = now / 1000;
          v =
            0.05 +
            0.045 * (Math.sin(i * 0.32 + t * 1.15) * 0.5 + 0.5) *
              (Math.sin(i * 0.11 - t * 0.7) * 0.5 + 0.5);
        }

        const barH = Math.max(2, v * h * 0.62);
        const x = i * step + (step - barW) / 2;
        const edgeFade = Math.pow(Math.sin((Math.PI * i) / (BARS - 1)), 0.55);
        ctx.globalAlpha = (live ? 0.5 + v * 0.5 : 0.55) * edgeFade;
        ctx.fillStyle = gradient!;
        ctx.beginPath();
        ctx.roundRect(x, h - barH, barW, barH, [3, 3, 0, 0]);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [punchTarget]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
