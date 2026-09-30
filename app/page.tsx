import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarqueeBand } from "@/components/MarqueeBand";
import { VideoGallery } from "@/components/VideoGallery";
import { BehindTheScenes } from "@/components/BehindTheScenes";
import { Clients } from "@/components/Clients";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <BehindTheScenes />
        <VideoGallery />
        <Clients />
        <About />
        <Contact />
      </main>
    </>
  );
}
