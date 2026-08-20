import { BRANDS } from "../data";
import Marquee from "./Marquee";
import { Reveal } from "./ui";

export default function Brands() {
  return (
    <section className="border-y border-line bg-panel py-16 md:py-20" aria-label="Brands we carry">
      <Reveal className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="text-center font-mono text-[11px] font-bold tracking-[0.4em] text-dim uppercase">
          Manufacturers we offer
        </p>
      </Reveal>
      <Marquee
        items={BRANDS}
        reverse
        className="mt-10"
        itemClassName="text-[clamp(3rem,7vw,6.5rem)] leading-none text-stroke-faint transition-colors hover:text-signal hover:[-webkit-text-stroke:0px]"
      />
    </section>
  );
}
