"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import AnniversaryExperience from "./AnniversaryExperience";
import { ANNIVERSARY_END, ANNIVERSARY_START, isAnniversaryActive } from "@/lib/anniversary";

const AnniversaryContext = createContext(false);
export const useAnniversary = () => useContext(AnniversaryContext);

export function AnniversaryProvider({ children }: { children: ReactNode }) {
  // A neutral first render keeps static pages and hydration consistent.
  const [active, setActive] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      const now = Date.now();
      setActive(isAnniversaryActive(now));
      const boundary = now < ANNIVERSARY_START ? ANNIVERSARY_START : ANNIVERSARY_END;
      if (now < boundary) timer = setTimeout(refresh, Math.min(boundary - now, 60_000));
    };
    refresh();
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  return <AnniversaryContext.Provider value={active}>{children}</AnniversaryContext.Provider>;
}

export function AnniversaryBanner() {
  const active = useAnniversary();
  if (!active) return null;
  return <div className="anniversary-banner">
    <span aria-hidden="true">✦</span>
    <span>Celebrating <strong>2 years of Codmify</strong><span className="anniversary-banner-extra">. Thank you for being part of our journey.</span></span>
    <Link href="/about-us#our-journey">Our journey <span aria-hidden="true">↗</span></Link>
  </div>;
}

export function AnniversaryBadge() {
  return useAnniversary() ? <span className="anniversary-badge">2 YEARS <span aria-hidden="true">✦</span></span> : null;
}

export function AnniversaryStory() {
  if (!useAnniversary()) return null;
  return <section id="our-journey" className="anniversary-story">
    <div className="anniversary-story-inner">
      <div className="anniversary-emblem" aria-label="Celebrating two years"><span className="anniversary-emblem-top">CODMIFY / ANNIVERSARY</span><strong>2<span aria-hidden="true">✦</span></strong><span className="anniversary-emblem-bottom">YEARS OF BUILDING TOGETHER</span></div>
      <div className="anniversary-story-copy">
        <p className="anniversary-eyebrow">OUR FIRST TWO YEARS · OCTOBER 2026</p>
        <h2>Built with ideas.<br />Made possible by you.</h2>
        <p>Every conversation, collaboration and launch has helped shape Codmify. This month, we’re celebrating two years of bringing ideas to life—and the people who have trusted us along the way.</p>
        <p>To our clients, team and partners: thank you for being part of our story. Here’s to everything we’ll build next.</p>
        <div className="anniversary-story-links"><Link href="/our-projects">Explore our work <span aria-hidden="true">↗</span></Link><Link href="/hire-us">Build with us <span aria-hidden="true">→</span></Link></div>
      </div>
    </div>
  </section>;
}

export function AnniversaryFooter() {
  if (!useAnniversary()) return null;
  return <div className="anniversary-footer"><span aria-hidden="true">✦</span><span>Two years in. So much more ahead.</span><span>Thank you for building with Codmify.</span></div>;
}

export function AnniversaryEffects() {
  const active = useAnniversary();
  const [intro, setIntro] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!active) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => {
      setReduced(motion.matches);
      setHidden(document.hidden);
      if (document.hidden || motion.matches) {
        setIntro(false);
        return;
      }
    };
    const first = setTimeout(check, 0);
    const dailyCheck = setInterval(check, 60_000);
    document.addEventListener("visibilitychange", check);
    window.addEventListener("focus", check);
    motion.addEventListener("change", check);
    return () => {
      clearTimeout(first);
      clearInterval(dailyCheck);
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("focus", check);
      motion.removeEventListener("change", check);
    };
  }, [active]);

  if (!active || reduced) return null;
  return <>
    <div className={`anniversary-confetti${paused || hidden ? " anniversary-motion-paused" : ""}`} aria-hidden="true">
      {Array.from({ length: 32 }, (_, i) => <i key={i} style={{ left: `${(i * 17 + 3) % 100}%`, animationDelay: `${-i * .73}s`, animationDuration: `${12 + i % 9}s`, background: ["#DAB561", "#51C4FF", "#9583E8", "#EFA3BD"][i % 4], borderRadius: i % 3 === 0 ? "50%" : "1px" }} />)}
    </div>
    <button className="anniversary-motion-control" onClick={() => { setPaused(!paused); setIntro(false); }} aria-pressed={paused} aria-label={paused ? "Resume celebration animation" : "Pause celebration animation"}>{paused ? "▶" : "Ⅱ"}<span>Celebration</span></button>
    <button className="anniversary-replay" onClick={() => { setPaused(false); setIntro(true); }}>Watch celebration <span aria-hidden="true">✦</span></button>
    {intro && !paused && <AnniversaryExperience onClose={() => setIntro(false)} />}
  </>;
}
