import { ArrowUpRight, Plus } from "lucide-react";
import { EXTRAS, SERVICES } from "../data";
import { Reveal, SectionHead } from "./ui";

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="01"
          label="Services"
          title={
            <>
              What we <span className="text-stroke">build</span>
            </>
          }
          blurb="One bay, every upgrade. Cutting-edge audio and video for all types of vehicles — plus tint, wheels, suspension and more, all at the best prices around."
        />

        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.08} className="h-full">
              <article className="group relative flex h-full flex-col bg-void p-8 transition-colors duration-500 hover:bg-card md:p-10">
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center border border-line text-bone transition-all duration-500 group-hover:border-signal group-hover:text-signal">
                    <service.icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="font-mono text-xs font-bold text-dim">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-2xl tracking-wide uppercase md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dim">{service.tag}</p>

                <ul className="mt-6 space-y-2.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 text-[13px] text-bone/80"
                    >
                      <Plus className="size-3.5 shrink-0 text-signal" strokeWidth={3} />
                      {point}
                    </li>
                  ))}
                </ul>

                <ArrowUpRight className="absolute right-8 bottom-8 size-5 translate-y-2 text-signal opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-dim uppercase">
              Also in the bay —
            </span>
            {EXTRAS.map((extra) => (
              <span
                key={extra}
                className="rounded-full border border-line px-4 py-1.5 font-mono text-[11px] tracking-wider text-bone/80 uppercase transition-colors duration-300 hover:border-signal hover:text-signal"
              >
                {extra}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
