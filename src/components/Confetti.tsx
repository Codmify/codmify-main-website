"use client";

import { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

function Confetti() {
  const [run, setRun] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRun(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return run ? <Fireworks autorun={{ speed: 2 }} /> : <></>;
}

export default Confetti;
