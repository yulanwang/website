"use client"

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function OasisTypewriter() {

  const ref = useRef(null)

  useEffect(() => {
    const typed = new Typed(ref.current, {
      strings: ["Oasis"],
      startDelay: 200,
      typeSpeed: 100,
      backSpeed: 60,
      backDelay: 10000,
      loop: true,
      showCursor: true,
    });

    return () => {
      typed.destroy();
    }
  }, [])

  return (
    <h1 className="sm:h-[220px] sm:text-[150px] xs:text-[80px] text-[64px]">
      <span ref={ref}></span>
    </h1>
  );
}
