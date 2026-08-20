import { GALLERY } from "../data";
import { cn } from "../utils/cn";
import { Reveal, SectionHead } from "./ui";

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="03"
          label="Gallery"
          title={
            <>
              The proof is in <span className="text-stroke">the paint</span>
            </>
          }
          blurb="Trunk walls, fresh rubber, head-unit swaps and midnight tint jobs — a look at what rolls out of the bay."
        />

        <div className="grid auto-rows-[240px] grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[280px] lg:grid-cols-4">
          {GALLERY.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 0.06} className={cn("h-full", item.span)}>
              <figure className="group relative h-full w-full overflow-hidden border border-line">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100" />
                <figcaption className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] font-bold tracking-[0.3em] text-signal uppercase">
                      {item.tag}
                    </div>
                    <div className="mt-1 font-display text-xl tracking-wide uppercase md:text-2xl">
                      {item.title}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-bone/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
