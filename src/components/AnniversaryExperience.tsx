"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const CityScene = dynamic(() => import("./AnniversaryCityScene"), { ssr: false, loading: () => <div className="city-scene-loading">Preparing your view of the city…</div> });
const chapters = [
  { label: "01 / THE CITY", title: "Big ideas. A city full of possibility.", text: "A little journey through a Lagos-inspired world. Scroll to visit our celebration." },
  { label: "02 / A CLOSER LOOK", title: "There’s something to celebrate up here.", text: "Follow the skyline to our glass tower. A new chapter is taking shape." },
  { label: "03 / OUR FLOOR", title: "Step inside the Codmify world.", text: "The people, ideas and collaborations behind two years of building together." },
  { label: "04 / TWO YEARS TOGETHER", title: "Made possible by you.", text: "To our clients, team and partners: thank you. Here’s to everything we’ll build next." },
];

export default function AnniversaryExperience({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [value, setValue] = useState(0);
  const [paused, setPaused] = useState(false);
  const chapter = Math.min(3, Math.floor(value * 4));

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  const goTo = (next: number) => {
    const element = scroller.current;
    if (!element) return;
    element.scrollTo({ top: next * (element.scrollHeight - element.clientHeight), behavior: "instant" });
    progress.current = next;
    setValue(next);
  };

  return <dialog ref={dialog} className="city-tour-dialog" aria-labelledby="city-tour-title" aria-describedby="city-tour-description" onCancel={onClose}>
    <div ref={scroller} className="city-tour-scroll" tabIndex={0} aria-label="Scroll to travel from the city skyline to the Codmify office" onScroll={event => {
      const element = event.currentTarget;
      const next = Math.max(0, Math.min(1, element.scrollTop / Math.max(1, element.scrollHeight - element.clientHeight)));
      progress.current = next;
      setValue(next);
    }}>
      <div className="city-tour-track">
        <div className="city-tour-viewport">
          <CityScene progress={progress} paused={paused} />
          <div className="city-tour-vignette" aria-hidden="true" />
          <header className="city-tour-header"><div className="city-tour-brand">codmify<span>ANNIVERSARY / 02</span></div><div className="city-tour-header-actions"><button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Resume motion" : "Pause motion"}</button><button autoFocus onClick={onClose} aria-label="Close city celebration" className="city-tour-close">×</button></div></header>
          <div className="city-tour-location"><span aria-hidden="true">◉</span> LAGOS-INSPIRED WORLD · NIGERIA</div>
          <div className="city-tour-caption">
            <p className="city-tour-chapter">{chapters[chapter].label}</p>
            <h2 id="city-tour-title">{chapters[chapter].title}</h2>
            <p id="city-tour-description">{chapters[chapter].text}</p>
            {chapter === 3 && <Link href="/about-us#our-journey" onClick={onClose} className="city-tour-story">Our anniversary story <span aria-hidden="true">↗</span></Link>}
          </div>
          <aside className="city-tour-note">An imagined office.<br />A very real celebration.</aside>
          <footer className="city-tour-controls">
            <div className="city-tour-progress"><label htmlFor="city-tour-progress">YOUR JOURNEY <span>{Math.round(value * 100)}%</span></label><input id="city-tour-progress" type="range" min="0" max="100" value={Math.round(value * 100)} onChange={event => goTo(Number(event.target.value) / 100)} aria-label="Zoom from the Lagos city to the Codmify office" /></div>
            <div className="city-tour-navigation"><button onClick={onClose}>Skip tour</button>{chapter < 3 ? <button className="city-tour-next" onClick={() => goTo(Math.min(1, (chapter + 1) / 4 + .04))}>Move closer <span aria-hidden="true">↓</span></button> : <button className="city-tour-next" onClick={onClose}>Explore the website <span aria-hidden="true">→</span></button>}</div>
          </footer>
          <div className="city-tour-scroll-hint" aria-hidden="true">{chapter < 3 ? "SCROLL TO MOVE CLOSER ↓" : "WELCOME TO OUR CELEBRATION ✦"}</div>
        </div>
      </div>
    </div>
  </dialog>;
}
