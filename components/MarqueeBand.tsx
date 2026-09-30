const words = ["Video Editor", "Stream Clips", "Producción", "YouTube", "Speed Ramps", "Color Grading", "Motion", "Sound Design", "Music Sync", "Storytelling"];

export function MarqueeBand() {
  return (
    <div className="relative z-10 -my-4 overflow-hidden py-8">
      <div data-cursor-theme="dark" className="-mx-4 -rotate-2 bg-ink py-5 text-white shadow-lift">
        <div className="marquee" style={{ "--marquee-duration": "40s" } as React.CSSProperties}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {[...words, ...words].map((w, i) => (
                <span
                  key={i}
                  className="flex items-center font-display text-2xl font-bold uppercase tracking-tight md:text-4xl"
                >
                  <span className="px-6">{w}</span>
                  <span className="text-white/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
