"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const CityScene = dynamic(() => import("./AnniversaryCityScene"), { ssr: false, loading: () => <div className="city-scene-loading">Preparing your view of the city…</div> });
const chapters = [
  { label: "LAGOS / A WORLD OF POSSIBILITY", title: "Every big idea starts somewhere.", text: "A city full of energy. A team with a shared ambition." },
  { label: "CODMIFY / OUR NEXT CHAPTER", title: "Come a little closer.", text: "Two years of bringing ideas to life, together." },
  { label: "TWO YEARS / MADE POSSIBLE BY YOU", title: "Welcome to our celebration.", text: "To our clients, team and partners: thank you. Here’s to everything we’ll build next." },
  { label: "ANOTHER DIMENSION / INFINITE POSSIBILITIES", title: "Two years. A universe of possibilities.", text: "Beyond one city. Beyond one idea. Scroll through our next dimension—and into what comes next." },
];

export default function AnniversaryExperience({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const progress = useRef(0);
  const scroller = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  const exiting = useRef(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [ready, setReady] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => { close.current = onClose; }, [onClose]);

  const revealWebsite = useCallback(() => {
    if (exiting.current) return;
    exiting.current = true;
    setLeaving(true);
    document.body.dataset.anniversaryReveal = "true";
    exitTimer.current = setTimeout(() => close.current(), 1100);
  }, []);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(exitTimer.current);
      element?.close();
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.anniversaryReveal;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      // Slow/unsupported graphics must never leave the website blocked.
      const timeout = setTimeout(revealWebsite, 8000);
      return () => clearTimeout(timeout);
    }
    // Once ready, only visitor scrolling advances the camera.
  }, [ready, revealWebsite]);

  const sceneReady = useCallback(() => setReady(true), []);

  return <dialog ref={dialog} className={`city-tour-dialog city-film${leaving ? " city-film-leaving" : ""}`} aria-labelledby="city-tour-title" aria-describedby="city-tour-description" onCancel={event => { event.preventDefault(); revealWebsite(); }}>
    <div ref={scroller} className="city-tour-scroll" style={{ overflowY: ready ? "auto" : "hidden" }} tabIndex={0} aria-label="Scroll through the city, office celebration and anniversary universe" onScroll={event => {
      if (!ready || exiting.current) return;
      const element = event.currentTarget;
      const value = Math.max(0, Math.min(1, element.scrollTop / Math.max(1, element.scrollHeight - element.clientHeight)));
      progress.current = value;
      setChapter(value < .2 ? 0 : value < .4 ? 1 : value < .6 ? 2 : 3);
      if (value >= .998) revealWebsite();
    }}>
    <div className="city-tour-track">
    <div className="city-tour-viewport">
      <CityScene progress={progress} paused={false} onReady={sceneReady} />
      <div className="city-tour-vignette" aria-hidden="true" />
      <header className="city-tour-header"><div className="city-tour-brand"><Image src="/brand/logo-1.png" width={146} height={28} alt="Codmify" /><span>ANNIVERSARY / 02</span></div><div className="city-tour-header-actions"><button autoFocus onClick={revealWebsite} disabled={leaving}>Skip intro <span aria-hidden="true">↗</span></button></div></header>
      <div className="city-tour-location"><span aria-hidden="true">◉</span> {chapter < 3 ? "LAGOS-INSPIRED WORLD · NIGERIA" : "CODMIFY · THE ANNIVERSARY MULTIVERSE"}</div>
      <div className={`city-tour-caption${chapter === 3 ? " city-universe-caption" : ""}`} key={chapter}>
        <p className="city-tour-chapter">{chapters[chapter].label}</p>
        <h2 id="city-tour-title">{chapters[chapter].title}</h2>
        <p id="city-tour-description">{chapters[chapter].text}</p>
      </div>
      <aside className="city-tour-note">An imagined office.<br />A very real celebration.</aside>
      <footer className="city-film-footer"><span>OCTOBER 2026 · TWO YEARS TOGETHER</span><span>{leaving ? "Welcome to Codmify" : "SCROLL TO CONTINUE ↓"} <span aria-hidden="true">✦</span></span></footer>
    </div>
    </div>
    </div>
  </dialog>;
}
