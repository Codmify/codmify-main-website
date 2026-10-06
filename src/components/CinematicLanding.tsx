"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Packages from "./Packages";
import FAQ from "./FAQ";
import ContactUs from "./ContactUs";
import { ourProjects } from "@/constants/data";
import Image from "next/image";
import { servicesHolder } from "@/utils/services-holder";
import { BUILDING_ROOMS } from "@/lib/building-tour";
import { useRouter } from "next/navigation";
import { useAnniversary } from "./Anniversary";

const World = dynamic(() => import("./BuildingWorld"), {
  ssr: false,
  loading: () => (
    <div className="landing-world-placeholder" aria-hidden="true" />
  ),
});

export default function CinematicLanding() {
  const router = useRouter();
  const [activeRoom, setActiveRoom] = useState(0);
  const navigate = useCallback(
    (href: string) => {
      if (href.startsWith("#"))
        document.getElementById(href.slice(1))?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      else if (href.startsWith("/")) router.push(href);
      else window.location.assign(href);
    },
    [router],
  );
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
      const chapters = Array.from(
        element.querySelectorAll<HTMLElement>(".world-chapter"),
      );
      // Match native anchor landing positions beneath the fixed site navigation.
      const inset =
        parseFloat(getComputedStyle(chapters[0]).scrollMarginTop) || 0;
      const position = Math.max(0, inset - rect.top);
      let index = chapters.findIndex(
        (chapter) => position < chapter.offsetTop + chapter.offsetHeight,
      );
      if (index < 0) index = chapters.length - 1;
      const chapter = chapters[index];
      const local = Math.min(
        1,
        Math.max(
          0,
          (position - chapter.offsetTop) / Math.max(1, chapter.offsetHeight),
        ),
      );
      progress.current = Math.min(
        1,
        (index + local) / Math.max(1, chapters.length - 1),
      );
      setActiveRoom(index);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(readScroll);
    };
    readScroll();
    const observer = new ResizeObserver(onScroll);
    if (section.current) observer.observe(section.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      clearTimeout(initial);
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", updateMotion);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={section}
      className={`landing-world building-landing${celebrating ? " building-celebrating" : ""}${staticView ? " landing-world-static" : ""}`}
    >
      <div className="landing-world-stage">
        {staticView ? (
          <div className="landing-world-placeholder" />
        ) : (
          <World
            progress={progress}
            paused={paused}
            celebrating={celebrating}
            onNavigate={navigate}
          />
        )}
        <div className="landing-world-atmosphere" aria-hidden="true" />
      </div>
      <div className="landing-world-chapters">
        <section
          id="welcome"
          className="world-chapter world-opening"
          aria-labelledby="world-title"
        >
          <div className="world-copy">
            <p className="world-eyebrow">FROM BIG IDEAS TO REAL-WORLD IMPACT</p>
            <h1 id="world-title">
              Your next big idea
              <br />
              <em>starts here.</em>
            </h1>
            <p>
              We design and build websites, apps and digital experiences that
              help your business move forward.
            </p>
            <div className="world-actions">
              <Link className="world-primary" href="/hire-us">
                Start a project <span aria-hidden="true">↗</span>
              </Link>
              <Link className="world-secondary" href="/our-projects">
                Explore our work <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="world-opening-note">
              <span>STRATEGY. DESIGN. TECHNOLOGY.</span>
              <a href="#studio">Take the elevator upstairs ↓</a>
            </div>
          </div>
        </section>
        <section
          id="studio"
          className="world-chapter world-studio"
          aria-labelledby="world-studio-title"
        >
          <div className="world-copy">
            <p className="world-eyebrow">FLOOR 01 / THE DESIGN STUDIO</p>
            <h2 id="world-studio-title">
              One team.
              <br />
              <em>Many possibilities.</em>
            </h2>
            <p>
              From the first conversation to the final launch, we bring
              strategy, design and technology together around your business.
            </p>
            <p className="world-copy-muted">
              Clear communication. Thoughtful design. Practical delivery. A team
              that helps you make the next move count.
            </p>
            <Link className="world-secondary" href="/about-us">
              Meet Codmify <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section
          id="capabilities"
          className="world-chapter world-services"
          aria-labelledby="world-services-title"
        >
          <div className="world-copy">
            <p className="world-eyebrow">FLOOR 01 / THE CAPABILITIES ROOM</p>
            <h2 id="world-services-title">
              An idea is only
              <br />
              <em>the beginning.</em>
            </h2>
            <p>The right people and capabilities to bring it to life.</p>
            <ul className="world-services-list">
              {servicesHolder.map((service, index) => (
                <li key={service.reference}>
                  <Link href={`/services#${service.reference}`}>
                    <span className="world-service-number">0{index + 1}</span>
                    <span>{service.title}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="world-primary" href="/services">
              Explore our services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
        <section
          id="work"
          className="world-chapter world-work"
          aria-labelledby="world-work-title"
        >
          <div className="world-copy">
            <p className="world-eyebrow">FLOOR 02 / THE PROJECT GALLERY</p>
            <h2 id="world-work-title">
              Real businesses.
              <br />
              <em>Real momentum.</em>
            </h2>
            <p>
              A selection of the platforms and digital experiences we’ve helped
              create.
            </p>
            <div className="world-project-list">
              {ourProjects.slice(0, 3).map((project) => (
                <Link
                  key={project.title}
                  href={project.url || "/our-projects"}
                  className="world-project"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    width={160}
                    height={110}
                  />
                  <span>
                    <strong>{project.title}</strong>
                    <span>{project.desc}</span>
                  </span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
            <Link className="world-secondary" href="/our-projects">
              View all projects ↗
            </Link>
          </div>
        </section>
        <section
          id="plans"
          className="world-chapter world-rich world-plans"
          aria-labelledby="world-plans-title"
        >
          <div className="world-copy">
            <p className="world-eyebrow">FLOOR 03 / THE PLANNING ROOM</p>
            <h2 id="world-plans-title">
              Room to start.
              <br />
              <em>Built to grow.</em>
            </h2>
            <p>Choose a website package that fits your next step.</p>
          </div>
          <div className="world-reading-surface">
            <Packages compact />
          </div>
        </section>
        <section
          id="questions"
          className="world-chapter world-questions"
          aria-labelledby="world-questions-title"
        >
          <div className="world-copy">
            <p className="world-eyebrow">FLOOR 04 / THE ANSWER LIBRARY</p>
            <h2 id="world-questions-title">
              Good questions.
              <br />
              <em>Clear answers.</em>
            </h2>
            <div className="world-reading-surface">
              <FAQ />
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="world-chapter world-rich world-contact"
          aria-labelledby="world-contact-title"
        >
          <div className="world-copy">
            <p className="world-eyebrow">FLOOR 05 / LET’S BUILD TOGETHER</p>
            <h2 id="world-contact-title">
              Let’s build
              <br />
              <em>something together.</em>
            </h2>
            <p>
              Tell us what you have in mind. Our team is ready to help you take
              the next step.
            </p>
            <Link className="world-primary" href="/hire-us">
              Start a project ↗
            </Link>
          </div>
          <div className="world-reading-surface">
            <ContactUs />
          </div>
        </section>
      </div>
      <nav className="building-directory" aria-label="Building floors">
        <span className="building-directory-label">EXPLORE THE BUILDING</span>
        {BUILDING_ROOMS.map((room, index) => (
          <a
            key={room.id}
            href={`#${room.id}`}
            aria-label={`Floor ${room.floor === 0 ? "G" : room.floor}: ${room.label}`}
            aria-current={activeRoom === index ? "location" : undefined}
          >
            <span>{room.floor === 0 ? "G" : `0${room.floor}`}</span>
            <span>{room.label}</span>
          </a>
        ))}
        {!staticView && (
          <button
            className="world-motion-toggle"
            aria-pressed={paused}
            aria-label={
              paused ? "Resume ambient motion" : "Pause ambient motion"
            }
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Resume" : "Pause"}
          </button>
        )}
      </nav>
    </div>
  );
}
