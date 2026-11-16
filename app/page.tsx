import { JetBrains_Mono } from "next/font/google";
import { Timeline } from "@/components/timeline/Timeline";
import { photos } from "@/data/photos";
import { resolvePublicImage } from "@/lib/assets";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-tl-mono" });

export default function Home() {
  // Se resuelve al compilar qué fotos existen en /public
  const resolved = photos.map((photo) => ({ ...photo, resolved: resolvePublicImage(photo.src) }));
  return (
    <div className={mono.variable}>
      <Timeline photos={resolved} />
    </div>
  );
}
