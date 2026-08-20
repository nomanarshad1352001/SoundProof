import { Asterisk } from "lucide-react";
import { cn } from "../utils/cn";

export default function Marquee({
  items,
  className,
  itemClassName,
  slow = false,
  reverse = false,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  slow?: boolean;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("group overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : slow ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className={cn("font-display text-lg tracking-wide uppercase", itemClassName)}>
              {item}
            </span>
            <Asterisk className="mx-8 size-5 shrink-0 text-signal" strokeWidth={2.5} />
          </span>
        ))}
      </div>
    </div>
  );
}
