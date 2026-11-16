import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarqueeBand } from "@/components/MarqueeBand";
import { VideoGallery } from "@/components/VideoGallery";
import { YoutubeSection } from "@/components/YoutubeSection";
import { Thumbnails } from "@/components/Thumbnails";
import { BehindTheScenes } from "@/components/BehindTheScenes";
import { Services } from "@/components/Services";
import { Clients } from "@/components/Clients";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { site } from "@/data/site";
import { resolvePublicImage } from "@/lib/assets";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <VideoGallery />
        <YoutubeSection />
        <Thumbnails />
        <Clients />
        <BehindTheScenes />
        <About photo={resolvePublicImage(site.about.photo)} />
        <Services />
        <Contact />
      </main>
    </>
  );
}
