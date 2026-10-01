"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const sparks = [
  { name: "Ideas", symbol: "✧", caption: "Every possibility starts with an idea." },
  { name: "People", symbol: "✦", caption: "Great things happen when we build together." },
  { name: "Possibilities", symbol: "✳", caption: "Here’s to everything we’ll create next." },
];

export default function AnniversaryExperience({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [collected, setCollected] = useState<number[]>([]);
  const complete = collected.length === sparks.length;

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

  const collect = (index: number) => setCollected(previous => previous.includes(index) ? previous : [...previous, index]);

  return <dialog ref={dialog} className="anniversary-experience" aria-labelledby="anniversary-experience-title" aria-describedby="anniversary-experience-description" onCancel={onClose} onClick={event => { if (event.target === dialog.current) onClose(); }}>
    <div className={`anniversary-experience-card${complete ? " is-complete" : ""}`}>
      <header className="experience-header"><span className="experience-wordmark">codmify<span> / TWO YEARS</span></span><button autoFocus className="experience-close" onClick={onClose} aria-label="Close anniversary celebration">×</button></header>
      <div className="experience-content">
        <div className="experience-copy">
          <span className="experience-kicker"><i /> A LITTLE MOMENT TO CELEBRATE</span>
          <h2 id="anniversary-experience-title">{complete ? <>The future is<br /><em>brighter together.</em></> : <>Two years.<br /><em>Infinite possibilities.</em></>}</h2>
          <p id="anniversary-experience-description">{complete ? "You’ve lit up our next chapter. Thank you for being part of the Codmify story." : "Ideas. People. Possibilities. Three sparks that make us who we are. Bring them together to light up our next chapter."}</p>
          <div className="experience-progress" aria-label={`${collected.length} of 3 sparks collected`}>{sparks.map((spark, index) => <button key={spark.name} className={collected.includes(index) ? "is-collected" : ""} disabled={collected.includes(index)} onClick={() => collect(index)} aria-label={`Collect ${spark.name} spark`}><span>{collected.includes(index) ? "✓" : `0${index + 1}`}</span>{spark.name}</button>)}</div>
          <p className="experience-status" aria-live="polite">{complete ? "All three sparks connected. Here’s to what comes next." : collected.length ? sparks[collected[collected.length - 1]].caption : "Tap the floating sparks, or use the buttons above."}</p>
          <div className="experience-actions">{complete ? <Link href="/our-projects" onClick={onClose} className="experience-primary">Explore what we build <span aria-hidden="true">↗</span></Link> : <button className="experience-primary" onClick={() => collect(sparks.findIndex((_, i) => !collected.includes(i)))}>Connect a spark <span aria-hidden="true">↗</span></button>}<button className="experience-skip" onClick={onClose}>{complete ? "Continue to website" : "Skip celebration"} <span aria-hidden="true">→</span></button></div>
        </div>
        <div ref={stage} className="experience-stage" onPointerMove={event => {
          if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const rect = event.currentTarget.getBoundingClientRect();
          stage.current?.style.setProperty("--tilt-x", `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 12}deg`);
          stage.current?.style.setProperty("--tilt-y", `${(event.clientX - rect.left - rect.width / 2) / rect.width * 18}deg`);
        }} onPointerLeave={() => { stage.current?.style.setProperty("--tilt-x", "0deg"); stage.current?.style.setProperty("--tilt-y", "0deg"); }}>
          <div className="experience-grid" aria-hidden="true" />
          <div className="experience-planet" aria-hidden="true"><div className="experience-ring ring-one" /><div className="experience-ring ring-two" /><div className="experience-ring ring-three" /><div className="experience-core"><span>BUILDING TOGETHER</span><strong>2</strong><span>YEARS OF CODMIFY</span></div></div>
          {sparks.map((spark, index) => <button key={spark.name} className={`experience-spark spark-${index}${collected.includes(index) ? " is-collected" : ""}`} onClick={() => collect(index)} disabled={collected.includes(index)} aria-label={`Connect ${spark.name} spark`}><span aria-hidden="true">{collected.includes(index) ? "✓" : spark.symbol}</span><small>{spark.name}</small></button>)}
          <span className="experience-scene-label">{complete ? "NEXT CHAPTER / ACTIVATED" : "CONNECT THE SPARKS / 01—03"}</span>
          {complete && <div className="experience-burst" aria-hidden="true">{Array.from({length: 16}, (_, i) => <i key={i} style={{ transform: `rotate(${i * 22.5}deg)` }}><span /></i>)}</div>}
        </div>
      </div>
      <footer className="experience-footer"><span>OCTOBER 2026 · ANNIVERSARY EDITION</span><span>Made possible by you. <span aria-hidden="true">✦</span></span></footer>
    </div>
  </dialog>;
}
