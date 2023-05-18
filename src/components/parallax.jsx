import React, { createRef, useEffect } from 'react'

export default function Parallax({ children, parallaxFactor, className }) {
  const parallaxRef = createRef()
  const handleParallax = () => {
    parallaxRef.current.style.transform = `translateY(${parallaxRef.current.getBoundingClientRect()
      .y *
      parallaxFactor -
      parallaxRef.current.getBoundingClientRect().y}px)`
  }

  useEffect(() => {
    handleParallax()
    window.addEventListener("scroll", handleParallax)
    return function cleanup() {
      window.removeEventListener("scroll", handleParallax)
    }
  })
  return (
    <div ref={parallaxRef} className={className}>
      {children}
    </div>
  )
}
