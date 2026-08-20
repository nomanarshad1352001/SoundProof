import { ArrowUpRight, Phone, Zap } from "lucide-react";
import { AREAS, INFO, SERVICES } from "../data";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "./social-icons";
import { Reveal } from "./ui";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: XIcon, label: "Twitter / X" },
  { icon: YoutubeIcon, label: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* CTA band */}
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] font-bold tracking-[0.4em] text-signal uppercase">
            05 / Get in touch
          </p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-10">
            <h2 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] uppercase">
              Ready to
              <br />
              get <span className="text-stroke">loud?</span>
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={INFO.phoneHref}
                className="group flex items-center justify-center gap-3 bg-signal px-8 py-5 font-display text-xl tracking-wide text-black uppercase transition-transform duration-300 hover:scale-[1.03] active:scale-95"
              >
                <Phone className="size-5" />
                {INFO.phoneDisplay}
              </a>
              <a
                href={INFO.directions}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-3 border border-line px-8 py-5 font-display text-xl tracking-wide uppercase transition-colors duration-300 hover:border-signal hover:text-signal"
              >
                Visit the shop
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* link columns */}
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 py-16 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center bg-signal text-black">
                <Zap className="size-5" strokeWidth={2.5} fill="currentColor" />
              </span>
              <span className="font-display text-xl tracking-wide uppercase">Sound Proof</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-dim">
              {INFO.tagline} Custom car audio, tint, wheels and more — serving West Georgia
              for over 25 years.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center border border-line text-bone/70 transition-all duration-300 hover:border-signal hover:bg-signal hover:text-black"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-bold tracking-[0.35em] text-dim uppercase">
              Sitemap
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-bone/80 transition-colors hover:text-signal"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-bold tracking-[0.35em] text-dim uppercase">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-sm text-bone/80 transition-colors hover:text-signal"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-bold tracking-[0.35em] text-dim uppercase">
              Contact
            </h3>
            <address className="mt-5 text-sm leading-relaxed text-bone/80 not-italic">
              {INFO.street}
              <br />
              {INFO.city}
              <br />
              <a href={INFO.phoneHref} className="mt-2 inline-block text-signal hover:underline">
                P: {INFO.phoneDisplay}
              </a>
            </address>
            <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-wider text-dim uppercase">
              Mon–Fri 9:30a–6p
              <br />
              Sat 9:30a–4p · Closed Sun
            </p>
          </div>
        </div>

        {/* areas served */}
        <div className="mx-auto max-w-[1400px] px-5 pb-14 md:px-10">
          <p className="mb-4 font-mono text-[10px] font-bold tracking-[0.35em] text-dim uppercase">
            Proudly serving —
          </p>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((area) => (
              <span
                key={area}
                className="rounded-full border border-line px-3.5 py-1 font-mono text-[11px] tracking-wider text-bone/70 uppercase transition-colors hover:border-signal hover:text-signal"
              >
                {area}, GA
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* legal + watermark */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-5 font-mono text-[10px] tracking-[0.25em] text-dim uppercase md:px-10">
          <span>© {year} SoundProofInc.com — All rights reserved</span>
          <span>Douglasville · West Atlanta · GA</span>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none -mb-[3vw] text-center font-display text-[17vw] leading-[0.8] uppercase select-none text-stroke-faint opacity-40"
      >
        Sound&shy;proof
      </div>
    </footer>
  );
}
