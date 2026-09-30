export type Category = "marca" | "entretenimiento" | "social";

export type Video = {
  title: string;
  category: Category;
  url: string;
  client?: string;
  vertical?: boolean;
  thumbnail?: string;
};

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "marca", label: "Marcas & Publicidad" },
  { id: "entretenimiento", label: "Entretenimiento" },
  { id: "social", label: "Edits / Social" },
];

export const categoryLabel = (c: Category) =>
  categories.find((x) => x.id === c)?.label ?? c;

type Parsed = { provider: "youtube" | "vimeo"; id: string } | null;

export function parseVideo(url: string): Parsed {
  if (!url) return null;
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (yt) return { provider: "youtube", id: yt[1] };
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { provider: "vimeo", id: vm[1] };
  return null;
}

export function embedUrl(url: string, opts: { background?: boolean } = {}) {
  const p = parseVideo(url);
  if (!p) return null;
  if (p.provider === "youtube") {
    const base = `https://www.youtube-nocookie.com/embed/${p.id}`;
    return opts.background
      ? `${base}?autoplay=1&mute=1&loop=1&playlist=${p.id}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0`
      : `${base}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  }
  return opts.background
    ? `https://player.vimeo.com/video/${p.id}?background=1&autoplay=1&loop=1&muted=1`
    : `https://player.vimeo.com/video/${p.id}?autoplay=1&title=0&byline=0&portrait=0`;
}

export function thumbnailUrl(video: Video) {
  if (video.thumbnail) return video.thumbnail;
  const p = parseVideo(video.url);
  if (!p) return null;
  return p.provider === "youtube"
    ? `https://i.ytimg.com/vi/${p.id}/hqdefault.jpg`
    : `https://vumbnail.com/${p.id}.jpg`;
}
