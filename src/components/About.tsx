import { BadgeCheck, Wrench } from "lucide-react";
import { ABOUT_IMAGE, STATS } from "../data";
import { Reveal, SectionHead } from "./ui";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="02"
          label="About the shop"
          title={
            <>
              25 years of <span className="text-signal">pressure.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* image stack */}
          <Reveal className="relative lg:col-span-5">
            <div className="relative overflow-hidden border border-line">
              <img
                src={ABOUT_IMAGE}
                alt="Premium speaker detail inside a custom build"
                loading="lazy"
                className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 md:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 font-mono text-[10px] font-bold tracking-[0.3em] text-bone/80 uppercase">
                Install bay — Douglasville, GA
              </div>
            </div>
            <div className="absolute -right-3 -bottom-6 border border-line bg-signal px-6 py-5 text-black md:-right-6">
              <div className="font-display text-5xl leading-none">25+</div>
              <div className="mt-1 font-mono text-[10px] font-bold tracking-[0.25em] uppercase">
                Years loud
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-bone/90 md:text-xl">
                Sound Proof Custom Car Audio offers cutting-edge audio and video equipment for
                all types of vehicles at the best prices around. With over{" "}
                <span className="text-signal">25 years of experience</span>, we bring the
                quality you want at the prices you desire.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 text-sm leading-relaxed text-dim md:text-base">
                Our expert team of MECP certified installers can help you create the ideal
                system for your needs and your budget — everything from upgrading factory
                speakers or replacing a burned-out radio, to designing and installing a
                competition-caliber multimedia system. And we're more than audio: a full line
                of truck accessories, custom wheels and tires, navigation, security and
                keyless entry, and professionally installed window tinting.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="flex items-center gap-2 border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-[11px] font-bold tracking-widest text-signal uppercase">
                  <BadgeCheck className="size-4" />
                  MECP Certified Installers
                </span>
                <span className="flex items-center gap-2 border border-line px-4 py-2 font-mono text-[11px] font-bold tracking-widest text-bone/80 uppercase">
                  <Wrench className="size-4 text-signal" />
                  Installation · Sales · Service
                </span>
              </div>
            </Reveal>

            {/* stats */}
            <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={0.1 + i * 0.06} className="h-full">
                  <div className="flex h-full flex-col gap-1 bg-void p-5">
                    <span className="font-display text-3xl text-signal md:text-4xl">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
                      {stat.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
