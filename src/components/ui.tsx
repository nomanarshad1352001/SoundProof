import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  index,
  label,
  title,
  blurb,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  blurb?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-14 flex flex-wrap items-end justify-between gap-8", className)}>
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.35em] text-signal uppercase">
          <span className="inline-block h-px w-10 bg-signal" />
          {index} / {label}
        </div>
        <h2 className="mt-5 font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.92] uppercase">
          {title}
        </h2>
      </Reveal>
      {blurb && (
        <Reveal delay={0.15} className="max-w-sm">
          <p className="border-l-2 border-signal pl-5 text-sm leading-relaxed text-dim">
            {blurb}
          </p>
        </Reveal>
      )}
    </div>
  );
}
