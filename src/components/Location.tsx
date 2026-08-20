import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { HOURS, INFO } from "../data";
import { cn } from "../utils/cn";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "./social-icons";
import { Reveal, SectionHead } from "./ui";

function fmt(minutes: number) {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const ap = h24 >= 12 ? "PM" : "AM";
  const h12 = ((h24 + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, "0")} ${ap}`;
}

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// [open, close] in minutes — Sunday closed
const SCHEDULE: ([number, number] | null)[] = [
  null,
  [570, 1080], // Mon–Fri 9:30–18:00
  [570, 1080],
  [570, 1080],
  [570, 1080],
  [570, 1080],
  [570, 960], // Sat 9:30–16:00
];

function openStatus(now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = SCHEDULE[day];
  if (today && mins >= today[0] && mins < today[1]) {
    return { open: true, label: `Open now — 'til ${fmt(today[1])}` };
  }
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const spec = SCHEDULE[d];
    if (spec && (i > 0 || mins < spec[0])) {
      return {
        open: false,
        label: `Closed — opens ${i === 0 ? "today" : DAY_NAMES[d]} ${fmt(spec[0])}`,
      };
    }
  }
  return { open: false, label: "Closed" };
}

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: XIcon, label: "Twitter / X" },
  { icon: YoutubeIcon, label: "YouTube" },
];

export default function Location() {
  const status = openStatus();
  const today = new Date().getDay();

  return (
    <section id="location" className="relative border-t border-line bg-panel py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="04"
          label="Location & hours"
          title={
            <>
              Roll <span className="text-signal">through.</span>
            </>
          }
          blurb="Right on Douglas Blvd. Pull up with a sketch on a napkin — leave with a system that shakes mirrors."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* info column */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="flex flex-wrap items-start justify-between gap-6 border border-line bg-void p-8">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.3em] text-dim uppercase">
                    <MapPin className="size-4 text-signal" />
                    The shop
                  </div>
                  <div className="mt-4 font-display text-3xl leading-tight uppercase md:text-4xl">
                    {INFO.street}
                    <br />
                    {INFO.city}
                  </div>
                  <a
                    href={INFO.directions}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-5 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-signal uppercase"
                  >
                    Get directions
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 font-mono text-[10px] font-bold tracking-[0.3em] text-dim uppercase">
                    <Phone className="size-4 text-signal" />
                    Call the bay
                  </div>
                  <a
                    href={INFO.phoneHref}
                    className="mt-4 block font-display text-3xl tracking-wide transition-colors hover:text-signal md:text-4xl"
                  >
                    {INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-line bg-void p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.3em] text-dim uppercase">
                    <Clock className="size-4 text-signal" />
                    Shop hours
                  </div>
                  <span
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase",
                      status.open
                        ? "border-signal/50 bg-signal/10 text-signal"
                        : "border-line text-dim"
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        status.open ? "animate-pulse bg-signal" : "bg-dim"
                      )}
                    />
                    {status.label}
                  </span>
                </div>
                <ul className="mt-6 divide-y divide-line">
                  {HOURS.map((row) => {
                    const isToday = row.match.includes(today);
                    const closed = row.time === "Closed";
                    return (
                      <li
                        key={row.days}
                        className={cn(
                          "flex items-center justify-between py-3.5",
                          isToday && "px-3 -mx-3 bg-signal/5 border-l-2 border-signal"
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-xs font-bold tracking-widest uppercase",
                            isToday ? "text-signal" : "text-bone/80"
                          )}
                        >
                          {row.days}
                          {isToday && " — today"}
                        </span>
                        <span
                          className={cn(
                            "font-mono text-xs tracking-widest",
                            closed ? "text-dim line-through" : "text-bone"
                          )}
                        >
                          {row.time}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-6 flex gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href="#top"
                      aria-label={s.label}
                      className="flex size-10 items-center justify-center border border-line text-bone/70 transition-all duration-300 hover:border-signal hover:bg-signal hover:text-black"
                    >
                      <s.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* map */}
          <Reveal delay={0.12} className="min-h-[420px]">
            <div className="relative h-full min-h-[420px] overflow-hidden border border-line">
              <iframe
                title="Sound Proof Inc. — 7015 Douglas Blvd, Douglasville, GA 30135"
                src={INFO.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-dark absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-void/70 to-transparent" />
              <div className="absolute bottom-4 left-4 border border-line bg-void px-4 py-2 font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
                34.7° N — Douglas County, West ATL
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
