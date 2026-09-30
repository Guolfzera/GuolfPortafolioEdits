import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  dark?: boolean;
  children?: React.ReactNode;
};

export function SectionHeading({ index, eyebrow, title, dark, children }: Props) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <Reveal y={20}>
          <p
            className={`mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] ${
              dark ? "text-white/50" : "text-mute"
            }`}
          >
            <span className="font-display">{index}</span>
            <span className={`h-px w-10 ${dark ? "bg-white/30" : "bg-ink/20"}`} />
            {eyebrow}
          </p>
        </Reveal>
        <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
          <SplitText text={title} inView stagger={0.025} />
        </h2>
      </div>
      {children}
    </div>
  );
}
