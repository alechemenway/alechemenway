'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

const steps = [
  ['Discover', 'Find the constraint. Establish the baseline.'],
  ['Map', 'Connect the data, definitions, and relationships.'],
  ['Implement', 'Fit AI to the workflow, with clear ownership.'],
  ['Prove', 'Measure the outcome, including adoption and costs.'],
] as const

export function ValueProcess() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = root.current
    const target = document.getElementById('work-heading')
    const link = element?.querySelector<HTMLAnchorElement>('.value-work-link')
    const path = element?.querySelector<SVGPathElement>('.value-trace path')
    const first = element?.querySelector('li')
    if (!element || !target || !link || !path || !first) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let disposed = false
    let played = false

    function measure() {
      if (disposed || !element || !target || !link || !path) return
      const box = element.getBoundingClientRect()
      const from = link.getBoundingClientRect()
      const to = target.getBoundingClientRect()
      const x = from.right - box.left + 8
      const y = from.top - box.top + from.height / 2
      const endX = to.right - box.left + 12
      const endY = to.top - box.top + to.height / 2
      const edge = Math.min(window.innerWidth - box.left - 12, box.width + 24)
      path.setAttribute(
        'd',
        `M ${x} ${y} Q ${edge} ${y} ${edge} ${y + 24} V ${endY - 24} Q ${edge} ${endY} ${endX} ${endY}`,
      )
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (preference.matches || played) return
        if (
          entries.some(
            (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.6,
          )
        ) {
          played = true
          element.dataset.motion = 'play'
          observer.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    function syncPreference() {
      observer.disconnect()
      if (preference.matches) delete element!.dataset.motion
      else if (!played) observer.observe(first!)
    }
    const resize = new ResizeObserver(measure)
    resize.observe(element)
    resize.observe(target)
    const main = element.closest('main')
    if (main) resize.observe(main)
    window.addEventListener('resize', measure)
    preference.addEventListener('change', syncPreference)
    document.fonts.ready.then(measure)
    measure()
    syncPreference()
    return () => {
      disposed = true
      observer.disconnect()
      resize.disconnect()
      window.removeEventListener('resize', measure)
      preference.removeEventListener('change', syncPreference)
    }
  }, [])

  return (
    <div id="value-process" className="value-process" ref={root}>
      <p className="value-label">Working principles</p>
      <h2>From discovery to business value.</h2>
      <ol>
        {steps.map(([title, description], index) => (
          <li key={title} style={{ '--step': index } as CSSProperties}>
            <span className="value-node" aria-hidden="true">
              0{index + 1}
            </span>
            <div className="value-copy">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="value-footer">
        <p className="value-pricing">
          <strong>Price for value.</strong> Agree the intended outcome and
          expected ROI up front.
        </p>
        <a href="#work" className="value-work-link">
          See the decisions behind the work <span aria-hidden="true">↓</span>
        </a>
      </div>
      <svg className="value-trace" aria-hidden="true">
        <path fill="none" pathLength="1" />
      </svg>
    </div>
  )
}
