"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { servicesHolder } from "@/utils/services-holder";
import { useAnniversary } from "./Anniversary";

const World = dynamic(() => import("./AnniversaryCityScene"), { ssr: false, loading: () => <div className="landing-world-placeholder" aria-hidden="true" /> });

export default function CinematicLanding() {
  const section = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [staticView, setStaticView] = useState(true);
  const [paused, setPaused] = useState(false);
  const celebrating = useAnniversary();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setStaticView(motion.matches);
    const initial = setTimeout(updateMotion, 0);
    motion.addEventListener("change", updateMotion);
    let frame = 0;
    const readScroll = () => {
      frame = 0;
      const element = section.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      progress.current = Math.min(1, Math.max(0, -rect.top / Math.max(1, element.offsetHeight - window.innerHeight)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(readScroll); };
    readScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { clearTimeout(initial); cancelAnimationFrame(frame); motion.removeEventListener("change", updateMotion); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return <div ref={section} className={`landing-world${staticView ? " landing-world-static" : ""}`}>
    <div className="landing-world-stage" aria-hidden="true">
      {staticView ? <div className="landing-world-placeholder" /> : <World progress={progress} paused={paused} landing celebrating={celebrating} />}
      <div className="landing-world-atmosphere" />
    </div>
    <div className="landing-world-chapters">
      <section id="welcome" className="world-chapter world-opening" aria-labelledby="world-title">
        <div className="world-copy"><p className="world-eyebrow">FROM BIG IDEAS TO REAL-WORLD IMPACT</p><h1 id="world-title">Your next big idea<br /><em>starts here.</em></h1><p>We design and build websites, apps and digital experiences that help your business move forward.</p><div className="world-actions"><Link className="world-primary" href="/hire-us">Start a project <span aria-hidden="true">↗</span></Link><Link className="world-secondary" href="/our-projects">Explore our work <span aria-hidden="true">→</span></Link></div><div className="world-opening-note"><span>STRATEGY. DESIGN. TECHNOLOGY.</span><a href="#studio">Scroll into our world ↓</a></div></div>
      </section>
      <section id="studio" className="world-chapter world-studio" aria-labelledby="world-studio-title"><div className="world-copy"><p className="world-eyebrow">INSIDE CODMIFY / BUILT TOGETHER</p><h2 id="world-studio-title">One team.<br /><em>Many possibilities.</em></h2><p>From the first conversation to the final launch, we bring strategy, design and technology together around your business.</p><p className="world-copy-muted">Clear communication. Thoughtful design. Practical delivery. A team that helps you make the next move count.</p><Link className="world-secondary" href="/about-us">Meet Codmify <span aria-hidden="true">↗</span></Link></div></section>
      <section id="capabilities" className="world-chapter world-services" aria-labelledby="world-services-title"><div className="world-copy"><p className="world-eyebrow">WHAT WE CAN BUILD WITH YOU</p><h2 id="world-services-title">An idea is only<br /><em>the beginning.</em></h2><p>The right people and capabilities to bring it to life.</p><ul className="world-services-list">{servicesHolder.map((service, index) => <li key={service.reference}><Link href={`/services#${service.reference}`}><span className="world-service-number">0{index + 1}</span><span>{service.title}</span><span aria-hidden="true">↗</span></Link></li>)}</ul><Link className="world-primary" href="/services">Explore our services <span aria-hidden="true">→</span></Link></div></section>
    </div>
    {!staticView && <button className="world-motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume ambient motion" : "Pause ambient motion"}</button>}
  </div>;
}
