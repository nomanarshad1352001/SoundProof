import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { engine } from "../audio/engine";
import EqCanvas from "./EqCanvas";
import Marquee from "./Marquee";
import { INFO, TICKER } from "../data";

const LINE_EASE = [0.16, 1, 0.3, 1] as const;

function HeadlineLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: LINE_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const [on, setOn] = useState(engine.playing);
  const punchRef = useRef<HTMLDivElement>(null);

  useEffect(() => engine.subscribe(setOn), []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* live equalizer backdrop */}
      <EqCanvas className="absolute inset-0 h-full w-full opacity-70" punchTarget={punchRef} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,8,11,0.72)_58%,#08080b_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pt-28 pb-16 md:px-10">
        {/* kicker row */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] font-bold tracking-[0.3em] text-dim uppercase md:text-xs"
        >
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-signal" />
            Custom Car Audio — Est. 25+ Years
          </span>
          <span className="hidden md:block">Installation · Sales · Service</span>
        </motion.div>

        {/* headline */}
        <div ref={punchRef} className="origin-center will-change-transform">
          <h1 className="font-display text-[clamp(3.2rem,10.5vw,10rem)] leading-[0.9] uppercase">
            <HeadlineLine delay={0.2}>
              The Right <span className="text-stroke">Equip&shy;ment.</span>
            </HeadlineLine>
            <HeadlineLine delay={0.34}>
              The Right <span className="text-stroke">Price.</span>
            </HeadlineLine>
            <HeadlineLine delay={0.48}>
              The Right <span className="text-signal">Sound.</span>
            </HeadlineLine>
          </h1>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: LINE_EASE }}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6"
        >
          <button
            onClick={() => engine.toggle()}
            className="group relative flex items-center gap-4 overflow-hidden bg-signal px-7 py-4 font-display text-lg tracking-wide text-black uppercase transition-transform duration-300 hover:scale-[1.03] active:scale-95"
          >
            <span className="absolute inset-0 -translate-x-full bg-ember transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">
              {on ? (
                <span className="eq-bars text-black">
                  <span /> <span /> <span /> <span />
                </span>
              ) : (
                <span className="relative flex size-4 items-center justify-center">
                  <span className="absolute size-4 animate-ping rounded-full bg-black/30" />
                  <svg viewBox="0 0 16 16" className="size-3.5 fill-black">
                    <path d="M3 1.5v13l11-6.5-11-6.5z" />
                  </svg>
                </span>
              )}
            </span>
            <span className="relative">{on ? "Kill the bass" : "Feel the bass"}</span>
          </button>

          <a
            href="#services"
            className="group flex items-center gap-3 font-mono text-xs font-bold tracking-[0.25em] uppercase transition-colors hover:text-signal"
          >
            Explore services
            <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>

          <p className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
            {on ? "Signal live — synthesized in-browser" : "Sound optional. Headphones recommended."}
          </p>
        </motion.div>
      </div>

      {/* bottom dock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 border-t border-line bg-void/70 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-3 font-mono text-[10px] font-bold tracking-[0.25em] text-dim uppercase md:px-10">
          <span>{today}</span>
          <span className="flex items-center gap-2">
            <MapPin className="size-3.5 text-signal" />
            {INFO.street}, {INFO.city}
          </span>
          <a href={INFO.phoneHref} className="transition-colors hover:text-signal">
            P: {INFO.phoneDisplay}
          </a>
        </div>
        <Marquee items={TICKER} className="border-t border-line py-3" itemClassName="text-base md:text-lg" />
      </motion.div>
    </section>
  );
}
