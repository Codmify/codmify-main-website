"use client";

import { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

function Confetti() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // sessionStorage is only readable client-side, so whether to run must be
    // decided post-mount rather than during render.
    if (!sessionStorage.getItem("confetti")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRun(true);

      const timer = setTimeout(() => {
        sessionStorage.setItem("confetti", "0");
        setRun(false);
      }, 15000);

      return () => clearTimeout(timer);
    } else {
      setRun(false);
    }
  }, []);

  return run ? <Fireworks autorun={{ speed: 2 }} /> : <></>;
}

export default Confetti;
