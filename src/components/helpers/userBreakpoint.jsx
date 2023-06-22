"use client"

import { useEffect, useState } from "react"
import { BREAKPOINT } from "./types"

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(null)

  const validateBreakpoint = () => {
    if (window.matchMedia(`(max-width: ${BREAKPOINT.MOBILE}px)`).matches) {
      setBreakpoint(BREAKPOINT.MOBILE)
      return breakpoint
    }
    if (window.matchMedia(`(max-width: ${BREAKPOINT.MIDSIZE}px)`).matches) {
      setBreakpoint(BREAKPOINT.MIDSIZE)
      return breakpoint
    } else setBreakpoint(BREAKPOINT.DESKTOP)
  }

  useEffect(() => {
    validateBreakpoint()
    window.addEventListener("resize", validateBreakpoint)
    return () => {
      window.removeEventListener("resize", validateBreakpoint)
    }
  })

  return breakpoint
}