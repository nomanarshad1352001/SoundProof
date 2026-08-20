import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X, Zap } from "lucide-react";
import { INFO } from "../data";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-void/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-10">
          <a href="#top" className="group flex items-center gap-3">
            <span className="flex size-9 items-center justify-center bg-signal text-black transition-transform duration-300 group-hover:rotate-12">
              <Zap className="size-5" strokeWidth={2.5} fill="currentColor" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl tracking-wide uppercase">
                Sound Proof
              </span>
              <span className="block font-mono text-[9px] tracking-[0.3em] text-dim uppercase">
                Inc — Douglasville, GA
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:text-signal"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href={INFO.phoneHref}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs font-bold tracking-widest transition-all duration-300 hover:border-signal hover:bg-signal hover:text-black"
            >
              <Phone className="size-3.5" />
              {INFO.phoneDisplay}
            </a>
          </nav>

          <button
            className="flex size-10 items-center justify-center border border-line lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-void/97 backdrop-blur-xl"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-display text-xl uppercase">Sound Proof</span>
              <button
                className="flex size-10 items-center justify-center border border-line"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-4 border-b border-line py-5"
                >
                  <span className="font-mono text-xs text-signal">0{i + 1}</span>
                  <span className="font-display text-5xl uppercase transition-colors group-hover:text-signal">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="px-6 pb-10">
              <a
                href={INFO.phoneHref}
                className="flex items-center justify-center gap-3 bg-signal py-4 font-display text-xl tracking-wide text-black uppercase"
              >
                <Phone className="size-5" />
                Call {INFO.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
