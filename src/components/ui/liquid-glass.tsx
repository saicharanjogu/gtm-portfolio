import { useEffect } from 'react'

// SVG lens filter behind the `.liquid-glass` refraction (see index.css). Mount once.
// Only Chromium renders an SVG filter on a backdrop layer correctly; elsewhere an unsupported filter can
// wipe the blur, so refraction is opted in per browser and everyone else keeps the plain frosted glass.
export function LiquidGlassFilter() {
  useEffect(() => {
    const ua = navigator.userAgent
    const chromium = /Chrome\/\d+/.test(ua) && !/CriOS|FxiOS/.test(ua)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (chromium && !reduce) document.documentElement.classList.add('lg-refract')
    return () => document.documentElement.classList.remove('lg-refract')
  }, [])

  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="lg-refract" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.009 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="38" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}
